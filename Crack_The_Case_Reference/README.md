# Crack The Case — Reference Pack

**Game:** Crack The Case  
**Tagline:** A New Mystery Every Day  
**Platform:** Reddit, using Devvit  
**Starter project:** Existing Devvit Vibe Coding template  
**Status:** Product requirements consolidated; technical feasibility and architecture remain subject to official Devvit verification.

## How to use this pack
Read `01_Product/Master_Product_Requirements.md` first, then the gameplay and progression specifications. The 40 cases are in `04_Case_Content/Crack_The_Case_40_Daily_Cases.md`.

This pack distinguishes approved product requirements from pending technical decisions. Do not silently change approved requirements to fit an assumed implementation. If a platform limitation conflicts with a requirement, document the conflict and propose alternatives for review.

## Folder map
- `01_Product/` — Master product requirements and visual identity.
- `02_Gameplay/` — Gameplay, navigation, screens and interaction rules.
- `03_Progression/` — Scoring, XP, ranks, achievements, streaks and leaderboards.
- `04_Case_Content/` — Case-writing rules, all 40 mysteries and case QA.
- `05_Technical/` — Technical feasibility checklist and unresolved decisions.
- `06_Testing/` — Product acceptance criteria and test coverage checklist.

## Implementation guardrails
1. Do not begin implementation until the Devvit feasibility review and architecture are approved.
2. Do not invent Devvit APIs or permissions. Cite official documentation.
3. Do not assume Redis is shared between subreddit installations.
4. Do not assume external account-linked storage is permitted simply because HTTP Fetch exists.
5. Server-side code must validate verdicts, score, XP, completion and First Solver claims.
6. A player can receive credit for a given case only once globally, if a compliant global architecture is approved.
7. Preserve all case answers and decisive clues. Case content is data, separate from game engine logic.
8. Any case revision must preserve one unambiguous, evidence-based solution.
