# Product Acceptance & Test Checklist

## Case integrity
- [ ] Exactly one culprit per case.
- [ ] Exactly one decisive clue per case.
- [ ] Solvable using only the case introduction, clues and suspect statements.
- [ ] No outside knowledge or unstated assumptions.
- [ ] Hint guides reasoning without naming culprit or decisive clue.
- [ ] Wrong culprit never reveals solution or proximity.
- [ ] Correct culprit completes immediately, even with wrong clue.
- [ ] All clues and statements available from the start.

## Difficulty and content
- [ ] 12 Easy, 20 Standard, 8 Challenging.
- [ ] Easy still requires deduction.
- [ ] Standard requires comparison of statements/clues.
- [ ] Challenging uses connected deductions without arbitrary leaps.
- [ ] Themes and mechanisms are varied.
- [ ] No graphic violence or harmful operational instruction.

## Gameplay
- [ ] Begin Investigation starts timer.
- [ ] Navigation preserves investigation state.
- [ ] Hint use is recorded once and persists.
- [ ] Verdict requires one suspect and one clue.
- [ ] Wrong Choice retry clears selections but preserves timer and hint state.
- [ ] Completed case cannot earn duplicate rewards.

## Progression
- [ ] Score maximum is 100.
- [ ] XP maximum is 90 per case.
- [ ] Achievements award no XP.
- [ ] Ranks never decrease.
- [ ] Streak uses canonical UTC release date.
- [ ] Old-case solves do not restore missed streaks.
- [ ] Duplicate case credit is prevented globally, if global architecture is approved.

## Reddit and technical verification
- [ ] All Devvit APIs verified against installed SDK and official docs.
- [ ] Permissions and allowlisting verified in a test subreddit.
- [ ] Scheduler idempotency tested.
- [ ] Server-side verdict and reward validation tested.
- [ ] Global storage policy approved before external implementation.
- [ ] Timer tested under navigation, backgrounding, reload and connection loss.
- [ ] Deletion/retention obligations implemented and tested.
