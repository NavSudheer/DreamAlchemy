# Update completion and release checklist
Updated: 2026-10-11

Use after selecting features in [the roadmap](ROADMAP.md). This replaces the old initial-launch checklists. No submission date is imposed.

## 1. Feature scope and local verification
- [ ] Record all selected features and owner ideas in the roadmap.
- [ ] Complete their acceptance criteria.
- [ ] Verify persistence, empty states, invalid routes, repeated taps, and failure recovery where relevant.
- [ ] Test supported browser flows and inspect light/dark layouts and small-screen spacing.
- [ ] Run TypeScript checks and relevant regression tests on the final scope.
- [ ] Audit debug-only UI and subscription/trial reset access in release builds.
- [ ] Verify analysis errors do not lose input or incorrectly consume trials.
- [ ] Verify existing saved dreams remain readable after the update.
- [ ] Review remaining console errors; distinguish unsupported web integrations from native defects.
- [ ] Review final content and remove unimplemented feature claims.

Current evidence: approved release implementation is complete locally. The frozen candidate passes TypeScript, whitespace validation, and the full automated regression at 24 suites / 141 tests. Lint has 0 errors and 65 non-blocking style/debt warnings; the final gate fixed the sole lint error and the History focus-hook dependency warning. The core dream-analysis route now enforces JSON and request-size boundaries, accepts only bounded dream text, and redacts provider/implementation failures. Focused recovery coverage confirms that failed requests preserve the entered dream, consume no trial use, remain retryable, and return to editing with the original text. The provider-connected Astrology browser Preview has passed synthetic date-only, timed-chart, field-validation, and capped-reflection checks. Dream Image preparation and its disabled provider-neutral route contract are automated, but live generation remains blocked. Device validation remains the native release gate.

Owner handoff boundary: the committed branch is ready to sync for Mac/iOS testing. Every unchecked item in section 2 still requires hands-on execution and must remain pending until recorded on the assigned device. Astrology Production activation and Dream Image live generation are not part of this candidate.

Optional-feature boundaries for this candidate:

- Astrology: private Preview testing only; Production disabled pending durable limiting, spend alerts, redacted observability, and Mac/device sign-off.
- Dream Images: preparation and provider-neutral contract testing only; no provider, live generation, delivery, persistence, Photos save, sharing, or provider-side deletion.
- Neither optional feature replaces or modifies the existing `dream-analysis` native service.

## 2. Owner device testing — after feature completion
- [ ] Prepare one feature-complete candidate build; confirm unused version/build values.
- [ ] Test the full journal-to-analysis-to-history flow.
- [ ] Test microphone permissions, denial/recovery, transcription, stop/cancel, and app backgrounding.
- [ ] Test subscription purchase, restore, cancellation, entitlement refresh, and expiry in the appropriate test environment.
- [ ] Test trial limits and behavior after failed requests.
- [ ] Test offline/slow-network behavior and interruptions.
- [ ] Test every selected feature and its persisted state after restart.
- [ ] Test supported iPhone/iPad layouts, larger text, and accessibility.
- [ ] Fix findings and repeat affected checks; finalize the release candidate.

## 3. Assets and configuration
- [ ] Capture screenshots of the final UI.
- [ ] Update description and What's New to match delivered features.
- [ ] Verify live privacy, terms, and support links.
- [ ] Reconcile privacy disclosures and content ratings with final app behavior.
- [ ] Verify actual RevenueCat offerings and App Store product identifiers; do not copy IDs or prices from old plans.
- [ ] Verify current App Store submission requirements when preparing the release.
- [ ] Confirm production API configuration and monitoring/error reporting.
- [ ] Review final changes and obtain authorization for commit/push or deployment as needed.

## 4. Submission
- [ ] Owner approves the finished update for submission.
- [ ] Upload/select the verified build and complete review information.
- [ ] Choose release timing and submit.
- [ ] Monitor review feedback and released-build issues.

Store setup, hosted policies, deployment state, and previous device results have not been independently verified in this documentation review. Existing app/store setup should be checked, not recreated.
