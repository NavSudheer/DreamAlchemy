# Astrology Feature Mac Manual Test Matrix

**Document Version:** 1.0.0  
**Updated:** 2026-10-09  
**Platform Scope:** Mac (macOS / Safari / Chrome Web Smoke, iOS Simulator via Xcode)  
**Associated Task:** H-096 / H-097  

---

## 1. Overview & Verification Objectives

This test matrix defines the manual test cases for DreamAlchemy's optional hybrid Astrology feature on macOS. It validates input validation, network privacy boundaries, error recovery, local data persistence, assistive accessibility, and local deletion guarantees.

### Key Architectural & Privacy Boundaries
1. **Local-First Storage:** Local birth profile (`LocalBirthProfile`), calculated chart (`AstrologyChart`), and AI reflections (`AstrologyReflection`) are persisted in the app's local `AsyncStorage` (`dreamalchemy.astrology.profile.v1` and `dreamalchemy.astrology.bundle.v1`).
2. **Ephemeral Coordinates:** Decimal latitude and longitude are transmitted only in ephemeral request payloads for chart calculation and are **never saved** to local storage.
3. **Dream Journal Isolation:** Raw dream journal entries, personal reflections, tags, voice notes, and patterns are **strictly isolated** and never accessed or transmitted by astrology services.
4. **Two-Hop Reflection Route:** The client sends a calculated chart rather than birth details. The server constructs an allowlisted, capped placement/aspect summary for the model and rejects raw dream or birth-profile containers.
5. **Irreversible External Transmissions:** Local deletion immediately purges the app's local astrology storage, but cannot retract requests previously processed under external providers' independent retention policies.

---

## 2. Test Environment Setup & Configuration

| Environment / Variable | Value / Configuration | Purpose |
| :--- | :--- | :--- |
| `ASTROLOGY_FEATURE_ENABLED` | `false` (Initial) & `true` (provider-connected test only) | Verify feature-disabled recovery vs live provider integration; do not treat enabled as production-ready until rate controls and deployment gates pass |
| `ASTROLOGY_API_KEY` | Server-only key in Vercel / `.env.local` | Calculation proxy authentication (never exposed to client) |
| `OPENAI_API_KEY` | Server-only key in Vercel / `.env.local` | AI reflection generation proxy |
| Client Environment | macOS Web (`npx expo start --web`) or iOS Simulator | Verification target platforms |

Never commit `.env.local` or paste server keys into client-visible Expo configuration.

---

## 3. Test Cases Matrix

### Group 1: Birth Date Validation & Bounds

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-DATE-01** | Standard Valid Date | Enter `1995-04-12` | Date accepted without error border; enables downstream field entry. | `astrology.test.ts` |
| **TC-DATE-02** | Valid Leap-Year Day | Enter `2024-02-29` | Leap day accepted for valid leap year 2024. | `astrology.test.ts` |
| **TC-DATE-03** | Invalid Leap-Year Day | Enter `1997-02-29` | Rejection error: `"Birth date: 1997 is not a leap year. February has only 28 days in 1997."` Red border on input. | `app/__tests__/astrology.test.tsx` |
| **TC-DATE-04** | Invalid Month / Day Range | Enter `1995-04-31` (April has 30 days) or `1995-13-01` | Rejection error indicating invalid calendar day for the month. | `astrology.test.ts` |
| **TC-DATE-05** | Malformed Date String | Enter `11/15/1997`, `1997-5-5`, or `abc` | Rejection error: `"Birth date \"...\" is not valid. Use YYYY-MM-DD."` | `app/__tests__/astrology.test.tsx` |
| **TC-DATE-06** | Future Birth Date | Enter any date in the future (e.g. `2099-01-01`) | Rejection error: `"Birth date cannot be in the future."` | `astrology.test.ts` |
| **TC-DATE-07** | Supported Historical Bound (< 1800) | Enter `1799-12-31` | Rejection error: `"Enter a valid birth date."` (enforces >= 1800 ephemeris bound). | `astrology.test.ts` |
| **TC-DATE-08** | Birth Date Help Disclosure | Tap `"What birth date format should I use?"` | Accordion expands displaying `ASTROLOGY_BIRTH_DATE_HELP`: required format, calendar rules, and explanation of why full names are unnecessary. | `app/__tests__/astrology.test.tsx` |

---

### Group 2: Birth Time & Timezone Handling

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-TIME-01** | Date-Only Mode (Blank Time) | Leave birth time and timezone blank | Form validates cleanly; calculation proceeds with midday solar reference; fast-moving angles/houses are withheld. | `astrology.test.ts` |
| **TC-TIME-02** | Valid 24-Hour Time | Enter `14:30`, `08:05`, or `00:00` | Accepted without error; parsed as hour and minute integers. | `astrology.test.ts` |
| **TC-TIME-03** | Invalid Time Format | Enter `2:30 PM`, `25:00`, `14:60`, or `8:30` | Rejection error: `"Birth time \"...\" is not valid. Use 24-hour HH:mm."` | `app/__tests__/astrology.test.tsx` |
| **TC-TIME-04** | Timezone Without Time | Enter timezone `America/New_York` with blank time | Rejection error: `"Timezone \"America/New_York\" requires a birth time. Enter the time as HH:mm or clear the timezone."` | `app/__tests__/astrology.test.tsx` |
| **TC-TIME-05** | Valid IANA Timezone | Enter `America/New_York`, `Asia/Kolkata`, or `UTC` with valid time | Accepted without error; IANA format verified via `Intl.DateTimeFormat`. | `astrology.test.ts` |
| **TC-TIME-06** | Country Name or Ambiguous Abbreviation | Enter `India`, `USA`, `EST`, or `CST` with valid time | Rejection error naming invalid input and suggesting canonical alternative: `"Timezone \"India\" is not valid. Use an IANA timezone such as \"Asia/Kolkata\"."` | `app/__tests__/astrology.test.tsx` |
| **TC-TIME-07** | Birth Time & Timezone Help Disclosures | Tap birth time and timezone help toggles | Panels expand displaying date-only explanation, 24-hour guidance, IANA Continent/City formatting, and DST historical uncertainty. | `app/__tests__/astrology.test.tsx` |

---

### Group 3: Coordinates & Local Location Label

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-COORD-01** | Valid Coordinate Pair | Enter Latitude `40.7128`, Longitude `-74.0060` | Decimal numbers accepted without errors. | `astrologyContracts.test.ts` |
| **TC-COORD-02** | Missing Latitude / Longitude | Leave latitude or longitude blank | Error: `"Latitude is required. Enter a value from -90 to 90."` or `"Longitude is required."` | `app/__tests__/astrology.test.tsx` |
| **TC-COORD-03** | Latitude Out of Bounds | Enter `90.001` or `-95.0` | Error: `"Latitude \"...\" is not valid. Enter a value from -90 to 90."` | `app/__tests__/astrology.test.tsx` |
| **TC-COORD-04** | Longitude Out of Bounds | Enter `180.5` or `-190.0` | Error: `"Longitude \"...\" is not valid. Enter a value from -180 to 180."` | `app/__tests__/astrology.test.tsx` |
| **TC-COORD-05** | Coordinate Ephemerality | Calculate chart, check storage keys | Coordinates are sent in POST request payload but **never** saved to AsyncStorage `LocalBirthProfile` or `bundle`. | `astrologyStorage.ts` |
| **TC-COORD-06** | Optional Location Label | Enter `Chicago, IL` (<= 120 chars) | Saved locally on device after calculation; excluded from network calculation and reflection payloads. | `astrology.test.ts` |
| **TC-COORD-07** | Address Warning Detection | Enter `123 Elm Street, Apt 4B` in location label | Displays non-blocking warning: `"To protect your privacy, avoid entering street names, house numbers, or specific addresses."` | `app/__tests__/astrology.test.tsx` |
| **TC-COORD-08** | Coordinate & Label Help Disclosures | Tap coordinate and location label help toggles | Panels expand explaining decimal format, boundary uncertainty, device-only label storage, and network exclusion. | `app/__tests__/astrology.test.tsx` |

---

### Group 4: Consent & Pre-Submit Disclosures

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-CONSENT-01** | Unchecked Consent Switch | Fill valid fields, leave switch off, tap Calculate | Calculation blocked; inline message: `"Consent is required before sending birth details for calculation."` | `app/astrology.tsx` |
| **TC-CONSENT-02** | Checked Consent Switch | Toggle switch to ON, tap Calculate | Consent flag recorded (`reflectiveUseAcknowledged: true`, `externalProcessingAllowed: true`); request proceeds. | `astrology.test.ts` |
| **TC-CONSENT-03** | Data Sharing Summary Review | Tap `"Review exactly what is sent"` | Expandable panel displays 4 distinct categories: `Sent for Chart Calculation`, `Stored Locally by the App`, `Sent for Optional AI Reflection`, and `Never Included in Astrology Requests`. | `app/__tests__/astrology.test.tsx` |
| **TC-CONSENT-04** | Non-Predictive Disclaimer | Inspect header and consent copy | Prominently displays: `"Astrological interpretations are symbolic metaphors for self-reflection. They do not predict future events, determine destiny, or provide psychological or medical diagnoses."` | `astrologyConsentCopy.ts` |

---

### Group 5: Disabled, Offline & Provider Error Handling

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-ERR-01** | Feature Disabled / Preview | Run with `ASTROLOGY_FEATURE_ENABLED=false` | Server returns 503 unavailable; client displays preview/unavailable notice; local input fields remain preserved. | `astrologyChartRoute.test.js` |
| **TC-ERR-02** | Offline / Disconnected Network | Disconnect network on Mac, tap Calculate | Displays offline error notice: `"You are currently offline. Check your internet connection and try again."` Form inputs preserved. | `astrologyErrorPresentation.test.ts` |
| **TC-ERR-03** | Rate Limit (HTTP 429) | Use the controlled route test or provider quota to return 429 | Chart proxy returns stable `provider_rate_limited` code and the client presents rate-limit recovery copy. **Current release blocker:** the proxy does not yet enforce its own durable request budget. | `astrologyChartRoute.test.js`, `astrologyErrorPresentation.test.ts` |
| **TC-ERR-04** | Provider Service Failure (502 / 500) | Provider outage or invalid response | Friendly recovery message: `"The chart calculation service is temporarily unavailable or returned an invalid response. Your inputs have been kept."` | `astrologyErrorPresentation.test.ts` |
| **TC-ERR-05** | Progress Indicators | Trigger calculation / reflection | Displays `AstrologyProgress` with accessible stage labels (`"Calculating Natal Chart"` / `"Composing Archetypal Reflection"`). | `AstrologyProgress.test.tsx` |

---

### Group 6: Local Persistence & App Relaunch

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-PERSIST-01** | Post-Calculation Save | Successfully calculate a chart | `LocalBirthProfile` and `LocalAstrologyBundle` saved into AsyncStorage under `dreamalchemy.astrology.profile.v1` and `dreamalchemy.astrology.bundle.v1`. | `astrologyStorage.ts` |
| **TC-PERSIST-02** | App Reload / Relaunch | Refresh browser or restart app | Saved birth date, birth time, timezone, location label, and calculated chart (placements, aspects, precision) restore automatically. | `app/astrology.tsx` |
| **TC-PERSIST-03** | Coordinate Non-Restoration | Relaunch app after saved chart | Latitude and longitude fields remain empty on screen and in storage; never persisted. | `app/astrology.tsx` |

---

### Group 7: AI Reflection Boundaries & Privacy Isolation

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-REFL-01** | Explicit Reflection Trigger | Calculated chart displayed; tap `"Create capped AI reflection"` | Separate opt-in required; button displays loading state while request executes. | `app/astrology.tsx` |
| **TC-REFL-02** | Reflection Server Payload Boundary | Inspect the client payload and model-bound payload for `/api/astrology-reflection` | Client sends consent plus the calculated chart, not a birth profile. The route rejects raw dream and birth/profile containers, then constructs a capped allowlist of precision, placements, aspects, and uncertainty notes for the model. | `astrologyRemote.test.ts`, `astrologyReflectionRoute.test.js` |
| **TC-REFL-03** | Dream Journal Strict Isolation | Verify dream journal database during reflection | Raw dream journal text, audio recordings, personal reflections, tags, and sleep metrics are **never** read, sent, or referenced. | `astrologyRequestSummaryCopy.ts` |
| **TC-REFL-04** | Reflection Output & Disclosure | Reflection completes successfully | Renders concise archetypal reflection with non-predictive disclosure; bundle updated in local AsyncStorage. | `astrologyContracts.test.ts` |

---

### Group 8: Accessibility & Platform Usability

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-A11Y-01** | VoiceOver Element Labels | Enable VoiceOver on Mac (`Cmd+F5`) | All inputs have descriptive `accessibilityLabel` (`"Birth date"`, `"Latitude"`, etc.) and `accessibilityHint` on errors. | `app/__tests__/astrology.test.tsx` |
| **TC-A11Y-02** | Expandable Accordion States | Focus help toggles with VoiceOver | Announces `accessibilityState={{ expanded: true/false }}` when toggled. | `app/__tests__/astrology.test.tsx` |
| **TC-A11Y-03** | Live Region Error Announcements | Trigger form error or message | Error and status messages have `accessibilityLiveRegion="polite"` for automatic screen reader announcement. | `app/astrology.tsx` |
| **TC-A11Y-04** | Light & Dark Mode Theming | Toggle theme between light and dark | High contrast maintained; text color, surface background, card surfaces, and input borders render cleanly in both modes. | `app/astrology.tsx` |
| **TC-A11Y-05** | Keyboard Navigation & Dismissal | Tab through fields on Mac; tap outside | Inputs focus sequentially; `ScrollView` with `keyboardShouldPersistTaps="handled"` handles clicks without losing draft focus. | `app/astrology.tsx` |

---

### Group 9: Deletion Scope & Limitations

| Test ID | Test Scenario | Steps / Input | Expected Result | Automated Test Ref |
| :--- | :--- | :--- | :--- | :--- |
| **TC-DEL-01** | Destructive Confirmation Dialog | Tap `"Delete local astrology data"` | System alert opens with `ASTROLOGY_DELETION_DIALOG_COPY.dialogTitle` (`"Delete local astrology data?"`), explanation, Cancel, and destructive Delete buttons. | `app/__tests__/astrology.test.tsx` |
| **TC-DEL-02** | External Provider Limitation Notice | Inspect deletion alert text | Alert message explicitly states: `"Your dream journals remain unaffected, but data previously sent to external providers cannot be retracted."` | `app/__tests__/astrology.test.tsx` |
| **TC-DEL-03** | Full Local Data Purge | Confirm deletion in alert | Deletes `PROFILE_KEY` and `BUNDLE_KEY` from AsyncStorage; clears chart, reflection, birth date, time, timezone, location label, latitude, longitude, and consent switch. | `astrologyStorage.ts` |
| **TC-DEL-04** | Dream Journal Untouched | Check dream journal screen after deletion | Existing dream journal records remain unchanged; deletion targets only the two astrology storage keys and in-memory Astrology form/result state. | `astrologyStorage.ts`, `app/astrology.tsx` |
| **TC-DEL-05** | Post-Deletion Persistence | Relaunch app after deletion | Astrology screen opens in clean, empty initial state; confirms zero lingering profile or chart data. | `app/astrology.tsx` |

---

## 4. Mac Manual Execution Quick-Check Commands

### Local Web Smoke Execution
```bash
# Start local web development server
npx expo start --web

# In browser, navigate to Astrology tab:
# http://localhost:8081/astrology
```

### Automated Suite Regression Verification
```bash
# Verify all astrology automated tests
npx jest src/services/__tests__/astrology* app/__tests__/astrology* --watchAll=false

# Full project test suite run
npx jest --watchAll=false

# TypeScript strict type check
npx tsc --noEmit
```

---

## 5. Pass / Fail Acceptance Gate

A build candidate may only pass release verification when:
- [ ] All 9 test groups in this matrix execute with 0 unhandled exceptions or crashes.
- [ ] No coordinates or personal identifiers ever appear in local storage or remote reflection logs.
- [ ] Personal dream journal entries remain 100% isolated and unaffected throughout all chart calculations, reflections, and deletion operations.
- [ ] Full Jest automated test suite passes with 0 failures (`16 suites, 74+ tests passing`).
- [ ] `npx tsc --noEmit` exits with code 0.
- [ ] Server-side request throttling is implemented and a real or controlled HTTP 429 path is verified before production enablement.

---

## 6. Codex Execution Record — 2026-10-09

| Check | Result | Evidence / Remaining Work |
| :--- | :--- | :--- |
| TypeScript | Pass | `npx tsc --noEmit` exited 0. |
| Full automated regression | Pass | 16 suites and 75 tests passed. |
| Local web route smoke | Pass | Fresh Expo web server returned HTTP 200 for `/astrology`; the rendered accessibility tree exposed the route title, disclosure, all six inputs, four help controls, consent switch, Calculate action, and Delete action. |
| Field-specific validation | Pass (automated) | UI coverage verifies malformed date, invalid leap day, missing latitude, and the exact invalid-timezone message for `India`. |
| Provider-connected calculation/reflection | Blocked | Requires server-only provider/OpenAI keys and an enabled Preview deployment; H-046 remains awaiting access. |
| HTTP 429 / request throttling | Partially pass; production blocked | Provider 429 propagation and presentation are tested. The proxy still lacks its own durable request budget, required before production enablement. |
| iOS Simulator, VoiceOver, relaunch, and destructive deletion | Pending Mac operator | These require the user's Mac/Xcode or interactive browser/device pass; use the cases above and record build/environment evidence. |

**Readiness decision:** ready for local Mac UI testing with Astrology disabled or stubbed. Not ready for provider-connected production enablement until H-046 access, server-side rate controls, and the pending Mac operator cases are completed.
