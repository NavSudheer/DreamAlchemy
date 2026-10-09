# Dream Image Studio Mac Tester Feedback Template

**Document Version:** 1.0.0  
**Updated:** 2026-10-09  
**Platform Scope:** Mac (macOS Web / Safari / Chrome, iOS Simulator via Xcode, macOS VoiceOver)  
**Reference Document:** [`docs/DREAM_IMAGE_MAC_TEST_MATRIX.md`](DREAM_IMAGE_MAC_TEST_MATRIX.md)  
**Associated Task:** H-105 / H-106  

---

## 1. Purpose, Scope Separation & Privacy Mandate

Use this template to record manual test observations, visual defects, and accessibility findings for DreamAlchemy's provider-neutral Dream Image Studio on macOS.

### Crucial Testing Scope Separation
Testers must clearly distinguish between findings on the active preparation screen and features that are currently blocked awaiting backend/provider infrastructure:

| Scope Category | Status | Included Features | Testing Expectation |
| :--- | :--- | :--- | :--- |
| **Scope A: Preparation Screen** | **Active & Live** | Curated catalog scene selection (7 templates), art style radiogroup (4 styles), recommended style auto-selection and overrides, prepared reflection preview, dynamic alt text generation, safety checklist, consent/non-interpretive disclaimers, provider-unavailable preview card, light/dark theming, VoiceOver radio navigation. | Report functional defects, visual glitches, text clipping, contrast issues, or accessibility failures here. |
| **Scope B: Provider & Result Integration** | **Blocked Architecture** | Live image rendering network calls, real progress bar transitions on `/dream-image`, native photo library saving (`saveLocally`), native system share sheet (`share`), and persistent disk deletion of generated files. | Blocked by `BLK-IMG-01` through `BLK-IMG-05`. Components (`DreamImageProgress`, `DreamImageResultActions`) are verified by unit tests; do not report missing network generation as a UI defect. |

### Strict Redaction & Privacy Mandate
Before submitting any report, screenshot, or console output, **verify and redact**:
1. **Zero Provider Secrets or Credentials:** Never capture or paste endpoint authorization headers, bearer tokens, or serverless proxy secrets.
2. **Zero Personal Dream Journal Content:** Ensure no written personal dream entries, voice transcripts, personal diary notes, emotions, or personal names appear in screenshots, logs, or reproduction steps. Curated catalog prompts only!
3. **Zero Personal System Paths or Identifiers:** Redact local macOS home directory usernames, personal Apple IDs, or account identifiers.

---

## 2. Severity Classification Guide

| Severity | Definition | Examples in Dream Image Studio |
| :--- | :--- | :--- |
| **P0 - Critical / Blocker** | Crash, unhandled exception, raw dream text leak, or app freeze. | Crash when navigating to `/dream-image`; raw dream journal text injected into prompt preview; memory leak or browser freeze during catalog browsing. |
| **P1 - Major** | Core preparation breakdown with no workaround; unable to select scenes or styles. | Catalog scene cards fail to update active template; art style selection stuck; alt text generation produces empty or invalid text failing `isDescriptiveAltText`. |
| **P2 - Moderate** | Secondary feature defect, confusing error presentation, or accessibility failure. | VoiceOver fails to announce selected radio state; card border fails to highlight in dark mode; preview card clips text on narrow viewports; unavailable notice missing recovery action. |
| **P3 - Minor / Polish** | Cosmetic spacing flaw, typography inconsistency, or wording suggestion. | Subtle margin misalignment in style grid; minor typo in scene description; wording suggestion for non-interpretive disclaimer. |

---

## 3. Fillable Tester Feedback Template

Copy the markdown block below into your test report or GitHub issue:

```markdown
### 1. Test Metadata & Environment
- **Date & Time:** YYYY-MM-DD HH:mm (Timezone)
- **Tester / Operator:** [Your Name / Initials]
- **Target Surface:** [ ] macOS Safari  [ ] macOS Chrome  [ ] iOS Simulator (Model / iOS version)  [ ] Physical iOS Device
- **macOS Version & Architecture:** macOS [e.g. Sonoma 14.5 / Sequoia 15.0] · [ ] Apple Silicon (M1/M2/M3/M4)  [ ] Intel
- **App Commit Hash:** output of `git rev-parse --short HEAD` (for example, `<short-sha>`)
- **Branch:** `rework-on-production`
- **Configuration & Endpoint Status:**
  - `EXPO_PUBLIC_DREAM_IMAGE_API_URL`: [ ] Unset (Provider-Neutral Preview)  [ ] Mock / Test Proxy URL
  - Network Mode: [ ] Online (Wi-Fi)  [ ] Offline / Airplane Mode  [ ] Throttled Network

### 2. Testing Scope & Case Classification
- **Testing Scope:**
  [ ] **Scope A: Preparation Screen (Active UI on `/dream-image`)**
  [ ] **Scope B: Blocked Provider / Result Integration (Blocked Architecture)**
- **Test Matrix Case ID:** [e.g. TC-IMG-SCENE-03, TC-IMG-STYLE-02, TC-IMG-A11Y-01, BLK-IMG-01, or "Exploratory / Unscripted"]
- **Feature Area:**
  [ ] Curated Scene Selection (7 Templates)
  [ ] Art Style Radiogroup (4 Styles)
  [ ] Prepared Reflection & Alt Text Preview
  [ ] Consent & Non-Interpretive Disclaimers
  [ ] Safety Checklist & Boundary Copy
  [ ] Provider Unavailable / Offline Notice
  [ ] Progress Tracking Component (Unit / Component)
  [ ] Result Actions & Deletion (Unit / Component)
  [ ] VoiceOver / Accessibility / Theming
- **Severity Level:** [ ] P0 - Critical  [ ] P1 - Major  [ ] P2 - Moderate  [ ] P3 - Minor
- **Reproducibility:** [ ] Always (100%)  [ ] Intermittent (~50%)  [ ] Occurred Once

### 3. Issue Summary
- **Title / Headline:** [Concise 1-sentence description of the observation or defect]
- **Expected Behavior:** [What should happen per DREAM_IMAGE_MAC_TEST_MATRIX.md or UX specification]
- **Actual Behavior:** [What actually happened on screen, in VoiceOver, or in layout]

### 4. Reproduction Steps
1. Navigate to Dream Image Studio (`app/dream-image.tsx` or `/dream-image` on web).
2. [Action taken, e.g. Select catalog scene "Forest Sanctuary", override style to "Ethereal"]
3. [Inspection step, e.g. Inspect prepared reflection card and alt text preview]
4. [Observed outcome, e.g. Style label updates but card border indicator fails to shift]

### 5. Accessibility (A11y) Observations
- **VoiceOver Active:** [ ] Yes  [ ] No
- **Element Announcements:** [e.g. Radio button role and selected state announced clearly / Missing radio role]
- **Alt Text Evaluation:** [e.g. Description communicates the visible medium, subject, lighting, and palette / Important visual detail missing]
- **Focus & Touch Targets:** [e.g. Controls are comfortably operable / Focus outline or tap target is difficult to use]
- **Visual & Contrast Quality:** [ ] Light Mode OK  [ ] Dark Mode OK  [ ] Contrast issue noted: [Details]

### 6. Sanitized Evidence & Logs (Strictly Redacted)
> **Privacy Verification Check:**
> - [x] No API keys, Bearer tokens, or proxy credentials included
> - [x] No raw dream journal narratives, reflections, tags, or personal names included
> - [x] No personal system file paths or Apple ID credentials included

**Console Output / Network Trace (Sanitized):**
```text
[Paste sanitized browser or simulator console logs here]
```

**Screenshot Notes / Attachment:**
[Attach redacted screenshot or describe visual layout observation]
```

---

## 4. Example Completed Report

The following example illustrates a properly classified, privacy-safe Scope A test feedback submission:

This example is fictional and is not evidence of a verified DreamAlchemy defect or agreed interaction change.

```markdown
### 1. Test Metadata & Environment
- **Date & Time:** 2026-10-09 11:20 EDT
- **Tester / Operator:** QA-MacOperator
- **Target Surface:** [x] macOS Safari (17.5)  [ ] iOS Simulator
- **macOS Version & Architecture:** macOS Sonoma 14.5 · [x] Apple Silicon (M3)
- **App Commit Hash:** `<tested-sha>`
- **Branch:** `rework-on-production`
- **Configuration & Endpoint Status:**
  - `EXPO_PUBLIC_DREAM_IMAGE_API_URL`: [x] Unset (Provider-Neutral Preview)
  - Network Mode: [x] Online (Wi-Fi)

### 2. Testing Scope & Case Classification
- **Testing Scope:** [x] Scope A: Preparation Screen (Active UI on `/dream-image`)
- **Test Matrix Case ID:** TC-IMG-STYLE-02
- **Feature Area:** [x] Art Style Radiogroup (4 Styles)
- **Severity Level:** [x] P2 - Moderate
- **Reproducibility:** [x] Always (100%)

### 3. Issue Summary
- **Title / Headline:** Style override resets when re-selecting currently active catalog scene
- **Expected Behavior:** For this fictional example, the proposed interaction is that tapping an already selected scene preserves a manual style override.
- **Actual Behavior:** Tapping the currently selected scene card triggers `chooseTemplate` again and resets the art style back to the template's `recommendedStyle`.

### 4. Reproduction Steps
1. Navigate to `/dream-image` in Safari. Default scene "Luminous Threshold" is selected with "Ethereal" style.
2. Tap "Watercolor" in the art style grid. Prepared reflection updates to "Luminous Threshold · watercolor".
3. Tap the "Luminous Threshold" scene card again.
4. Observe that the style reverts to "Ethereal" instead of preserving the user's "Watercolor" selection.

### 5. Accessibility (A11y) Observations
- **VoiceOver Active:** Yes (Cmd+F5)
- **Element Announcements:** VoiceOver announces "Ethereal dream image style, selected" after reset; record browser-specific ordering language separately.
- **Alt Text Evaluation:** Alt text dynamically synchronizes to whichever style is active.
- **Visual & Contrast Quality:** [x] Light Mode OK  [x] Dark Mode OK

### 6. Sanitized Evidence & Logs (Strictly Redacted)
> **Privacy Verification Check:**
> - [x] No API keys, Bearer tokens, or proxy credentials included
> - [x] No raw dream journal narratives, reflections, tags, or personal names included
> - [x] No personal system file paths or Apple ID credentials included

**Console Output / Network Trace (Sanitized):**
```text
[DreamImageScreen] chooseTemplate called for id="threshold-passage", recommendedStyle="ethereal"
```
```
