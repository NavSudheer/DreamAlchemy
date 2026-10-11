# Dream Alchemy collaboration board

This file is the source of truth for Codex and Gemini during the next-build sprint.
Read it before starting work and update the assigned handoff before and after changes.

## Rules

1. Work only in the files assigned to you. Request a handoff before changing another area.
2. Do not rewrite or discard another agent's uncommitted work.
3. Run the focused validation named in the handoff, then `npx tsc --noEmit` before marking work done.
4. Keep user data local unless a task explicitly introduces a backend.
5. Do not add claims that audio, techniques, or patterns guarantee lucid dreams, sleep outcomes, or medical benefits.
6. Keep Gemini's queue non-empty: when a Gemini handoff is reviewed and accepted, create its next isolated, low-risk handoff before closing the check-in.
7. On every wake-up or user-triggered work cycle: finish and verify the active task, commit it, review Gemini's completed work, update all handoff statuses, assign one next task to Gemini and one next task to Codex, then begin the next Codex task before responding.

## Current release scope

- Include: Patterns dashboard and drilldowns, Patterns navigation priority, expanded written techniques, relaxation/visualization timer with cautiously framed audio, psychology/dictionary/cross-section improvements, and launch hardening.
- Exclude: community, astrology, dream image generation, accounts/sync, Android completion, health integrations, and T1/T3.
- Conditional: T2 (technique favorites) only after core scope is stable.

## Next-build scope (post-deployment)

### Dream Images

**Goal:** Let a dreamer optionally turn the text they wrote into a clearly labelled, private-to-the-device visual reflection. The image must be an interpretation-inspired scene, not a claim that it depicts a dream's objective meaning.

1. **Foundation:** introduce a provider-neutral image-generation client, typed request/result/error contracts, local AsyncStorage metadata, and an opt-in consent/cost notice. Do not put provider credentials in the app bundle.
2. **Dream flow:** add a "Create dream image" action only after a successful saved analysis; allow regenerate, save to the dream record, share, and delete. Preserve a text-only experience if generation is unavailable.
3. **Safety and release:** use a server-side proxy, moderated prompt construction that excludes personal data by default, retries/errors, loading states, accessibility text, image-cache limits, and an explicit generated-art disclosure.

**Release gate:** server-side authenticated image endpoint, cost/rate-limit policy, privacy-policy update, iOS photo-library permission copy if exporting, and real-device verification of generation, failure, deletion, and offline behavior.

### Astrology

**Goal:** Add an optional, reflective astrology lens beside—not inside—the existing Jungian analysis. It should never present astrology as factual, predictive, medical, or authoritative.

1. **Foundation:** build a birth-profile form (date, optional time, location/timezone), explicit consent and delete controls, client-side validation, and a provider-neutral chart-calculation interface. Collect the minimum data; time and location remain optional and their precision must be explained.
2. **Experience:** create a dedicated Astrology destination with chart summary, placements/aspects, uncertainty notes for incomplete birth data, and an optional "reflect on this dream" prompt that is visually and semantically separate from the base analysis.
3. **Safety and release:** store profile locally by default, never send it to dream analysis without a separate opt-in, cite/calibrate source data if using an ephemeris provider, add non-predictive disclaimers, and test timezone/DST, missing birth time, data deletion, and accessibility.

**Release gate:** agreed ephemeris/provider and licensing, a reviewed privacy disclosure, timezone/DST test matrix, and content review for non-predictive language.

## Handoffs

| ID | From -> To | Owned files | Task | Status |
| --- | --- | --- | --- | --- |
| H-001 | Codex -> Gemini | `src/components/dream-techniques/techniques.ts` | Add four evidence-conscious written guides: SSILD, dream incubation, morning recall routine, and nightmare aftercare. Preserve the existing `Technique` contract and do not alter UI files. | done `1fe03d0` |
| H-002 | Codex -> Codex | `src/components/DreamPatterns.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/explore.tsx` | Add day/week/month activity selection, promote Patterns to tab three, and show Patterns first in Explore. | done `1fe03d0` |
| H-003 | Codex -> Gemini | `src/data/dreamSymbols.ts` | Audit and improve internal `relatedSymbols` links so every reference points to an existing symbol id; add only useful, non-duplicative relationships. | done `cbc8b2d` |
| H-004 | Codex -> Gemini | new `src/data/psychologyCheckpoints.ts` only | Create a typed, content-only question bank for future Psychology knowledge checks across science, theories, dream types, and culture. | done `6421e80` |
| H-005 | Codex -> Gemini | new `src/data/psychologyReflectionPrompts.ts` only | Create a typed, content-only set of 16 reflection prompts across science, theories, dream types, and culture. | done `6421e80` |
| H-006 | Codex -> Gemini | new `src/data/dictionaryContexts.ts` only | Create a typed, content-only cultural-context supplement for existing dictionary symbol ids. | done `216fd39` |
| H-007 | Codex -> Gemini | new `src/data/psychologyArticleConnections.ts` only | Create a typed, content-only map from the four Psychology hub categories to 3–4 relevant existing dictionary symbol IDs and written technique IDs. Use only IDs that exist today, keep relationships purposeful and non-duplicative, and add query helpers. Do not alter UI, routes, or existing data files. | done `9b6e288` |
| H-008 | Codex -> Gemini | new `src/data/dictionaryReflectionPrompts.ts` only | Create a typed, content-only set of concise reflection prompts for every existing dictionary symbol ID. Include lookup helpers; keep the text exploratory and do not alter UI, routes, or existing data. | done (pending integration) |
| H-009 | Codex -> Codex | new `src/services/savedItems.ts` only | Build the typed AsyncStorage service for shared saved dictionary, technique, and Psychology items. Keep it UI-independent and validate it with TypeScript. | done `9b6e288` |
| H-010 | Codex -> Codex | new `src/components/ui/SaveItemButton.tsx`, `app/symbol/[id].tsx`, `app/(tabs)/technique/[id].tsx`, `src/components/psychology/*.tsx` | Add a consistent save control to dictionary, technique, and Psychology detail screens using H-009. Keep each screen's existing behavior intact. | done `e1367de` |
| H-011 | Codex -> Codex | new `app/(tabs)/saved.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/explore.tsx` | Add a saved-items destination that resolves and routes saved dictionary, technique, and Psychology items from H-009. | done `0a9927d` |
| H-013 | Codex -> Codex | `app/(tabs)/explore.tsx` | Route each unified Explore search result to its exact dictionary, technique, or Psychology detail destination. | done (committing) |
| H-014 | Codex -> Codex | `app/symbol/[id].tsx` | Surface the reviewed dictionary cultural-context and reflection-prompt content on symbol detail screens. | done `f4c68f5` |
| H-012 | Codex -> Gemini | new `src/data/techniqueConnections.ts` only | Create a typed, content-only map for every existing technique ID to 2–4 purposeful existing dictionary symbol IDs and Psychology category IDs. Include lookup helpers. Do not alter UI, routes, or existing data files. | done `f4c68f5` |
| H-016 | Codex -> Codex | new `src/components/psychology/PsychologyLearningPanel.tsx`, `src/components/psychology/*.tsx` | Add a reusable Psychology learning panel that presents existing reflection prompts, knowledge checkpoints, and relevant cross-section links on category screens. | done (committing) |
| H-015 | Codex -> Gemini | new `src/data/psychologyGlossary.ts` only | Create a typed, content-only glossary of 15–20 clear terms already used in Psychology screens and their supporting data. Include category tags and lookup helpers. Do not alter UI, routes, or existing data files. | reviewed, accepted (committing) |
| H-017 | Codex -> Gemini | new `src/data/meditationTimerPresets.ts` only | Create a typed, content-only set of 4–6 gentle meditation/visualization timer presets for the upcoming timer: stable id, title, duration in seconds, short description, cue labels, and optional safe audio ambience key. Keep language non-medical and do not claim sleep, lucid-dream, or health outcomes. Do not alter UI, routes, audio, or existing data files. | reviewed, accepted (committing) |
| H-018 | Codex -> Codex | `src/components/psychology/PsychologyLearningPanel.tsx`, `src/components/psychology/*.tsx` | Add a concise, category-filtered glossary section to the reusable Psychology learning panel using H-015, with no new routes or storage. | done (committing) |
| H-019 | Codex -> Codex | `src/components/dream-techniques/MeditationTimer.tsx`, `app/(tabs)/explore.tsx` | Harden the existing release meditation/visualization timer copy and optional local ambience controls so the feature remains offline, non-medical, and usable without audio. | done (committing) |
| H-020 | Codex -> Codex | `src/components/DreamPatterns.tsx`, supporting local helpers only | Audit the Patterns dashboard for empty-state, malformed local data, and date-range edge cases; fix any release-blocking handling and keep personal data local. | done (committing) |
| H-021 | Codex -> Codex | `src/data/exploreSearch.ts`, `app/(tabs)/explore.tsx`, related content resolver only | Harden unified Explore search for whitespace, duplicate results, and unavailable targets; keep result routing exact and local. | done (committing) |
| H-022 | Codex -> Codex | launch configuration and affected components only | Run release static checks, investigate any launch-blocking warnings or errors, and apply focused fixes that do not broaden release scope. | done (committing) |
| H-023 | Codex -> Codex | `src/components/dream-techniques/MeditationTimer.tsx`, `src/data/meditationTimerPresets.ts` after Gemini handoff | Integrate the reviewed preset data into the offline timer and replace hard-coded duration choices with the release preset selection. | done (committing) |
| H-024 | Codex -> Codex | `app.json`, `package.json`, launch configuration only | Audit iOS launch configuration and Expo package health for Mac-device testing; fix scoped release blockers only. | done (committing; `expo config --type public` passes locally; `expo-doctor` remains network-blocked) |
| H-025 | Codex -> Gemini | new `src/data/techniquePracticeCues.ts` only | Create a typed, content-only set of optional cue lines for each existing written technique ID. Each cue must be brief, gentle, and non-guaranteeing; include lookup helpers. Do not alter UI, timer, routes, or existing data files. | reviewed, accepted (committing) |
| H-026 | Codex -> Codex | `src/services/voiceRecognition.ts`, affected UI only if needed | Audit voice-recognition lifecycle and permission failure handling for iOS launch reliability; apply only a focused bug fix if warranted. | done (committing) |
| H-027 | Codex -> Codex | `app/(tabs)/technique/[id].tsx`, `src/data/techniquePracticeCues.ts` after Gemini handoff | Integrate reviewed optional practice cues into technique detail screens without changing technique outcomes or persistence. | done (committing) |
| H-028 | Codex -> Gemini | new `src/data/dictionarySearchKeywords.ts` only | Create a typed, content-only set of concise search keywords for every existing dictionary symbol ID, with lookup helpers. Use only neutral terms grounded in the existing symbol descriptions; do not alter UI or existing data. | done `f20875b` |
| H-029 | Codex -> Gemini | new `src/data/psychologyStudyNotes.ts` only | Revise the delivered study notes to remove medical/efficacy claims and dream-outcome framing. Keep claims observational, educational, and non-diagnostic; retain the typed contract and helpers. | reviewed, accepted (committing) |
| H-030 | Codex -> Gemini | new `src/data/dictionaryRelatedSearches.ts` only | Create a typed, content-only set of 2–3 neutral related-search suggestions for every existing dictionary symbol ID, using only existing symbol IDs. Include lookup helpers; do not alter UI or existing data. | reviewed, accepted (committing) |
| H-031 | Codex -> Codex | `app/symbol/[id].tsx`, `src/data/dictionaryRelatedSearches.ts` | Review H-030 and add an accessible related-search section to dictionary symbol detail screens with exact symbol routing. | done (committing) |
| H-032 | Codex -> Codex | `docs/`, integration boundary only | Establish the next-build feature contracts and sequencing for Dream Images and Astrology; keep existing release flows untouched. | done `9a36af8` |
| H-033 | Codex -> Antigravity | new `src/types/astrology.ts`, new `src/services/astrology.ts` only | Create provider-neutral, UI-free TypeScript contracts for optional local birth profiles, chart results, validation, and deletion-safe storage boundaries. Do not calculate charts, add a provider, collect user data, modify existing types, UI, routes, or storage. Include focused unit tests if the project test setup supports them; otherwise validate with `npx tsc --noEmit`. | done (pending commit) |
| H-034 | Codex -> Codex | new `src/types/dreamImage.ts`, new `src/services/dreamImage.ts` only | Create a provider-neutral, UI-free client contract for an optional Dream Images server proxy. Accept only a curated visual reflection prompt (not raw dream text), expose unavailable/error states, and do not add a provider, endpoint, UI, storage, or credentials. | done (pending commit) |
| H-035 | Codex -> Antigravity | new `src/services/__tests__/astrology.test.ts` only | Add focused Jest coverage for the provider-neutral Astrology validation and deletion helpers: valid/minimal profile, leap date, future date, partial time, timezone-without-time, invalid timezone, location length, and store deletion success/failure. Do not alter feature files, UI, routes, storage implementation, or add an astrology provider. | done `f1dd428` |
| H-036 | Codex -> Antigravity | new `src/data/dreamImagePromptTemplates.ts` only | Create a typed, content-only set of 6–8 optional visual-reflection prompt templates. Each must be abstract, non-predictive, and explicitly avoid raw dream text; include lookup helpers. Do not alter UI, providers, routes, storage, or credentials. | done `919675e` |
| H-037 | Codex -> Codex | `src/services/dreamImage.ts`, supporting tests only | Review and add focused tests for the provider-neutral Dream Images contract, preserving its no-provider/no-raw-dream-text boundary. | done `919675e` |
| H-038 | Codex -> Antigravity | new `src/data/astrologyReflectionPrompts.ts` only | Create a typed, content-only set of optional, non-predictive astrology reflection prompts. Make no calculations or claims; do not alter UI, providers, routes, or storage. | done `3e76ff3` |
| H-039 | Codex -> Codex | `src/services/astrology.ts`, supporting tests only | Add focused contract tests for astrology’s provider-neutral boundaries and non-predictive result shape; do not add a calculation provider or UI. | done `a7c749f` |
| H-040 | Codex -> Antigravity | new `src/data/dreamImageStyleMetadata.ts` only | Create typed, content-only labels and accessibility descriptions for the existing Dream Image styles. Keep wording artistic, optional, and non-interpretive; no UI, provider, storage, or credential changes. | done `f3acc0d` |
| H-041 | Codex -> Codex | `api/astrology-chart.js`, `api/astrology-reflection.js`, `src/services/astrologyRemote.ts`, `src/services/astrologyStorage.ts`, `src/types/astrology.ts`, tests and setup docs | Implement the approved stateless Vercel hybrid: server-held provider/OpenAI keys, explicit consent, compact capped AI reflection, and local-only profile/chart/reflection storage. | done (committing) |
| H-042 | Codex -> Codex | new optional Astrology route/components, Explore entry, existing H-041 services only | Build the explicit opt-in local Astrology UI without mixing astrology into base Jungian dream analysis. | done (committing) |
| H-043 | Codex -> Codex | Astrology Vercel routes, provider adapter, focused tests only | Harden the optional Astrology server boundary with disabled-by-default rollout controls and endpoint/provider response contract tests. | done (committing) |
| H-044 | Codex -> Antigravity | new `src/data/astrologyPlacementGlossary.ts` only | Create typed, content-only, non-predictive glossary entries for the chart bodies and zodiac signs surfaced by the optional Astrology result. Include lookup helpers; do not alter UI, routes, services, providers, storage, or credentials. | done `71c2223` |
| H-045 | Codex -> Codex | optional Astrology UI/services, test and setup docs only | Run the Mac-test readiness pass for optional Astrology, including unavailable-state UX and a deploy smoke checklist; do not enable production without server secrets and rate controls. | done (committing) |
| H-046 | Codex -> Codex | Vercel Preview environment and deployed optional Astrology routes only | Configure the server-only Astrology variables, verify the Preview endpoints, and run the documented Mac smoke pass. Never place provider or OpenAI secrets in the client bundle. | awaiting provider key and Vercel Preview access |
| H-047 | Codex -> Antigravity | new `src/data/dreamImageConsentCopy.ts` only | Create typed, content-only copy for optional Dream Image privacy consent, provider-unavailable, generation-pending, and local-deletion states. Keep it concise, non-interpretive, and explicit that curated prompts—not raw dream text—may leave the device. Do not alter UI, routes, services, providers, storage, credentials, or existing data files. | reviewed, accepted (committing) |
| H-048 | Codex -> Codex | optional Dream Images UI using existing provider-neutral contracts/data only | Build a provider-neutral, disabled-by-default Dream Image preparation screen that lets users choose a curated template and style without sending raw dream text or adding a provider. | done (committing) |
| H-049 | Codex -> Codex | Dream Image server proxy/provider integration only after explicit provider approval | Add the optional server-held image provider integration, moderation, rate controls, and explicit consent without accepting raw dream text. | awaiting provider selection and approval |
| H-050 | Codex -> Codex | optional Astrology screen and H-044 glossary only | Add concise, expandable body/sign explanations to calculated chart placements while retaining the non-predictive disclosure and local-only result storage. | done (committing) |
| H-051 | Codex -> Antigravity | new `src/data/astrologyAspectGlossary.ts` only | Create typed, content-only, non-predictive glossary entries for the five major aspect types returned by the current calculation provider. Include lookup helpers and concise accessibility descriptions; do not alter UI, routes, services, providers, storage, credentials, or existing data files. | reviewed, accepted with wording hardening (committing) |
| H-052 | Codex -> Codex | optional Astrology screen and H-051 glossary only | Integrate reviewed aspect explanations into the calculated-chart view with accessible expansion and the existing non-predictive disclosure. | done (committing) |
| H-053 | Codex -> Codex | Dream Image preparation UI/service boundary and H-047 copy only | Integrate reviewed privacy/unavailable copy and ensure a future request sends only the curated prompt and style—not the local dream id or raw dream content. Do not add a provider. | done (committing) |
| H-054 | Codex -> Antigravity | new `src/data/dreamImageSafetyGuidelines.ts` only | Create typed, content-only safety and accessibility guidance for future curated Dream Image generation: disallowed raw journal text, personal identifiers, medical/predictive claims, and inaccessible alt text. Include lookup helpers; do not alter UI, routes, services, providers, storage, credentials, or existing data files. | reviewed, accepted with standards wording correction (committing) |
| H-055 | Codex -> Antigravity | new `src/data/astrologyConsentCopy.ts` only | Create typed, content-only copy for optional Astrology consent, unavailable-provider, AI-reflection pending, and local-deletion states. Keep it explicit that birth fields/chart summaries may be externally processed while saved results remain local; do not alter UI, routes, services, providers, storage, credentials, or existing data files. | reviewed, accepted with disclosure precision edit (committing) |
| H-056 | Codex -> Codex | Astrology glossary helpers and focused tests only | Add regression coverage for case-insensitive body, sign, and aspect lookup plus whitespace-tolerant aspect validation. | done (committing) |
| H-057 | Codex -> Codex | optional Astrology UI and H-055 consent copy only | Integrate the reviewed consent, unavailable, pending, and deletion copy into the optional Astrology screen without changing its local-storage or server boundaries. | done (committing) |
| H-058 | Codex -> Codex | Dream Image preparation UI/service and H-054 guidance only | Surface the reviewed privacy checklist in preview mode and reject provider responses whose alt text fails the project baseline heuristic. Do not add or configure a provider. | done (committing) |
| H-059 | Codex -> Antigravity | new `src/data/astrologyUncertaintyCopy.ts` only | Create typed, content-only uncertainty explanations for date-only, date-and-time, and date-time-timezone chart precision. Keep wording non-predictive and avoid accuracy guarantees; do not alter UI, routes, services, providers, storage, credentials, or existing data files. | reviewed, corrected to match provider timezone behavior (committing) |
| H-060 | Codex -> Antigravity | new `src/data/astrologyHouseGlossary.ts` only | Create typed, content-only, non-predictive glossary entries for houses 1–12 with concise accessibility descriptions and lookup helpers. Frame every entry as a traditional symbolic metaphor; do not alter UI, routes, services, providers, storage, credentials, or existing data files. | reviewed, accepted with health-language and lookup hardening (committing) |
| H-061 | Codex -> Codex | optional Astrology chart UI and H-059 uncertainty copy only | Integrate the reviewed precision-specific uncertainty explanation into calculated and locally restored charts without changing calculation or storage behavior. | done (committing) |
| H-062 | Codex -> Antigravity | new `src/data/dreamImageAltTextTemplates.ts` only | Create typed, content-only accessible alt-text templates for every existing curated Dream Image prompt template. Describe only visible scene, medium, lighting, and palette; avoid interpretation, emotion claims, and personal data. Include lookup helpers; do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with accessibility-claim and objectivity edits (committing) |
| H-063 | Codex -> Codex | optional Astrology placement UI and H-060 glossary only | Integrate reviewed house explanations into expanded placements while retaining uncertainty and non-predictive disclosures. | done (committing) |
| H-064 | Codex -> Antigravity | new `src/data/astrologyBodyAliases.ts` only | Create a typed, content-only alias map from likely provider body labels, including spacing and case variants for nodes and minor bodies, to canonical glossary names. Include normalization and lookup helpers; do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with node-precision correction (committing) |
| H-065 | Codex -> Codex | Dream Image preparation UI and H-062 alt-text templates only | Surface the reviewed accessible scene description in the prepared preview and add fallback-alt contract tests without adding a provider. | done (committing) |
| H-066 | Codex -> Antigravity | new `src/data/astrologyMinorBodyGlossary.ts` only | Create typed, content-only, non-predictive glossary entries for provider-returned True Node, Chiron, Lilith, Ceres, Pallas, Juno, and Vesta labels. Frame each as a traditional symbolic metaphor and include lookup helpers; do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with health-language and astronomy-precision hardening (committing) |
| H-067 | Codex -> Codex | Astrology placement resolution and H-064 aliases only | Integrate reviewed provider body-label normalization into glossary lookup and add regression coverage without changing stored chart data. | done (committing) |
| H-068 | Codex -> Antigravity | new `src/data/astrologyAngleGlossary.ts` only | Create typed, content-only, non-predictive glossary entries for Ascendant and Midheaven with concise accessibility descriptions and lookup helpers. Frame both as traditional symbolic chart angles; do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with astronomy-precision and lookup hardening (committing) |
| H-069 | Codex -> Codex | Astrology placement lookup and H-066 minor-body glossary only | Integrate reviewed minor-body glossary entries into alias-normalized placement expansion and add regression coverage without changing stored chart data. | done (committing) |
| H-070 | Codex -> Codex | Astrology validation UI and focused component tests only | Add focused regression coverage for field-specific birth-profile, timezone, and coordinate errors without changing provider or storage behavior. | done (committing) |
| H-071 | Codex -> Codex | Astrology placement UI and H-068 angle glossary only | Integrate reviewed Ascendant and Midheaven explanations into alias-normalized placement expansion with regression coverage, without changing provider or stored chart data. | done (committing) |
| H-072 | Codex -> Antigravity | new `src/data/dreamImageFailureCopy.ts` only | Create typed, content-only recovery copy for optional Dream Image offline, provider-unavailable, moderation-rejected, rate-limited, and retryable-failure states. Keep wording concise, privacy-preserving, non-interpretive, and free of provider promises; do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with privacy-claim precision edits (committing) |
| H-073 | Codex -> Codex | Dream Image preparation UI and H-072 failure copy only | Integrate reviewed failure-specific recovery messages into the optional Dream Image preparation flow without adding a provider or accepting raw dream text. | done (committing) |
| H-074 | Codex -> Antigravity | new `src/data/dreamImageResultActionsCopy.ts` only | Create typed, content-only labels, confirmations, and accessibility descriptions for future generated-image regenerate, save locally, share, and delete actions. Keep wording explicit that journal text is not embedded or shared automatically; do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with platform-sharing and privacy-claim precision edits (committing) |
| H-075 | Codex -> Codex | Dream Image result UI and H-074 action copy only | Integrate reviewed generated-image action labels and confirmations into provider-neutral result components without enabling a provider or adding storage behavior. | done (committing) |
| H-076 | Codex -> Antigravity | new `src/data/dreamImageProgressCopy.ts` only | Create typed, content-only accessible progress labels for queued, moderating, rendering, and finalizing Dream Image states. Avoid timing promises and interpretation claims; reiterate that only curated scene/style inputs are processed. Do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with privacy-claim and policy wording precision edits (committing) |
| H-077 | Codex -> Codex | Dream Image provider-neutral loading UI and H-076 progress copy only | Integrate reviewed accessible progress states into a reusable generation-status component without enabling a provider or adding storage behavior. | done (committing) |
| H-078 | Codex -> Antigravity | new `src/data/astrologyProviderErrorCopy.ts` only | Create typed, content-only recovery copy for optional Astrology disabled, offline, invalid-provider-response, rate-limited, and reflection-unavailable states. Keep it non-predictive and explicit about local data preservation; do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with persistence-boundary corrections (committing) |
| H-079 | Codex -> Codex | Astrology request UI and H-078 provider-error copy only | Integrate reviewed provider-error recovery messages into chart and reflection request failures with focused regression coverage, without changing provider or storage behavior. | done (committing) |
| H-080 | Codex -> Antigravity | new `src/data/astrologyProgressCopy.ts` only | Create typed, content-only accessible progress labels for validating inputs, calculating placements, saving locally, and generating an optional reflection. Avoid timing, accuracy, or predictive claims; distinguish chart calculation from AI reflection. Do not alter UI, routes, services, providers, storage, credentials, or existing files. | reviewed, accepted with calculation and storage-claim precision edits (committing) |
| H-081 | Codex -> Codex | Astrology request UI and H-080 progress copy only | Integrate reviewed accessible progress states into chart calculation and reflection loading feedback without changing request, provider, or storage behavior. | done (committing) |
| H-082 | Codex -> Antigravity | new `src/data/astrologyCoordinateHelpCopy.ts` only | Create typed, content-only help copy explaining why latitude/longitude are required, valid ranges, example formats, boundary-location uncertainty, and that coordinates are sent for calculation but not saved. Do not add geocoding, UI, providers, storage, credentials, or modify existing files. | reviewed, accepted with provider-retention and calculation-precision corrections (committing) |
| H-083 | Codex -> Codex | Astrology form UI and H-082 coordinate help copy only | Integrate reviewed coordinate guidance into an accessible expandable help panel without adding geocoding, location permissions, provider changes, or new storage. | done (committing) |
| H-084 | Codex -> Antigravity | new `src/data/astrologyTimezoneHelpCopy.ts` only | Create typed, content-only help copy explaining IANA timezone identifiers, valid examples such as `Asia/Kolkata`, why country names like `India` are rejected, timezone-without-time behavior, and historical DST uncertainty. Do not add lookup APIs, geocoding, UI, providers, storage, credentials, or modify existing files. | reviewed, accepted with date-only, ambiguity, and historical-coverage corrections (committing) |
| H-085 | Codex -> Codex | Astrology form UI and H-084 timezone help copy only | Integrate reviewed timezone guidance beside field-specific validation without adding timezone lookup, geocoding, provider changes, or new storage. | done (committing) |
| H-086 | Codex -> Antigravity | new `src/data/astrologyBirthTimeHelpCopy.ts` only | Create typed, content-only guidance for optional birth time, 24-hour `HH:mm` format, unknown-time/date-only mode, recorded-time rounding, and avoiding guessed times. Keep wording non-predictive; do not add UI, providers, storage, credentials, or modify existing files. | reviewed, accepted with date-only/provider and validation hardening (committing) |
| H-087 | Codex -> Codex | Astrology form UI and H-086 birth-time help copy only | Integrate reviewed optional birth-time guidance beside validation without adding time lookup, provider changes, or new storage. | done (committing) |
| H-088 | Codex -> Antigravity | new `src/data/astrologyBirthDateHelpCopy.ts` only | Create typed, content-only guidance for required `YYYY-MM-DD` birth-date format, valid calendar/leap dates, future-date rejection, and why full names are unnecessary. Keep wording privacy-preserving and non-predictive; do not add UI, providers, storage, credentials, or modify existing files. | reviewed, accepted with supported-range, privacy, and calendar-validation corrections (committing) |
| H-089 | Codex -> Codex | Astrology form UI and H-088 birth-date help copy only | Integrate reviewed birth-date format/privacy guidance beside validation without adding date lookup, provider changes, or new storage. | done (committing) |
| H-090 | Codex -> Antigravity | new `src/data/astrologyLocationLabelHelpCopy.ts` only | Create typed, content-only guidance for the optional local location label: it is display-only, may use a broad city/region, should avoid street addresses, is stored locally, and is not included in chart/reflection requests. Do not add UI, geocoding, providers, storage, credentials, or modify existing files. | reviewed, accepted with persistence timing and platform wording corrections (committing) |
| H-091 | Codex -> Codex | Astrology form UI and H-090 location-label help copy only | Integrate reviewed local-label privacy guidance beside the optional label field without adding geocoding, provider changes, or new storage. | done (committing) |
| H-092 | Codex -> Antigravity | new `src/data/astrologyRequestSummaryCopy.ts` only | Create typed, content-only review-before-submit copy that distinguishes fields sent for chart calculation, fields kept local, chart data sent for optional AI reflection, and dream data never included. Do not alter UI, services, providers, storage, credentials, or existing files. | reviewed, accepted with two-hop reflection and local-storage boundary corrections (committing) |
| H-093 | Codex -> Codex | Astrology consent UI and H-092 request-summary copy only | Integrate reviewed sent-versus-local request summary into the explicit consent area without changing request, provider, or storage behavior. | done (committing) |
| H-094 | Codex -> Antigravity | new `src/data/astrologyDeletionSummaryCopy.ts` only | Create typed, content-only deletion disclosure explaining which local profile/chart/reflection records are removed, that dream journals are unaffected, and that local deletion cannot retract data already processed under external-provider policies. Do not alter UI, services, providers, storage, credentials, or existing files. | done (`7de17bc`) |
| H-095 | Codex -> Codex | Astrology deletion UI and H-094 deletion-summary copy only | Integrate reviewed deletion scope and external-processing caveat into the existing destructive confirmation without changing deletion behavior or storage keys. | done (`fe640ce`) |
| H-096 | Codex -> Antigravity | new `docs/ASTROLOGY_MAC_TEST_MATRIX.md` only | Draft a concise Mac manual-test matrix covering valid/invalid dates, optional/invalid timezones, coordinates, consent, disabled/offline/provider errors, local persistence, reflection boundaries, accessibility, and deletion scope. Do not alter code, providers, credentials, or existing docs. | reviewed, accepted with storage-key, reflection-boundary, provider-retention, and rate-limit corrections (committing) |
| H-097 | Codex -> Codex | `docs/ASTROLOGY_MAC_TEST_MATRIX.md` and current Astrology implementation only | Execute and reconcile the reviewed Mac test matrix against automated coverage and local web smoke checks; fix only verified release blockers and update readiness notes. | done (committing) |
| H-098 | Codex -> Antigravity | new `docs/ASTROLOGY_TESTER_FEEDBACK_TEMPLATE.md` only | Draft a concise Mac tester feedback template covering environment/build, test-case ID, expected versus actual behavior, reproduction steps, severity, accessibility observations, and privacy-safe screenshots/logs with secrets and birth details redacted. Do not alter code, providers, credentials, or existing docs. | reviewed, accepted with evidence-label and commit-placeholder corrections (committing) |
| H-099 | Codex -> Codex | Astrology readiness docs and current implementation only | Review H-098, reconcile H-097 evidence, and publish a final enabled/blocked Mac testing readiness decision with exact unresolved gates. | done (committing) |
| H-100 | Codex -> Codex | Astrology Vercel routes, tests, and deployment documentation only | Audit the production deployment boundary for feature flags, server-only secrets, CORS, request throttling, and provider-error propagation; document exact safe implementation choices without enabling the feature or changing providers. | done (committing) |
| H-101 | Codex -> Codex | Astrology Vercel routes and focused route tests only | Add bounded JSON/content-type validation, sensitive-field rejection, upstream timeouts, and stable public error codes without changing providers, enabling production, or adding credentials. | done (committing) |
| H-102 | Codex -> Antigravity | new `docs/DREAM_IMAGE_MAC_TEST_MATRIX.md` only | Draft a concise Mac manual-test matrix for the current provider-neutral Dream Image preparation/result experience: curated prompt boundary, style selection, consent, disabled/offline/failure states, progress accessibility, local result actions, deletion, and explicit provider-connected blockers. Do not alter code, providers, credentials, or existing docs. | reviewed, accepted with default-scene, component-vs-integration, storage, and accessibility corrections (committing) |
| H-103 | Codex -> Codex | `src/services/astrologyRemote.ts`, Astrology error presentation, and focused tests only | Consume stable server error codes directly, preserve retryability and rate-limit semantics without message matching, and keep unavailable/offline behavior unchanged. | done (committing) |
| H-104 | Codex -> Codex | Astrology Vercel routes, deployment documentation, and focused tests only | Specify and prepare the durable anonymous request-limiter integration boundary without choosing a paid provider, storing raw birth data, or enabling production. | done (committing) |
| H-105 | Codex -> Antigravity | new `docs/DREAM_IMAGE_TESTER_FEEDBACK_TEMPLATE.md` only | Draft a concise Mac tester feedback template aligned to H-102, separating preparation-screen findings from blocked provider/result integration, with environment/build, case ID, expected/actual, reproduction, severity, accessibility, and privacy-safe redaction fields. Do not alter code, providers, credentials, or existing docs. | reviewed, accepted with current-scene, evidence-label, alt-text-standard, and commit-placeholder corrections (committing) |
| H-106 | Codex -> Codex | current Dream Image preparation screen, tests, and H-102 matrix only | Execute the provider-neutral Dream Image Mac web smoke pass, reconcile rendered accessibility and copy against H-102, and fix only verified preparation-screen blockers without adding a provider. | done (committing) |
| H-107 | Codex -> Codex | current Dream Image preparation screen and provider-neutral service only | Design the next disabled-by-default generation integration boundary from prepared selection to progress/error/result state without adding a provider, storage backend, photo permissions, or credentials. | done (committing) |
| H-108 | Codex -> Antigravity | new `docs/DREAM_IMAGE_DEPLOYMENT_BOUNDARY_DRAFT.md` only | Draft a provider-neutral deployment checklist for the future Dream Image proxy covering curated-prompt allowlisting, moderation, server-only secrets, cost/rate controls, transient image retention, privacy-safe logs, accessibility metadata, iOS photo permission copy, and disabled-by-default rollout. Do not select a vendor or alter code, providers, credentials, or existing docs. | reviewed, accepted with retention, durable-limit, moderation, accessibility-standard, and rollout corrections (committing) |
| H-109 | Codex -> Codex | Dream Image preparation screen and H-107 state boundary only | Integrate explicit consent and a disabled-by-default Generate action that requires a saved-dream association, while keeping provider-unavailable preview fully usable and making no network call when unavailable. | done (committing) |
| H-110 | Codex -> Antigravity | new `docs/DREAM_IMAGE_PROVIDER_EVALUATION_TEMPLATE.md` only | Draft a vendor-neutral provider evaluation template covering current pricing model, moderation controls, input/output retention, training/data-use terms, commercial output rights, regional availability, latency/async API, signed-URL behavior, spend controls, and server-side key support. Do not recommend or select a provider, browse, or alter code, credentials, or existing docs. | reviewed, accepted with owner-budget, retention, rights, SLA, execution-limit, and blocker-mapping corrections (committing) |
| H-111 | Codex -> Codex | saved Dream Analysis/History navigation and Dream Image route params only | Add an explicit Create Dream Image action for saved analyses that passes only the local dream ID into H-109, without passing dream text or changing base Jungian analysis output. | done (committing) |
| H-112 | Codex -> Codex | Dream Image generated-result UI and in-memory actions only | Connect successful H-109 results to regenerate and in-memory delete actions while keeping save/share hidden until permissions and persistence are implemented. | done (committing) |
| H-113 | Codex -> Codex | Dream Image error/retry/result UI and focused tests only | Add accessible retry recovery for retryable generation failures and verify result alt text, regenerate, and in-memory deletion without exposing save/share prematurely. | done (committing) |
| H-114 | Codex -> Codex | Dream Image screen, current tests, and readiness docs only | Run the post-integration regression/smoke pass, reconcile H-102/H-108 boundaries with the new consent/result UI, and fix only verified provider-neutral blockers. | done (committing) |
| H-115 | Codex -> Codex | Dream Image saved-dream association and current local storage only | Validate route-provided Dream Image associations against an existing saved dream before enabling generation, without reading dream text into provider payloads or adding sync. | done (committing) |
| H-116 | Codex -> Codex | Dream Image UI tests and privacy boundary only | Verify that saved-dream validation, consent, template/style changes, retries, and regenerate never place dream content or analysis fields into provider requests. | done (committing) |
| H-117 | Codex -> Antigravity | new `src/data/dreamImageGeneratedDisclosureCopy.ts` only | Create typed, content-only disclosure copy for generated Dream Image results covering AI-generated art labeling, curated prompt/style inputs, non-objective/non-diagnostic framing, external processing, local copy scope, and provider/CDN retention limitations. Do not alter UI, services, providers, storage, credentials, or existing files. | done (reviewed; committing) |
| H-118 | Codex -> Codex | Dream Image result UI and H-117 disclosure copy only | Integrate reviewed generated-art, input-boundary, and retention disclosure into successful results without adding persistence, sharing, provider, or credential behavior. | queued after H-117 |
| H-119 | Codex -> Codex | Dream Image client service, failure presentation, and focused tests only | Replace message-based Dream Image error classification with typed stable client error codes while preserving current retry, unavailable, moderation, and rate-limit behavior. | done (committing) |
| H-120 | Codex -> Codex | new disabled-by-default Dream Image server route and focused tests only | Add provider-neutral proxy request validation, exact curated-template/style allowlisting, consent checks, body limits, and stable disabled/unconfigured errors without calling or selecting an image provider. | done (committing) |
| H-121 | Codex -> Codex | Dream Image client proxy contract and focused tests only | Align the client request body with the application-owned route's explicit consent contract while continuing to exclude dream ids, dream text, analysis, and provider credentials. | done (`7f1e96f`) |
| H-122 | Codex -> Codex | Dream Image route/client failure contract and focused tests only | Map disabled, consent, allowlist, and provider-unavailable server codes to stable actionable client failures without message parsing or provider coupling. | done (committing) |
| H-123 | Codex -> Codex | Dream Image successful-result UI and reviewed H-117 disclosure copy only | Integrate accurate generated-art, curated-input, non-diagnostic, session-scope, and provider-dependent retention disclosures without adding persistence, sharing, or provider behavior. | done (committing) |
| H-124 | Codex -> Antigravity | new `src/data/dreamImageProviderDecisionCopy.ts` only | Create a small typed, content-only set of neutral labels and explanations for provider evaluation states: not reviewed, under review, blocked, approved for sandbox, and approved for limited production. Avoid vendor names, pricing claims, SLAs, retention durations, or implementation instructions. Do not alter existing files. | reviewed; accepted (committing) |
| H-125 | Codex -> Codex | Dream Image route allowlist drift protection and focused tests only | Prevent the server route's curated prompt and style allowlists from silently drifting from the application catalog while preserving the strict server-owned request boundary. | done (committing) |
| H-126 | Codex -> Antigravity | new `src/data/dreamImageAvailabilityCopy.ts` only | Create typed, content-only user copy for feature disabled, sandbox-only, provider paused, budget protection, and limited-production availability states. Keep wording provider-neutral, non-predictive, privacy-preserving, and free of timing, pricing, uptime, or retention promises. Do not alter existing files, UI, routes, services, storage, or credentials. | done (`6b064b3`) |
| H-127 | Codex -> Codex | Dream Image route contract and deployment documentation only | Reconcile the new proxy request contract, consent fields, stable public errors, feature flag, provider-unavailable behavior, and exact remaining provider activation gates in setup and Mac-test documentation. | done (`14b8378`) |
| H-128 | Codex -> Codex | Astrology provider contract and focused route tests only | Reconcile the selected NatalChart.AI full-chart response with the current adapter, including time-unknown behavior, angles, houses, rate-limit headers, and stable provider errors without enabling deployment or exposing the new key. | done (`f883e5d`) |
| H-129 | Codex -> Antigravity | new `src/data/astrologyCalculationDisclosureCopy.ts` only | Create typed, content-only disclosure copy for external chart calculation: fields sent, local-only location label, unknown-time uncertainty, calculation-versus-AI distinction, provider-side processing limitation, and dream-journal exclusion. Keep it non-predictive and provider-neutral; do not alter existing files, UI, routes, services, storage, or credentials. | done (`6db0ffe`) |
| H-130 | Codex -> Codex | Astrology Preview activation runbook and deployment verification only | Document the exact Vercel project/environment boundary, server-only variables, disabled-by-default rollout, provider sandbox smoke test, rollback, rate-limit verification, and Mac handoff without storing or exposing credentials. | done (committing); isolated Preview active, disabled/enabled/provider/reflection/timezone smoke checks passed |
| H-131 | Codex -> Antigravity | new `src/data/astrologyResultSourceCopy.ts` only | Create typed, content-only source and precision labels for calculated Astrology results: calculated chart, optional AI reflection, date-only uncertainty, timed-chart precision, provider processing, and local saved-copy scope. Keep wording provider-neutral, non-predictive, and free of guarantees; do not alter existing files, UI, routes, services, storage, or credentials. | done (`ec866b6`) |
| H-132 | Codex -> Antigravity | new `src/data/astrologyPreviewStatusCopy.ts` only | Create typed, content-only status copy for optional Astrology Preview states: disabled, configuration pending, provider unavailable, rate limited, private Preview active, and Production blocked. Keep wording concise, provider-neutral, non-predictive, and free of uptime or launch-date promises; do not alter existing files, UI, routes, services, storage, or credentials. | done (`c67303d`) |
| H-133 | Codex -> Antigravity | new `src/data/astrologyPreviewFaq.ts` only | Create a typed, content-only FAQ for the optional private Astrology Preview covering calculation versus AI reflection, fields sent, local location labels, missing birth time, provider processing, local deletion limits, and why Production remains blocked. Keep answers concise, provider-neutral, non-predictive, and free of guarantees; do not alter existing files, UI, routes, services, storage, or credentials. | reviewed; accepted with date-only, request-field, data-use, retention, and deletion-scope corrections (committing) |
| H-134 | Codex -> Antigravity | new `src/data/astrologyMacTestHelp.ts` only | Create typed, content-only tester guidance for the optional Astrology Preview covering synthetic test data, secret redaction, birth-data redaction, expected date-only versus timed results, safe error screenshots, and defect-report evidence. Keep it concise and do not alter existing files, UI, routes, services, storage, providers, or credentials. | reviewed; accepted with precision and observable-result corrections (committing) |
| H-135 | Codex -> Antigravity | new `src/data/dreamImageMacTestHelp.ts` only | Create typed, content-only tester guidance for the disabled-by-default Dream Image flow covering curated synthetic selections, secret/personal-data redaction, expected disabled/sandbox states, accessible generated-art evidence, safe screenshots, and defect-report evidence. Clearly distinguish currently testable preparation UI from provider-blocked live generation. Do not alter existing files, UI, routes, services, providers, storage, or credentials. | reviewed; accepted (committing) |
| H-136 | Codex -> Codex | `package.json`, new `vercel.json`, Astrology Preview deployment and verification docs only | Export the Expo web app in the isolated Vercel Preview, verify `/astrology` and both server routes with synthetic data, keep Preview private and Production disabled, and record the Mac/browser handoff. | done (committing); private `/astrology`, chart calculation, AI reflection, and field validation verified |
| H-137 | Codex -> Antigravity | new `src/data/astrologyPreviewTroubleshooting.ts` only | Create typed, content-only troubleshooting guidance for the private Astrology Preview covering protected-preview access, feature disabled, invalid field, provider unavailable, rate limited, timeout, reflection unavailable, and safe retry states. Use existing public error codes and non-technical recovery copy; do not alter existing files, UI, routes, services, providers, storage, or credentials. | reviewed; accepted (committing) |
| H-138 | Codex -> Antigravity | new `src/data/astrologyPreviewFeedbackPrompts.ts` only | Create typed, content-only private-tester feedback prompts covering form clarity, consent comprehension, date-only uncertainty, timed-result clarity, error recovery, accessibility, and trust. Keep questions neutral and non-leading; do not request real birth details, dream content, screenshots, contact details, or credentials. Do not alter existing files, UI, routes, services, providers, storage, or credentials. | reviewed; accepted (committing) |
| H-139 | Codex -> Antigravity | new `src/data/astrologyPreviewSessionChecklist.ts` only | Create a typed, content-only private Preview session checklist covering preflight access/build confirmation, synthetic-input selection, date-only and timed passes, reflection opt-in, local deletion, accessibility spot checks, sanitized evidence, and session closeout. Keep Production activation, credentials, real birth data, and dream content out of scope. Do not alter existing files, UI, routes, services, providers, storage, or credentials. | reviewed; accepted (committing) |
| H-140 | Codex -> Codex | `app/astrology.tsx`, focused Astrology UI tests only | Keep the concise placement list while ensuring provider-returned Ascendant and Midheaven remain visible in timed charts; preserve date-only omission, ordering, accessibility labels, and existing saved data. | done (`180c672`); live Preview shows both angles |
| H-141 | Codex -> Antigravity | new `src/data/astrologyPreviewQuickStart.ts` only | Create a typed, content-only five-minute quick-start for private browser testing: open the assigned Preview, use the approved synthetic profiles, run date-only then timed calculation, optionally request reflection, verify local deletion, and report only public error codes. Explicitly exclude Production changes, real birth data, dream content, credentials, and private access links. Do not alter existing files, UI, routes, services, providers, storage, or credentials. | reviewed; accepted (committing) |
| H-142 | Codex -> Codex | Full automated regression and final private Astrology Preview deployment only | Run the full Jest suite, TypeScript validation, whitespace validation, and verify the final provider-backed timed result in the browser after H-140. | done (`180c672`); 22 suites / 135 tests passed, final Preview Ready |
| H-143 | Codex -> Antigravity | new `src/data/astrologyPreviewTestOutcomeCopy.ts` only | Create typed, content-only labels and concise instructions for complete, blocked, skipped, pass, and fail private-test outcomes. Distinguish product defects from provider/deployment blockers; allow only test-case IDs, public error codes, and sanitized observations. Do not request or include private links, credentials, real birth data, coordinates, dream content, or attachments. Do not alter existing files, UI, routes, services, providers, storage, or credentials. | reviewed; accepted (committing) |
| H-144 | Codex -> Codex | `docs/ASTROLOGY_MAC_TEST_MATRIX.md`, final Mac handoff evidence only | Mark browser-verified Astrology cases, separate the remaining macOS/iOS device-only checks, and produce the concise user-testing handoff without broadening Production scope. | done (committing); verified Preview evidence and device-only remainder recorded |
| H-145 | Codex -> Antigravity | new `src/data/astrologyPreviewDeviceCheckCopy.ts` only | Create typed, content-only guidance for remaining Mac/device-only checks: VoiceOver, keyboard/focus, light/dark and zoom, offline recovery, relaunch persistence, destructive local Astrology deletion, and DST/timezone spot checks. Use existing matrix IDs, approved synthetic inputs, and sanitized observations; exclude private links, credentials, personal data, dream content, Production changes, and pre-execution pass claims. Do not alter existing files, UI, routes, services, providers, storage, docs, or credentials. | reviewed; accepted (committing) |
| H-146 | Codex -> Codex | Private Preview user-test triage and Production gate audit only | Keep the verified Preview stable while reviewing sanitized tester outcomes; classify product defects separately from provider/deployment blockers and maintain the explicit Production gate for durable limiting, spend alerts, redacted observability, and Mac/device sign-off. | done (committing); explicit gate audit recorded, Production remains blocked |
| H-147 | Codex -> Antigravity | new `src/data/astrologyPreviewIssueTriageCopy.ts` only | Create typed, content-only issue-triage guidance that maps sanitized private-test observations to product defect, provider blocker, deployment blocker, needs-more-evidence, or no-issue. Require matrix case IDs and approved public error codes where available; prohibit private links, credentials, real birth data/coordinates, dream content, request bodies, logs, or attachments. Do not alter existing files, UI, routes, services, providers, storage, docs, or credentials. | reviewed; accepted (committing) |
| H-148 | Codex -> Antigravity | new `src/data/dreamImageSandboxTestOutcomeCopy.ts` only | Create typed, content-only outcome and blocker guidance for the optional Dream Image sandbox preparation flow. Distinguish preparation-UI defects, feature-disabled expected behavior, provider/deployment blockers, skipped generation, and not-run states. Reference existing Dream Image Mac test IDs and blocker IDs only; prohibit dream text, images, private links, credentials, logs, payloads, or attachments. Do not enable generation or alter existing files, UI, routes, services, providers, storage, docs, or credentials. | reviewed; accepted (committing) |
| H-149 | Codex -> Codex | Dream Image foundation readiness audit only | Review the existing optional Dream Image preparation UI, disabled route, privacy boundaries, provider decision artifacts, and Mac matrix; identify the next unblocked foundation task without enabling a provider or Production traffic. | done (committing); provider-neutral foundation and five activation blockers recorded |
| H-150 | Codex -> Antigravity | new `src/data/dreamImageProviderGateHelp.ts` only | Create typed, content-only help for `BLK-IMG-01` through `BLK-IMG-05`, describing the evidence needed to clear each gate without naming or selecting a provider. Keep the feature disabled by default and explicitly exclude dream content, generated media, private links, credentials, logs, payloads, vendor promises, and Production approval claims. Do not alter existing files, UI, routes, services, providers, storage, docs, or credentials. | reviewed; accepted (committing) |
| H-151 | Codex -> Codex | Dream Image provider-neutral final regression and Mac-matrix reconciliation only | Run focused and full automated verification, exercise the controlled disabled/unconfigured route and preparation flow, update evidence for testable cases, and preserve all provider-dependent cases as blocked. Do not select a provider, add credentials, or enable live generation. | done (committing); 22 suites / 135 tests pass, all five provider gates remain blocked |
| H-152 | Codex -> Antigravity | new `src/data/dreamImagePreviewQuickStart.ts` only | Create a typed, content-only five-minute quick-start for provider-neutral Dream Image testing: open the preparation screen, select approved catalog scenes/styles, review consent and privacy boundaries, verify the disabled state, perform accessibility spot checks, and report only existing `TC-IMG-*`/`BLK-IMG-*` IDs with sanitized text. Exclude dream content, generated media, private links, credentials, logs, payloads, attachments, provider selection, and live-generation claims. Do not alter existing files, UI, routes, services, providers, storage, docs, or credentials. | reviewed; accepted (committing) |
| H-153 | Codex -> Antigravity | new `src/data/dreamImagePreviewStatusCopy.ts` only | Create typed, content-only status copy for preparation-ready, device-checks-pending, protected-preview-blocked, provider-gates-open, and live-generation-disabled states. Reference existing `TC-IMG-*`/`BLK-IMG-*` IDs where useful; prohibit dream content, generated media, private links, credentials, logs, payloads, attachments, provider selection, and launch promises. Do not alter existing files, UI, routes, services, providers, storage, docs, or credentials. | assigned |
| H-154 | Codex -> Codex | Authenticated private Preview verification for the disabled Dream Image route only | Verify the application-owned `/api/dream-image` route behind Vercel protection using synthetic curated input, confirm the stable disabled state and no provider call, and record `BLK-IMG-01` evidence without enabling generation or changing credentials. | in progress; protected-route boundary identified |
| H-152 | Codex -> Antigravity | new `src/data/dreamImagePreviewQuickStart.ts` only | Create a typed, content-only five-minute quick-start for provider-neutral Dream Image testing: open the preparation screen, select approved catalog scenes/styles, review consent and privacy boundaries, verify the disabled state, perform accessibility spot checks, and report only existing `TC-IMG-*`/`BLK-IMG-*` IDs with sanitized text. Exclude dream content, generated media, private links, credentials, logs, payloads, attachments, provider selection, and live-generation claims. Do not alter existing files, UI, routes, services, providers, storage, docs, or credentials. | assigned |

## Completion format

Set your handoff to `done <commit>` and append a short note with changed files, validation, and any follow-up needed.

### H-001 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/components/dream-techniques/techniques.ts`
- **Guides added:**
  1. **SSILD** (`'6'`, difficulty 2, duration 10-15 min, icon `sync`): Sensory cycling across vision, hearing, and touch during a nighttime awakening or nap; emphasizes passive attention and prioritizes natural rest without promises of lucidity.
  2. **Dream incubation** (`'7'`, difficulty 1, duration 10-15 min, icon `target`): Bedtime reflection on a focused theme or creative inquiry; curiosity-based without guaranteeing specific dream imagery.
  3. **Morning recall routine** (`'8'`, difficulty 1, duration 5-10 min, icon `weather-sunny`): Waking stillness, reverse memory backtracking, and alternate posture recall; normalizes zero-recall mornings and natural variance.
  4. **Nightmare aftercare** (`'9'`, difficulty 1, duration 10-15 min, icon `hand-heart-outline`): Physical orientation, bodily anchoring, downregulating breath, space reset, and optional daytime rescripting; includes clear safety framing that it is a self-care aid and not clinical treatment for trauma or nightmare disorder, advising professional consultation when nightmares are persistent or distressing.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Existing IDs `1`–`5` and data types preserved completely.
- **Follow-up:** Ready for Codex integration and commit.

### H-003 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamSymbols.ts`
- **Summary of Audit & Improvements:**
  - Audited all 17 symbols in `DREAM_SYMBOLS`.
  - Removed 35+ dangling/invalid `relatedSymbols` references that did not exist in the dataset.
  - Connected under-connected symbols with 1–3 non-duplicative links to existing symbols in `DREAM_SYMBOLS`.
  - Every referenced ID in `relatedSymbols` now strictly exists within the dataset, with 0 duplicates and 0 self-references.
  - Kept object schemas, IDs, categories, descriptions, meanings, examples, history, and popularity unchanged; no medical, predictive, or guaranteed claims added.
- **Validation:**
  - Automated graph check passed: 0 invalid references, 0 duplicate references, 0 self-references across all 17 symbols.
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review and integration.
### H-004 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/psychologyCheckpoints.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only question bank supporting future Psychology interactive knowledge checks.
  - Covers all 4 psychology categories (19 total evidence-conscious questions):
    1. **Scientific Perspectives** (`science`, 5 questions): Sleep stages (REM vs. NREM), amygdala activation, prefrontal deactivation and dream logic, REM atonia, and hippocampal memory consolidation.
    2. **Psychological Theories** (`theories`, 5 questions): Freudian manifest vs. latent content, Jungian universal archetypes, dream compensation theory, Hobson & McCarley's Activation-Synthesis, and cognitive continuity models.
    3. **Dream Types & Phenomena** (`dream-types`, 4 questions): Lucid dreaming meta-awareness, recurring dream triggers, nightmares vs. deep NREM sleep terrors, and integrative memory processing.
    4. **Cultural Perspectives** (`culture`, 5 questions): Ancient Egyptian incubation temples, Native American spiritual vision quests, traditional Chinese Yin/Yang and Qi balance, classical Islamic true dreams (ru'ya), and ancient Greek Asclepieia temple healing.
  - Defined clean data interfaces (`CheckpointOption`, `CheckpointQuestion`, `PsychologyCheckpointSection`, `PsychologyCategory`) and query utilities (`getCheckpointsByCategory`, `getCheckpointById`, `getCheckpointSection`, `getAllCheckpointCategories`).
  - Contains no medical, predictive, mental-health, or guaranteed outcome claims. UI, routes, and existing types left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review and integration.

### H-005 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/psychologyReflectionPrompts.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only set of 16 open-ended reflection prompts:
    1. **Scientific Perspectives** (`scientific`, 4 prompts): Waking echoes & hippocampal replay, emotional salience & amygdala activation, executive function & dream logic, sleep rhythm & recall clarity.
    2. **Psychological Theories** (`theories`, 4 prompts): Manifest story vs. underlying feelings, encountering archetypes, compensatory balance, narrative synthesis.
    3. **Dream Types & Phenomena** (`types`, 4 prompts): Moments of lucidity, echoing patterns in recurring themes, gentle grounding after nightmare distress, emotional digestion in daily processing dreams.
    4. **Cultural Perspectives** (`cultural`, 4 prompts): Incubation & direction seeking, natural kinship & guides, harmony & dynamic balance, quiet morning contemplation.
  - Each prompt includes: stable `id`, `section`, `title`, open-ended educational `question`, and supportive `considerThis` guidance line.
  - Defined query utilities (`getPromptsBySection`, `getPromptById`, `getAllPrompts`, `getPromptSections`).
  - Educational and exploratory tone only; contains zero diagnostic, predictive, or medical advice.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review, integration, and assignment of next handoff.

### H-006 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dictionaryContexts.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only cultural-context supplement covering all 17 symbol IDs from `DREAM_SYMBOLS`.
  - For each symbol (`wolf`, `bird`, `snake`, `cat`, `horse`, `child`, `stranger`, `teacher`, `house`, `water`, `forest`, `key`, `mirror`, `flying`, `falling`, `love`, `fear`), provides:
    - `culturalOverview`: Concise summary of historical and archetypal significance.
    - `traditions`: 3–4 specific cultural perspectives (e.g. Greco-Roman, Norse, Indigenous North American, Ancient Egyptian, East Asian, Celtic, Mesoamerican, Vedic, African, Taoist, Islamic, Shinto, Christian mysticism, Sufism, Tibetan Buddhist).
    - `archetypalTheme`: Core psychological and symbolic motif.
  - Defined clean interfaces (`CulturalTraditionEntry`, `SymbolCulturalContext`) and query helpers (`getCulturalContextBySymbolId`, `getAllCulturalContexts`, `hasCulturalContext`).
  - Educational and anthropological tone only; contains zero predictive, medical, or guaranteed claims. UI, routes, and existing types left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review, integration, and assignment of next handoff.

### H-007 Completion Notes (Gemini)
- **Status:** reviewed by Codex; pending validation and integration commit.
- **Changed files:** `src/data/psychologyArticleConnections.ts`
- **Summary:** Adds typed links and reverse lookup helpers between Psychology categories, existing dictionary symbols, and written technique guides.
- **Follow-up:** H-008 is now active for Gemini.

### H-008 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dictionaryReflectionPrompts.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only reflection prompt dataset covering all 17 dictionary symbol IDs (`wolf`, `bird`, `snake`, `cat`, `horse`, `child`, `stranger`, `teacher`, `house`, `water`, `forest`, `key`, `mirror`, `flying`, `falling`, `love`, `fear`).
  - Provided 2 concise, open-ended prompts per symbol (34 prompts total), each equipped with:
    - Stable unique `id` (e.g. `dict-refl-wolf-1`)
    - `symbolId` and `symbolName`
    - `theme` focus phrase
    - Open-ended contemplative `question`
    - Gentle, exploratory `considerThis` guiding perspective
  - Defined clean data interfaces (`DictionaryReflectionPrompt`, `SymbolReflectionEntry`) and lookup helpers (`getPromptsBySymbolId`, `getPromptById`, `getReflectionEntryBySymbolId`, `hasPromptsForSymbol`, `getAllPromptSymbolIds`, `getAllDictionaryPrompts`, `getAllSymbolReflectionEntries`).
  - Strictly educational and introspective tone with zero diagnostic, predictive, or medical claims. No UI, routes, or existing data modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review, integration, and assignment of next handoff.

### H-012 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/techniqueConnections.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only connection index linking all 9 written technique IDs (`1` through `9`) to 2–3 purposeful existing dictionary symbol IDs and relevant Psychology categories (`scientific`, `theories`, `types`, `cultural`).
  - For each technique, established clear symbolic and psychological rationales:
    - `1` Reality Testing: linked to `mirror`, `flying`, `key` and categories `theories`, `types`.
    - `2` WBTB: linked to `falling`, `flying`, `water` and categories `scientific`, `types`.
    - `3` Dream Journaling: linked to `house`, `stranger`, `mirror` and categories `theories`, `types`, `cultural`.
    - `4` MILD: linked to `flying`, `teacher`, `key` and categories `scientific`, `theories`, `types`.
    - `5` WILD: linked to `water`, `falling`, `forest` and categories `scientific`, `types`.
    - `6` SSILD: linked to `water`, `bird`, `mirror` and categories `scientific`, `cultural`.
    - `7` Dream Incubation: linked to `child`, `snake`, `key` and categories `cultural`, `theories`.
    - `8` Morning Recall: linked to `water`, `house`, `bird` and categories `scientific`, `cultural`.
    - `9` Nightmare Aftercare: linked to `fear`, `wolf`, `house` and categories `types`, `scientific`.
  - Defined clean data interfaces (`PsychologyCategory`, `TechniqueConnectionItem`, `TechniqueConnections`) and query utilities (`getTechniqueConnections`, `getRelatedSymbolIdsForTechnique`, `getRelatedCategoryIdsForTechnique`, `getAllTechniqueConnections`, `getTechniquesForSymbol`, `getTechniquesForCategory`, `hasTechniqueConnections`).
  - Purely content and query helpers; zero diagnostic, medical, or guaranteed outcome claims. UI, routes, and existing data files left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review, integration, and assignment of next handoff.

### H-015 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/psychologyGlossary.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only glossary of 18 clear terms directly sourced from existing Psychology hub screens and supporting data.
  - Covers all 4 Psychology hub categories:
    - **Scientific Perspectives** (5 terms): `REM Sleep`, `REM Atonia`, `Memory Consolidation`, `Amygdala`, `Frontal Cortex Deactivation`.
    - **Psychological Theories** (6 terms): `Manifest Content`, `Latent Content`, `Collective Unconscious`, `Archetype`, `Dream Compensation`, `Activation-Synthesis`.
    - **Dream Types & Phenomena** (4 terms): `Lucid Dreaming`, `Recurring Dreams`, `Nightmare`, `Processing Dreams`.
    - **Cultural Perspectives** (3 terms): `Dream Incubation`, `Ru'ya`, `Vision Quest`.
  - Each entry provides stable `id`, `term`, `category`, `categoryLabel`, precise `definition`, contextual application note `context`, and optional cross-linked `relatedTermIds`.
  - Defined clean interfaces (`PsychologyGlossaryTerm`, `PsychologyCategory`) and query helpers (`getGlossaryTermById`, `getGlossaryTermsByCategory`, `getAllGlossaryTerms`, `getAllGlossaryCategories`, `searchGlossaryTerms`, `getRelatedGlossaryTerms`).
  - Educational, evidence-conscious tone; zero diagnostic, medical, or guaranteed outcome claims. UI, routes, and existing data left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review, integration, and assignment of next handoff.

### H-017 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/meditationTimerPresets.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only set of 5 gentle meditation and visualization timer presets (`gentle-settle`, `breath-stillness`, `pre-sleep-incubation`, `deep-relaxation`, `silent-contemplation`).
  - Each preset provides:
    - Stable unique `id`
    - Human-readable `title`
    - Exact `durationSeconds` (300s / 5m, 600s / 10m, 900s / 15m, 1200s / 20m, 600s / 10m)
    - Calm, non-medical `description`
    - Structured `cueLabels` outlining milestone guidepoints
    - Optional safe audio ambience key (`theta-6hz` or omitted for silent contemplation)
  - Defined clean interfaces (`MeditationTimerPreset`) and lookup utilities (`getPresetById`, `getAllPresets`, `getDefaultPreset`, `getPresetsByAmbience`, `formatPresetDuration`).
  - Strictly self-care and reflective framing; zero diagnostic, medical, sleep-outcome, or lucid-dreaming claims. UI, routes, audio assets, and existing data files left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review and integration into `MeditationTimer.tsx` (H-023).

### H-025 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/techniquePracticeCues.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only collection of optional practice cue lines for each of the 9 written dream technique guides (`1` through `9`).
  - Each technique has 4 structured, unhurried cue lines covering preparation, mindful execution, and pressure-free closing:
    - `1` Reality Testing: Grounding Pause, Genuine Curiosity, Physical Consistency, Calm Release.
    - `2` WBTB: Dim Environment, Quiet Wakefulness, Effortless Return, Rest Priority.
    - `3` Dream Journaling: Initial Stillness, Core Keywords, Present Tense, No Self-Judgement.
    - `4` MILD: Scene Recall, Clear Intention, Mental Rehearsal, Peaceful Letting Go.
    - `5` WILD: Deep Physical Rest, Passive Observation, Threshold Welcoming, Surrender to Sleep.
    - `6` SSILD: Sight Window, Sound Window, Touch Window, Sleep Shift.
    - `7` Dream Incubation: Theme Selection, Succinct Framing, Sensory Immersion, Trust and Drift.
    - `8` Morning Recall Routine: Gentle Stillness, Reverse Tracing, Posture Reconnection, Gratitude for Process.
    - `9` Nightmare Aftercare: Reality Grounding, Somatic Touch, Extended Exhale, Compassionate Care (with clear safety and medical disclaimers).
  - Defined clean interfaces (`TechniquePracticeCue`, `TechniqueCuesGroup`) and lookup helpers (`getCuesForTechnique`, `getCueGroupForTechnique`, `getAllTechniqueCues`, `getAllTechniqueCueGroups`, `hasCuesForTechnique`, `getCueById`).
  - Gentle, non-guaranteeing, evidence-conscious tone; zero diagnostic, predictive, or medical claims. UI, timer, routes, and existing data left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review and integration into `app/(tabs)/technique/[id].tsx` (H-027).

### H-028 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dictionarySearchKeywords.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only search keyword dataset covering all 17 dictionary symbol IDs (`wolf`, `bird`, `snake`, `cat`, `horse`, `child`, `stranger`, `teacher`, `house`, `water`, `forest`, `key`, `mirror`, `flying`, `falling`, `love`, `fear`).
  - Sourced 8–11 neutral, concise keywords per symbol directly grounded in their existing name, category, description, and meanings in `dreamSymbols.ts`.
  - Defined clean interfaces (`SymbolSearchKeywords`) and query utilities (`getKeywordsForSymbol`, `getSymbolKeywordsEntry`, `getAllSymbolKeywords`, `hasKeywordsForSymbol`, `findSymbolsByKeyword`, `matchSymbolsByQuery`, `getAllUniqueKeywords`).
  - Strictly neutral, non-prescriptive, and content-only; no UI, routes, or existing data files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review and integration.

### H-029 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/psychologyStudyNotes.ts`
- **Summary of Revision:**
  - Revised all 4 study notes (`scientific`, `theories`, `types`, `cultural`) to strictly eliminate medical, health, or efficacy claims and dream-outcome guarantees.
  - Rewrote takeaways and perspectives to be purely observational, educational, and non-diagnostic:
    - `scientific`: Focuses descriptively on polysomnography, ultradian cycles, physiological REM atonia, and cognitive memory research without health or performance claims.
    - `theories`: Frames psychoanalytic, Jungian archetypal, cognitive continuity, and activation-synthesis models as interpretive historical/conceptual traditions.
    - `types`: Describes reported characteristics of lucid dreaming, everyday processing dreams, recurring motifs, and distressing nightmares using neutral, non-evaluative language and clear self-care framing.
    - `cultural`: Treats sanctuary incubation, Indigenous relational worldviews, and Islamic morning contemplation as documented historical customs and traditions.
  - Retained the exact typed interfaces (`PsychologyStudyNote`, `PsychologyCategory`) and lookup helpers (`getStudyNoteByCategory`, `getStudyNoteById`, `getAllStudyNotes`, `hasStudyNoteForCategory`, `getAllStudyCategories`).
  - No UI, routes, or other files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review and integration.

### H-030 Completion Notes (Gemini)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dictionaryRelatedSearches.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only collection of 2–3 neutral related-search suggestions for all 17 dictionary symbol IDs (`wolf`, `bird`, `snake`, `cat`, `horse`, `child`, `stranger`, `teacher`, `house`, `water`, `forest`, `key`, `mirror`, `flying`, `falling`, `love`, `fear`).
  - Sourced each suggestion with:
    - `targetSymbolId` (strictly existing symbol IDs within `DREAM_SYMBOLS`, no self-references)
    - `targetSymbolName`
    - concise search `query`
    - neutral 1-sentence `context` rationale connecting the two symbols
  - Defined clean interfaces (`RelatedSearchSuggestion`, `SymbolRelatedSearches`) and query utilities (`getRelatedSearchesForSymbol`, `getRelatedSearchIdsForSymbol`, `getAllRelatedSearches`, `hasRelatedSearchesForSymbol`, `getSymbolsReferencingTarget`).
  - Purely observational, non-prescriptive, and content-only; no UI, routes, or existing data files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review and integration.

### H-035 Completion Notes (Antigravity)
- **Status:** done (integrated in `f1dd428`)
- **Changed files:** `src/services/__tests__/astrology.test.ts`
- **Summary of Implementation:**
  - Added focused Jest test coverage for the provider-neutral Astrology validation and deletion helpers in `src/services/astrology.ts`:
    - Minimal, date-only profile validation and local profile normalization.
    - Valid leap-day birth date (`2024-02-29`).
    - Future birth date rejection (`future_date`).
    - Partial birth time rejection (`incomplete_time`).
    - Timezone provided without birth time rejection (`timezone_requires_time`).
    - Invalid IANA timezone rejection when full time is supplied (`invalid_timezone`).
    - Location label length boundary enforcement (`location_too_long` > 120 characters).
    - Store deletion success (`{ ok: true, deleted: true }`).
    - Store deletion failure handling on error (`{ ok: false, error: 'storage_error' }`).
  - No feature files, UI, routes, storage implementations, or astrology providers were added or altered.
- **Validation:**
  - `npx jest src/services/__tests__/astrology.test.ts --watchAll=false` passed: 1 suite passed, 9 tests passed.
  - Full suite `npx jest --watchAll=false` passed: 3 suites passed, 14 tests passed.
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
- **Follow-up:** Ready for Codex review and integration.

### H-036 Completion Notes (Antigravity)
- **Status:** done (integrated in `919675e`)
- **Changed files:** `src/data/dreamImagePromptTemplates.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only set of 7 abstract visual-reflection prompt templates across diverse symbolic motifs:
    1. `threshold-passage` (Threshold): Luminous stone doorway in amber twilight fields.
    2. `reflective-stillness` (Elemental): Glassy alpine lake reflecting silver crescent and constellations.
    3. `canopy-sanctuary` (Atmospheric): Sheltered mossy clearing deep within ancient forest filtered with dawn light.
    4. `celestial-ascent` (Metaphoric): Panoramic vantage above rolling morning cloudbanks under indigo skies.
    5. `unfolding-labyrinth` (Archetypal): Concentric stone pathway winding toward a calm starlit reflecting pool.
    6. `submerged-currents` (Elemental): Bioluminescent fluid ribbons drifting peacefully in deep aquatic currents.
    7. `solitary-beacon` (Archetypal): Weathered bronze lantern illuminating a wooden footbridge over morning valley mist.
  - Sourced each template with:
    - Stable unique `id`
    - Display `title`
    - Symbolic `category` (`threshold`, `elemental`, `atmospheric`, `archetypal`, `metaphoric`)
    - Contemplative `description`
    - Curated abstract `promptText` (intentionally free of raw dream text or sensitive personal narrative)
    - Recommended `recommendedStyle` (`DreamImageStyle`)
    - Atmospheric mood descriptors `suggestedAtmosphere`
  - Defined clean interfaces (`DreamImagePromptTemplate`, `DreamImagePromptTemplateCategory`) and query helpers (`getPromptTemplateById`, `getAllPromptTemplates`, `getPromptTemplatesByCategory`, `getPromptTemplatesByStyle`, `hasPromptTemplate`, `getAllPromptTemplateCategories`, `getDefaultPromptTemplate`).
  - Zero diagnostic, medical, or predictive claims; completely offline and content-only. UI, providers, routes, storage, and credentials left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full test suite `npx jest --watchAll=false` passed with 3 suites and 14 tests passing.
- **Follow-up:** Ready for Codex review and integration.

### H-038 Completion Notes (Antigravity)
- **Status:** done (integrated in `3e76ff3`)
- **Changed files:** `src/data/astrologyReflectionPrompts.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only collection of 12 optional, non-predictive astrology reflection prompts across 6 introspective categories:
    1. **Vitality & Intent** (`vitality-and-intent`, 2 prompts): Creative Spark & Conscious Intent; Illuminating Purpose.
    2. **Emotional Rhythms** (`emotional-rhythms`, 2 prompts): Nocturnal Feelings & Emotional Currents; Emotional Sanctuary & Rest.
    3. **Elemental Metaphors** (`elemental-metaphors`, 2 prompts): Inspiration & Perspective (Fire & Air); Grounding & Depth (Earth & Water).
    4. **Cycles & Transitions** (`cycles-and-transitions`, 2 prompts): Seasons of Change & Natural Timing; The Reflective Pause.
    5. **Inner Dialogue** (`inner-dialogue`, 2 prompts): Navigating Competing Inner Voices; Integrating Unfamiliar Perspectives.
    6. **Open Inquiry & Agency** (`open-inquiry`, 2 prompts): Embracing Mystery & Incomplete Certainty; Personal Resonance Over External Dogma.
  - Sourced each prompt with:
    - Stable unique `id` (e.g. `astro-refl-solar-vitality`)
    - Categorical grouping `category`
    - Contemplative `title`
    - Open-ended, non-predictive `question`
    - Gentle exploratory `considerThis` perspective
    - Optional archetypal motif `symbolicMotif`
  - Defined clean interfaces (`AstrologyReflectionPrompt`, `AstrologyPromptCategory`, `AstrologyCategoryMeta`) and query helpers (`getAstrologyPromptById`, `getAllAstrologyPrompts`, `getAstrologyPromptsByCategory`, `getAllAstrologyPromptCategories`, `hasAstrologyPrompt`, `getAstrologyCategoryMeta`, `getDefaultAstrologyPrompt`).
  - Contains zero calculations, fortune-telling, determinism, or diagnostic claims. Completely offline and content-only. UI, providers, routes, and storage left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (4 suites, 16 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-040 Completion Notes (Antigravity)
- **Status:** done (integrated in `f3acc0d`)
- **Changed files:** `src/data/dreamImageStyleMetadata.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of labels, artistic descriptions, visual characteristics, and accessibility properties for all 4 supported dream image styles (`ethereal`, `surreal`, `watercolor`, `cinematic`).
  - Sourced each style entry with:
    - `style`: `DreamImageStyle` key
    - `label`: Human-readable display label
    - `shortDescription`: Artistic summary of visual aesthetic
    - `visualCharacteristics`: Distinctive lighting, rendering, and textural traits
    - `accessibilityLabel`: Screen reader accessible label
    - `accessibilityHint`: Screen reader hint explaining the aesthetic reflection
  - Defined clean interfaces (`DreamImageStyleMetadata`), constants (`DREAM_IMAGE_STYLES_METADATA`, `DREAM_IMAGE_STYLE_LIST`, `SUPPORTED_DREAM_IMAGE_STYLES`), and helpers (`getDreamImageStyleMetadata`, `getAllDreamImageStyleMetadata`, `getAllDreamImageStyles`, `isValidDreamImageStyle`, `getStyleAccessibilityLabel`, `getStyleAccessibilityHint`).
  - Kept descriptions strictly artistic, optional, and non-interpretive; zero UI, provider, storage, or credential modifications.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (8 suites, 33 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-044 is queued next for Antigravity.

### H-044 Completion Notes (Antigravity)
- **Status:** done (integrated in `71c2223`)
- **Changed files:** `src/data/astrologyPlacementGlossary.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only glossary of non-predictive, archetypal entries covering:
    - **11 Celestial Bodies:** Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, and Ascendant.
    - **12 Zodiac Signs:** Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces.
  - Sourced each entry with:
    - Stable unique `id` (e.g. `body-sun`, `sign-aries`)
    - Display `name`
    - High-level `archetypalTheme`
    - Gentle, non-predictive `contemplativePerspective`
    - Distinctive symbolic `keywords`
    - Element and Modality tags for zodiac signs (`element`: Fire/Earth/Air/Water, `modality`: Cardinal/Fixed/Mutable)
  - Defined clean data interfaces (`AstrologyBodyGlossaryEntry`, `AstrologySignGlossaryEntry`, `AstrologyPlacementGlossaryEntry`) and lookup helpers (`getBodyGlossaryEntry`, `getSignGlossaryEntry`, `getGlossaryEntryByName`, `getAllBodyGlossaryEntries`, `getAllSignGlossaryEntries`, `getAllPlacementGlossaryEntries`, `getSignsByElement`, `getSignsByModality`, `hasBodyGlossaryEntry`, `hasSignGlossaryEntry`).
  - Zero claims regarding fortunes, fatalism, or diagnoses; strictly reflective and educational. Left UI, routes, services, providers, storage, and credentials untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (8 suites, 33 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-047 is queued next for Antigravity.

### H-047 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageConsentCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only copy bundle for optional Dream Image features across 4 critical user flows:
    1. **Consent Flow (`consent`):** Explicit modal/sheet headers, summaries, checkboxes, network disclosures, non-interpretive disclaimers, and action buttons. Clearly emphasizes that curated abstract scene prompts—never personal dream narratives—leave the device.
    2. **Provider Unavailable State (`unavailable`):** Informative preview badges, titles, descriptions, and safe local browsing reassurance.
    3. **Generation Pending State (`pending`):** Calm activity titles, progress messaging, timing expectations, and privacy reassurance.
    4. **Local Deletion State (`deletion`):** Confirmation dialog titles, clear scope warnings (deleting generated image only while preserving the dream entry/analysis), and confirmation/cancellation buttons.
  - Defined clean interfaces (`DreamImageConsentCopy`, `DreamImageUnavailableCopy`, `DreamImagePendingCopy`, `DreamImageDeletionCopy`, `DreamImageCopyBundle`) and getters (`getDreamImageConsentCopy`, `getDreamImageUnavailableCopy`, `getDreamImagePendingCopy`, `getDreamImageDeletionCopy`, `getDreamImageCopyBundle`).
  - Completely non-interpretive and privacy-focused; no UI, routes, services, providers, storage, credentials, or existing data files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (8 suites, 33 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-051 is queued next for Antigravity.

### H-051 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyAspectGlossary.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of non-predictive, archetypal glossary entries for all 5 major Ptolemaic aspect types returned by chart calculations:
    1. **Conjunction (`conjunction`):** 0° geometric angle, fusion relationship dynamic, concentrated focus archetypal theme, reflective invitation on unified intentions, screen-reader accessibility description.
    2. **Sextile (`sextile`):** 60° geometric angle, opportunity relationship dynamic, supportive creative dialogue and open affinity, screen-reader accessibility description.
    3. **Square (`square`):** 90° geometric angle, tension relationship dynamic, dynamic friction and catalytic crossroads, screen-reader accessibility description.
    4. **Trine (`trine`):** 120° geometric angle, flow relationship dynamic, natural resonance and effortless harmonic grace, screen-reader accessibility description.
    5. **Opposition (`opposition`):** 180° geometric angle, polarity relationship dynamic, complementary polar perspective and relational balance, screen-reader accessibility description.
  - Sourced each entry with:
    - Stable unique `id` (e.g. `aspect-conjunction`)
    - Normalized lowercase `type` (`MajorAspectType`)
    - Display `name` (e.g. `'Conjunction'`)
    - Exact `angleDegrees` (0, 60, 90, 120, 180)
    - `relationshipDynamic` ('fusion' | 'opportunity' | 'tension' | 'flow' | 'polarity')
    - `archetypalTheme` title
    - Non-predictive, introspective `contemplativePerspective`
    - Distinctive symbolic `keywords`
    - Explicit `accessibilityDescription` for assistive tech / screen readers
  - Defined clean interfaces (`MajorAspectType`, `AstrologyAspectGlossaryEntry`), constants (`ASTROLOGY_ASPECT_GLOSSARY`, `MAJOR_ASPECT_TYPES`), and helper functions:
    - `getAspectGlossaryEntry(aspectType)` (case-insensitive lookup by name or type)
    - `getAllAspectGlossaryEntries()`
    - `getAllMajorAspectTypes()`
    - `hasAspectGlossaryEntry(aspectType)`
    - `isValidMajorAspectType(value)` (TypeScript type guard)
    - `getAspectAccessibilityDescription(aspectType)`
  - Strictly educational, symbolic, non-predictive, and non-diagnostic; zero fortunes, diagnoses, or determinism. UI, routes, services, providers, storage, credentials, and existing data files left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (8 suites, 34 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-054 is queued next for Antigravity.

### H-054 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageSafetyGuidelines.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only safety and accessibility guidance module for curated Dream Image generation across the four specified boundaries:
    1. **Disallow Raw Journal Text (`raw-journal`):** Ensures unedited dream diary entries, vulnerable personal logs, and subconscious text stay strictly on-device; prompts must always be curated into abstract, symbolic scenes.
    2. **Disallow Personal Identifiers (`personal-identifiers`):** Eliminates living persons' real names, addresses, phone numbers, and PII; encourages universal archetypes (traveler, guide) and metaphorical landscapes.
    3. **Disallow Medical & Predictive Claims (`medical-predictive`):** Prohibits clinical diagnoses, psychological assessments, therapy prescriptions, and deterministic fortune-telling; frames imagery strictly as open-ended artistic reflection.
    4. **Disallow Inaccessible Alt Text (`accessibility`):** Prohibits empty alt text, raw filenames, or non-descriptive placeholders (e.g. "image", "photo"); mandates descriptive visual summaries conveying medium, subject, lighting, and palette under WCAG 2.1 AA standards.
  - Provided a structured review checklist (`DREAM_IMAGE_SAFETY_CHECKLIST`) for easy presentation in consent modals or validation sheets.
  - Defined clean interfaces (`DreamImageSafetyCategory`, `DreamImageSafetyGuideline`, `DreamImageSafetyChecklistItem`), constants (`DREAM_IMAGE_SAFETY_GUIDELINES`, `DREAM_IMAGE_SAFETY_CATEGORIES`, `DREAM_IMAGE_SAFETY_CHECKLIST`), and query/validation helpers:
    - `getSafetyGuidelineById(id)`
    - `getSafetyGuidelinesByCategory(category)`
    - `getAllSafetyGuidelines()`
    - `getAllSafetyCategories()`
    - `hasSafetyGuideline(id)`
    - `getSafetyChecklist()`
    - `isValidSafetyCategory(value)` (TypeScript type guard)
    - `isDescriptiveAltText(altText)` (evaluates minimum accessibility standards, checks placeholders & filenames)
    - `getAccessibilityAltTextGuidance()`
  - Content-only and privacy-centric; zero modifications to UI, routes, services, providers, storage, credentials, or existing data files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (9 suites, 38 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-055 is queued next for Antigravity.

### H-055 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyConsentCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only user copy bundle for the optional Astrology feature across four key states:
    1. **Consent Flow (`consent`):** Explicit modal and card headers, summary explanation, checkbox agreement label matching existing UI patterns, external processing notice clarifying that birth coordinates/times are sent externally for calculation while dream journals remain offline, non-predictive/non-factual disclaimers, and clear confirm/cancel button labels.
    2. **Provider Unavailable State (`unavailable`):** Informative badge label, title, description, and safe offline browsing reassurance for placement/aspect glossaries.
    3. **Processing Pending State (`pending`):** Separate title and description copy for both chart calculation and AI reflection synthesis, stateless external processing reassurance, and duration guidance.
    4. **Local Deletion State (`deletion`):** Confirmation dialog title, dialog warning message specifying removal of local birth profile, chart, and reflection, confirm/cancel action labels, and post-deletion success message.
  - Defined clean interfaces (`AstrologyConsentCopy`, `AstrologyUnavailableCopy`, `AstrologyPendingCopy`, `AstrologyDeletionCopy`, `AstrologyCopyBundle`), constants (`ASTROLOGY_CONSENT_COPY`, `ASTROLOGY_UNAVAILABLE_COPY`, `ASTROLOGY_PENDING_COPY`, `ASTROLOGY_DELETION_COPY`, `ASTROLOGY_COPY_BUNDLE`), and lookup helpers:
    - `getAstrologyConsentCopy()`
    - `getAstrologyUnavailableCopy()`
    - `getAstrologyPendingCopy()`
    - `getAstrologyDeletionCopy()`
    - `getAstrologyCopyBundle()`
  - Strictly non-predictive, non-diagnostic, and non-fatalistic; zero modifications to UI, routes, services, providers, storage, credentials, or existing data files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (10 suites, 41 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-059 is queued next for Antigravity.

### H-059 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyUncertaintyCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only educational dataset detailing astronomical and interpretive uncertainty across all three chart precision tiers:
    1. **Date Only (`date-only`):** Broad daily overview; clarifies that without a birth time, the local horizon (Ascendant), houses 1–12, and rapid lunar movements (up to ~13° daily variance) cannot be determined; calculations use a midday UTC snapshot.
    2. **Date & Time (`date-and-time`):** Approximate house cusps and Moon position; explains that omitted IANA timezone identifiers may result in civil timezone or historical daylight saving time (DST) shifts of up to one hour (~15° Ascendant shift).
    3. **Date, Time & Timezone (`date-time-timezone`):** High-resolution mathematical ephemeris; explains limitations arising from historical birth-certificate clock rounding (e.g. to nearest 15 minutes) and differences across mathematical house system models (e.g. Placidus vs. Whole Sign).
  - Sourced each precision tier with:
    - Stable `precision` key (`AstrologyPrecision`)
    - Display `label`
    - Concise `summary`
    - Detailed astronomical `explanation`
    - Explicit arrays of `stableFactors` and `uncertainFactors`
    - Standalone `uncertaintyNotes` bullets directly consumable by `AstrologyChart.uncertaintyNotes`
    - Contemplative, non-predictive `contemplativePerspective`
    - Screen-reader `accessibilityDescription`
  - Defined clean interfaces (`AstrologyPrecisionUncertainty`, `AstrologyUncertaintyCopyBundle`), constants (`ASTROLOGY_PRECISION_UNCERTAINTY`, `ASTROLOGY_UNCERTAINTY_COPY`, `SUPPORTED_ASTROLOGY_PRECISIONS`), and query helpers:
    - `getUncertaintyCopyByPrecision(precision)`
    - `getUncertaintyNotesForPrecision(precision)`
    - `getAllPrecisionUncertainties()`
    - `isSupportedAstrologyPrecision(precision)` (TypeScript type guard)
    - `getPrecisionAccessibilityLabel(precision)`
    - `getPrecisionContemplativeNote(precision)`
  - Completely non-predictive, non-diagnostic, and humble framing with zero accuracy or fatalistic guarantees; no UI, routes, services, providers, storage, credentials, or existing data files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (10 suites, 41 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-060 is queued next for Antigravity.

### H-060 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyHouseGlossary.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only glossary of non-predictive, archetypal entries for all 12 astrological houses:
    1. **First House (`house-1`):** Angular; self-presentation, emergence & personal vitality (`Vita`); threshold where consciousness steps into the world; screen-reader accessibility description.
    2. **Second House (`house-2`):** Succedent; personal resources, grounding & inner value (`Lucrum`); subterranean foundation nurturing stability; screen-reader accessibility description.
    3. **Third House (`house-3`):** Cadent; curiosity, everyday exchange & inquiring mind (`Fratres`); local pathways, footpaths, and daily dialogue; screen-reader accessibility description.
    4. **Fourth House (`house-4`):** Angular; roots, sanctuary & inner foundations (`Genitor`); the nadir (IC), roots of the tree, and private emotional grounding; screen-reader accessibility description.
    5. **Fifth House (`house-5`):** Succedent; playful creativity, joy & vital spontaneity (`Nati`); artistic celebration and heartfelt creative delight; screen-reader accessibility description.
    6. **Sixth House (`house-6`):** Cadent; daily rhythms, mindful care & dedicated craft (`Valetudo`); workshop and daily garden tending physical vitality; screen-reader accessibility description.
    7. **Seventh House (`house-7`):** Angular; relational mirroring, mutuality & partnership (`Uxor`); setting horizon and conscious encounter with the other; screen-reader accessibility description.
    8. **Eighth House (`house-8`):** Succedent; shared depths, vulnerability & regeneration (`Mors`); threshold of dusk, shared emotional depths, and renewal; screen-reader accessibility description.
    9. **Ninth House (`house-9`):** Cadent; expansive horizons, wisdom seeking & worldview (`Iter`); open seas, distant passes, and philosophical inquiry; screen-reader accessibility description.
    10. **Tenth House (`house-10`):** Angular; public contribution, vocation & purposeful calling (`Regnum`); midday zenith (MC), visible contribution, and community service; screen-reader accessibility description.
    11. **Eleventh House (`house-11`):** Succedent; collective vision, fellowship & shared ideals (`Benefacta`); community circles and collaborative future hopes; screen-reader accessibility description.
    12. **Twelfth House (`house-12`):** Cadent; solitude, transcendent quiet & subconscious rest (`Carcer`); pre-dawn sky, dream space, and restorative retreat; screen-reader accessibility description.
  - Sourced each entry with:
    - Stable unique `id` (e.g. `house-1`)
    - Exact `house` number (`HouseNumber`, 1–12)
    - Display `name` (e.g. `'First House'`)
    - Traditional descriptive `traditionalName`
    - Historical Latin archetypal designation `latinMotto`
    - Structural `classification` ('angular' | 'succedent' | 'cadent')
    - Concise `archetypalTheme`
    - Historical symbolic `traditionalMetaphor`
    - Non-predictive `contemplativePerspective`
    - Distinctive symbolic `keywords`
    - Screen-reader `accessibilityDescription`
  - Defined clean interfaces (`HouseNumber`, `HouseClassification`, `AstrologyHouseGlossaryEntry`), constants (`ASTROLOGY_HOUSE_GLOSSARY`, `ALL_HOUSE_NUMBERS`), and lookup helpers:
    - `getHouseGlossaryEntry(house)` (flexible lookup accepting number 1–12, string '1', 'house-1', 'First House', 'first', etc.)
    - `getAllHouseGlossaryEntries()`
    - `getAllHouseNumbers()`
    - `hasHouseGlossaryEntry(house)`
    - `isValidHouseNumber(value)` (TypeScript type guard)
    - `getHousesByClassification(classification)`
    - `getHouseAccessibilityDescription(house)`
  - Educational, symbolic, non-predictive, and non-diagnostic; zero fatalism, fortune-telling, or psychological assessment. UI, routes, services, providers, storage, credentials, and existing data files left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (10 suites, 41 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-062 is queued next for Antigravity.

### H-062 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageAltTextTemplates.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of accessible alternative text templates corresponding to all 7 curated prompt templates in `src/data/dreamImagePromptTemplates.ts`:
    1. **Luminous Threshold (`threshold-passage`):** Ancient stone doorway standing open in a meadow of tall grass, glowing with warm amber light beneath violet clouds and constellations.
    2. **Mirror of Stillness (`reflective-stillness`):** Glassy alpine lake at dusk mirroring a slender crescent moon and silver constellations with shoreline river stones.
    3. **Forest Sanctuary (`canopy-sanctuary`):** Ancient forest clearing with a smooth central resting stone beneath spiraling tree boughs and sunbeams filtering through mist.
    4. **Celestial Ascent (`celestial-ascent`):** High-altitude horizon looking out across rolling white clouds at sunrise with warm golden light stretching toward an indigo sky and drifting feathers.
    5. **Unfolding Pathway (`unfolding-labyrinth`):** Concentric spiral labyrinth of low weathered stones in mossy earth winding toward a circular reflecting pool beneath twilight stars.
    6. **Oceanic Depths (`submerged-currents`):** Deep underwater scene with fluid currents carrying ribbons of soft aquamarine bioluminescence and shimmering silver particles through dark blue water.
    7. **Guiding Beacon (`solitary-beacon`):** Weathered bronze lantern casting warm golden light onto a wooden footbridge spanning morning valley mist toward rolling hills.
  - Sourced each template with:
    - `templateId` matching `DreamImagePromptTemplate.id`
    - `templateTitle`
    - Objective `visibleScene` description detailing physical subjects and spatial layout
    - Visible `lighting` qualities and direction
    - Dominant `palette` colors
    - Universal `baseAltText`
    - Medium-tailored `styleAltText` map covering all 4 supported styles (`ethereal`, `surreal`, `watercolor`, `cinematic`)
    - `recommendedStyle` key
  - Defined clean interfaces (`DreamImageAltTextTemplate`), constants (`DREAM_IMAGE_ALT_TEXT_TEMPLATES`), and query/formatting helpers:
    - `getAltTextTemplateByTemplateId(templateId)`
    - `getAllAltTextTemplates()`
    - `hasAltTextTemplate(templateId)`
    - `getAltTextForTemplate(templateId, style?)` (resolves style-tailored variant or falls back gracefully)
    - `getVisibleSceneDescription(templateId)`
    - `composeAccessibleAltText(visibleScene, style)` (formats custom descriptions to WCAG standards)
  - Strictly describes only visible physical scenes, medium, lighting, and palette; completely avoids psychological interpretations, emotion claims, or personal data. UI, routes, services, providers, storage, credentials, and existing data files left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (10 suites, 42 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-064 is queued next for Antigravity.

### H-064 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyBodyAliases.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only alias mapping and normalization system resolving external calculation engine labels to canonical glossary names:
    1. **Primary Luminaries & Planets (10):** `Sun`, `Moon`, `Mercury`, `Venus`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`, `Pluto` (mapping common abbreviations and classical names like Sol, Luna, Hermes, Ares, Zeus, Cronus, Ouranos, Poseidon, Hades).
    2. **Angles (2):** `Ascendant` (mapping `ASC`, `AS`, `rising`, `rising sign`, `eastern horizon`) and `Midheaven` (mapping `MC`, `medium coeli`, `mediumcoeli`, `zenith`).
    3. **Lunar Nodes (2):** `True Node` (handling spacing/case/hyphen/underscore variants like `truenode`, `true_node`, `true-node`, `north node`, `north_node`, `node`, `rahu`, `mean node`, `meannode`) and `South Node` (`southnode`, `south_node`, `ketu`, `cauda draconis`).
    4. **Centaur, Lunar Point & Asteroids (6):** `Chiron` (`kheiron`), `Lilith` (`black moon lilith`, `blackmoonlilith`, `black_moon_lilith`, `bml`, `true lilith`), `Ceres` (`demeter`), `Pallas` (`pallas athena`, `pallas_athena`, `pallasathena`, `athena`), `Juno` (`hera`), and `Vesta` (`hestia`).
  - Defined clean interfaces (`AstrologyBodyAliasEntry`), constants (`ASTROLOGY_BODY_ALIAS_ENTRIES`, `ASTROLOGY_BODY_ALIAS_MAP`, `CANONICAL_BODY_NAMES`), and query/normalization helpers:
    - `normalizeBodyLabel(rawLabel)` (standardizes spacing, hyphens, and underscores)
    - `getCanonicalBodyName(rawLabel)` (resolves case-insensitive, punctuation-tolerant, and compact alias lookups)
    - `hasBodyAlias(rawLabel)`
    - `getAliasesForCanonicalBody(canonicalName)`
    - `getAllCanonicalBodyNames()`
    - `isCanonicalBodyName(name)` (TypeScript type guard)
  - Completely non-predictive, structural, and content-only; zero modifications to UI, routes, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (10 suites, 44 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-066 is queued next for Antigravity.

### H-066 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyMinorBodyGlossary.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only glossary of non-predictive, archetypal entries for provider-returned lunar nodes, centaurs, lunar points, and asteroids:
    1. **True Node (`minor-true-node`):** Lunar ascending node; emergent growth edge and unfolding potential; Caput Draconis / Dragon's Head metaphor; screen-reader accessibility description.
    2. **Chiron (`minor-chiron`):** Centaur body; vulnerability, empathy & integrative wisdom; wounded healer and mentor of myth; screen-reader accessibility description.
    3. **Lilith (`minor-lilith`):** Lunar apogee; instinctual autonomy, raw authenticity & untamed wilderness; Black Moon metaphor; screen-reader accessibility description.
    4. **Ceres (`minor-ceres`):** Asteroid / dwarf planet; nourishment, caregiving & cycles of renewal; harvest goddess (Demeter) metaphor; screen-reader accessibility description.
    5. **Pallas (`minor-pallas`):** Main-belt asteroid; strategic insight, pattern recognition & creative intellect; Pallas Athena metaphor; screen-reader accessibility description.
    6. **Juno (`minor-juno`):** Main-belt asteroid; commitment, mutuality & relational equality; sacred alliance (Hera) metaphor; screen-reader accessibility description.
    7. **Vesta (`minor-vesta`):** Main-belt asteroid; sacred focus, inner flame & dedicated devotion; hearth keeper (Hestia) metaphor; screen-reader accessibility description.
  - Sourced each entry with:
    - Stable unique `id`
    - Canonical `name`
    - Structural `category` ('node' | 'centaur' | 'point' | 'asteroid')
    - Educational `astronomicalNature` description
    - High-level `archetypalTheme`
    - Historical `traditionalMetaphor`
    - Non-predictive `contemplativePerspective`
    - Distinctive symbolic `keywords`
    - Screen-reader `accessibilityDescription`
  - Defined clean interfaces (`MinorBodyCategory`, `AstrologyMinorBodyGlossaryEntry`), constants (`ASTROLOGY_MINOR_BODY_GLOSSARY`, `ALL_MINOR_BODY_NAMES`), and query helpers:
    - `getMinorBodyGlossaryEntry(bodyName)` (supports direct ID/name matches as well as alias resolution via `astrologyBodyAliases`)
    - `getAllMinorBodyGlossaryEntries()`
    - `getAllMinorBodyNames()`
    - `hasMinorBodyGlossaryEntry(bodyName)`
    - `getMinorBodiesByCategory(category)`
    - `getMinorBodyAccessibilityDescription(bodyName)`
  - Completely non-predictive, non-diagnostic, and content-only; zero modifications to UI, routes, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (10 suites, 45 tests passing).
- **Follow-up:** Ready for Codex review and integration. H-068 is queued next for Antigravity.

### H-068 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyAngleGlossary.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only glossary of non-predictive, archetypal entries for the principal astronomical chart angles:
    1. **Ascendant (`angle-ascendant`):** Eastern horizon angle (`ASC`, Horoskopos / Ascendens, House 1); threshold of emergence, presence & personal orientation; dawn portal metaphor where consciousness steps into the world; screen-reader accessibility description.
    2. **Midheaven (`angle-midheaven`):** Southern meridian angle (`MC`, Medium Coeli, House 10); purposeful calling, vocation & visible contribution; midday culmination and zenith metaphor; screen-reader accessibility description.
  - Sourced each entry with:
    - Stable unique `id`
    - Normalized lowercase `angle` key (`ChartAngle`: `'ascendant' | 'midheaven'`)
    - Canonical `name`
    - Astronomical `abbreviation` (`ASC`, `MC`)
    - Classical Latin/Greek `classicalTerm`
    - Precise `astronomicalDefinition`
    - Associated quadrant house number `associatedHouse` (1 and 10)
    - High-level `archetypalTheme`
    - Historical `traditionalMetaphor`
    - Non-predictive `contemplativePerspective`
    - Distinctive symbolic `keywords`
    - Screen-reader `accessibilityDescription`
  - Defined clean interfaces (`ChartAngle`, `AstrologyAngleGlossaryEntry`), constants (`ASTROLOGY_ANGLE_GLOSSARY`, `CHART_ANGLE_KEYS`), and query helpers:
    - `getAngleGlossaryEntry(angleName)` (supports direct ID, angle key, abbreviation, canonical name, and alias variants via `astrologyBodyAliases`)
    - `getAllAngleGlossaryEntries()`
    - `getAllAngleKeys()`
    - `hasAngleGlossaryEntry(angleName)`
    - `isValidChartAngle(value)` (TypeScript type guard)
    - `getAngleAccessibilityDescription(angleName)`
  - Educational, symbolic, non-predictive, and non-diagnostic; zero claims of fatalism, fortune-telling, or psychological assessment. UI, routes, services, providers, storage, credentials, and existing files left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (11 suites, 49 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-072 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageFailureCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only recovery and error message dataset covering all five failure states of the optional Dream Image flow:
    1. **Offline (`offline`):** Explains that image generation requires an active network connection, instructs user to check Wi-Fi/mobile data, marks retryable, and reassures that local journal entries remain safe and private.
    2. **Provider Unavailable (`provider-unavailable`):** Explains that the visual reflection service is temporarily offline or unconfigured, invites continued offline exploration of scene templates and styles, marks non-retryable, and confirms no data left the device.
    3. **Moderation Rejected (`moderation-rejected`):** Explains that the scene description did not meet safety guidelines, recommends choosing a pre-curated catalog template that avoids personal identifiers, marks non-retryable, and confirms raw journal text remains strictly local.
    4. **Rate Limited (`rate-limited`):** Explains that the request limit was reached for the session, recommends waiting a short while before requesting another reflection, and reassures preserved local entries.
    5. **Retryable Failure (`retryable-failure`):** Explains a temporary network or server interruption, suggests waiting a moment and trying again, marks retryable, and reassures dream narrative privacy.
  - Sourced each state entry with:
    - State key `state` (`DreamImageFailureState`)
    - Dialog/card `title`
    - Educational `message`
    - Actionable `recoveryAction`
    - Boolean `retryable` flag
    - Local `privacyReassurance` statement
    - User-facing `actionButtonLabel`
  - Defined clean interfaces (`DreamImageFailureState`, `DreamImageFailureEntry`), constants (`DREAM_IMAGE_FAILURE_COPY`, `DREAM_IMAGE_FAILURE_STATES`), and query/resolver helpers:
    - `getDreamImageFailureCopy(state)`
    - `getAllDreamImageFailureStates()`
    - `getAllDreamImageFailureEntries()`
    - `isRetryableFailure(state)`
    - `isRecognizedFailureState(value)` (TypeScript type guard)
    - `resolveDreamImageFailure(error)` (maps Error instances, HTTP status phrases, or strings to the matching failure entry)
  - Concise, non-interpretive, privacy-focused, and free of provider promises; zero modifications to UI, routes, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (11 suites, 50 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-074 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageResultActionsCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only action and confirmation dataset for future generated Dream Image result flows:
    1. **Regenerate (`regenerate`):** Explains creating another artistic interpretation of the current curated scene and chosen style; confirmation dialog verifies that the written dream entry remains unchanged; confirms personal dream text is never sent.
    2. **Save Locally (`saveLocally`):** Explains saving the image directly to device photos; explicitly confirms that only the visual artwork is saved and no journal narratives, dates, or interpretations are embedded into file metadata.
    3. **Share (`share`):** Explains opening system sharing with the artwork and descriptive alt text; explicitly guarantees that private dream journal text, interpretations, and notes are never attached or shared.
    4. **Delete (`delete`):** Explains removing the image file from local device storage; confirmation dialog verifies that the written dream entry, tags, and Jungian analysis remain completely preserved.
  - Sourced each action with:
    - Action key `key` (`DreamImageResultActionKey`)
    - Full button label `label`
    - Short button label `shortLabel`
    - Descriptive explanation `description`
    - Screen-reader accessible label `accessibilityLabel`
    - Screen-reader accessible hint `accessibilityHint`
    - Local `privacyNotice` confirming that journal text is never embedded or shared
    - User-facing `successNotice`
    - Optional `confirmation` dialog copy (`dialogTitle`, `dialogMessage`, `confirmLabel`, `cancelLabel`) for regenerate and delete
  - Defined clean interfaces (`DreamImageResultActionKey`, `DreamImageActionConfirmation`, `DreamImageResultActionCopy`, `DreamImageResultActionsBundle`), constants (`DREAM_IMAGE_RESULT_ACTIONS`, `DREAM_IMAGE_RESULT_ACTIONS_BUNDLE`, `DREAM_IMAGE_RESULT_ACTION_KEYS`), and query helpers:
    - `getResultActionCopy(key)`
    - `getAllResultActionKeys()`
    - `getAllResultActionCopies()`
    - `getResultActionAccessibilityLabel(key)`
    - `getResultActionPrivacyNotice(key)`
    - `isRecognizedResultActionKey(value)` (TypeScript type guard)
  - Completely privacy-preserving and non-interpretive; zero modifications to UI, routes, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (12 suites, 53 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-076 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageProgressCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of user-facing status labels, accessible announcements, step indicators, and privacy reassurances for all active phases of the optional Dream Image generation workflow:
    1. **Queued (`queued`, Step 1 of 4):** Explains that the request is in queue awaiting image service capacity; announces preparing curated prompt and style; explicitly reminds users that only the curated scene template and style are processed while raw dream journal text stays strictly local.
    2. **Moderating (`moderating`, Step 2 of 4):** Explains verifying that the curated scene description meets community safety guidelines before rendering; announces prompt safety check; confirms raw journal entries and personal reflections are never inspected or transmitted.
    3. **Rendering (`rendering`, Step 3 of 4):** Explains creating an artistic visual interpretation from the selected scene template and art style; avoids interpretation claims (strictly visual/artistic reflection, no claims of dream decoding); explicitly confirms no personal dream narratives or dates are included in rendering.
    4. **Finalizing (`finalizing`, Step 4 of 4):** Explains preparing the rendered reflection image and descriptive alternative text for local display; confirms that the reflection is delivered without modifying or exporting saved dream journal entries.
  - Sourced each state entry with:
    - State key `state` (`DreamImageProgressState`)
    - Status title `label`
    - Compact label `shortLabel`
    - Informative explanation `description` (strictly timing-promise free)
    - Screen-reader accessible label `accessibilityLabel`
    - Contextual screen-reader hint `accessibilityHint`
    - Screen-reader live region announcement `liveRegionAnnouncement`
    - Reassurance statement `privacyReassurance`
    - Sequential step number `stepNumber` and total steps count `totalSteps`
  - Defined clean interfaces (`DreamImageProgressState`, `DreamImageProgressEntry`, `DreamImageProgressBundle`), constants (`DREAM_IMAGE_PROGRESS_COPY`, `DREAM_IMAGE_PROGRESS_BUNDLE`, `DREAM_IMAGE_PROGRESS_STATES`), and query/navigation helpers:
    - `getDreamImageProgressCopy(state)`
    - `getAllDreamImageProgressStates()`
    - `getAllDreamImageProgressEntries()`
    - `getProgressAccessibilityLabel(state)`
    - `getProgressAccessibilityHint(state)`
    - `getProgressAnnouncement(state)`
    - `getProgressPrivacyReassurance(state)`
    - `getProgressStep(state)`
    - `isRecognizedProgressState(value)` (TypeScript type guard)
    - `getNextProgressState(current)`
    - `getPreviousProgressState(current)`
  - Completely privacy-preserving, non-interpretive, timing-guarantee free; zero modifications to UI, routes, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (13 suites, 56 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-077 loading UI.

### H-078 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyProviderErrorCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of user-facing recovery messages, actionable guidance, and local data preservation guarantees across all failure states of the optional Astrology flow:
    1. **Disabled (`disabled`):** Explains that optional astrology reflection is not enabled or configured for the build; invites exploring local dream journal and techniques; confirms entered birth profile remains stored locally and not transmitted.
    2. **Offline (`offline`):** Explains that calculating an astrology chart requires an active network connection to reach calculation endpoints; guides user to verify Wi-Fi/mobile data; marks retryable; confirms profile and dream entries remain stored safely on device.
    3. **Invalid Provider Response (`invalid-provider-response`):** Explains that the external calculation service responded with incomplete or unparseable astronomical data; suggests verifying birth date, time, and coordinates; marks retryable; confirms profile details remain intact locally so user does not need to re-enter info.
    4. **Rate Limited (`rate-limited`):** Explains that session calculation or reflection request threshold has been reached; advises waiting a few moments; confirms previously calculated charts and profile remain safely accessible locally.
    5. **Reflection Unavailable (`reflection-unavailable`):** Explains that the AI symbolic reflection service is temporarily offline or unconfigured; guides user to explore calculated chart placements, signs, and symbolic aspects locally; confirms calculated chart placements and profile remain fully preserved on device.
  - Sourced each state entry with:
    - State key `state` (`AstrologyProviderErrorState`)
    - Dialog/card header title `title`
    - Educational issue explanation `message`
    - Actionable remedy `recoveryAction`
    - Boolean `retryable` flag
    - Local data safety statement `localDataPreservation`
    - User-facing button label `actionButtonLabel`
  - Defined clean interfaces (`AstrologyProviderErrorState`, `AstrologyProviderErrorEntry`, `AstrologyProviderErrorBundle`), constants (`ASTROLOGY_PROVIDER_ERROR_COPY`, `ASTROLOGY_PROVIDER_ERROR_BUNDLE`, `ASTROLOGY_PROVIDER_ERROR_STATES`), and query/resolution helpers:
    - `getAstrologyProviderErrorCopy(state)`
    - `getAllAstrologyProviderErrorStates()`
    - `getAllAstrologyProviderErrorEntries()`
    - `isRetryableProviderError(state)`
    - `isRecognizedProviderErrorState(value)` (TypeScript type guard)
    - `resolveAstrologyProviderError(error)` (maps Error instances, status codes, or strings to matching typed failure entries)
  - Educational, non-predictive, non-diagnostic, and privacy-first; zero modifications to UI, routes, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (14 suites, 58 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-079 request UI.

### H-080 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyProgressCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of user-facing status labels, accessible announcements, step indicators, and privacy reassurances across all active phases of the optional Astrology workflow:
    1. **Validating Inputs (`validating-inputs`, Calculation Phase, Step 1 of 4):** Explains checking birth date, optional time, and geographic coordinates for chart calculation; announces checking inputs; explicitly confirms validation occurs locally on device and form entries stay on screen until calculation succeeds.
    2. **Calculating Placements (`calculating-placements`, Calculation Phase, Step 2 of 4):** Explains requesting symbolic planetary placements and aspect angles from the calculation service; announces calculating placements from birth data; explicitly confirms dream journal entries are never included.
    3. **Saving Locally (`saving-locally`, Calculation Phase, Step 3 of 4):** Explains storing calculated placements and birth profile in local device storage; announces local storage operation; confirms all calculations and profile remain private and local.
    4. **Generating Reflection (`generating-reflection`, Reflection Phase, Step 4 of 4):** Explains composing an optional symbolic reflection from calculated chart placements and aspect relationships; strictly avoids predictive or diagnostic claims; announces reflection composition; explicitly distinguishes AI reflection from astronomical calculation and confirms dream journal text is never sent.
  - Sourced each state entry with:
    - State key `state` (`AstrologyProgressState`)
    - Pipeline phase `phase` (`AstrologyProgressPhase`: `'calculation'` vs `'reflection'`)
    - Status title `label`
    - Compact label `shortLabel`
    - Educational issue description `description` (strictly timing-promise free)
    - Screen-reader accessible label `accessibilityLabel`
    - Contextual screen-reader hint `accessibilityHint`
    - Screen-reader live region announcement `liveRegionAnnouncement`
    - Reassurance statement `privacyReassurance`
    - Sequential step number `stepNumber` and total steps count `totalSteps`
  - Defined clean interfaces (`AstrologyProgressState`, `AstrologyProgressPhase`, `AstrologyProgressEntry`, `AstrologyProgressBundle`), constants (`ASTROLOGY_PROGRESS_COPY`, `ASTROLOGY_PROGRESS_BUNDLE`, `ASTROLOGY_PROGRESS_STATES`), and query/navigation helpers:
    - `getAstrologyProgressCopy(state)`
    - `getAllAstrologyProgressStates()`
    - `getAllAstrologyProgressEntries()`
    - `getAstrologyProgressEntriesByPhase(phase)`
    - `getProgressPhase(state)`
    - `isCalculationPhase(state)`
    - `isReflectionPhase(state)`
    - `getAstrologyProgressAccessibilityLabel(state)`
    - `getAstrologyProgressAccessibilityHint(state)`
    - `getAstrologyProgressAnnouncement(state)`
    - `getAstrologyProgressPrivacyReassurance(state)`
    - `getAstrologyProgressStep(state)`
    - `isRecognizedAstrologyProgressState(value)` (TypeScript type guard)
    - `resolveAstrologyProgressState(value)` (supports canonical and shorthand alias strings)
    - `getNextAstrologyProgressState(current)`
    - `getPreviousAstrologyProgressState(current)`
  - Completely privacy-preserving, non-predictive, non-diagnostic, timing-guarantee free; clearly distinguishes chart calculation from AI reflection; zero modifications to UI, routes, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (15 suites, 62 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-081 request UI.

### H-082 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyCoordinateHelpCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only educational dataset and accessible guidance bundle explaining:
    1. **Why Coordinates Are Needed (`why-required`):** Explains that astronomical chart calculations model the sky as seen from an observer's physical vantage point on Earth; while planetary sign positions are broadly consistent worldwide on a given date, local horizon angles (Ascendant/rising sign and Midheaven) and house cusps directly depend on geographic coordinates.
    2. **Valid Ranges (`valid-ranges`):** Defines numerical boundaries for latitude (-90° to +90°, with + for North and - for South) and longitude (-180° to +180°, with + for East and - for West), prohibiting special character symbols or direction letters.
    3. **Decimal Format & Examples (`format-examples`):** Explains standard decimal degree formatting with plain numbers (e.g. 40.7128 and -74.0060); includes concrete city examples across all hemispheres (New York, London, Tokyo, Sydney, São Paulo); reassures dreamers that general city-center coordinates found in web maps are ideal and protect address privacy.
    4. **Boundary-Location Uncertainty (`boundary-uncertainty`):** Details how approximate coordinates or birthplaces near administrative timezone boundaries or extreme polar latitudes (>66° N/S) can introduce minor variation in calculated house cusps or rising degrees; frames placements as gentle symbolic metaphors rather than absolute mathematical facts.
    5. **Privacy & Storage Policy (`privacy-storage`):** Explicitly guarantees that coordinates are sent only in the transient calculation request payload to compute astronomical positions; coordinates are never saved to local device storage, are never stored in `LocalBirthProfile`, and only the optional display label is kept locally; personal dream journal records remain strictly separate and are never transmitted.
  - Sourced structured interfaces (`CoordinateHelpSectionId`, `CoordinateRangeRule`, `CoordinateExample`, `CoordinateHelpSection`, `AstrologyCoordinateHelpBundle`), constants (`COORDINATE_RANGE_RULES`, `COORDINATE_EXAMPLES`, `COORDINATE_HELP_SECTIONS`, `COORDINATE_HELP_SECTION_IDS`, `ASTROLOGY_COORDINATE_HELP`), and validation/query helpers:
    - `getCoordinateHelpSection(id)`
    - `getAllCoordinateHelpSections()`
    - `isValidLatitude(value)`
    - `isValidLongitude(value)`
    - `validateCoordinates(latitude, longitude)`
    - `getCoordinatePrivacyStatement()`
    - `getCoordinateBoundaryUncertaintyNote()`
    - `isRecognizedCoordinateHelpSectionId(value)` (TypeScript type guard)
  - Completely non-predictive, non-diagnostic, privacy-first; zero geocoding, UI, routes, services, providers, storage, credentials, or existing files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 64 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-083 form help UI.

### H-084 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyTimezoneHelpCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only educational dataset and accessible guidance bundle explaining:
    1. **What Is an IANA Timezone (`what-is-iana`):** Explains that IANA Time Zone Database identifiers use Area/Location structures (e.g. Continent/City like `Asia/Kolkata` or `America/New_York`) to encapsulate the entire historical record of local clock changes, daylight saving transitions, and municipal calendar shifts rather than ambiguous static offsets.
    2. **Valid Formats & Examples (`valid-examples`):** Details standard Continent/City formatting, underscores for multi-word cities, case-sensitivity conventions, and concrete examples across global regions (`Asia/Kolkata`, `America/New_York`, `America/Chicago`, `America/Los_Angeles`, `Europe/London`, `Asia/Tokyo`, `Australia/Sydney`, `UTC`).
    3. **Why Country Names & Abbreviations Are Rejected (`why-countries-rejected`):** Explains that country names (e.g. "India", "USA", "Australia") do not map 1:1 to timezone definitions and often span multiple time zones; abbreviations (e.g. "IST", "EST", "CST") are ambiguous across different nations and do not indicate whether daylight saving was active in a given birth year.
    4. **Timezone Without Birth Time (`timezone-without-time`):** Explains that timezones serve solely to convert local clock time to universal astronomical time (UTC); without a birth time, chart calculations operate in date-only mode with a midday solar reference (time-dependent angles and houses are withheld); supplying a timezone without a time would imply false precision, so the form requires leaving timezone blank unless a birth time is entered.
    5. **Historical DST & Offset Uncertainty (`historical-dst-uncertainty`):** Details how historical daylight saving laws, wartime double-summer time, and municipal ordinance variations throughout the 20th century can introduce minor calculation uncertainty for past birth years; frames placements as gentle symbolic perspectives rather than absolute deterministic facts.
  - Sourced structured interfaces (`TimezoneHelpSectionId`, `TimezoneExample`, `TimezoneRejectedExample`, `TimezoneHelpSection`, `AstrologyTimezoneHelpBundle`), constants (`TIMEZONE_EXAMPLES`, `TIMEZONE_REJECTED_EXAMPLES`, `TIMEZONE_HELP_SECTIONS`, `TIMEZONE_HELP_SECTION_IDS`, `ASTROLOGY_TIMEZONE_HELP`), and validation/query helpers:
    - `getTimezoneHelpSection(id)`
    - `getAllTimezoneHelpSections()`
    - `isValidIanaTimezone(value)`
    - `suggestAlternativeForCommonInput(input)` (maps common country names and abbreviations to canonical IANA alternatives)
    - `explainTimezoneIssue(timezone, hasBirthTime)`
    - `isRecognizedTimezoneHelpSectionId(value)` (TypeScript type guard)
  - Educational, non-predictive, non-diagnostic, and privacy-preserving; zero lookup APIs, geocoding, UI, routes, services, providers, storage, credentials, or existing files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 65 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-085 form UI.

### H-086 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyBirthTimeHelpCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only educational dataset and accessible guidance bundle explaining:
    1. **Why Birth Time Is Optional (`optional-birth-time`):** Explains that many people do not know or have access to their exact birth time; entering a birth time is never mandatory in DreamAlchemy; a birth date alone allows the calculation provider to determine primary planetary positions (Sun, Mercury, Venus, Mars, and outer planets) for reflective exploration without requiring personal hospital records.
    2. **24-Hour Time Format (`format-24-hour`):** Details the 24-hour HH:mm format (hours 00–23, minutes 00–59), padding single-digit hours with leading zeroes (e.g. 07:15), and conversion rules from 12-hour AM/PM clocks (e.g. 2:30 PM -> 14:30, 12:00 PM -> 12:00, 12:00 AM -> 00:00).
    3. **Date-Only Mode & Unknown Times (`date-only-mode`):** Explains that omitting a birth time triggers date-only precision with a midday solar reference; fast-moving angles (Ascendant and Midheaven) and house cusps (1–12) that rotate through all signs in a single day are withheld rather than guessed, preventing false precision while keeping stable planetary sign placements available.
    4. **Recorded-Time Rounding & Clock Drift (`recorded-rounding`):** Explains that official records are frequently rounded to the nearest 15 or 30 minutes, and clock drift of even 5–10 minutes can alter rising degrees or place placements near sign/house boundaries (0° or 29°); encourages treating angles as symbolic reflective thresholds rather than exact certainties.
    5. **Why You Should Avoid Guessed Times (`avoid-guessing`):** Advises dreamers never to guess a birth time (such as 12:00 PM or midnight); guessing produces false precision for rising signs and houses; leaving time blank produces an honest, reliable date-only chart focusing on stable planetary archetypes.
  - Sourced structured interfaces (`BirthTimeHelpSectionId`, `BirthTimeFormatExample`, `BirthTimeHelpSection`, `AstrologyBirthTimeHelpBundle`), constants (`BIRTH_TIME_FORMAT_EXAMPLES`, `BIRTH_TIME_HELP_SECTIONS`, `BIRTH_TIME_HELP_SECTION_IDS`, `ASTROLOGY_BIRTH_TIME_HELP`), and validation/conversion helpers:
    - `getBirthTimeHelpSection(id)`
    - `getAllBirthTimeHelpSections()`
    - `isValidBirthTimeFormat(value)`
    - `parseTimeString(timeStr)`
    - `formatBirthTime(hour, minute)`
    - `convertTo24Hour(hour12, minute, isPm)`
    - `explainBirthTimeIssue(hour, minute)`
    - `isRecognizedBirthTimeHelpSectionId(value)` (TypeScript type guard)
  - Completely non-predictive, non-diagnostic, privacy-first; zero UI, routes, services, providers, storage, credentials, or existing files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 67 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-087 form UI.

### H-088 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyBirthDateHelpCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only educational dataset and accessible guidance bundle explaining:
    1. **Required Date Format (`required-format`):** Explains that a birth date is the sole mandatory input for chart calculation; details the four-digit year, two-digit month, and two-digit day ISO convention `YYYY-MM-DD` (e.g. `1995-04-12`), requiring leading zeroes for single-digit months and days (`1998-03-05`).
    2. **Valid Calendar & Leap Dates (`calendar-leap-dates`):** Details Gregorian calendar rules (30 vs 31 days per month, February having 28 days or 29 in valid leap years such as 2000, 2004, 2020, 2024); specifies supported modern historical ephemeris dates from 1800 onward.
    3. **Future Date Rejection (`future-date-rejection`):** Explains why future dates are rejected (birth charts model celestial positions at the time an individual was actually born; DreamAlchemy is designed for personal self-reflection, not predictive forecasts or hypothetical projections).
    4. **Why Full Names Are Unnecessary (`no-names-privacy`):** Emphasizes DreamAlchemy's privacy-first design; planetary calculations depend solely on celestial physics (date, time, coordinates) and have no connection to human names; omitting name fields protects dreamer identity and ensures zero personal identifiers are ever collected, stored, or transmitted; personal dream journals remain completely separate and offline.
  - Sourced structured interfaces (`BirthDateHelpSectionId`, `BirthDateFormatExample`, `BirthDateHelpSection`, `AstrologyBirthDateHelpBundle`), constants (`BIRTH_DATE_FORMAT_EXAMPLES`, `BIRTH_DATE_HELP_SECTIONS`, `BIRTH_DATE_HELP_SECTION_IDS`, `ASTROLOGY_BIRTH_DATE_HELP`), and validation/parsing helpers:
    - `getBirthDateHelpSection(id)`
    - `getAllBirthDateHelpSections()`
    - `isLeapYear(year)`
    - `getDaysInMonth(year, month)`
    - `isValidBirthDateFormat(value)`
    - `parseDateString(dateStr)`
    - `formatBirthDate(year, month, day)`
    - `validateBirthDateValues(year, month, day, referenceDate)`
    - `explainBirthDateIssue(dateInput, referenceDate)`
    - `isRecognizedBirthDateHelpSectionId(value)` (TypeScript type guard)
  - Completely non-predictive, non-diagnostic, privacy-first; zero UI, routes, services, providers, storage, credentials, or existing files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 68 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-089 form UI.

### H-090 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyLocationLabelHelpCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only educational dataset and accessible guidance bundle explaining:
    1. **Display-Only Context (`display-only`):** Explains that the optional location label is strictly a human-readable display note for the user's reference on screen; it has no mathematical or astrological effect on chart calculations (which depend solely on separate numeric coordinates); can be left blank.
    2. **Broad City or Region (`broad-city-region`):** Recommends broad city, town, metropolitan, or regional descriptions (e.g. "Chicago, IL", "Greater London", "Kyoto, Japan"); keeps profile concise and familiar; enforces a 100-character maximum length.
    3. **Avoid Street Addresses & Residences (`avoid-street-addresses`):** Privacy-first guidance instructing dreamers never to enter street names, building numbers, apartment/unit numbers, hospital names, or postal codes; celestial mechanics operate on regional geometry and never benefit from street-level specificity.
    4. **Stored Locally on Device (`local-storage-only`):** Confirms that entered labels are saved strictly in local device storage with the local birth profile; never synced to remote accounts, cloud databases, or analytics; permanently removed when the local birth profile is deleted.
    5. **Excluded From Network Requests (`excluded-from-requests`):** Guarantees that the location label is strictly excluded from network request payloads sent to calculation or reflection servers; only coordinates and date/time parameters are sent for charts, and only astronomical placement summaries for reflections; personal dream journals remain completely separate.
  - Sourced structured interfaces (`LocationLabelHelpSectionId`, `LocationLabelExample`, `LocationLabelDiscouragedExample`, `LocationLabelHelpSection`, `AstrologyLocationLabelHelpBundle`), constants (`LOCATION_LABEL_RECOMMENDED_EXAMPLES`, `LOCATION_LABEL_DISCOURAGED_EXAMPLES`, `LOCATION_LABEL_HELP_SECTIONS`, `LOCATION_LABEL_HELP_SECTION_IDS`, `ASTROLOGY_LOCATION_LABEL_HELP`), and validation/heuristic helpers:
    - `getLocationLabelHelpSection(id)`
    - `getAllLocationLabelHelpSections()`
    - `containsDetailedAddressIndicators(label)` (detects street/apartment/hospital patterns to encourage privacy)
    - `validateLocationLabel(label)`
    - `explainLocationLabelIssue(label)`
    - `getLocationLabelPrivacyStatement()`
    - `isRecognizedLocationLabelHelpSectionId(value)` (TypeScript type guard)
  - Completely non-predictive, non-diagnostic, privacy-first; zero UI, geocoding, providers, storage, credentials, or existing files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 71 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-091 form UI.

### H-092 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyRequestSummaryCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only educational and pre-submission disclosure bundle detailing data destinations across 4 critical categories:
    1. **Sent for Chart Calculation (`sent-for-calculation`):** Details fields transmitted to the chart calculation service endpoint (`birthDate`, optional `birthTime`, `coordinates`, `timezone`, and explicit `consent`); explains that coordinates are used ephemerally to compute celestial positions and are never stored locally.
    2. **Kept Strictly on Device (`kept-local`):** Details fields stored solely in local device storage or screen memory (`locationLabel`, `savedProfile`, `calculatedChart`, `formDraftState`); clarifies that friendly labels and calculated charts remain offline and can be permanently deleted at any time.
    3. **Sent for Optional AI Reflection (`sent-for-reflection`):** Details data sent only if the user explicitly triggers AI reflection synthesis (`compactPlacements`, `compactAspects`, `uncertaintyNotes`); guarantees that birth date, birth time, coordinates, and personal identity are completely excluded from reflection payloads.
    4. **Never Included in Astrology Requests (`never-included`):** Enforces DreamAlchemy's strict privacy boundary; guarantees that raw dream journal narratives (`dreamJournalText`), tags/patterns (`dreamPatterns`), and personal identity/names (`personalIdentity`) are never accessed, bundled, or transmitted by astrology services.
  - Sourced structured interfaces (`AstrologyDataDestinationCategory`, `AstrologyRequestDataFieldItem`, `AstrologyRequestCategorySection`, `AstrologyRequestSummaryBundle`), constants (`ASTROLOGY_REQUEST_FIELDS`, `ASTROLOGY_REQUEST_SECTIONS`, `ASTROLOGY_REQUEST_ORDERED_CATEGORIES`, `ASTROLOGY_REQUEST_SUMMARY_BUNDLE`), and lookup/validation helpers:
    - `getRequestSummarySection(category)`
    - `getAllRequestSummarySections()`
    - `getRequestFieldsByCategory(category)`
    - `getAllRequestSummaryFields()`
    - `getDreamJournalIsolationGuarantee()`
    - `formatRequestReviewSummary()`
    - `isRecognizedDataDestinationCategory(value)` (TypeScript type guard)
  - Completely non-predictive, non-diagnostic, privacy-first; zero modifications to UI, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 73 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-093 consent UI.

### H-094 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyDeletionSummaryCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only educational and user-facing data deletion disclosure bundle detailing deletion scope across 3 core pillars:
    1. **Removed From This Device (`local-removed`):** Details local astrology records permanently removed upon deletion: saved birth profile (`LocalBirthProfile`, storage key `dreamalchemy.astrology.profile.v1`), calculated chart bundle (`AstrologyChart`, storage key `dreamalchemy.astrology.bundle.v1`), generated AI reflection (`AstrologyReflection`), and active in-memory screen/form draft inputs.
    2. **Dream Journals & Other Data Unaffected (`unaffected-journal`):** Enforces DreamAlchemy's strict local privacy and isolation boundaries; confirms that personal dream journals, morning reflections, voice transcripts, dream tags/themes/patterns, and general app settings remain completely untouched and safe.
    3. **External Provider Processing Caveats (`external-caveat`):** Clarifies that while local deletion immediately erases all stored data on this device, it cannot retroactively retract or recall requests previously sent across the network for chart calculation or AI reflection, which are governed by external providers' stateless processing and independent retention policies; notes that DreamAlchemy maintains no remote user accounts or cloud databases to purge.
  - Sourced structured interfaces (`AstrologyDeletionScopeCategory`, `AstrologyDeletionImpact`, `AstrologyDeletionScopeItem`, `AstrologyDeletionScopeSection`, `AstrologyDeletionDialogCopy`, `AstrologyDeletionSummaryBundle`), constants (`ASTROLOGY_DELETION_ITEMS`, `ASTROLOGY_DELETION_SECTIONS`, `ASTROLOGY_DELETION_ORDERED_CATEGORIES`, `ASTROLOGY_DELETION_DIALOG_COPY`, `ASTROLOGY_DELETION_SUMMARY_BUNDLE`), and lookup/validation helpers:
    - `getDeletionScopeSection(category)`
    - `getAllDeletionScopeSections()`
    - `getDeletionItemsByCategory(category)`
    - `getAllDeletionItems()`
    - `getJournalUnaffectedStatement()`
    - `getExternalProcessingCaveatStatement()`
    - `formatDeletionConfirmDialogMessage()`
    - `formatDetailedDeletionDisclosure()`
    - `isRecognizedDeletionScopeCategory(value)` (TypeScript type guard)
  - Completely non-predictive, non-diagnostic, privacy-first; zero modifications to UI, services, providers, storage, credentials, or existing files.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 74 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-095 deletion UI.

### H-096 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `docs/ASTROLOGY_MAC_TEST_MATRIX.md`
- **Summary of Implementation:**
  - Authored a comprehensive Mac manual-test matrix covering all 9 required verification dimensions across 49 structured test cases:
    1. **Birth Date Validation & Bounds (TC-DATE-01 to 08):** Standard dates, leap days, invalid leap days on non-leap years, month/day ranges, malformed date formats, future dates, historical ephemeris bounds (>=1800), and format/privacy help disclosure.
    2. **Birth Time & Timezone Handling (TC-TIME-01 to 07):** Blank time / date-only mode, valid 24-hour time (`HH:mm`), invalid time formats, timezone requires time validation, valid IANA identifiers (`Asia/Kolkata`, `America/New_York`), rejected country names / abbreviations with suggestion mapping, and help accordions.
    3. **Coordinates & Local Location Label (TC-COORD-01 to 08):** Valid decimal coordinates, missing coordinates, out-of-range latitude/longitude (-90..+90, -180..+180), coordinate ephemerality (never persisted), optional local location label, detailed street address warning detection, and help disclosures.
    4. **Consent & Pre-Submit Disclosures (TC-CONSENT-01 to 04):** Unchecked consent blocking calculation, checked consent flag transmission, expandable data sharing summary review (4 distinct categories), and non-predictive/non-diagnostic framing.
    5. **Disabled, Offline & Provider Error Handling (TC-ERR-01 to 05):** Feature flag disabled / preview recovery without form loss, offline/network disconnected notice, rate limiting (HTTP 429), provider outage/failure (502/500), and accessible progress indicators.
    6. **Local Persistence & App Relaunch (TC-PERSIST-01 to 03):** Post-calculation storage (`dreamalchemy.astrology.profile.v1` and `dreamalchemy.astrology.bundle.v1`), app reload/relaunch restoration, and coordinate non-restoration verification.
    7. **AI Reflection Boundaries & Privacy Isolation (TC-REFL-01 to 04):** Explicit opt-in button trigger, client payload boundary, server-side compact allowlisting, dream journal isolation, and reflection output display with disclosure.
    8. **Accessibility & Platform Usability (TC-A11Y-01 to 05):** VoiceOver element labels and hints, dynamic expand/collapse accessibility states, polite live region error announcements, light/dark mode contrast, and Mac keyboard navigation / tap handling.
    9. **Deletion Scope & Limitations (TC-DEL-01 to 05):** Destructive alert confirmation, external provider limitation notice, full local storage purge, dream journal preservation, and post-deletion persistence check.
  - Included environment configuration table, automated test cross-references, Mac execution quick-check commands, and pass/fail acceptance gates.
  - No code, routes, providers, credentials, or existing documentation modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 75 tests passing).
- **Follow-up:** Ready for Codex execution and reconciliation in H-097.

### H-098 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `docs/ASTROLOGY_TESTER_FEEDBACK_TEMPLATE.md`
- **Summary of Implementation:**
  - Created a concise, structured Mac tester feedback template and defect-reporting guide for the hybrid Astrology feature:
    1. **Privacy Mandate & Strict Redaction:** Explicit instructions mandating zero API keys or secrets (`ASTROLOGY_API_KEY`, `OPENAI_API_KEY`, Bearer tokens), zero real personal birth records/times/coordinates, and zero personal dream journal entries or voice transcripts in reports, logs, or screenshots.
    2. **Severity Classification Guide:** Clear tiering from P0 (Crash / Data Loss / Privacy Leak) down to P3 (Cosmetic / Usability suggestion) with astrology-specific examples.
    3. **Structured Fillable Markdown Template:** Standardized sections covering environment/build metadata (OS, architecture, surface, commit hash, feature flag state, network mode), test matrix case ID (cross-referenced to `docs/ASTROLOGY_MAC_TEST_MATRIX.md`), expected vs. actual behavior, numbered reproduction steps, VoiceOver/accessibility observations, and sanitized logs/evidence.
    4. **Concrete Reference Example:** Fully populated sample feedback report demonstrating proper redaction and clear reporting of a layout issue under narrow viewports.
  - Zero code, routes, providers, credentials, or existing docs modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 75 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-099 readiness assessment.

### H-102 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `docs/DREAM_IMAGE_MAC_TEST_MATRIX.md`
- **Summary of Implementation:**
  - Authored a comprehensive Mac manual-test matrix for the provider-neutral Dream Image preparation and result studio across 37 test cases in 8 structured functional groups, plus 5 explicit provider release blockers:
    1. **Curated Scene Selection & Prompt Boundary (TC-IMG-SCENE-01 to 06):** Default scene initialization (`threshold-passage`), catalog scene switching across all 7 templates, auto-updating recommended styles, strict exclusion of raw dream journal text, dynamic accessible alt text synchronization via `getAltTextForTemplate`, and payload boundary enforcement omitting local `dreamId`.
    2. **Art Style Selection & Matrix (TC-IMG-STYLE-01 to 04):** Switching between `ethereal`, `surreal`, `watercolor`, and `cinematic`, primary border selection styling, manual override persistence, artistic descriptions, and `radiogroup`/`radio` accessibility attributes.
    3. **Consent & Non-Interpretive Disclaimers (TC-IMG-CONSENT-01 to 03):** Explicit user consent agreement copy, non-interpretive and non-diagnostic framing disclaimers, and 4-point safety checklist verification card.
    4. **Disabled, Offline & Failure States (TC-IMG-FAIL-01 to 06):** Provider unconfigured / preview presentation (`EXPO_PUBLIC_DREAM_IMAGE_API_URL` unset), offline error presentation, moderation rejection notice, rate limiting (HTTP 429), retryable timeout handling (>60s), and privacy preservation during failures.
    5. **Generation Progress Accessibility (TC-IMG-PROG-01 to 06):** 4 distinct sequential progress phases (`queued`, `moderating`, `rendering`, `finalizing`), step counter ("Step X of 4"), `ActivityIndicator`, `accessibilityRole="progressbar"` with `accessibilityValue`, `accessibilityLiveRegion="polite"` dynamic announcements, and phase-specific privacy reassurances.
    6. **Local Result Actions & Workflows (TC-IMG-ACT-01 to 05):** Dynamic action filtering in `DreamImageResultActions`, direct execution for non-destructive actions (Share, Save to Photos without metadata), confirmation dialog for Regenerate, and universal privacy guarantee statement.
    7. **Deletion Scope & Limitations (TC-IMG-DEL-01 to 05):** Destructive confirmation alert ("Delete generated artwork?"), cancel dismissal without data loss, local image removal upon confirmation, 100% preservation of written dream journal entries, tags, and Jungian analysis, and success feedback notice.
    8. **VoiceOver Accessibility & Theming (TC-IMG-A11Y-01 to 05):** Radio role announcements on catalog scenes, accessible style labels, WCAG AA compliance verified across all 28 alt text combinations via `isDescriptiveAltText`, light/dark contrast, and responsive viewports.
    9. **Explicit Provider-Connected Blockers (BLK-IMG-01 to 05):** Documented release blockers including lack of serverless proxy deployment, missing provider credentials and spend caps, unconfigured upstream content moderation, absence of durable anonymous rate limiting, and unconfigured transient image CDN storage.
  - Zero code, routes, providers, credentials, or existing documentation modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (16 suites, 91 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-105 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `docs/DREAM_IMAGE_TESTER_FEEDBACK_TEMPLATE.md`
- **Summary of Implementation:**
  - Created a concise, structured Mac tester feedback template and defect-reporting guide for the provider-neutral Dream Image Studio, strictly aligned to `docs/DREAM_IMAGE_MAC_TEST_MATRIX.md`:
    1. **Scope Separation Matrix:** Explicitly distinguishes **Scope A (Preparation Screen)**—which is active and testable on `/dream-image` (catalog scenes, art styles, alt text generation, safety checklist, consent/disclaimers, preview card, theming, VoiceOver)—from **Scope B (Provider & Result Integration)**—which is architecturally blocked by `BLK-IMG-01` through `BLK-IMG-05` (backend proxy, live generation, progress overlay transitions, Photo Library saving, native sharing, disk deletion).
    2. **Strict Redaction & Privacy Mandate:** Mandates zero provider secrets or bearer tokens, zero raw dream journal narratives, reflections, tags, personal names, or voice transcripts, and zero personal device paths or user account identifiers in reports, screenshots, or logs.
    3. **Severity Classification Guide:** Tiering from P0 (Crash / Data Loss / Raw Dream Leak) down to P3 (Cosmetic / Usability suggestion) with dream image-specific criteria.
    4. **Standardized Fillable Markdown Template:** Standardized sections covering environment/build metadata (OS, architecture, surface, commit hash, configuration status), scope selection (Scope A vs Scope B), test matrix case ID (cross-referenced to `docs/DREAM_IMAGE_MAC_TEST_MATRIX.md`), expected vs. actual behavior, numbered reproduction steps, VoiceOver/accessibility observations, and sanitized logs/evidence.
    5. **Concrete Scope A Reference Example:** Fully populated sample feedback report demonstrating proper classification, redaction checklist, and reproduction steps for a style reset behavior on catalog re-selection.
  - Zero code, routes, providers, credentials, or existing documentation modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (17 suites, 95 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-108 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `docs/DREAM_IMAGE_DEPLOYMENT_BOUNDARY_DRAFT.md`
- **Summary of Implementation:**
  - Authored a comprehensive, provider-neutral deployment checklist and proxy architecture draft for the future Dream Image service proxy, covering all 9 required verification dimensions:
    1. **Curated-Prompt Allowlisting & Input Sanitization:** Mandates server proxy enforcement that incoming prompts match approved catalog scenes (`DREAM_IMAGE_PROMPT_TEMPLATES`), strict rejection of freeform or raw personal dream text, strict style enum validation, and payload size ceilings (<=16KB JSON).
    2. **Content Moderation & Safety Pipeline:** Two-tier moderation strategy (client catalog pre-flight + proxy safety filter), PII/clinical language rejection, and standardized error mapping (`moderation_rejected`).
    3. **Server-Only Secrets & Environment Variables:** Strict containment of `DREAM_IMAGE_API_KEY`, `DREAM_IMAGE_API_URL`, and rate limiter secrets on the server; zero `EXPO_PUBLIC_` credential leaks to clients.
    4. **Cost & Durable Rate Controls:** Anonymous HMAC-hashed device/network identifier rate limiting, daily/hourly quota caps (e.g. 1–3 requests/24h), HTTP 429 response with `Retry-After` headers, and provider console hard spending caps/alerts.
    5. **Transient Image Retention & Ephemeral Delivery:** Ephemeral signed URLs (1–2 hour TTL), automated CDN cache expiration (24–48h max), zero cloud association with user accounts, and local device storage as the sole permanent destination upon user save.
    6. **Privacy-Safe Logging & Observability:** Minimal operational logs (UUID, coarse status, HTTP code, latency); strict logging ban on prompts, IP addresses, image URLs, binary data, and authentication tokens.
    7. **Accessibility Metadata Enforcement (WCAG 2.1 AA):** Mandatory descriptive alternative text generation accompanying every response, evaluated against `isDescriptiveAltText`, with fallback to pre-composed catalog templates.
    8. **iOS Photo Permission Copy:** Least-privilege `NSPhotoLibraryAddUsageDescription` recommendation for iOS camera roll saving, avoiding read access, with zero personal dream text or EXIF metadata injection.
    9. **Disabled-by-Default Rollout & Phased Gates:** `DREAM_IMAGE_FEATURE_ENABLED=false` default fail-closed behavior, structured rollout gates (Preview -> Spend Caps & Logs -> Controlled Production).
  - Vendor-neutral specification throughout; zero vendors selected, zero credentials added, and zero code, routes, or existing documentation modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --watchAll=false` passed cleanly (19 suites, 101 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-110 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `docs/DREAM_IMAGE_PROVIDER_EVALUATION_TEMPLATE.md`
- **Summary of Implementation:**
  - Authored a comprehensive, vendor-neutral provider evaluation template and candidate assessment worksheet for prospective generative image providers, strictly aligned to `docs/DREAM_IMAGE_DEPLOYMENT_BOUNDARY_DRAFT.md` and `docs/DREAM_IMAGE_MAC_TEST_MATRIX.md` (`BLK-IMG-01`):
    1. **Non-Negotiable Boundaries:** Codified core architectural constraints including curated scene catalog only (zero raw dream text leaves device), provider-neutral serverless proxy (`/api/dream-image`), minimal remote retention target (ephemeral signed URLs), zero model training on customer data, hard budget ceilings, and disabled-by-default rollout (`DREAM_IMAGE_FEATURE_ENABLED=false`).
    2. **10 Comprehensive Evaluation Dimensions:**
       - *1. Pricing Model & Unit Economics:* Deterministic per-generation costs (<$0.05/image target), resolution tiers, payment structure (prepaid vs. invoiced), and elimination of mandatory monthly platform minimums.
       - *2. Content Moderation & Upstream Safety Controls:* Automated pre- and post-generation safety screening, machine-readable rejection taxonomy mapping cleanly to `moderation_rejected`, and fail-closed error behavior.
       - *3. Input & Output Retention Policies:* Ephemeral prompt and image retention targets (<=24–48 hours), elimination of human review of API inputs, and programmatic deletion endpoints.
       - *4. Training & Data-Use Terms:* Strict contractual guarantees prohibiting foundation model training, fine-tuning, or RLHF on customer inputs/outputs by default.
       - *5. Commercial Output Rights & Licensing:* Full commercial/user ownership of outputs, unencumbered mobile app display and local photo library export, zero mandatory visible watermarks, and privacy-safe provenance metadata.
       - *6. Regional Availability, Data Residency & SLAs:* Datacenter distribution, GDPR compliance / SCCs / DPA availability, >=99.5% uptime SLA, and public incident status tracking.
       - *7. Latency Profile & API Execution Model:* Synchronous vs. asynchronous execution paradigms, turnaround latency (p90 < 12s target), serverless timeout compatibility, GET status polling support, idempotency keys, and concurrency limits.
       - *8. Signed-URL Behavior & Delivery Architecture:* Ephemeral signed URLs (15–120 min TTL), cross-origin resource sharing (`CORS`) support for web and mobile image caching, `noindex` bot protection, and unguessable tokenized endpoints.
       - *9. Spend Controls & Denial-of-Wallet Protections:* Console hard budget caps that immediately halt requests when exceeded, multi-tier soft alerts (50%, 75%, 90%), prepaid balance safeguards, and one-click key revocation.
       - *10. Server-Side Key Custody & Security Posture:* Server-only HTTP Bearer token custody, least-privilege scoping (inference only, blocking billing/admin APIs), zero-downtime key rotation support, and complete absence of client-side SDK requirements.
    3. **Standardized Candidate Evaluation Worksheet:** Complete fillable template including candidate profile, 10-dimension Pass/Conditional/Fail scorecards with verifiable evidence prompts, 6 automatic disqualification triggers (`DQ-1` to `DQ-6`), and structured decision/sign-off blocks.
    4. **Architectural Integration & Blocker Checklist:** Maps provider evaluation criteria to resolution gates for `BLK-IMG-01` through `BLK-IMG-05`.
  - Strictly vendor-neutral; zero commercial vendors selected, recommended, or benchmarked; no web browsing performed; and zero code, credentials, or existing docs altered.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (20 suites, 108 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-117 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageGeneratedDisclosureCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of user-facing disclosures and disclaimers for generated Dream Image results covering all 6 required areas:
    1. **AI-Generated Art Labeling (`ai-art-labeling`):** Explicit synthetic artwork badge (`AI-Generated Art`), summary, and accessibility announcements clarifying computational generation and distinguishing results from literal photography or human artistry.
    2. **Curated Prompt & Style Boundary (`curated-inputs`):** Transparent guarantee that only curated catalog scene templates and selected visual styles were transmitted, while raw dream journal entries, subconscious reflections, tags, and personal identifiers remain strictly on-device.
    3. **Non-Objective & Non-Diagnostic Framing (`non-diagnostic`):** Clear disclaimer that the image is an open-ended artistic reflection for contemplation, not psychological evaluation, clinical diagnosis, therapy, or future prediction.
    4. **External Processing Disclosure (`external-processing`):** Details the secure external proxy transmission of abstract scene parameters while reassuring users that personal data is completely isolated.
    5. **Local Copy Scope (`local-copy-scope`):** Explains that current results are held in transient screen/session memory, in-memory deletion discards the active copy, and any future saved copies remain local without personal journal metadata embedded in EXIF tags.
    6. **Provider & CDN Retention Limitations (`provider-retention-limitations`):** Discloses that external cloud rendering providers and edge delivery CDNs may retain transient operational buffers (e.g. 24–48 hours) prior to automated expiration, and clarifies that local deletion removes the on-device file but cannot force early purge of upstream transit caches.
  - Defined clean interfaces (`DreamImageDisclosureSectionId`, `DreamImageDisclosureSection`, `DreamImageGeneratedDisclosureBundle`), constants (`DREAM_IMAGE_DISCLOSURE_ORDERED_IDS`, `DREAM_IMAGE_DISCLOSURE_SECTIONS`, `DREAM_IMAGE_GENERATED_DISCLOSURE_BUNDLE`), and lookup utilities (`getDreamImageGeneratedDisclosureBundle`, `getDreamImageDisclosureSection`, `getAllDreamImageDisclosureSections`, `getConciseGeneratedArtDisclosure`, `getGeneratedArtBadgeLabel`, `getDreamImageInputBoundaryGuarantee`, `getDreamImageRetentionLimitationNotice`, `isRecognizedDisclosureSectionId`).
  - Zero UI, routes, services, providers, storage, credentials, or existing files modified.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 129 tests passing).
- **Follow-up:** Ready for Codex review and integration into H-118.

### H-124 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageProviderDecisionCopy.ts`
- **Summary of Implementation:**
  - Created a concise, fully typed, content-only dataset of neutral labels and explanations for all 5 provider evaluation states:
    1. **Not Reviewed (`not-reviewed`):** Neutral status indicating a candidate has been cataloged or proposed but has not yet undergone formal architectural, privacy, security, or safety evaluation (`badgeLabel: 'Unreviewed'`).
    2. **Under Review (`under-review`):** Active status indicating ongoing evaluation across mandatory privacy terms, moderation controls, data-use terms, execution model, and security posture (`badgeLabel: 'In Review'`).
    3. **Blocked (`blocked`):** Non-qualifying status indicating a candidate failed one or more required standards or triggered a disqualification criterion, preventing sandbox or production clearance (`badgeLabel: 'Blocked'`).
    4. **Approved for Sandbox (`approved-for-sandbox`):** Non-production clearance indicating baseline standards are met for isolated staging or test-environment proxy verification without enabling production traffic (`badgeLabel: 'Sandbox Only'`).
    5. **Approved for Limited Production (`approved-for-limited-production`):** Clearance indicating verification of required deployment gates for controlled, disabled-by-default production rollout with active safeguards and monitoring (`badgeLabel: 'Limited Production'`).
  - Defined clean interfaces (`DreamImageProviderEvaluationState`, `DreamImageProviderDecisionCopy`), constants (`DREAM_IMAGE_PROVIDER_EVALUATION_STATES`, `DREAM_IMAGE_PROVIDER_DECISION_COPY`), and helper functions (`getProviderDecisionCopy`, `getAllProviderDecisionCopies`, `getAllProviderEvaluationStates`, `getProviderEvaluationStateBadgeLabel`, `isApprovedForProduction`, `isApprovedForSandbox`, `isValidProviderEvaluationState`).
  - Strictly neutral framing: zero vendor names, zero pricing claims, zero SLAs, zero retention durations, and zero implementation instructions. Existing files, UI, services, providers, storage, and credentials left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 130 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-126 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/dreamImageAvailabilityCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of user-facing copy for all 5 feature availability states:
    1. **Feature Disabled (`feature-disabled`):** Clear notice that visual reflection generation is inactive for this build, with reassuring guidance that curated scene templates and artistic styles remain fully available to explore offline without transmitting data (`badgeLabel: 'Feature Disabled'`).
    2. **Sandbox Only (`sandbox-only`):** Clarifies that generation is currently restricted to isolated validation sandboxes without live production requests enabled from standard builds (`badgeLabel: 'Sandbox Only'`).
    3. **Provider Paused (`provider-paused`):** Informs users that the external rendering service is temporarily paused during service checks or updates, while local dream journals and templates remain fully accessible (`badgeLabel: 'Service Paused'`).
    4. **Budget Protection (`budget-protection`):** Explains that generation requests are resting under automated usage safeguards to prevent service overages, keeping private journal records completely unaffected (`badgeLabel: 'Usage Safeguard'`).
    5. **Limited Production (`limited-production`):** Communicates active generation in a controlled limited release with privacy safeguards (only curated prompts and styles transmitted; zero personal dream text leaves the device) (`badgeLabel: 'Limited Release'`).
  - Defined clean interfaces (`DreamImageAvailabilityState`, `DreamImageAvailabilityCopy`, `DreamImageAvailabilityBundle`), constants (`DREAM_IMAGE_AVAILABILITY_STATES`, `DREAM_IMAGE_AVAILABILITY_COPY`, `DREAM_IMAGE_AVAILABILITY_BUNDLE`), and lookup helpers (`getDreamImageAvailabilityCopy`, `getAllDreamImageAvailabilityCopies`, `getAllDreamImageAvailabilityStates`, `getAvailabilityBadgeLabel`, `isGenerationAllowedForAvailabilityState`, `getDreamImageAvailabilityBundle`, `isValidDreamImageAvailabilityState`).
  - Strictly provider-neutral, non-predictive, privacy-preserving, and free of timing, pricing, uptime, or retention promises. Existing files, UI, routes, services, storage, and credentials left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 130 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-129 Completion Notes (Antigravity)
- **Status:** done (`6db0ffe`)
- **Changed files:** `src/data/astrologyCalculationDisclosureCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of user-facing disclosures and technical boundaries for external chart calculation across all 6 specified topics:
    1. **Fields Sent (`fields-sent`):** Clarifies that calculation requires mathematical ephemeris formulas using birth date, optional birth time, geographic coordinates, and optional timezone; personal names and account credentials are never requested or sent (`badgeLabel: 'Sent to Server'`).
    2. **Local-Only Location Label (`local-location-label`):** Guarantees that friendly city or place names (e.g. "San Francisco, CA") remain exclusively on-device, and only mathematical latitude/longitude numbers are transmitted (`badgeLabel: 'Kept on Device'`).
    3. **Unknown-Time Uncertainty (`unknown-time-uncertainty`):** Explains that omitting birth time calculates a midday UTC snapshot, omitting the Ascendant and houses while noting ~13° daily lunar variance (`badgeLabel: 'Approximate Snapshot'`).
    4. **Calculation vs. AI Distinction (`calculation-vs-ai`):** Delineates deterministic astronomical ephemeris mechanics from separate, optional generative AI text reflection; calculation does not evaluate, judge, or synthesize prose (`badgeLabel: 'Ephemeris Math'`).
    5. **Provider-Side Processing Limitation (`provider-processing-limitations`):** Discloses stateless client requests, absence of user accounts, and provider-side network logging; notes that local app deletion removes device storage but cannot retroactively scrub external transit logs (`badgeLabel: 'External Processing'`).
    6. **Dream-Journal Exclusion (`dream-journal-exclusion`):** Affirms that personal dream entries, titles, narratives, notes, and analysis remain strictly in device storage and are completely excluded from astrology payloads (`badgeLabel: 'Device-Only'`).
  - Defined clean interfaces (`AstrologyCalculationDisclosureTopic`, `AstrologyCalculationDisclosureItem`, `AstrologyCalculationDisclosureBundle`), constants (`ASTROLOGY_CALCULATION_DISCLOSURE_ORDERED_TOPICS`, `ASTROLOGY_CALCULATION_DISCLOSURE_ITEMS`, `ASTROLOGY_CALCULATION_DISCLOSURE_BUNDLE`), and lookup helpers (`getAstrologyCalculationDisclosureItem`, `getAllAstrologyCalculationDisclosureItems`, `getAllAstrologyCalculationDisclosureTopics`, `getAstrologyCalculationDisclosureBundle`, `getAstrologyDisclosureBadgeLabel`, `getAstrologyCalculationPrivacyGuarantee`, `isRecognizedAstrologyDisclosureTopic`).
  - Strictly non-predictive, non-diagnostic, privacy-preserving, and provider-neutral. Existing files, UI, routes, services, storage, and credentials left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 132 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-131 Completion Notes (Antigravity)
- **Status:** done (`ec866b6`)
- **Changed files:** `src/data/astrologyResultSourceCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of user-facing source attribution, precision levels, and processing scopes for calculated Astrology results covering all 6 required dimensions:
    1. **Calculated Chart (`calculated-chart`):** Explains that planetary coordinates and aspect geometry are calculated with deterministic astronomical ephemeris algorithms, free of AI interpretation or fortune-telling (`badgeLabel: 'Calculated'`).
    2. **Optional AI Reflection (`optional-ai-reflection`):** Transparently delineates generative artificial intelligence language model synthesis for open-ended journaling and contemplation from the underlying mathematical ephemeris calculation; non-predictive and non-diagnostic (`badgeLabel: 'AI Reflection'`).
    3. **Date-Only Uncertainty (`date-only-uncertainty`):** Clarifies that calculations without a birth time use a midday (12:00 UTC) snapshot; explicitly discloses that Ascendant and houses are omitted, and notes ~13° daily lunar variance (`badgeLabel: 'Approximate Snapshot'`).
    4. **Timed-Chart Precision (`timed-chart-precision`):** Details high-resolution calculations with a verified clock time, resolving Ascendant, Midheaven, twelve house cusps, and specific lunar degrees (`badgeLabel: 'Timed Precision'`).
    5. **Provider Processing (`provider-processing`):** Discloses stateless external server computation without user accounts or identity linkage; notes contractual boundaries preventing external providers from training models on user data (`badgeLabel: 'External Processing'`).
    6. **Local Saved-Copy Scope (`local-saved-scope`):** Guarantees that saved birth profiles, computed charts, and reflections reside exclusively in local device storage, completely isolated from Jungian dream records (`badgeLabel: 'Saved on Device'`).
  - Defined clean interfaces (`AstrologyResultSourceId`, `AstrologyResultCategory`, `AstrologyResultSourceItem`, `AstrologyPrecisionDetail`, `AstrologyResultSourceBundle`), constants (`ASTROLOGY_RESULT_SOURCE_ORDERED_IDS`, `ASTROLOGY_RESULT_SOURCE_ITEMS`, `ASTROLOGY_PRECISION_DETAILS`, `ASTROLOGY_RESULT_SOURCE_BUNDLE`), and lookup helpers (`getAstrologyResultSourceItem`, `getAllAstrologyResultSourceItems`, `getAstrologyResultSourceItemsByCategory`, `getAstrologyResultSourceBundle`, `getResultSourceBadgeLabel`, `getPrecisionCopyForTime`, `getPrecisionDetailForTime`, `getCalculatedChartSourceCopy`, `getAiReflectionSourceCopy`, `getLocalSavedScopeCopy`, `getProviderProcessingCopy`, `isRecognizedResultSourceId`).
  - Strictly provider-neutral, non-predictive, privacy-preserving, and free of guarantees. Existing files, UI, routes, services, storage, and credentials left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 132 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-132 Completion Notes (Antigravity)
- **Status:** done (`c67303d`)
- **Changed files:** `src/data/astrologyPreviewStatusCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only dataset of user-facing status copy for all 6 optional Astrology Preview and deployment states:
    1. **Disabled (`disabled`):** Clear notification that calculation features are turned off for this build; reassures users that offline drafting and Jungian dream journaling remain fully accessible without transmitting data (`badgeLabel: 'Disabled'`).
    2. **Configuration Pending (`configuration-pending`):** Informs users that server routes and environment setup are being finalized before calculations can be safely processed; drafts stay on-device (`badgeLabel: 'Setup Pending'`).
    3. **Provider Unavailable (`provider-unavailable`):** Explains that the external ephemeris calculation provider is temporarily offline or experiencing connection issues; notes retryability and local data safety (`badgeLabel: 'Service Unavailable'`).
    4. **Rate Limited (`rate-limited`):** Informs users that the request rate limit or safety threshold has been reached; instructs a brief pause/cooldown to protect upstream infrastructure (`badgeLabel: 'Rate Limited'`).
    5. **Private Preview Active (`private-preview-active`):** Communicates active private testing preview under strict privacy safeguards (only coordinates and timestamp transmitted; friendly city names, user accounts, and dream logs never leave device) (`badgeLabel: 'Preview Active'`).
    6. **Production Blocked (`production-blocked`):** Explicitly states that general production rollout is restricted pending verification gates (durable limiters, spending alerts, redacted observability, test checklists) (`badgeLabel: 'Production Blocked'`).
  - Defined clean interfaces (`AstrologyPreviewStatus`, `AstrologyPreviewStatusCopy`, `AstrologyPreviewStatusBundle`), constants (`ASTROLOGY_PREVIEW_STATUSES`, `ASTROLOGY_PREVIEW_STATUS_COPY`, `ASTROLOGY_PREVIEW_STATUS_BUNDLE`), and lookup helpers (`getAstrologyPreviewStatusCopy`, `getAllAstrologyPreviewStatusCopies`, `getAllAstrologyPreviewStatuses`, `getAstrologyPreviewStatusBadgeLabel`, `isCalculationPermittedForStatus`, `getAstrologyPreviewStatusBundle`, `isValidAstrologyPreviewStatus`, `getDisabledPreviewStatusCopy`, `getConfigurationPendingStatusCopy`, `getProviderUnavailableStatusCopy`, `getRateLimitedStatusCopy`, `getPrivatePreviewActiveStatusCopy`, `getProductionBlockedStatusCopy`).
  - Strictly concise, provider-neutral, non-predictive, privacy-preserving, and free of uptime or launch-date promises. Existing files, UI, routes, services, storage, and credentials left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 132 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-133 Completion Notes (Antigravity)
- **Status:** done (`fc2e4d2`)
- **Changed files:** `src/data/astrologyPreviewFaq.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only FAQ dataset for the optional private Astrology Preview covering all 7 critical domains:
    1. **Calculation vs. AI Reflection (`calculation-vs-reflection`):** Delineates deterministic mathematical ephemeris formulas from generative AI text interpretation; clarifies that calculations involve no AI and reflections never predict events or offer diagnoses (`badgeLabel: 'Ephemeris vs AI'`).
    2. **Transmitted Fields (`fields-sent`):** Clarifies that only birth date, optional birth time, numeric coordinates, and optional timezone are sent; personal identities, accounts, and dream journals are strictly excluded (`badgeLabel: 'Data Transmitted'`).
    3. **Local Location Labels (`local-location-labels`):** Guarantees that friendly city or place names remain on-device for display and only numeric latitude/longitude coordinates are transmitted (`badgeLabel: 'Kept on Device'`).
    4. **Missing Birth Time (`missing-birth-time`):** Explains the midday UTC reference snapshot, omission of Ascendant and houses, and ~13° daily lunar variance when birth time is unknown (`badgeLabel: 'Midday Snapshot'`).
    5. **Provider Processing (`provider-processing`):** Details stateless request handling without cloud accounts or user profiles, and notes contractual restrictions against foundation model training (`badgeLabel: 'Stateless Processing'`).
    6. **Local Deletion Limits (`local-deletion-limits`):** Explains that local deletion permanently purges all saved astrology records on-device while leaving dream entries untouched, but cannot retroactively recall transient server transit logs (`badgeLabel: 'Deletion Limits'`).
    7. **Why Production Remains Blocked (`production-blocked`):** Clearly communicates that general production deployment is restricted pending verification of durable request limiters, spending alerts, redacted observability, and test matrix sign-offs (`badgeLabel: 'Production Gates'`).
  - Defined clean interfaces (`AstrologyPreviewFaqTopic`, `AstrologyPreviewFaqCategory`, `AstrologyPreviewFaqItem`, `AstrologyPreviewFaqBundle`), constants (`ASTROLOGY_PREVIEW_FAQ_ORDERED_TOPICS`, `ASTROLOGY_PREVIEW_FAQ_ITEMS`, `ASTROLOGY_PREVIEW_FAQ_BUNDLE`), and lookup helpers (`getAstrologyPreviewFaqItem`, `getAllAstrologyPreviewFaqItems`, `getAstrologyPreviewFaqItemsByCategory`, `getAstrologyPreviewFaqBundle`, `isRecognizedPreviewFaqTopic`, `getCalculationVsReflectionFaq`, `getFieldsSentFaq`, `getLocalLocationLabelsFaq`, `getMissingBirthTimeFaq`, `getProviderProcessingFaq`, `getLocalDeletionLimitsFaq`, `getProductionBlockedFaq`).
  - Strictly concise, provider-neutral, non-predictive, privacy-preserving, and free of guarantees or launch promises. Existing files, UI, routes, services, storage, and credentials left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 132 tests passing).
- **Follow-up:** Ready for Codex review and integration.

### H-134 Completion Notes (Antigravity)
- **Status:** done (uncommitted; awaiting Codex integration)
- **Changed files:** `src/data/astrologyMacTestHelp.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only tester guidance module for manual macOS and iOS Simulator testing of the optional Astrology Preview covering all 6 required areas:
    1. **Synthetic Test Data (`synthetic-test-data`):** Mandates using fictitious, non-identifying sample profiles (with 3 standardized synthetic test profiles: standard date-only, standard timed, and leap-year UTC) rather than actual personal birth details (`badgeLabel: 'Test Data'`).
    2. **Secret Redaction (`secret-redaction`):** Prohibits capturing, displaying, or sharing API keys (`ASTROLOGY_API_KEY`, `OPENAI_API_KEY`), Vercel deployment bearer tokens, or `Authorization` headers in logs, screenshots, or bug reports (`badgeLabel: 'Redact Secrets'`).
    3. **Birth-Data Redaction (`birth-data-redaction`):** Directs testers to scrub or mask any potentially identifiable coordinates, location strings, or birth times, and confirms total absence of Jungian dream journal data from payloads (`badgeLabel: 'Mask Personal Data'`).
    4. **Expected Date-Only vs. Timed Results (`expected-results-comparison`):** Clarifies that date-only mode omits time-dependent angles and house numbers while showing a missing-time uncertainty note, whereas timed mode with a timezone uses the `date-time-timezone` contract and checks provider-returned angles plus available placement house numbers (`badgeLabel: 'Result Verification'`).
    5. **Safe Error Screenshots (`safe-screenshots`):** Instructs testers to crop captures strictly to the active modal/banner, excluding browser bookmarks, extensions, other tabs, system username file paths (`/Users/...`), and DevTools Network authorization headers (`badgeLabel: 'Clean Captures'`).
    6. **Defect-Report Evidence (`defect-evidence`):** Standardizes privacy-safe bug reports referencing Test Matrix IDs (`TC-DATE-*`, `TC-TIME-*`, `TC-ERR-*`), macOS/browser versions, Git commit hash, reproducible synthetic steps, and sanitized status codes (`badgeLabel: 'Report Template'`).
  - Defined clean interfaces (`AstrologyMacTestHelpTopic`, `SyntheticTestProfile`, `AstrologyMacTestHelpItem`, `AstrologyMacTestHelpBundle`), constants (`SYNTHETIC_TEST_PROFILES`, `ASTROLOGY_MAC_TEST_HELP_ORDERED_TOPICS`, `ASTROLOGY_MAC_TEST_HELP_ITEMS`, `ASTROLOGY_MAC_TEST_HELP_BUNDLE`), and lookup helpers (`getAstrologyMacTestHelpItem`, `getAllAstrologyMacTestHelpItems`, `getAstrologyMacTestHelpBundle`, `getSyntheticTestProfiles`, `getSyntheticProfileById`, `isRecognizedMacTestHelpTopic`, `getSyntheticTestDataHelp`, `getSecretRedactionHelp`, `getBirthDataRedactionHelp`, `getExpectedResultsComparisonHelp`, `getSafeScreenshotsHelp`, `getDefectEvidenceHelp`).
  - Strictly concise, provider-neutral, non-predictive, privacy-preserving, and free of guarantees. Existing files, UI, routes, services, storage, providers, and credentials left untouched.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 132 tests passing).
- **Codex review:** Accepted after aligning timed precision with the public chart contract and removing house-cusp assertions that the normalized response cannot expose.
- **Follow-up:** Integrated for the private Preview and Mac-test handoff.

### H-135 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/dreamImageMacTestHelp.ts`
- **Summary:** Added typed, content-only Mac-test guidance with three catalog-backed synthetic selections, six privacy/accessibility/evidence topics, and explicit separation between the testable preparation UI, the controlled disabled route, and provider-connected work still blocked by `BLK-IMG-01` through `BLK-IMG-05`.
- **Validation:** Catalog IDs, titles, styles, and referenced Mac-test cases were reviewed against the existing data and matrix; `npx tsc --noEmit` and `git diff --check` pass.
- **Follow-up:** Integrated for future Dream Image Mac testing without enabling or representing live generation.

### H-137 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/astrologyPreviewTroubleshooting.ts`
- **Summary:** Added typed, content-only recovery guidance for protected-preview access and seven application states, with mappings to the existing public chart/reflection/rate-limit error codes, safe retry timing, local-data notes, and privacy-preserving tester instructions.
- **Validation:** Public codes were reviewed against the deployed route and rate-limit contracts; `npx tsc --noEmit` and `git diff --check` pass.
- **Follow-up:** Ready for future UI integration without exposing internal provider details or credentials.

### H-138 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/astrologyPreviewFeedbackPrompts.ts`
- **Summary:** Added 14 neutral private-tester prompts across seven categories, using balanced response scales, bounded short text, synthetic-data guidance, and existing Mac-test case references without requesting attachments or identifying information.
- **Validation:** Referenced test cases and privacy boundaries were reviewed against the current Mac matrix; `npx tsc --noEmit` and `git diff --check` pass.
- **Follow-up:** Ready for a future private feedback surface or tester handout.

### H-139 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/astrologyPreviewSessionChecklist.ts`
- **Summary:** Added a typed nine-phase private-session checklist with 19 required or conditional actions covering synthetic date-only/timed flows, optional reflection, local deletion, accessibility spot checks, sanitized evidence, and closeout outcomes.
- **Validation:** Referenced Mac-test cases, destructive-test scope, and privacy exclusions were reviewed against the current matrix; `npx tsc --noEmit` and `git diff --check` pass.
- **Follow-up:** Ready for a future tester handout without granting deployment or Production authority.

### H-141 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/astrologyPreviewQuickStart.ts`
- **Summary:** Added an exact five-minute private-browser path with approved synthetic profile references, date-only and timed passes, optional reflection, required local-deletion verification, and privacy-safe outcome reporting.
- **Validation:** Step duration totals 300 seconds and referenced profiles/cases align with the reviewed guidance; `npx tsc --noEmit` and `git diff --check` pass.
- **Follow-up:** Ready for a future in-app or tester-handout quick start.

### H-143 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/astrologyPreviewTestOutcomeCopy.ts`
- **Summary:** Added typed complete, blocked, skipped, pass, and fail outcome copy with explicit product-defect versus provider/deployment-blocker classification and a restricted sanitized evidence contract.
- **Validation:** Outcome/classification combinations and public-error-code typing were reviewed against the private Preview troubleshooting contract; `npx tsc --noEmit` and `git diff --check` pass.
- **Follow-up:** Ready for future tester reporting without exposing private links, credentials, personal inputs, dream content, request bodies, or attachments.

### H-145 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/astrologyPreviewDeviceCheckCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only guidance dataset for all seven remaining hands-on Mac, browser, simulator, and device checks:
    1. **VoiceOver (`voiceover`):** Spoken labels, expanded/collapsed states, validation messages, and live status announcements (`TC-A11Y-01`, `TC-A11Y-02`, `TC-A11Y-03`).
    2. **Keyboard Focus (`keyboard-focus`):** Usable keyboard sequence, visible focus indicators, and focus trap prevention (`TC-A11Y-05`).
    3. **Appearance & Zoom (`appearance-zoom`):** Contrast readability, mode switching (light/dark), and enlarged browser/system display text (`TC-A11Y-04`).
    4. **Offline Recovery (`offline-recovery`):** Graceful recovery messaging, synthetic form preservation, and reconnection resilience (`TC-ERR-02`).
    5. **Relaunch Persistence (`relaunch-persistence`):** Verifies saved synthetic profile and chart restoration after relaunch while confirming non-restoration of ephemeral coordinates (`TC-PERSIST-01`, `TC-PERSIST-02`, `TC-PERSIST-03`).
    6. **Local Deletion (`local-deletion`):** Destructive confirmation dialog scoping deletion to local Astrology data only, and persistent purging across relaunches (`TC-DEL-01`, `TC-DEL-02`, `TC-DEL-03`, `TC-DEL-05`).
    7. **DST & Timezone Spot Check (`dst-timezone`):** Valid IANA timezone acceptance, historical daylight-saving uncertainty explanation, and timed precision verification (`TC-TIME-02`, `TC-TIME-05`, `TC-TIME-07`).
  - Structured all checks to begin as `not-run`; requires actual hands-on execution with approved synthetic profiles (`synthetic-date-only`, `synthetic-timed-standard`, `synthetic-leap-year`) and sanitized observations before marking `pass` or `fail`.
  - Defined clean interfaces, bundle metadata, allowed evidence fields, strict out-of-scope exclusions, and lookup helpers (`getAstrologyPreviewDeviceCheckBundle`, `getAstrologyPreviewDeviceCheck`, `getAllAstrologyPreviewDeviceChecks`, `getAstrologyPreviewDeviceChecksByTestCase`, `isExecutedAstrologyPreviewDeviceResult`, `isRecognizedAstrologyPreviewDeviceCheckId`, `isRecognizedAstrologyPreviewDeviceCheckOutcome`).
  - Completely content-only; zero alterations to UI, routes, services, providers, storage, docs, or credentials.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 135 tests passing).
- **Codex review:** Accepted; case IDs, approved synthetic profile IDs, public-error-code typing, and device-execution guard align with the current matrix and reporting contracts.
- **Follow-up:** Integrated as the remaining-device-check guidance; all cases still begin as `not-run` until executed on the assigned device.

### H-147 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/astrologyPreviewIssueTriageCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only issue triage guidance module mapping sanitized private-test observations across all five core classifications:
    1. **Product Defect (`product-defect`):** Available app behavior reproducibly differs from a specific Mac test matrix case (`suggestedOutcome: 'fail'`).
    2. **Provider Blocker (`provider-blocker`):** External calculation or reflection provider outage/rate-limit/timeout prevented completion, where app recovery behavior worked correctly (`suggestedOutcome: 'blocked'`).
    3. **Deployment Blocker (`deployment-blocker`):** Assigned private Preview build, route boundary, or environment flag prevented test behavior from being reached (`suggestedOutcome: 'blocked'`).
    4. **Needs More Evidence (`needs-more-evidence`):** Observation is insufficient to distinguish defect from blocker or expected behavior; requires safe re-execution without sensitive data (`suggestedOutcome: 'not-run'`).
    5. **No Issue Observed (`no-issue`):** Executed case with approved synthetic inputs matched documented expectation, including expected error/recovery flows (`suggestedOutcome: 'pass'`).
  - Required fields: existing Mac test matrix case ID (`TC-DATE-*`, `TC-TIME-*`, `TC-COORD-*`, `TC-CONSENT-*`, `TC-ERR-*`, `TC-PERSIST-*`, `TC-REFL-*`, `TC-A11Y-*`, `TC-DEL-*`), triage classification, approved public error code where available, and concise sanitized text observation.
  - Strictly prohibited: private Preview links/invitations, credentials/tokens/cookies, real birth data/coordinates/names, dream journal text/audio/tags, request/response bodies, diagnostic dumps, and attachments/screenshots.
  - Defined clean interfaces, bundle metadata, validation guards, and lookup helpers (`getAstrologyPreviewIssueTriageBundle`, `getAstrologyPreviewIssueTriageCopy`, `getAllAstrologyPreviewIssueTriageEntries`, `getSuggestedAstrologyPreviewBlockerClassification`, `isCompleteAstrologyPreviewTriageReport`, `isRecognizedAstrologyPreviewMacMatrixCaseId`, `isRecognizedAstrologyPreviewIssueTriageClassification`).
  - Completely content-only; zero alterations to UI, routes, services, providers, storage, docs, or credentials.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 135 tests passing).
- **Codex review:** Accepted; matrix-case range validation, public-code allowlists, blocker suggestions, and sensitive-evidence exclusions align with the current Preview contracts.
- **Follow-up:** Integrated for private-test triage without changing deployment or Production state.

### H-148 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/dreamImageSandboxTestOutcomeCopy.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only outcome and blocker guidance module for the optional, disabled-by-default Dream Image sandbox preparation flow covering all 6 outcome categories:
    1. **Preparation UI Defect (`preparation-ui-defect`):** Available scene, style, consent, preview, failure, action, or accessibility behavior reproducibly differs from a documented `TC-IMG-*` expectation (`badgeLabel: 'UI Defect'`).
    2. **Expected Feature-Disabled State (`expected-feature-disabled`):** The disabled-by-default flow presents its unavailable notice while curated preparation UI remains fully accessible and usable (`badgeLabel: 'Disabled as Expected'`).
    3. **Provider Blocker (`provider-blocker`):** Unresolved upstream provider capability, moderation policy, request limiter, or asset delivery gate prevents sandbox execution (`badgeLabel: 'Provider Blocked'`).
    4. **Deployment Blocker (`deployment-blocker`):** The application-owned route is not deployed or connected to the private Preview test path (`badgeLabel: 'Deployment Blocked'`).
    5. **Generation Skipped (`generation-skipped`):** Generation-dependent check was deliberately not exercised without claiming success or failure (`badgeLabel: 'Skipped'`).
    6. **Not Run (`not-run`):** The referenced test or blocker check has not yet been executed in the session (`badgeLabel: 'Not Run'`).
  - Strict reference and reporting contract:
    - References existing Mac test IDs (`TC-IMG-SCENE-*`, `TC-IMG-STYLE-*`, `TC-IMG-CONSENT-*`, `TC-IMG-FAIL-*`, `TC-IMG-PROG-*`, `TC-IMG-ACT-*`, `TC-IMG-DEL-*`, `TC-IMG-A11Y-*`) and blocker IDs (`BLK-IMG-01` through `BLK-IMG-05`) only.
    - Strictly prohibited: dream journal text/analyses/tags/voice transcripts, generated images/URLs/exports, private links/invitations, credentials/tokens/cookies, console outputs/logs/traces, request/response bodies, or file attachments.
  - Defined clean interfaces, bundle metadata, validation guards, and lookup helpers (`getDreamImageSandboxTestOutcomeBundle`, `getDreamImageSandboxTestOutcomeCopy`, `getAllDreamImageSandboxTestOutcomeEntries`, `isRecognizedDreamImageSandboxReferenceId`, `isCompleteDreamImageSandboxOutcomeReport`, `isRecognizedDreamImageSandboxTestOutcome`).
  - Completely content-only; does not enable generation or alter existing files, UI, routes, services, providers, storage, docs, or credentials.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 135 tests passing).
- **Codex review:** Accepted; all referenced `TC-IMG-*` and `BLK-IMG-*` identifiers match the current Mac matrix, and runtime range checks preserve the documented groups.
- **Follow-up:** Integrated as text-only sandbox outcome guidance; live generation remains disabled and blocked.

### H-150 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/dreamImageProviderGateHelp.ts`
- **Summary of Implementation:**
  - Created a fully typed, content-only evidence guidance module for `BLK-IMG-01` through `BLK-IMG-05`, describing the exact evidence needed to clear each gate without naming or selecting a provider:
    1. **`BLK-IMG-01` Private Preview Route (`preview-route`):** Architecture review for Preview build boundary, disabled-by-default response verification, and contract tests for consent, curated prompt/style allowlisting, unexpected-field rejection, and body-size limits.
    2. **`BLK-IMG-02` Provider Evaluation & Server Boundary (`provider-review`):** Completed evaluation records across data use, retention, training restrictions, moderation, output rights, regions, reliability, and support boundaries; server-only adapter architecture; and verified owner spending controls/alerts.
    3. **`BLK-IMG-03` Upstream Moderation Contract (`moderation`):** Sequence review ensuring allowlist validation precedes moderation; stable public error contract without private provider detail; and accessible, non-diagnostic recovery copy that preserves prepared selections.
    4. **`BLK-IMG-04` Durable Throttling & Cost Protection (`rate-controls`):** Architecture review for durable backend counters with one-way anonymous identifiers; contract tests for quota exhaustion and retry intervals; and owner-verified cost stop controls/alert thresholds.
    5. **`BLK-IMG-05` Transient Delivery & Retention (`delivery-and-retention`):** Transient delivery access review without account-linked storage; reviewable retention and expiry policies; contract tests requiring descriptive alt text and safe failure on expired assets; and copy disclosures separating remote, local, and system-library copies.
  - Keeps the feature disabled by default (`defaultState: 'disabled'`).
  - Explicitly prohibits sensitive evidence: raw dream journal text/analyses/tags/voice transcripts, generated images/URLs/exports, private links/invitations, credentials/tokens/cookies, raw logs/traces/dumps, request/response bodies, vendor marketing/promises, and premature approval claims.
  - Defined clean interfaces (`DreamImageProviderGateId`, `DreamImageProviderGateEvidenceKind`, `DreamImageProviderGateEvidenceItem`, `DreamImageProviderGateHelpEntry`, `DreamImageProviderGateHelpBundle`), constants, and query helpers (`getDreamImageProviderGateHelpBundle`, `getDreamImageProviderGateHelp`, `getAllDreamImageProviderGateHelpEntries`, `getDreamImageProviderGateEvidenceItems`, `isRecognizedDreamImageProviderGateId`).
  - Zero modifications to existing files, UI, routes, services, providers, storage, docs, or credentials.
- **Validation:**
  - `npx tsc --noEmit` passed with 0 errors (clean exit).
  - Full Jest test suite `npx jest --runInBand --watchAll=false` passed cleanly (22 suites, 135 tests passing).
- **Codex review:** Accepted; all five gates align with the current Mac matrix and setup contract, preserve the application-owned route boundary, and avoid provider or Production approval claims.
- **Follow-up:** Integrated as evidence guidance only; every activation gate remains open.

### H-152 Completion Notes (Antigravity)
- **Status:** reviewed; accepted (uncommitted)
- **Changed files:** `src/data/dreamImagePreviewQuickStart.ts`
- **Summary:** Added seven ordered preparation-only steps totaling exactly five minutes, using three catalog-backed scene/style selections and covering consent, privacy, expected-disabled behavior, accessibility spot checks, and sanitized text reporting.
- **Validation:** Scene titles, recommended styles, all referenced `TC-IMG-*`/`BLK-IMG-*` IDs, the 300-second duration, and strict no-media/no-provider boundaries were reviewed against the current catalog and Mac matrix; `npx tsc --noEmit` and `git diff --check` pass.
- **Follow-up:** Integrated for private preparation testing without claiming or enabling live generation.
