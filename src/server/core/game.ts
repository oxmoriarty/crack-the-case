import { redis } from '@devvit/web/server';
import { getSolutionByCaseNumber } from '../cases/solutions';
import { getCaseByNumber } from '../../shared/cases/cases';
import { SCORING, XP_CONFIG, getRankForXp } from '../../shared/config';
import type {
  AchievementId,
  PlayerProfile,
  SolveResult,
  SubmitVerdictInput,
  SubmitVerdictResponse,
} from '../../shared/types';

const DEFAULT_PROFILE = (username: string): PlayerProfile => ({
  username,
  rank: 'Rookie Detective',
  xp: 0,
  currentStreak: 0,
  longestStreak: 0,
  casesSolved: 0,
  perfectDeductions: 0,
  noHintSolves: 0,
  averageSolvingTimeMs: 0,
  achievements: [],
  lastActiveAt: Date.now(),
});

export const getPlayerProfile = async (username: string): Promise<PlayerProfile> => {
  const raw = await redis.get(`player:${username}:profile`);
  if (!raw) {
    return DEFAULT_PROFILE(username);
  }
  try {
    const parsed = JSON.parse(raw) as Partial<PlayerProfile>;
    return {
      ...DEFAULT_PROFILE(username),
      ...parsed,
      achievements: Array.isArray(parsed.achievements) ? (parsed.achievements as AchievementId[]) : [],
    };
  } catch {
    return DEFAULT_PROFILE(username);
  }
};

export const savePlayerProfile = async (profile: PlayerProfile): Promise<void> => {
  await redis.set(`player:${profile.username}:profile`, JSON.stringify(profile));
  // Record in activity tracking set for 30-day inactivity retention
  await redis.zAdd('players:activity', { member: profile.username, score: Date.now() });
};

export const getCaseSolveResult = async (
  username: string,
  caseNumber: number
): Promise<SolveResult | null> => {
  const raw = await redis.hGet(`player:${username}:cases`, caseNumber.toString());
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SolveResult;
  } catch {
    return null;
  }
};

export const saveCaseSolveResult = async (
  username: string,
  result: SolveResult
): Promise<void> => {
  await redis.hSet(`player:${username}:cases`, {
    [result.caseNumber.toString()]: JSON.stringify(result),
  });
};

/**
 * Calculates time efficiency points (0 to 10).
 * Decreases gradually beyond target time (180s) down to 0 at 600s. Never negative.
 */
export const calculateTimeScore = (durationMs: number, targetSec = 180): number => {
  const durationSec = Math.max(0, Math.floor(durationMs / 1000));
  if (durationSec <= targetSec) {
    return SCORING.POINTS_TIME_MAX;
  }
  const maxWindow = 600; // 10 minutes
  if (durationSec >= maxWindow) {
    return 0;
  }
  const remaining = maxWindow - durationSec;
  const totalDecayRange = maxWindow - targetSec;
  const ratio = remaining / totalDecayRange;
  return Math.max(0, Math.min(SCORING.POINTS_TIME_MAX, Math.round(ratio * SCORING.POINTS_TIME_MAX)));
};

export const evaluateVerdict = async (
  username: string,
  input: SubmitVerdictInput
): Promise<SubmitVerdictResponse> => {
  const { caseNumber, culpritId, decisiveClueId, activeDurationMs, usedHint } = input;

  // 1. Check idempotency: if already solved, return cached result
  const existing = await getCaseSolveResult(username, caseNumber);
  if (existing) {
    const profile = await getPlayerProfile(username);
    return {
      success: true,
      result: existing,
      updatedProfile: profile,
    };
  }

  // 2. Fetch authoritative solution
  const solution = getSolutionByCaseNumber(caseNumber);
  if (!solution) {
    throw new Error(`Authoritative solution for case ${caseNumber} not found.`);
  }

  const caseData = getCaseByNumber(caseNumber);
  if (!caseData) {
    throw new Error(`Case metadata for case ${caseNumber} not found.`);
  }

  // 3. Check Culprit:
  // If culprit is wrong, case fails immediately. No points, no XP, no completion.
  if (culpritId !== solution.culpritId) {
    return {
      success: false,
      state: 'WRONG_CHOICE',
    };
  }

  // 4. Culprit is correct! Case completes.
  const isClueCorrect = decisiveClueId === solution.decisiveClueId;

  // 5. Calculate Score (Max 100 points)
  const culpritPoints = SCORING.POINTS_CULPRIT; // 40
  const cluePoints = isClueCorrect ? SCORING.POINTS_DECISIVE_CLUE : 0; // 40 or 0
  const noHintPoints = usedHint ? 0 : SCORING.POINTS_NO_HINT; // 10 or 0
  const timePoints = calculateTimeScore(activeDurationMs); // 0 to 10
  const totalScore = culpritPoints + cluePoints + noHintPoints + timePoints;

  // 6. Calculate XP (Max 90 XP per case)
  const culpritXp = XP_CONFIG.XP_CULPRIT; // 50
  const clueXp = isClueCorrect ? XP_CONFIG.XP_DECISIVE_CLUE : 0; // 30 or 0
  const noHintXp = usedHint ? 0 : XP_CONFIG.XP_NO_HINT; // 10 or 0
  let caseXp = culpritXp + clueXp + noHintXp;

  // 7. Atomic First on the Scene Claim
  let isFirstSolver = false;
  try {
    const claim = await redis.set(`case:${caseNumber}:first_solver`, username, { nx: true });
    isFirstSolver = claim === 'OK';
  } catch (err) {
    console.error('Error claiming first solver:', err);
  }

  // 8. Update Profile Career Stats
  const profile = await getPlayerProfile(username);
  const newCasesSolved = profile.casesSolved + 1;
  const newStreak = profile.currentStreak + 1;
  const newLongestStreak = Math.max(profile.longestStreak, newStreak);
  const newPerfect = isClueCorrect ? profile.perfectDeductions + 1 : profile.perfectDeductions;
  const newNoHint = !usedHint ? profile.noHintSolves + 1 : profile.noHintSolves;

  // Check 7-day streak milestone bonus (+25 XP)
  if (newStreak > 0 && newStreak % 7 === 0) {
    caseXp += XP_CONFIG.XP_STREAK_7_DAY_MILESTONE;
  }

  const newTotalXp = profile.xp + caseXp;
  const newRankInfo = getRankForXp(newTotalXp);

  // Compute rolling average solving time
  const currentTotalTime = profile.averageSolvingTimeMs * profile.casesSolved;
  const newAverageTime = Math.round((currentTotalTime + activeDurationMs) / newCasesSolved);

  // 9. Evaluate Achievements
  const currentAchievements = new Set<AchievementId>(profile.achievements);
  let newlyEarnedAchievement: AchievementId | null = null;

  const tryAward = (id: AchievementId) => {
    if (!currentAchievements.has(id)) {
      currentAchievements.add(id);
      if (!newlyEarnedAchievement) {
        newlyEarnedAchievement = id;
      }
    }
  };

  tryAward('first_case');
  if (isClueCorrect) {
    tryAward('sharp_eye');
    tryAward('perfect_detective');
  }
  if (newNoHint >= 5) {
    tryAward('no_help_needed');
  }
  if (newStreak >= 7) {
    tryAward('getting_consistent');
  }
  if (newStreak >= 14) {
    tryAward('two_weeks_strong');
  }
  if (newStreak >= 30) {
    tryAward('month_of_mystery');
  }
  if (newCasesSolved >= 10) {
    tryAward('case_veteran');
  }
  if (newCasesSolved >= 25) {
    tryAward('seasoned_investigator');
  }
  if (newCasesSolved >= 50) {
    tryAward('master_of_cases');
  }
  if (isFirstSolver) {
    tryAward('first_on_the_scene');
  }

  const updatedProfile: PlayerProfile = {
    username,
    rank: newRankInfo.title,
    xp: newTotalXp,
    currentStreak: newStreak,
    longestStreak: newLongestStreak,
    casesSolved: newCasesSolved,
    perfectDeductions: newPerfect,
    noHintSolves: newNoHint,
    averageSolvingTimeMs: newAverageTime,
    achievements: Array.from(currentAchievements),
    lastActiveAt: Date.now(),
  };

  const solveResult: SolveResult = {
    caseNumber,
    score: totalScore,
    xpEarned: caseXp,
    isCulpritCorrect: true,
    isClueCorrect,
    culpritName: solution.culpritName,
    decisiveClueTitle: solution.decisiveClueTitle,
    solutionExplanation: solution.solutionExplanation,
    durationSec: Math.max(1, Math.floor(activeDurationMs / 1000)),
    isFirstSolver,
    newAchievement: newlyEarnedAchievement,
    timestamp: Date.now(),
  };

  // 10. Persist updates
  await Promise.all([
    savePlayerProfile(updatedProfile),
    saveCaseSolveResult(username, solveResult),
  ]);

  return {
    success: true,
    result: solveResult,
    updatedProfile,
  };
};
