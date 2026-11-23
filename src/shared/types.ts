import type { CaseData, CaseDifficulty } from './cases/cases';
import type { AchievementId, RankTitle } from './config';

export type Screen =
  | 'home'
  | 'case_intro'
  | 'suspects'
  | 'clues'
  | 'verdict'
  | 'wrong_choice'
  | 'results'
  | 'leaderboard'
  | 'stats'
  | 'help';

export interface PlayerProfile {
  username: string;
  rank: RankTitle;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  casesSolved: number;
  perfectDeductions: number;
  noHintSolves: number;
  averageSolvingTimeMs: number;
  achievements: AchievementId[];
  lastActiveAt: number;
}

export interface SolveResult {
  caseNumber: number;
  score: number;
  xpEarned: number;
  isCulpritCorrect: boolean;
  isClueCorrect: boolean;
  culpritName: string;
  decisiveClueTitle: string;
  solutionExplanation: string;
  durationSec: number;
  isFirstSolver: boolean;
  newAchievement: AchievementId | null;
  timestamp: number;
}

export type CaseSessionStatus = 'unstarted' | 'in_progress' | 'solved';

export interface InitResponse {
  username: string | null;
  isAuthenticated: boolean;
  activeCase: CaseData;
  caseStatus: CaseSessionStatus;
  profile: PlayerProfile;
  cachedSolveResult?: SolveResult;
  timeUntilResetSec: number;
}

export interface SubmitVerdictInput {
  caseNumber: number;
  culpritId: string;
  decisiveClueId: string;
  activeDurationMs: number;
  usedHint: boolean;
}

export type SubmitVerdictResponse =
  | {
      success: true;
      result: SolveResult;
      updatedProfile: PlayerProfile;
    }
  | {
      success: false;
      state: 'WRONG_CHOICE';
    };

export type { CaseData, CaseDifficulty };
export type { AchievementId, RankTitle };
