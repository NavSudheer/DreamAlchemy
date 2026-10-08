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
| H-068 | Codex -> Antigravity | new `src/data/astrologyAngleGlossary.ts` only | Create typed, content-only, non-predictive glossary entries for Ascendant and Midheaven with concise accessibility descriptions and lookup helpers. Frame both as traditional symbolic chart angles; do not alter UI, routes, services, providers, storage, credentials, or existing files. | in progress |
| H-069 | Codex -> Codex | Astrology placement lookup and H-066 minor-body glossary only | Integrate reviewed minor-body glossary entries into alias-normalized placement expansion and add regression coverage without changing stored chart data. | done (committing) |
| H-070 | Codex -> Codex | Astrology validation UI and focused component tests only | Add focused regression coverage for field-specific birth-profile, timezone, and coordinate errors without changing provider or storage behavior. | queued |

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
