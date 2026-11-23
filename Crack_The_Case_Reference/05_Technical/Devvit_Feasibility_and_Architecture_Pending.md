# Technical Feasibility & Architecture — Pending Verification

This document records requirements and known uncertainty. It is not an approved implementation architecture.

## Required research sources
- Official Devvit documentation: https://developers.reddit.com/docs/
- Official Devvit AI guide: https://developers.reddit.com/docs/guides/ai
- Documentation index: https://developers.reddit.com/docs/llms.txt
- Full documentation: https://developers.reddit.com/docs/llms-full.txt
- Official Devvit MCP search tool (`devvit_search`).
- Official `reddit/devvit-skills` repository and `devvit-docs` skill.
- Actual installed Devvit SDK and CLI versions in the project.

## Critical unresolved questions
1. Can one global career be maintained across subreddit installations using Reddit identity without violating Reddit's account-linked services rules?
2. Is a shared external database permissible for pseudonymous player progression, global leaderboards and duplicate prevention? What opt-in, unlinking, anonymization and deletion requirements apply?
3. How can account deletion be detected and identifying data removed within Reddit's required timeframe?
4. What is the authoritative authentication model for Devvit Web server endpoints and how is the current Reddit user securely bound to mutations?
5. Can First on the Scene be claimed atomically across installations with a permitted shared backend?
6. How reliable is pause-on-leave timer behaviour in the Reddit client? What heartbeat/inactivity semantics are possible?
7. What are scheduler guarantees, execution delays, retry behaviour and idempotency requirements?
8. Which permissions are needed to submit interactive posts, sticky/unsticky posts, read identity/Snoovatar, access comments and use notifications?
9. Are Reddit notifications available to this app, or is the API still gated/allowlisted?
10. What are the current Journeys allowlisting and event requirements?

## Initial architecture considerations — not decisions
- Devvit Redis is isolated per subreddit installation; it cannot alone provide a global leaderboard.
- Scheduled jobs run per installation; shared canonical UTC case assignment and idempotent post creation are required.
- Server-side validation is mandatory for verdicts, score, XP, completion, streaks and First Solver.
- Client time and client-submitted score must not be trusted.
- A user may open a post while logged out; persistent career actions need an explicit logged-out state.
- External HTTP Fetch availability does not by itself establish that a proposed external data service complies with Reddit policy.
- Pinning depends on moderator permissions and should be tested in an authorized test subreddit.
- Native notifications must not be presented as available until access is verified.
- Devvit Journeys should track meaningful explicit actions, not passive page views.

## Required feasibility matrix format
For every feature provide:
- Classification: directly supported / supported with implementation / external infrastructure / permission or approval required / uncertain / unsupported.
- Official documentation references.
- Relevant API, SDK component, configuration and permission.
- Runtime, quota and policy constraints.
- Security and privacy implications.
- Recommended implementation approach and alternatives.
- Concrete verification test.
- Open questions and confidence level.

## Feature groups to assess
Daily post creation and scheduling; numbering and cross-installation consistency; sticky management; Reddit identity and Snoovatar; logged-out behaviour; persistence; timer pause/resume; clue/suspect/verdict/results UI; server-side validation; scoring and progression; First Solver; local and global leaderboards; Redis and shared backend; discussion; spoiler-free sharing; flair; Journeys; notifications; deletion and retention.

## Stop conditions
Do not implement global career, cross-subreddit leaderboards, external identity-linked storage, notifications or account deletion handling until relevant policy and technical questions are answered. Escalate uncertain Reddit policy interpretations for explicit clarification rather than guessing.
