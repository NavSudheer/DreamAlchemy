# Update completion and release checklist
Updated: 2026-10-01

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

Current evidence: approved release implementation is complete locally. TypeScript, whitespace, and lint have passed during the sprint; lint has zero errors (warnings remain for follow-up). Expo public config resolves locally. Device validation remains the release gate.

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
