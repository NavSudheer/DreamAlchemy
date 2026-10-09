# Optional Dream Image proxy setup

Dream Image Studio keeps the saved-dream association local. The client sends only an exact curated scene, a selected style, and explicit consent to the application-owned route. The current route validates that contract but deliberately calls no image provider.

## Current environment variables

- `EXPO_PUBLIC_DREAM_IMAGE_API_URL`: client-visible URL of the application-owned `/api/dream-image` route. It is an endpoint location, never a provider credential.
- `DREAM_IMAGE_FEATURE_ENABLED`: server-only feature gate. Leave unset or set to `false` until every activation gate below is complete.

No image-provider key or URL is supported by the current route. Do not add provider secrets to an `EXPO_PUBLIC_` variable.

## Request contract

The route accepts `POST` JSON no larger than 16,000 bytes with exactly these top-level fields:

- `visualReflectionPrompt`: an exact prompt from `DREAM_IMAGE_PROMPT_TEMPLATES`.
- `style`: one of `ethereal`, `surreal`, `watercolor`, or `cinematic`.
- `consent`: both `artisticUseAcknowledged` and `externalProcessingAllowed` must be `true`.

The route rejects additional fields, including `dreamId`, dream text, analysis, and profile data. Automated drift coverage keeps the server prompt/style allowlists synchronized with the application catalog.

## Stable unavailable and validation responses

- `feature_disabled` (`503`): server feature flag is not exactly `true`.
- `provider_unavailable` (`503`): the validated request reached the current provider-neutral boundary; no provider is configured or called.
- `consent_required` (`400`): both explicit consent acknowledgements were not present.
- `prompt_not_allowed` / `style_not_allowed` (`400`): the request did not match the exact curated allowlist.
- `unexpected_field` (`400`): the payload contained data outside the contract.
- `invalid_content_type` (`415`), `invalid_json` (`400`), or `payload_too_large` (`413`): the request envelope was rejected before provider work.

## Provider activation gates

Before any provider adapter is implemented or enabled:

1. Complete and approve the provider evaluation, including data-use, retention, moderation, output-rights, regional, reliability, and cost-control evidence.
2. Add a server-only provider adapter and credentials without changing the client payload boundary.
3. Add durable anonymous rate limiting and provider-console spending caps or alerts.
4. Verify moderation rejection, timeout, invalid response, HTTP 429, and provider outage mappings.
5. Confirm generated-asset URL lifetime, access controls, and provider/CDN retention disclosures.
6. Run the full Mac web, iOS Simulator, VoiceOver, privacy, failure, and deletion matrix in a Preview deployment.
7. Keep `DREAM_IMAGE_FEATURE_ENABLED=false` outside the controlled test environment until the evidence is accepted.

## Current testing scope

The preparation, consent, privacy, validation, failure, progress, and in-memory result interfaces are locally testable. Real image generation, provider moderation, remote asset delivery, photo-library export, native sharing, and persistent image deletion are not implemented and must not be represented as available.
