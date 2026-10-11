# Owner Mac/iOS test start

Use this as the single entrypoint for hands-on testing of the current `rework-on-production` candidate. It does not replace the detailed [release checklist](RELEASE_CHECKLIST.md), and completing it does not approve release or submission.

## 1. Confirm the exact candidate

After syncing `rework-on-production` on the Mac, record the short commit shown by `git rev-parse --short HEAD` and confirm `git status --short` is empty. Confirm the local branch matches `origin/rework-on-production`; do not test a different or dirty checkout.

Configured source identity:

- App version: `1.0.7`
- iOS build number: `17`
- Branch: `rework-on-production`
- Commit: record the actual short `HEAD` after the final sync

Read the version and build from the installed test app as well. A match confirms only that the visible identity values agree; it does not prove upload, signing, App Store selection, or approval.

## 2. Confirm prerequisites

- Use synthetic dream content and synthetic Astrology Preview data only.
- Use the approved Apple/RevenueCat sandbox for purchase checks; never record receipts or account details in test notes.
- Confirm microphone and speech-recognition prompts can be exercised on supported iOS hardware.
- Keep Astrology private Preview-only and Production-disabled.
- Keep Dream Images preparation-only; live generation, saving, sharing, and provider operations remain unavailable.
- Do not include dream text, birth data, transcripts, credentials, private links, logs, payloads, screenshots, or device identifiers in defect notes.

## 3. Run the hands-on sequence

1. Journal: create, edit, analyze, save, reopen, search, and delete a synthetic dream.
2. Failure recovery: retry after offline, slow-network, and interrupted analysis; confirm input remains and failed requests do not consume a trial.
3. Persistence: relaunch and confirm journal, saved items, theme, patterns, and selected local state remain correct.
4. Voice: allow and deny permissions, recover after denial, transcribe, stop/cancel, background the app, and confirm existing typed text is preserved.
5. Subscription: exercise sandbox purchase, restore, cancellation, entitlement refresh, expiry, and unavailable-store recovery.
6. Explore: check Patterns, expanded Techniques, meditation/audio controls, search, saved items, Psychology panels, dictionary links, light/dark mode, larger text, and supported iPhone/iPad layouts.
7. Optional boundaries: confirm Astrology identifies invalid fields and remains private Preview-only; confirm Dream Images clearly remains preparation-only with generation unavailable.

Use section 2 of the [release checklist](RELEASE_CHECKLIST.md) to mark each area only after direct observation.

## 4. Record outcomes safely

For each existing test identifier, record only `pass`, `fail`, `blocked`, `not-run`, or `not-applicable` plus a short sanitized observation.

- A reproducible mismatch in available behavior is a product defect.
- A missing device, permission, sandbox, build, or network prerequisite is a device/environment blocker.
- An unavailable optional Astrology or Dream Image provider path is an optional-provider blocker, not a core product failure.
- Session completion means only that every assigned check has an outcome; owner review and release approval remain separate.

When reporting a defect, include the candidate short commit, existing test identifier, expected behavior, sanitized observed behavior, and whether it reproduced twice. Do not attach sensitive artifacts.

## 5. Finish the session

Stop and request a corrected candidate if the installed version/build differs from the configured candidate. Otherwise, finish all unblocked checks, list remaining blockers separately, and return reproducible defects for correction and focused retesting. Submission begins only after the owner separately approves the finished candidate.
