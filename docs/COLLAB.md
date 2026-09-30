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
| H-004 | Codex -> Gemini | new `src/data/psychologyCheckpoints.ts` only | Create a typed, content-only question bank for future Psychology knowledge checks across science, theories, dream types, and culture. | open |

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
