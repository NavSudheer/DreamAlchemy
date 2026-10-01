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
| H-007 | Codex -> Gemini | new `src/data/psychologyArticleConnections.ts` only | Create a typed, content-only map from the four Psychology hub categories to 3–4 relevant existing dictionary symbol IDs and written technique IDs. Use only IDs that exist today, keep relationships purposeful and non-duplicative, and add query helpers. Do not alter UI, routes, or existing data files. | assigned |

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
