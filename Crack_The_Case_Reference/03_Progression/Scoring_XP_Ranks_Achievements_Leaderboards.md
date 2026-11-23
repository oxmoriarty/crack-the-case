# Progression, Scoring & Leaderboard Rules

## Daily score (maximum 100)
- Correct culprit: 40 points.
- Correct decisive clue: 40 points.
- Time efficiency: up to 10 points.
- No hint used: 10 points.
- Wrong culprit: 0 points.
- Correct culprit + wrong clue: 40 culprit points + eligible time points + eligible no-hint points. Case completes immediately.
- Time score decreases gradually beyond a case-specific target and never becomes negative. Exact formula and per-case targets require balancing before implementation.
- Time runs from Begin Investigation to first correct culprit submission, including wrong attempts and hint use, with intended pause when leaving/closing the post.
- No-hint bonus only if the player never used the hint.

## XP
- Correct culprit: 50 XP.
- Correct clue: 30 XP.
- No hint: 10 XP.
- Maximum 90 XP per case.
- Correct culprit + wrong clue: 50 XP + eligible 10 no-hint XP.
- Wrong culprit: 0 XP. Wrong attempts: no XP.
- Time does not affect XP.
- +25 XP at every 7-day consecutive solve milestone (7, 14, 21, 28...).
- Hint use removes only the 10 no-hint XP; it does not invalidate streak milestones.

## Ranks
| Rank | XP threshold |
|---|---:|
| Rookie Detective | 0 |
| Junior Detective | 150 |
| Detective | 400 |
| Senior Detective | 800 |
| Chief Inspector | 1,400 |
| Master Detective | 2,200 |
| Legendary Detective | 3,200 |

Ranks never decrease.

## Achievements (recognition only; no XP)
- First Case
- Sharp Eye
- Perfect Detective
- No Help Needed (5 no-hint solves)
- Getting Consistent (7-day streak)
- Two Weeks Strong (14-day streak)
- Month of Mystery (30-day streak)
- Case Veteran (10 cases)
- Seasoned Investigator (25 cases)
- Master of Cases (50 cases)
- First on the Scene (global first correct culprit submission for a case)

Achievements are permanent. Missed days reset current streak but never remove achievements. Achievement rewards are separate from XP; achievements award no additional XP.

## Streaks
- Based on canonical UTC release dates.
- One qualifying solve during the original 24-hour release window earns that day's streak.
- Missing a day resets current streak.
- Old cases remain playable but late completion cannot restore missed streak days or count as a solve for a past release date.
- A hint does not invalidate streak eligibility.
- Award +25 XP at each 7-day milestone.

## First on the Scene
- First valid correct culprit submission per case; exactly one global winner.
- Server-side atomic claim and server timestamp.
- Clue selection does not affect eligibility; wrong culprit is ineligible.
- No score or XP bonus.
- Permanent achievement shown in My Stats and relevant Results.
- Old-case late solvers cannot take the award.
- Simultaneous submissions resolved by authoritative server completion order.

## My Stats
Profile: Snoovatar, username, rank, total XP.

Rank progress: current rank, XP earned toward next rank, XP remaining; Legendary Detective shows complete.

Six stats: Cases Solved; Current Streak; Longest Streak; Perfect Deductions; No-Hint Solves; Average Solving Time.

Average time uses full active investigation time until correct culprit submission, including hints and wrong attempts, with intended pause when leaving/closing. Old cases count toward cases/perfect/no-hint/average but not streak. Duplicate cases count once.

Achievements appear in one simple section: earned in colour, locked muted. No categories, filters or progress bars.
