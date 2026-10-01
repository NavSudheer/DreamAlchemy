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
| H-028 | Codex -> Gemini | new `src/data/dictionarySearchKeywords.ts` only | Create a typed, content-only set of concise search keywords for every existing dictionary symbol ID, with lookup helpers. Use only neutral terms grounded in the existing symbol descriptions; do not alter UI or existing data. | in progress |

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
