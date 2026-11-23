# Master Product Requirements — Crack The Case

## 1. Product identity
- **Name:** Crack The Case
- **Tagline:** A New Mystery Every Day.
- Character-driven daily detective game for Reddit.
- One shared daily mystery for players across participating subreddit installations.
- Typical play session: 5–10 minutes.
- Approachable, polished, fair and replayable through varied daily mysteries.

## 2. Core gameplay loop
1. Player opens the daily interactive Reddit post and lands on Home.
2. Player selects Solve Case or Resume Case.
3. Player reads the case introduction.
4. Player reviews all clues on a reusable detective board and all suspect statements.
5. Player selects one culprit and one decisive clue.
6. Player submits a verdict.
7. An incorrect culprit produces a non-revealing Wrong Choice state and unlimited retries.
8. A correct culprit completes the case immediately and displays Results, whether or not the decisive clue selection was correct.

This is not exploration, interactive fiction, hidden-object gameplay or traditional trivia.

## 3. Scope and exclusions
### Included
- Case introduction; reusable static detective board with clue stickers; suspect statement cards.
- One optional authored hint per case.
- Culprit and decisive-clue selection; verdict, Wrong Choice and Results states.
- Home, leaderboards, My Stats and Help.
- Daily Reddit interactive posts, Reddit discussion and spoiler-free result sharing.
- Persistent player progress and global progression, subject to technical and policy feasibility.

### Excluded
- Scene exploration, hotspots, object inspection or evidence collection.
- Interviews, dialogue trees, journals, inventories or case archives.
- Dragging, connecting or moving clues; hidden clues; multiple locations.
- Friends/community leaderboards; replay history; solution archive; charts/graphs.
- Forced sharing, commenting or notification prompts.

## 4. Case structure and content standards
- Initial set: 40 cases; 12 Easy, 20 Standard, 8 Challenging.
- Easy still requires deduction; Standard compares statements and clues; Challenging uses connected deductions.
- Exactly one defensible culprit and one decisive clue per case.
- All necessary information is immediately available. No outside knowledge or unstated assumptions.
- Maximum five clues per case; suggested counts: Easy 3, Standard 4, Challenging 5.
- All clues visible from the beginning.
- At least three suspects; all statements directly readable.
- Varied themes and mechanisms. Avoid overusing murder, theft and missing-object plots.
- Non-graphic incidents only; no gore or operational instructions for harmful acts.
- Complete initial case set: `04_Case_Content/Crack_The_Case_40_Daily_Cases.md`.

## 5. Visual identity
- Warm cream background `#FFF5E6`
- Deep teal primary `#087E78`
- Coral `#F07868`; mustard `#E9B949`; sky blue `#78B9DF`
- Main text Deep Forest Teal `#173B3A`; secondary text Slate Green `#455653`; white inverse text
- Friendly cartoon detective protagonist; character-driven identity.
- Polished illustrations, clean rounded sans-serif, subtle animations.
- Clear, legible mobile-first layouts.

## 6. Home
- Header: logo/name, detective portrait, compact Help access.
- Player info: rank and current streak only. Total cases solved belongs in My Stats.
- Today's Case card: TODAY'S CASE, case number, title, difficulty, short intriguing description, small case visual, time until reset.
- Main CTA: Solve Case (not started); Resume Case (unfinished); View Results (completed, only after completion).
- Quick navigation: Leaderboard (Daily default), My Stats, Help.
- Subtle Reddit attribution/hosting subreddit.
- No persistent investigation header/footer on Home.
- Old posts remain playable. Unfinished progress resumes; completed posts show results; untouched old cases can be started.

## 7. Case introduction
One concise screen with case title, difficulty, case number, incident introduction, what happened/when/where, relevant background, general detective commentary, instructions and Begin Investigation. All information immediately accessible. No multi-page introduction or unnecessary scrolling. Timer starts only when Begin Investigation is pressed.

## 8. Investigation interface
- All active investigation pages except Home share persistent header and footer.
- Header: short case title horizontally centered; difficulty; elapsed investigation time; Hint button opens modal.
- Footer order: Home, Case, Suspects, Clues, Verdict.
- One page visible at a time; no sidebars.
- Freely navigate; no locked pages or mandatory clue/suspect viewing.
- Preserve opened clues, hint state, verdict selections and investigation progress.
- Switching pages does not reset timer. Header title remains centered regardless of other elements.

## 9. Clues
- Label is **Clues**, not Evidence.
- Reusable static detective board; stickers are presentational, not draggable gameplay objects.
- Same board template; sticker content/arrangement may vary.
- Types may include photographs, notes, documents/receipts, maps/location records and message screenshots.
- Tapping a sticker opens an enlarged readable modal/bottom sheet.
- All clues visible from start; maximum five per case.
- Exactly one decisive clue. Others contextualize timeline, eliminate alternatives or expose contradictions.
- Decisive clue is objectively strongest and necessary to establish the accusation.
- Each clue has title, full description, type/icon and decisive-clue identifier.

## 10. Suspects
Vertical cards: avatar, full name, occupation/relationship and complete statement. No profiles, interviews or dialogue trees. All visible from start and revisitable. No visual suspicion cues.

## 11. Hint
- Exactly one optional hint per case, available anytime, no cooldown.
- Modal, not a separate page; closing returns to current page. Button indicates used.
- Authored hint guides reasoning but does not name culprit or decisive clue and introduces no new evidence.
- Using hint removes only the 10-point unassisted score component and 10 unassisted XP.
- No effect on clue/culprit points, solve validity or streak. Timer continues while modal is open.
- No-hint achievement requires no hint use.

## 12. Verdict
- Short heading and prompt.
- Select one culprit from all suspects and one decisive clue from all clues; neither preselected.
- Selection highlighted and changeable.
- Submit disabled until both selections are made.
- Player may revisit Case, Suspects and Clues before submitting; selections persist.
- No correctness hints or confirmation popup. Submission is irreversible.
- Server validates both selections.

## 13. Wrong Choice
- Appears when culprit is incorrect.
- Heading: WRONG CHOICE. Message: “Not quite! Try again.” Prominent Retry.
- Never reveal correct culprit, clue, solution or proximity.
- No score, XP, completion or streak credit.
- Unlimited retries; cases do not expire.
- Retry returns to Verdict and clears both selections.
- Timer, hint state, viewed clues/statements and investigation progress persist.
- Footer navigation remains available; friendly reaction, no harsh failure animation.

## 14. Results
- Correct culprit completes immediately, regardless of clue selection. No retry to correct clue.
- One consolidated screen: CASE SOLVED!, case title, concise congratulations and detective reaction.
- Final daily score prominent; no score breakdown.
- Compact career progress: XP earned, current rank, progress to next rank, updated streak and newly earned achievement.
- Full solution visible immediately: culprit, decisive clue, evidence support and relevant contradictions; motive only if relevant.
- Current daily leaderboard position if available; exact position even outside top 100.
- Actions: Daily Leaderboard, General Leaderboard, My Stats, Share Result (spoiler-free), Discuss Case (Reddit comments), Home.
- No forced sharing/commenting, multiple popups or extra end screens. Scroll as needed; restrained animation.
- Correct culprit + wrong clue earns 40 culprit points, 0 clue points, plus eligible time and unassisted points. Counts as solved and contributes to streak/career.
- Wrong culprit never receives Results or solution.

## 15. Daily Reddit post system
- One new interactive post per day in each subreddit where installed.
- Same mystery across all participating subreddits.
- Sequential permanent numbering: Case #1, #2, #3...
- Post identity exactly:
  `CASE #1`
  `The Midnight Alibi`
- No hashtags, difficulty, date or extra branding in post identity.
- Automatically pin newest and unpin previous if permissions allow.
- Older posts remain in feed and playable.
- Posts created by app account; no manual moderator post creation.
- Each installation has its own Reddit post ID and discussion thread, but case identity and release schedule are shared.
- Daily reset at 00:00 UTC. Scheduler timing may be imperfect; canonical release date/case assignment must not depend on exact post creation second.
- Original 24-hour release window determines streak eligibility. Case remains playable indefinitely.
- Late solve of old case earns score/XP once but cannot restore a missed streak or earn that missed day's streak credit.
- Each case retains content/solution, per-case leaderboard, global First Solver record and player completion records.

## 16. Player identity and global career
- One global career across participating subreddit installations.
- Reddit username and Snoovatar; no separate game account.
- XP, rank, achievements, stats and streaks are global.
- Completing a case in one subreddit prevents duplicate score/XP in another.
- Internal identity should prefer stable Reddit user ID over mutable username, subject to Reddit policy.
- Logged-out behaviour must be designed and persistent career actions gated appropriately.
- Global storage and external account-linked service policy must be verified before implementation.

## 17. Leaderboards
### Daily
- One global leaderboard per case; top 100 displayed.
- Current player highlighted if in top 100; exact position if outside top 100.
- Sort: score, shortest solving time, earliest correct submission.
### General
- Global cumulative raw-score sum across all cases; no weighting, multipliers or averaging.
- Top 100 displayed; exact position if outside top 100.
- Sort: cumulative score, most Perfect Deductions, lowest total solving time, earliest to reach score.
- No friends or community leaderboards.
- Redis is isolated per subreddit installation; global ranking requires a policy-compliant shared architecture.

## 18. Reddit-native features
- Discuss Case opens comments on the specific interactive post.
- Spoiler reminder when opening discussion: “Keep the mystery alive. Avoid revealing the culprit or decisive clue for players who haven't solved the case.”
- No auto-comments.
- Share Result card: branding, case title, daily score, time, streak if relevant, newly earned achievement. Never reveal culprit, decisive clue or solution. Preview and explicit action.
- Flair optional, permission-dependent; never overwrite user flair.
- Devvit Journeys requires allowlisting; track meaningful explicit actions, not passive page views.
- Notifications optional, disabled by default, explicit opt-in; one notification when a new case is published, no later reminder. Native Reddit notification API only, subject to gated beta/approval. If unavailable, no nonfunctional toggle or substitute push system.

## 19. Timer
- Starts at Begin Investigation; includes wrong attempts and hint use; stops on successful solve.
- Intended to pause when leaving/closing the post and resume on return.
- Time score uses Begin Investigation to first correct culprit submission.
- Pause/resume reliability must be tested; do not trust client elapsed time as authoritative.
- Average solving time in My Stats uses the same active-time definition.

## 20. Product rules and edge cases
- Old cases remain playable indefinitely.
- Old-case completion counts toward total cases, perfect deductions, no-hint solves and average time, but not streak.
- Duplicate case completion across installations is credited once globally.
- Wrong attempts award no XP or score.
- Hint state and progress persist.
- Achievement unlocks are permanent; missed days reset current streak but never remove achievements.
- No replay or duplicate rewards after completion.
- Back from My Stats/Help returns to previous screen; investigation state remains unaffected.
- Leaderboard tabs preserve position; back returns to previous screen.
