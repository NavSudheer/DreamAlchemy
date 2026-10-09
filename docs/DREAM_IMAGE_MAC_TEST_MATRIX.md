# Dream Image Studio Mac Manual Test Matrix

**Document Version:** 1.0.0  
**Updated:** 2026-10-09  
**Platform Scope:** Mac (macOS / Safari / Chrome Web Smoke, iOS Simulator via Xcode, macOS VoiceOver)  
**Associated Task:** H-102  

---

## 1. Overview & Verification Objectives

This test matrix defines the manual test cases for DreamAlchemy's provider-neutral Dream Image preparation and result studio on macOS. It verifies curated prompt boundaries, style selection, non-interpretive consent framing, failure recovery, accessible progress tracking, local result actions, deletion scope, and explicit provider-connected release blockers.

### Key Architectural & Privacy Boundaries
1. **Curated Scene Catalog Only:** Prompts are selected exclusively from curated catalog scenes (`DREAM_IMAGE_PROMPT_TEMPLATES`). Raw personal dream journal narratives, voice notes, and diary entries are **never requested, collected, or included**.
2. **Local Dream Association Only:** The local dream identifier (`dreamId`) remains strictly app-local and is stripped from the provider payload (`createDreamImageProviderPayload` omits `dreamId`).
3. **Provider-Neutral Preparation:** The app contains zero image provider credentials, zero direct billing/quota dependencies, and operates in offline/preview preparation mode when unconfigured.
4. **Accessible Alternative Text:** Every curated scene and style combination provides descriptive alt text (`getAltTextForTemplate`) checked by the project's local `isDescriptiveAltText` heuristic; VoiceOver quality still requires manual review.
5. **Result Actions Are a Component Boundary:** Share, save, regenerate, and delete copy/confirmations exist as a reusable component, but the current preparation screen does not yet render a generated result or implement local image-file persistence.

---

## 2. Test Environment Setup & Configuration

| Environment / Variable | Value / Configuration | Purpose |
| :--- | :--- | :--- |
| `EXPO_PUBLIC_DREAM_IMAGE_API_URL` | Unset (Current / Default) | Verify provider-neutral preview & offline preparation behavior |
| `EXPO_PUBLIC_DREAM_IMAGE_API_URL` | Mock / Test Proxy URL (Future) | Verify generation network handshake when proxy is available |
| Client Environment | macOS Web (`npx expo start --web`) or iOS Simulator | Verification target platforms |
| VoiceOver | macOS VoiceOver (`Cmd+F5`) | Screen reader and live region verification |

---

## 3. Test Cases Matrix

### Group 1: Curated Scene Selection & Prompt Boundary

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMG-SCENE-01** | Default Scene Initialization | Open `/dream-image` in browser or simulator | Default scene `Luminous Threshold` is selected initially; recommended style `ethereal` is selected. | `app/dream-image.tsx` |
| **TC-IMG-SCENE-02** | Catalog Scene Switching | Click through each of the 7 catalog scenes | Selection updates immediately; active card reflects primary border (`selected`); description and atmospheric mood update. | `app/dream-image.tsx` |
| **TC-IMG-SCENE-03** | Auto-Select Recommended Style | Select `Mirror of Stillness` (`watercolor`) or `Celestial Ascent` (`surreal`) | Active art style automatically updates to match the template's `recommendedStyle`. | `app/dream-image.tsx` |
| **TC-IMG-SCENE-04** | Raw Journal Text Exclusion | Inspect entire screen and form inputs | Zero input fields exist for entering personal dream text; prepared reflection displays abstract curated `promptText` only. | `dreamImage.test.ts` |
| **TC-IMG-SCENE-05** | Dynamic Alt Text Preview | Switch scenes and inspect "Accessible scene description" | Alt text updates dynamically to match the active template and style via `getAltTextForTemplate`. | `dreamImageSafetyGuidelines.test.ts` |
| **TC-IMG-SCENE-06** | Payload Boundary Enforcement | Inspect output of `createDreamImageProviderPayload` | Payload contains **only** `visualReflectionPrompt` and `style`; `dreamId` is strictly omitted. | `dreamImage.test.ts` |

---

### Group 2: Art Style Selection & Matrix

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMG-STYLE-01** | Style Radiogroup Switching | Select each of the 4 styles: `ethereal`, `surreal`, `watercolor`, `cinematic` | Active style updates; card border highlights; prepared reflection subtitle updates (e.g. `Luminous Threshold · surreal`). | `app/dream-image.tsx` |
| **TC-IMG-STYLE-02** | Manual Override of Recommendation | Select a scene (e.g. `Canopy Sanctuary`), then manually select `ethereal` | Style switches to `ethereal` and persists without being forced back to recommendation. | `app/dream-image.tsx` |
| **TC-IMG-STYLE-03** | Style Descriptions & Metadata | Inspect style cards in the grid | Each card renders display label (`label`) and artistic summary (`shortDescription`). | `dreamImageStyleMetadata.ts` |
| **TC-IMG-STYLE-04** | Style Radiogroup Accessibility | Inspect radiogroup attributes with VoiceOver | Container has `accessibilityRole="radiogroup"`; options have `accessibilityRole="radio"` and announce `accessibilityState={{ selected }}`. | `app/dream-image.tsx` |

---

### Group 3: Consent & Non-Interpretive Disclaimers

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMG-CONSENT-01** | Consent Acknowledgment Copy | Inspect consent text in prepared reflection card | Prominently displays: `"I understand this is an abstract artistic reflection, not psychological interpretation or medical advice, and I agree to process this curated scene."` | `dreamImageConsentCopy.ts` |
| **TC-IMG-CONSENT-02** | Non-Interpretive Disclaimer | Inspect italic disclaimer caption | Prominently displays: `"Generated artwork serves as symbolic visual poetry for contemplation. It does not analyze subconscious mental health or diagnose psychological conditions."` | `dreamImageConsentCopy.ts` |
| **TC-IMG-CONSENT-03** | Safety Checklist Card | Inspect "Privacy and safety boundaries" card | Displays all 4 checklist points with checkmarks: Raw journal exclusion, personal identifiers exclusion, non-medical framing, and descriptive alt text. | `dreamImageSafetyGuidelines.ts` |

---

### Group 4: Disabled, Offline & Failure States

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMG-FAIL-01** | Provider Unconfigured / Preview | Open studio with `EXPO_PUBLIC_DREAM_IMAGE_API_URL` unset | Preview banner renders: `Preview Mode`, `Image Service Unavailable`, explanation, and `"You can safely explore and preview curated scene templates and art styles offline."` | `dreamImage.test.ts`, `app/dream-image.tsx` |
| **TC-IMG-FAIL-02** | Offline Copy Contract | Inspect focused failure-copy tests | `No Internet Connection` copy includes a recovery action and states that raw journal text was not sent. This state is not yet wired into the preparation screen. | `dreamImageFailureCopy.test.ts` |
| **TC-IMG-FAIL-03** | Moderation Copy Contract | Inspect focused failure-copy tests | Non-retryable `Scene Description Not Allowed` recovery copy exists. End-to-end moderation remains blocked on the future server proxy. | `dreamImageFailureCopy.test.ts` |
| **TC-IMG-FAIL-04** | Rate-Limit Copy Contract | Inspect focused failure-copy tests | `Generation Limit Reached` cooldown copy exists. A real HTTP 429 path remains blocked on proxy and limiter implementation. | `dreamImageFailureCopy.test.ts` |
| **TC-IMG-FAIL-05** | Timeout Service Contract | Exercise `generateDreamImage` with a controlled abort in tests | Service maps aborts to a retry message. The current preparation screen has no Generate action, so manual network execution is not yet available. | `dreamImage.test.ts` |
| **TC-IMG-FAIL-06** | Privacy Preservation in Failure Copy | Inspect the failure-copy dataset | Failure states state that raw dream journal text was not included. Verify rendered error-card integration after generation UI exists. | `dreamImageFailureCopy.ts` |

---

### Group 5: Generation Progress Accessibility

These cases validate the standalone progress component. It is not yet mounted by the current preparation screen.

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMG-PROG-01** | Step 1: Queued State | Render `DreamImageProgress state="queued"` | Displays `Step 1 of 4`, `ActivityIndicator`, progress bar at 25%, label: `"Queued for Rendering"`, and privacy reassurance. | `DreamImageProgress.test.tsx` |
| **TC-IMG-PROG-02** | Step 2: Moderating State | Render `DreamImageProgress state="moderating"` | Displays `Step 2 of 4`, progress bar at 50%, label: `"Reviewing Prompt Safety"`, short label: `"Safety Check"`. | `DreamImageProgress.tsx` |
| **TC-IMG-PROG-03** | Step 3: Rendering State | Render `DreamImageProgress state="rendering"` | Displays `Step 3 of 4`, progress bar at 75%, label: `"Rendering Visual Reflection"`. | `DreamImageProgress.tsx` |
| **TC-IMG-PROG-04** | Step 4: Finalizing State | Render `DreamImageProgress state="finalizing"` | Displays `Step 4 of 4`, progress bar at 100%, label: `"Finalizing Artwork"`. | `DreamImageProgress.test.tsx` |
| **TC-IMG-PROG-05** | Screen Reader Live Region | Transition between progress states | `accessibilityLiveRegion="polite"` announces dynamic status update (e.g. `"Finalizing artwork and descriptive alt text for local display."`). | `DreamImageProgress.test.tsx` |
| **TC-IMG-PROG-06** | Progress Bar Accessibility | Inspect progress bar element | `accessibilityRole="progressbar"`, `accessibilityValue={{ min: 1, max: 4, now: step, text: shortLabel }}`. | `DreamImageProgress.test.tsx` |

---

### Group 6: Local Result Actions & Workflows

These cases validate the reusable action component and callback boundary. They do not prove that sharing, photo-library saving, image persistence, or deletion storage is implemented end to end.

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMG-ACT-01** | Dynamic Action Filtering | Pass subset of handlers to `DreamImageResultActions` | Renders only buttons with provided handlers; omitted actions are not rendered. | `DreamImageResultActions.test.tsx` |
| **TC-IMG-ACT-02** | Non-Destructive Actions | Render with a Share or Save handler and tap its button | Supplied handler fires immediately without confirmation. File/metadata behavior belongs to the future integration and is not asserted by this component test. | `DreamImageResultActions.test.tsx` |
| **TC-IMG-ACT-03** | Regenerate Action Confirmation | Tap `Regenerate Visual Reflection` | Confirmation dialog opens: `"Regenerate artwork? This will create a new image reflection for this scene. Your written dream entry and analysis will remain completely unchanged."` | `dreamImageResultActionsCopy.ts` |
| **TC-IMG-ACT-04** | Privacy Notice Banner | Inspect actions card footer | Displays: `"Your journal entries, personal notes, and dream interpretations remain stored separately on this device and are not embedded into saved or shared images."` | `DreamImageResultActions.tsx` |

---

### Group 7: Deletion Scope & Limitations

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMG-DEL-01** | Destructive Deletion Confirmation | Tap `Delete Artwork` button | System alert opens with `DREAM_IMAGE_RESULT_ACTIONS.delete.confirmation.dialogTitle` (`"Delete generated artwork?"`) and explanation. | `DreamImageResultActions.test.tsx` |
| **TC-IMG-DEL-02** | Deletion Cancellation | Tap `"Keep Image"` in confirmation alert | Dialog dismisses; delete handler is **not** called; image remains intact. | `DreamImageResultActions.test.tsx` |
| **TC-IMG-DEL-03** | Deletion Callback Confirmation | Tap `"Delete Image"` in the alert | Supplied delete handler executes. Actual local file removal and success feedback remain integration work. | `DreamImageResultActions.test.tsx` |
| **TC-IMG-DEL-04** | Deletion Scope Copy | Inspect delete hint and confirmation | Copy limits the intended action to artwork and states that the written dream entry, tags, and Jungian analysis are outside its scope. Verify storage isolation when persistence is implemented. | `dreamImageResultActionsCopy.ts` |

---

### Group 8: VoiceOver Accessibility & Theming

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-IMG-A11Y-01** | Scene Radio VoiceOver Labels | Navigate catalog with VoiceOver (`Cmd+F5`) | Announces each title and description with radio selected state; record actual ordering language on the tested browser/simulator. | `app/dream-image.tsx` |
| **TC-IMG-A11Y-02** | Art Style VoiceOver Labels | Navigate style grid with VoiceOver | Announces `accessibilityLabel` (e.g. `"Cinematic dream image style"`) and `accessibilityHint` with selected status. | `app/dream-image.tsx` |
| **TC-IMG-A11Y-03** | Descriptive Alt Text Compliance | Evaluate all 28 template/style alt texts | All pass `isDescriptiveAltText`; zero empty strings, raw filenames, or non-descriptive placeholders. | `dreamImageSafetyGuidelines.test.ts` |
| **TC-IMG-A11Y-04** | Light & Dark Mode Theming | Toggle theme between light and dark | Card surfaces, selection borders, text hierarchy, and contrast ratios maintain WCAG AA readability in both themes. | `app/dream-image.tsx` |
| **TC-IMG-A11Y-05** | Viewport & Tap Handling | Resize browser window / test on mobile width | Cards reflow cleanly; style grid maintains 2-column layout; scrollview handles taps without clipping. | `app/dream-image.tsx` |

---

## 4. Explicit Provider-Connected Release Blockers

The following items are explicit architecture and infrastructure blockers that **must be resolved before any live image provider can be enabled in production**:

| Blocker ID | Category | Current State | Required Release Gate |
| :--- | :--- | :--- | :--- |
| **BLK-IMG-01** | Server Proxy Infrastructure | `EXPO_PUBLIC_DREAM_IMAGE_API_URL` is unset; no serverless route exists for image generation. | Deploy a dedicated serverless proxy (e.g. `/api/dream-image`) that holds provider secrets and handles client requests. |
| **BLK-IMG-02** | Provider Credentials & Key Storage | No image generation provider selected or funded; zero API keys stored. | Choose an enterprise image generation provider (e.g. Imagen, DALL-E, Stability), secure server-only API keys, and configure spend alerts. |
| **BLK-IMG-03** | Upstream Content Moderation | Client enforces catalog curation; proxy moderation contract unconfigured. | Implement server-side prompt moderation checks before calling the image generation provider. |
| **BLK-IMG-04** | Durable Request Throttling | No rate limiter exists for image requests. | Implement an anonymous, server-side rate limiter / cooldown window to prevent quota exhaustion and cost spikes. |
| **BLK-IMG-05** | Image CDN & Transient Storage | No remote image hosting or CDN caching pipeline configured. | Configure transient image storage / delivery CDN with safe retention windows that do not link images to personal user accounts. |

---

## 5. Mac Manual Execution Quick-Check Commands

### Local Web Smoke Execution
```bash
# Start local web development server
npx expo start --web

# In browser, navigate to Dream Image Studio:
# http://localhost:8081/dream-image
```

### Automated Suite Regression Verification
```bash
# Verify Dream Image automated unit & component tests
npx jest src/services/__tests__/dreamImage* src/components/dream-image/__tests__/* src/data/__tests__/dreamImage* --watchAll=false

# Full project test suite run
npx jest --watchAll=false

# TypeScript strict type check
npx tsc --noEmit
```

---

## 6. Pass / Fail Acceptance Gate

The Dream Image Studio preparation experience passes its current provider-neutral verification when:
- [ ] Groups 1–3 and 8 pass on the preparation screen with 0 unhandled exceptions or crashes.
- [ ] Groups 4–7 pass their cited unit/component tests; any provider/result end-to-end cases remain explicitly marked blocked rather than reported as manually passed.
- [ ] Personal dream journal narratives, reflections, and dates are never requested, collected, or attached to prompts or images.
- [ ] Provider unavailable notice renders gracefully when `EXPO_PUBLIC_DREAM_IMAGE_API_URL` is unset.
- [ ] Full Jest automated test suite passes with 0 failures (`16 suites, 75+ tests passing`).
- [ ] `npx tsc --noEmit` exits with code 0.
- [ ] All 5 provider-connected release blockers (`BLK-IMG-01` to `BLK-IMG-05`) remain acknowledged and documented as blockers to live production enablement.

**Readiness boundary:** the curated preparation screen is eligible for local Mac UI testing. Generation, progress integration, image persistence, save/share, and deletion workflows are not user-test-ready end to end until the provider-connected blockers and result integration are implemented.

---

## 7. Codex Execution Record — 2026-10-09

| Check | Result | Evidence / Remaining Work |
| :--- | :--- | :--- |
| Focused automated coverage | Pass | Dream Image service, safety, failure-copy, progress, result-action, and preparation-screen tests pass. |
| Local web route smoke | Pass | Fresh Expo web build rendered `/dream-image`; accessibility inspection exposed the title, preview/unavailable notice, safety boundaries, seven scene radios, four style radios, prepared prompt, alt text, consent copy, and non-interpretive disclosure. |
| Default selection and recommendation | Pass | Rendered preview starts at `Luminous Threshold · Ethereal`; automated UI coverage verifies selecting `Mirror of Stillness` also selects Watercolor. |
| Scene grouping | Fixed and tested | Added the missing scene `radiogroup` boundary so both scene and style choices have explicit assistive grouping. |
| VoiceOver phrasing, light/dark contrast, and responsive layout | Pending Mac operator | Record actual Safari/Chrome/iOS Simulator announcements and visual evidence with synthetic content only. |
| Generation and result workflows | Blocked by design | No Generate action, proxy, result persistence, or save/share/delete integration exists yet; component contracts alone must not be reported as end-to-end passes. |
