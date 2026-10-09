# Astrology Feature Mac Tester Feedback Template

**Document Version:** 1.0.0  
**Updated:** 2026-10-09  
**Platform Scope:** Mac (macOS Web / Safari / Chrome, iOS Simulator via Xcode, macOS VoiceOver)  
**Reference Document:** [`docs/ASTROLOGY_MAC_TEST_MATRIX.md`](ASTROLOGY_MAC_TEST_MATRIX.md)  
**Associated Task:** H-098 / H-099  

---

## 1. Purpose & Privacy-First Guidelines

Use this template to record manual test findings, defects, and accessibility observations during Mac verification of DreamAlchemy's optional hybrid Astrology feature.

### Strict Redaction & Privacy Mandate
Before submitting any report, screenshot, or console log, **verify and redact**:
1. **Zero Secrets or API Keys:** Never include `ASTROLOGY_API_KEY`, `OPENAI_API_KEY`, Bearer tokens, or Vercel proxy headers.
2. **Zero Real Personal Birth Details:** Replace real birth dates, exact birth times, residential coordinates, and real personal locations with synthetic test values (e.g., `1995-04-12`, `14:30`, `40.7128`, `[REDACTED_COORDS]`, `"Sample City"`).
3. **Zero Personal Dream Journal Content:** Ensure no real dream entries, voice transcripts, personal reflections, tags, or personal names appear in screenshots, logs, or reproduction steps.

---

## 2. Severity Classification Guide

| Severity | Definition | Examples in Astrology Feature |
| :--- | :--- | :--- |
| **P0 - Critical / Blocker** | Crash, unhandled exception, data loss, privacy leak, or complete blockage. | App crash on launch; coordinates saved to disk; dream journal data altered; deletion fails to purge local keys; secrets exposed in logs. |
| **P1 - Major** | Core functional breakdown with no workaround; false validation blocking valid inputs. | Valid leap day `2024-02-29` rejected; valid IANA timezone rejected; chart calculation fails when provider is configured and available; reflection button unresponsive. |
| **P2 - Moderate** | Secondary feature failure, confusing error copy, or major accessibility defect. | VoiceOver fails to announce validation error; accordion toggle does not indicate expanded state; dark mode contrast illegible; rate limit copy misleading. |
| **P3 - Minor / Polish** | Cosmetic issue, styling glitch, typo, or minor usability suggestion. | Minor padding misalignment; subtle button flicker on tap; typo in glossary note; wording suggestion for non-predictive disclaimer. |

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
- **Environment Configuration:**
  - `ASTROLOGY_FEATURE_ENABLED`: [ ] `false` (Disabled/Preview)  [ ] `true` (Enabled)  [ ] Unset
  - `EXPO_PUBLIC_API_BASE_URL`: [Localhost / Vercel Preview URL / None]
  - Network Condition: [ ] Online (Wi-Fi/Ethernet)  [ ] Offline / Airplane Mode  [ ] Throttled / Slow 3G

### 2. Test Execution Information
- **Test Matrix Case ID:** [e.g. TC-DATE-03, TC-TIME-06, TC-DEL-02, or "Exploratory / Unscripted"]
- **Feature Area:**
  [ ] Birth Date Bounds
  [ ] Birth Time / Timezone
  [ ] Coordinates / Location Label
  [ ] Consent & Request Summary
  [ ] Error Handling (Disabled / Offline / 429 / 500)
  [ ] Local Persistence & Relaunch
  [ ] AI Reflection Boundaries
  [ ] VoiceOver / Accessibility / Theming
  [ ] Deletion Scope & Limitations
- **Severity Level:** [ ] P0 - Critical  [ ] P1 - Major  [ ] P2 - Moderate  [ ] P3 - Minor
- **Reproducibility:** [ ] Always (100%)  [ ] Intermittent (~50%)  [ ] Occurred Once

### 3. Issue Summary
- **Title / Headline:** [Concise 1-sentence description of the observation or issue]
- **Expected Behavior:** [What should happen according to ASTROLOGY_MAC_TEST_MATRIX.md or UX specification]
- **Actual Behavior:** [What actually happened on screen, in console, or in storage]

### 4. Reproduction Steps
1. Navigate to Astrology screen (`app/astrology.tsx` or `/astrology` on web).
2. Enter synthetic test inputs:
   - Birth Date: `[YYYY-MM-DD]`
   - Birth Time: `[HH:mm or blank]`
   - Timezone: `[IANA timezone or blank]`
   - Location Label: `[City, Region or blank]`
   - Latitude: `[Decimal or blank]`
   - Longitude: `[Decimal or blank]`
3. [Action taken, e.g. Toggle consent switch to ON, tap "Calculate Chart"]
4. [Observed outcome, e.g. Form highlights field with unexpected message, or screen freezes]

### 5. Accessibility (A11y) Observations
- **VoiceOver Active:** [ ] Yes  [ ] No
- **Element Announcements:** [e.g. Label read clearly as "Birth date, required" / Missing role announcement]
- **Live Region Alerts:** [e.g. Error message announced politely on calculation failure / Not announced]
- **Keyboard / Focus Behavior:** [e.g. Tab traversal smooth / Focus lost after accordion expansion]
- **Visual & Contrast Quality:** [ ] Light Mode OK  [ ] Dark Mode OK  [ ] Contrast issue noted: [Details]

### 6. Sanitized Evidence & Logs (Strictly Redacted)
> **Privacy Verification Check:**
> - [x] No API keys (`ASTROLOGY_API_KEY`, `OPENAI_API_KEY`, Bearer tokens) included
> - [x] No real birth records, hospital times, or personal street addresses included
> - [x] No personal dream journal entries or dream analysis text included

**Console Output / Network Trace (Sanitized):**
```text
[Paste sanitized terminal or browser console log here]
```

**Screenshot Notes / Attachment:**
[Attach redacted screenshot or describe visual defect]
```

---

## 4. Example Completed Report

The following example illustrates a properly redacted and structured test feedback submission:

This example is fictional and is not evidence of a verified DreamAlchemy defect.

```markdown
### 1. Test Metadata & Environment
- **Date & Time:** 2026-10-09 10:15 EDT
- **Tester / Operator:** QA-MacOperator
- **Target Surface:** [x] macOS Chrome (129.0)  [ ] iOS Simulator
- **macOS Version & Architecture:** macOS Sonoma 14.5 · [x] Apple Silicon (M2)
- **App Commit Hash:** `<tested-sha>`
- **Branch:** `rework-on-production`
- **Environment Configuration:**
  - `ASTROLOGY_FEATURE_ENABLED`: [x] `false` (Disabled/Preview)
  - `EXPO_PUBLIC_API_BASE_URL`: http://localhost:8081
  - Network Condition: [x] Online (Wi-Fi)

### 2. Test Execution Information
- **Test Matrix Case ID:** TC-TIME-06
- **Feature Area:** [x] Birth Time / Timezone
- **Severity Level:** [x] P2 - Moderate
- **Reproducibility:** [x] Always (100%)

### 3. Issue Summary
- **Title / Headline:** Country name rejection suggestion text clips on narrow browser viewports
- **Expected Behavior:** Rejection banner should wrap gracefully across multiple lines when country name "India" is entered.
- **Actual Behavior:** Suggestion text `Use an IANA timezone such as "Asia/Kolkata"` clips against the card border when browser window is resized below 380px width.

### 4. Reproduction Steps
1. Open http://localhost:8081/astrology in Chrome.
2. Resize viewport width to 360px (mobile emulation mode).
3. Enter Birth Date: `1997-11-15`, Birth Time: `12:00`, Timezone: `India`.
4. Fill Latitude: `28.61`, Longitude: `77.20`, toggle consent to ON.
5. Tap "Calculate Chart".
6. Observe error text clipping at the right card edge.

### 5. Accessibility (A11y) Observations
- **VoiceOver Active:** Yes (Cmd+F5)
- **Element Announcements:** VoiceOver correctly reads the full text despite visual clipping: `Timezone "India" is not valid. Use an IANA timezone such as "Asia/Kolkata".`
- **Live Region Alerts:** Live region announced immediately.
- **Visual & Contrast Quality:** [x] Light Mode OK  [x] Dark Mode OK  (Issue is layout wrapping only).

### 6. Sanitized Evidence & Logs (Strictly Redacted)
> **Privacy Verification Check:**
> - [x] No API keys (`ASTROLOGY_API_KEY`, `OPENAI_API_KEY`, Bearer tokens) included
> - [x] No real birth records, hospital times, or personal street addresses included
> - [x] No personal dream journal entries or dream analysis text included

**Console Output / Network Trace (Sanitized):**
```text
[Form Validation] Field "timezone" issue: invalid_timezone. Input: "India", Suggestion: "Asia/Kolkata"
```
```
