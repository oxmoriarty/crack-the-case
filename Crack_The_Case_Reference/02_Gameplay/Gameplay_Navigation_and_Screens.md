# Gameplay, Navigation & Screen Specification

## Navigation destinations
Home; Active Investigation (Case, Suspects, Clues, Verdict); Wrong Choice; Results; Leaderboards (Daily and General tabs); My Stats; Help.

No Case Archive, expired-case screen, friends leaderboard or separate solution archive.

## Home actions
- Solve Case: starts a new investigation and opens Case introduction.
- Resume Case: resumes unfinished investigation at last visited page.
- View Results: shown only when current case is completed.
- Leaderboard: opens Daily tab by default.
- My Stats and Help open their destinations.

## Investigation navigation
- Footer order: Home, Case, Suspects, Clues, Verdict.
- Navigation is immediate and freely available.
- Player may revisit pages before verdict submission.
- Preserve selected culprit/clue while navigating.
- Home returns to Home; unfinished investigation remains resumable.
- Persistent investigation header/footer is absent on Home.

## Verdict state machine
- No selection by default.
- Submit disabled until one suspect and one clue are selected.
- Server validates both.
- Wrong culprit -> Wrong Choice.
- Correct culprit -> Results, whether clue is correct or not.
- Wrong Choice Retry clears both selections, preserves timer/hint/progress and returns to Verdict.
- Completed cases cannot be submitted again for rewards.

## Results actions
Daily Leaderboard; General Leaderboard; My Stats; Share Result (spoiler-free preview and explicit action); Discuss Case (open current post comments after spoiler reminder); Home.

## Help
One vertically scrollable page with five sections: How to Play; Understanding Clues; Hints; Scoring and Streaks; Daily Cases. No tabs or accordions. Accessible from Home and onboarding.

## Onboarding
- No welcome/register/tutorial flow; first visit begins at normal Home.
- Contextual detective hints on first visit to Case, Clues, Suspects and Verdict.
- Short speech bubbles, highlight relevant UI, show once.
- Got it/dismiss and Skip Tutorial from beginning.
- Never lock gameplay; no repeat; Help remains available.
- Tutorial time counts toward timer once investigation has begun.

## Leaderboard headers
Daily: “Daily Leaderboard” at left and total players completed at far right. General: similar layout. No case title/date in leaderboard header.
