# Current update roadmap
Updated: 2026-10-11
Status: core approved release scope is implemented and automated regression passes; owner Mac/iOS device testing remains the release gate. Optional Astrology is isolated in a private browser Preview, while Dream Image work remains provider-neutral preparation only.

## Release sprint completion

- [x] Dream Patterns: prioritized Explore entry, selectable day/week/month activity, drilldowns, and malformed-data safeguards.
- [x] Dream Techniques: expanded written guides, guided practice cues, and safe outcome framing.
- [x] Meditation/visualization: offline timer, local optional ambience, silent mode, presets, and cues.
- [x] Cross-section tools: unified search, exact routing, saved items, Psychology and dictionary links.
- [x] Psychology: checkpoints, reflections, glossary, study notes, related links, and reusable learning panels.
- [x] Dictionary: cultural context, reflection prompts, keyword search, and related-symbol search links.
- [x] Launch hardening: static lint setup, voice-unavailable handling, local Expo config verification.

Browser/private-Preview user testing may proceed with synthetic inputs. Remaining before native release sign-off: the owner Mac/iOS device checklist, voice and purchase flows, persistence/relaunch checks, accessibility/layout passes, and any fixes found there.

## Decisions
- Complete the desired feature set before the owner's device-testing pass and App Store submission.
- Keep the existing GPT-4o-mini configuration. No model migration is planned.
- Keep current subscription behavior while choosing features; old multi-tier pricing proposals are not approved.
- Do not display fabricated progress, mastery percentages, or success rates.
- No additional roadmap feature is approved merely by appearing in this document.
- Defer T1–T3 (practice history, favorites, and technique discovery/troubleshooting).
- Select P1 (pattern-to-journal drilldowns) for the update.
- Select T4 as a written content-library expansion: SSILD, dream incubation, morning recall routine, and nightmare aftercare.
- Select T5 as a meditation/visualization timer with optional, cautiously framed relaxation audio; it is not a timer for the current text techniques.
- Prioritize larger backlog areas in this order: Techniques, Patterns, Community without expert Q&A, Psychology, Dictionary, Cross-section, Platform.
- Promote Dream Patterns to the third bottom-navigation tab and the first Explore card; Dictionary remains available from Explore.
- Make Dream Activity selectable by day, week, or month rather than static monthly totals.
- Defer Community, live Dream Image generation, Accounts/sync, Android completion, health integrations, and T1/T3 to a future update. Treat T2 as conditional polish after core scope is stable.
- Allow optional Astrology only in the isolated private Preview for synthetic testing. It is separate from the base Jungian analysis and remains blocked from Production by durable limiting, spending safeguards, redacted observability, and Mac/device sign-off.
- Allow Dream Image catalog preparation and provider-neutral contract testing only. Live generation remains disabled until all five documented provider gates are approved.

## Implemented baseline
Implementation is not a claim of production readiness or deployment.

| Area | Present in this checkout | Validation / remaining boundary |
| --- | --- | --- |
| Dream entry and analysis | Text input, mood selection, API integration, results | Needs final end-to-end and network-failure checks; deployed backend model not independently verified |
| Journal history | Local saved dreams, search, theme filters, result reopening | Existing-data and storage-failure regression checks remain |
| Dictionary | Symbol browsing, keyword/category search, cultural context, reflection prompts, related-symbol links, and detail screens | Personal symbol meanings remain backlog; native/device verification remains |
| Patterns | Prioritized Explore entry, day/week/month activity, symbol/theme drilldowns, and malformed-data safeguards | Advanced relationship graphs and long-term personalized summaries remain backlog |
| Psychology | Scientific, theoretical, dream-type, and cultural reading plus checkpoints, reflections, glossary, study notes, saved items, and related links | Quizzes and saved reading progress remain backlog; native/device verification remains |
| Techniques | Expanded written guides, guided steps, practice cues, completion/restart, journal shortcuts, and a separate meditation/visualization timer with optional local ambience | Saved practice history, favorites, reminders, and richer media remain backlog |
| Technique polish | Removed sample progress; theme-aware cards; list bottom spacing; explicit return to techniques | Browser checked; native/layout regression still needed |
| Voice | Native integration; availability now uses the cross-platform API instead of Android service enumeration | Code corrected; actual recording needs device validation |
| Subscriptions | RevenueCat, trial tracking, paywall and restore implementation | Purchase/restore/expiry/cancellation need device validation |
| Optional Astrology | Private provider-connected browser Preview with local profile/chart storage and capped, separate AI reflection | Production disabled; durable limiting, spend alerts, redacted observability, and Mac/device checks remain |
| Dream Image preparation | Curated scene/style preparation, consent/privacy boundaries, disabled route contract, typed progress/error/result components | No provider, live generation, delivery, persistence, Photos save, sharing, or provider-side deletion |
| Release materials | Policy files, test matrices, handoffs, and marketing drafts exist | Hosting, store configuration, owner-device execution, and final accuracy are not verified |

The approved implementation is committed and automated regression passes. This is not a native/device QA sign-off; use the [owner Mac/iOS test start](OWNER_MAC_IOS_TEST_START.md) and release checklist for the remaining hands-on gate.

Configuration snapshot: `app.json` declares version 1.0.7 / iOS build 17. These configured values do not establish the latest uploaded or installed build. The trial service specifies 3 analyses and 7 days; current store pricing must come from the configured offering, not old strategy documents.

## Recommended next candidates
Relative effort is a planning estimate, not a delivery promise. All rows are proposed and await scope selection alongside the owner's ideas.

| ID | Candidate | Effort | Why it is useful | Acceptance criteria |
| --- | --- | --- | --- | --- |
| T1 | Saved practice history | Small-medium | Makes guided practice useful across visits | Deferred |
| T2 | Technique favorites | Small | Quickly revisit preferred practices | Deferred |
| T3 | Technique discovery and troubleshooting | Small | Makes five guides easier to choose and use | Deferred |
| P1 | Pattern-to-journal drilldowns | Medium | Turns existing counts into something actionable | **Selected:** tap a symbol/theme to see matching saved dreams; open the original analysis; handle empty results |
| K1 | Psychology bookmarks | Small-medium | Save useful reading without a new backend | Bookmark article/section; saved list; survive restart; handle missing content |
| T4 | Additional text guides | Small-medium | Adds focused, written practices without requiring audio or video | Explore topics with owner |
| T5 | Meditation/visualization timer | Medium | Supports a future guided breathing, incubation, relaxation, or visualization session | Later; timer is not for reality testing or journaling. WBTB needs a separate reminder/alarm design |

P1 is selected. Existing history search and theme filters should not be rebuilt.

## Larger existing backlog
These are available ideas, not automatically deferred to a later release. The owner can pull them into this update before scope closes.

| Area | Remaining ideas | Main dependencies |
| --- | --- | --- |
| Techniques | SSILD, morning routine builder, reminders, audio/video guides, meditation, custom routines, achievements | **Highest backlog priority.** T4 means written guides such as SSILD, dream incubation, a morning recall routine, and nightmare aftercare. Media is a later layer. |
| Patterns | Emotion/theme detail analysis, custom tags, relationship graphs, long-term trends, personalized summaries | Data model, adequate journal history, interpretation design |
| Psychology | Quizzes, theory comparisons, sleep-cycle/brain visuals, reading progress, personal insights | Content design and validation; persistence |
| Dictionary | Personal symbol meanings, richer cultural context, related-symbol navigation | Content and local data model |
| Cross-section | Unified Explore search across dictionary, techniques, and Psychology | Saved-dream search, notes/bookmarks, export, and UI/device verification remain |
| Platform | Accounts, backup/sync, Android completion, health integrations | Backend/platform setup and additional testing |
| Community | Sharing, discussion, coaching, expert Q&A | **Third backlog priority.** Exclude expert Q&A for now. Begin only after deciding identity, moderation, reporting, consent, and public/private boundaries. |

Do not import old promises of success percentages, guaranteed dream outcomes, automatic personalization, or human consultations into marketing unless actually supported and delivered.

### Cross-section features, expanded
These work across two or more Explore areas rather than belonging to one feature:

| Feature | What the user sees | Why it is later |
| --- | --- | --- |
| Unified Explore search | One search field returning dictionary symbols, psychology articles, and techniques | **Implemented:** shared index and routing; saved-dream results and UI/device verification remain |
| Related content | A symbol, technique, or article links to the most relevant next reading | Needs deliberate content relationships |
| Personal notes | Private notes attached to a symbol, article, technique, or pattern | Needs a shared local-data model and editing UX |
| Shared bookmarks | One saved-items view across psychology, techniques, and dictionary | Needs common persistence and migration rules |
| Export | User exports their journal, patterns, or selected insights | Needs format, privacy, and sharing decisions |

## Owner idea queue

### A1 — Astrology profile and dream context — selected for private Preview only
Concept: collect the user's birth date, birth time, and birthplace to calculate a natal chart; show the chart and an AI-generated reflection that may reference saved dream themes. A full name is not necessary for chart calculation and should not be collected for this feature unless a separate user-facing purpose exists.

Delivered private-Preview boundary: optional local birth profile, server-side chart calculation through the isolated Preview, readable chart summary, and a separately requested capped archetypal reflection based only on the calculated chart. Dream journals are not read or sent, and the feature makes no predictive, medical, or diagnostic claim.

Remaining decision: whether Production rollout is ever approved after durable limiting, spend protection, redacted observability, provider review, and Mac/device verification. The existing private Preview does not replace `dream-analysis`.

Research note: public providers currently advertise natal-chart APIs, including [CosmyDay](https://cosmyday.com/api-docs) and [Navamsha](https://www.navamsha.in/birth-chart-api). A production integration still needs a direct review of limits, terms, reliability, and privacy before selection.

### A2 — Dream image generation — preparation foundation only
Concept: generate an original visual interpretation of a user's saved dream. Proposed allowance: up to five completed generations per calendar month for every subscriber, with no automatic regeneration on refresh.

Current delivered boundary: provider-neutral preparation using application-owned curated scenes and styles, explicit consent/privacy copy, strict exclusion of raw dream text and the local dream id from the proxy payload, stable disabled/unconfigured errors, and reusable progress/error/result components. No provider is selected or called.

Cost note: image pricing is based on generated image tokens, so there is no dependable flat per-image cost without fixing model, size, quality, and sampling real requests. OpenAI currently lists image-output rates of $15/1M tokens for GPT Image 2 and $30/1M tokens for GPT Image 2.5 variants. Five images means five times the measured per-image cost, plus a small text-prompt cost. We should choose the visual target, make a controlled test generation, record the API-reported usage, then set allowance and subscription economics from observed cost rather than a guessed rate. [OpenAI pricing](https://platform.openai.com/pricing)

For each idea capture:
- Desired user experience and problem solved.
- Smallest useful version for this update.
- Existing screens/data it can reuse.
- Extra API cost, permissions, media, or backend dependencies.
- Acceptance criteria and decision: selected / explore / park.

## Scope gate
- [x] Reconcile current implementation with historical plans.
- [x] Collect owner's initial ideas and priorities.
- [x] Record A1 as private-Preview-only and A2 as provider-neutral preparation-only; neither is approved for Production enablement.
- [x] Implement the approved boundaries and pass local checks (22 suites / 135 tests, TypeScript, and whitespace validation).
- [x] Freeze implementation scope for owner device testing; only verified defects may change the candidate.
- [ ] Complete the [release checklist](RELEASE_CHECKLIST.md).
