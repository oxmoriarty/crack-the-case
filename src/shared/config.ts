export type CaseDifficulty = 'Easy' | 'Standard' | 'Challenging';

export interface LaunchConfiguration {
  readonly launchDateUtc: string | null;
  readonly totalBundledCases: number;
}

export const APP_CONFIG: LaunchConfiguration = {
  launchDateUtc: null, // Strictly unset until supplied by project owner
  totalBundledCases: 40,
};

export const SCORING = {
  MAX_SCORE: 100,
  POINTS_CULPRIT: 40,
  POINTS_DECISIVE_CLUE: 40,
  POINTS_TIME_MAX: 10,
  POINTS_NO_HINT: 10,
} as const;

export const XP_CONFIG = {
  MAX_XP_PER_CASE: 90,
  XP_CULPRIT: 50,
  XP_DECISIVE_CLUE: 30,
  XP_NO_HINT: 10,
  XP_STREAK_7_DAY_MILESTONE: 25,
} as const;

export type RankTitle =
  | 'Rookie Detective'
  | 'Junior Detective'
  | 'Detective'
  | 'Senior Detective'
  | 'Chief Inspector'
  | 'Master Detective'
  | 'Legendary Detective';

export interface RankInfo {
  readonly title: RankTitle;
  readonly minXp: number;
}

export const RANKS: readonly RankInfo[] = [
  { title: 'Rookie Detective', minXp: 0 },
  { title: 'Junior Detective', minXp: 150 },
  { title: 'Detective', minXp: 400 },
  { title: 'Senior Detective', minXp: 800 },
  { title: 'Chief Inspector', minXp: 1400 },
  { title: 'Master Detective', minXp: 2200 },
  { title: 'Legendary Detective', minXp: 3200 },
] as const;

export const getRankForXp = (xp: number): RankInfo => {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    const rank = RANKS[i];
    if (rank && xp >= rank.minXp) {
      return rank;
    }
  }
  return RANKS[0]!;
};

export const getNextRank = (xp: number): { nextRank: RankInfo | null; xpNeeded: number } => {
  const currentRank = getRankForXp(xp);
  const currentIndex = RANKS.findIndex((r) => r.title === currentRank.title);
  if (currentIndex === -1 || currentIndex === RANKS.length - 1) {
    return { nextRank: null, xpNeeded: 0 };
  }
  const nextRank = RANKS[currentIndex + 1]!;
  return { nextRank, xpNeeded: Math.max(0, nextRank.minXp - xp) };
};

export type AchievementId =
  | 'first_case'
  | 'sharp_eye'
  | 'perfect_detective'
  | 'no_help_needed'
  | 'getting_consistent'
  | 'two_weeks_strong'
  | 'month_of_mystery'
  | 'case_veteran'
  | 'seasoned_investigator'
  | 'master_of_cases'
  | 'first_on_the_scene';

export interface AchievementMeta {
  readonly id: AchievementId;
  readonly title: string;
  readonly description: string;
}

export const ACHIEVEMENTS: readonly AchievementMeta[] = [
  { id: 'first_case', title: 'First Case', description: 'Solve your first mystery.' },
  { id: 'sharp_eye', title: 'Sharp Eye', description: 'Correctly identify the decisive clue.' },
  { id: 'perfect_detective', title: 'Perfect Detective', description: 'Solve a case with both correct culprit and decisive clue.' },
  { id: 'no_help_needed', title: 'No Help Needed', description: 'Solve 5 cases without using a hint.' },
  { id: 'getting_consistent', title: 'Getting Consistent', description: 'Reach a 7-day consecutive solve streak.' },
  { id: 'two_weeks_strong', title: 'Two Weeks Strong', description: 'Reach a 14-day consecutive solve streak.' },
  { id: 'month_of_mystery', title: 'Month of Mystery', description: 'Reach a 30-day consecutive solve streak.' },
  { id: 'case_veteran', title: 'Case Veteran', description: 'Solve 10 total cases.' },
  { id: 'seasoned_investigator', title: 'Seasoned Investigator', description: 'Solve 25 total cases.' },
  { id: 'master_of_cases', title: 'Master of Cases', description: 'Solve 50 total cases.' },
  { id: 'first_on_the_scene', title: 'First on the Scene', description: 'Be the first detective in the subreddit to solve a case.' },
] as const;
