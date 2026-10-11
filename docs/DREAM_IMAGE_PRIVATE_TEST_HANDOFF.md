# Dream Image Private Test Handoff

**Status:** Preparation testing is ready. Live generation is disabled and out of scope.

## What a tester can verify now

- Open Dream Image Studio from Explore or a saved analysis.
- Review the seven curated scenes and four artistic styles; no freeform dream-text input exists.
- Confirm recommended styles, manual style overrides, prepared descriptions, and descriptive alternative text update together.
- Review the consent, privacy, safety, non-diagnostic, and non-predictive disclosures.
- Confirm the unavailable state clearly separates usable preparation from disabled generation.
- Exercise the device-only VoiceOver, keyboard/focus, light/dark, narrow viewport, and tap-handling checks with approved catalog selections.
- Report only an existing `TC-IMG-*` or `BLK-IMG-*` identifier and a brief sanitized text observation.

Use `src/data/dreamImagePreviewQuickStart.ts` for the five-minute path and `src/data/dreamImageDeviceCheckCopy.ts` for hands-on device checks. Detailed expectations remain in `DREAM_IMAGE_MAC_TEST_MATRIX.md`.

## Verified engineering evidence

- Full project regression: 22 suites and 135 tests pass.
- TypeScript and whitespace validation pass.
- Automated coverage includes saved-dream validation, consent, catalog allowlists, strict payload exclusion, disabled/provider-unavailable route behavior, typed failures, retry state, progress accessibility, result disclosure, regenerate, and in-memory deletion.
- The authenticated private Preview renders the provider-neutral preparation screen and its disabled-state notice.
- Direct authenticated API POST verification is not complete: Vercel protection rejects unauthenticated terminal requests, and the browser client blocks direct API navigation. Treat this as `BLK-IMG-01`, not a product failure.

## Do not test or claim

- Do not enter real dream text, analyses, tags, transcripts, personal details, or freeform prompts.
- Do not include generated media, private links, credentials, logs, payloads, screenshots, or attachments in feedback.
- Do not attempt live generation, provider selection, moderation evaluation, paid requests, image delivery, persistence, Photos save, native sharing, or provider-side deletion.
- Do not describe generated art as factual dream meaning, diagnosis, prediction, or objective subconscious content.

## Open provider gates

- `BLK-IMG-01`: authenticated Preview route verification and client connection.
- `BLK-IMG-02`: provider evaluation, server-only adapter, credentials, and spending controls.
- `BLK-IMG-03`: server-side moderation and stable rejection behavior.
- `BLK-IMG-04`: durable anonymous throttling and retry behavior.
- `BLK-IMG-05`: transient delivery, retention, access, persistence, sharing, and deletion semantics.

Preparation feedback does not clear any of these gates. Keep `DREAM_IMAGE_FEATURE_ENABLED` unset or `false` until every gate has dated evidence and explicit approval.
