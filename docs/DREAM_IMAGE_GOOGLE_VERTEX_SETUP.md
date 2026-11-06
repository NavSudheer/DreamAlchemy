# Google Vertex AI Imagen Setup

**Status:** Keyless Preview federation and moderation configuration are in place; provider activation remains disabled pending deployment and release checks.
**Selected model:** `imagen-4.0-fast-generate-001` by default.
**Reviewed:** 2026-11-04.

## Data and request boundary

- The API accepts only exact curated scene prompts, one of four styles, and explicit consent.
- The route applies prompt moderation and a rate limit before generation. Both must pass when `DREAM_IMAGE_PROVIDER_ENABLED=true`; missing settings fail closed.
- The server adds fixed style guidance and calls the Vertex AI `predict` endpoint with one 1:1 image, `block_low_and_above`, `personGeneration: dont_allow`, and prompt enhancement disabled.
- The image is returned as a PNG/JPEG data URI and held only in the app's in-memory result state. No app-owned image bucket/CDN is used, and responses carry `Cache-Control: private, no-store`. The user must explicitly save a local copy if they want persistence.
- No raw dream journal text, dream id, analysis, or client identifier is sent to Google. Only the curated prompt and fixed style guidance reach Imagen. The provider itself may apply its safety and abuse controls; review current Google Cloud terms and policy for the selected project before production activation.

## Server-only environment

Set these only in the deployment's server environment. Never add them to `EXPO_PUBLIC_*`, the mobile app, or committed env files.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DREAM_IMAGE_FEATURE_ENABLED` | Yes | Master kill switch. Must remain unset/`false` until release gates pass. |
| `DREAM_IMAGE_PROVIDER_ENABLED` | Yes | Allows the provider adapter to run only when set to `true`. |
| `GOOGLE_VERTEX_PROJECT_ID` | Yes | Google Cloud project ID. |
| `GOOGLE_VERTEX_PROJECT_NUMBER` | Yes | Numeric Google Cloud project number used to address the identity provider. |
| `GOOGLE_VERTEX_LOCATION` | Yes | Vertex AI location where Imagen is available (for example `us-central1`). |
| `GOOGLE_VERTEX_IMAGE_MODEL` | No | Defaults to `imagen-4.0-fast-generate-001`; pin the tested model in Preview before rollout. |
| `GOOGLE_VERTEX_SERVICE_ACCOUNT_EMAIL` | Yes | Service account to impersonate after Google STS validates the Vercel token. |
| `GOOGLE_VERTEX_WORKLOAD_IDENTITY_POOL_ID` | Yes | Google Workload Identity Pool ID. |
| `GOOGLE_VERTEX_WORKLOAD_IDENTITY_PROVIDER_ID` | Yes | Google OIDC provider ID in that pool. |
| `GOOGLE_VERTEX_OIDC_ISSUER` | Yes | Vercel Team issuer URL. |
| `GOOGLE_VERTEX_OIDC_AUDIENCE` | Yes | Vercel Team audience configured as an allowed provider audience. |
| `GOOGLE_VERTEX_OIDC_SUBJECT` | Yes | Exact Preview deployment subject allowed by the Google provider condition. |

Authentication uses Vercel's `x-vercel-oidc-token` request header and Google Workload Identity Federation. No service-account key or credential JSON is stored. On the service account, grant only Workload Identity User to the exact federated Preview principal; its project role should be Vertex AI User (`roles/aiplatform.user`). Keep the Google provider condition and Vercel environment restricted to Preview. Configure spend alerts/limits before any live calls.

Moderation uses the existing server-side `OPENAI_API_KEY` with OpenAI's `omni-moderation-latest` endpoint unless a custom `DREAM_IMAGE_MODERATION_URL` and `DREAM_IMAGE_MODERATION_TOKEN` are provided. It sends only the curated scene prompt and selected style. The route rejects if the moderation request fails or flags content.

The durable limiter may use `DREAM_IMAGE_RATE_LIMIT_URL`, `DREAM_IMAGE_RATE_LIMIT_TOKEN`, and `DREAM_IMAGE_RATE_LIMIT_HASH_SECRET`; it sends only an HMAC client hash to that service. For controlled Preview-only tests, `DREAM_IMAGE_RATE_LIMIT_MODE=memory` enables a capped in-process counter (five requests/hour by default). This is per warm function instance: it resets on cold starts and is not shared across instances, so it is a useful accidental-repeat guard, not abuse protection. It is disabled in Production, where missing durable limiter settings fail closed. Never enable the image provider in Production with the memory limiter. Bounded quota overrides remain available.

## Current Preview federation

The current Vercel Team issuer is `https://oidc.vercel.com/navneethsudheer-gmailcoms-projects`, with audience `https://vercel.com/navneethsudheer-gmailcoms-projects`. Google pool and provider IDs are both `vercel-dreamalchemy-preview` in project `dreamalchemy-513705` (project number `53280059933`). The provider condition accepts only subject `owner:navneethsudheer-gmailcoms-projects:project:dreamalchemy-preview:environment:preview`. Vercel has the matching non-secret runtime values and `DREAM_IMAGE_RATE_LIMIT_MODE=memory` in Preview. The existing `OPENAI_API_KEY` secret is scoped to Preview deployments (not Production) for prompt moderation. Production variables and feature flags remain unset/disabled.

## Verification before enabling

1. Configure the Google Cloud project, billing alerts, model access, location, WIF pool/provider, and the Preview-only service-account binding.
2. Confirm the moderation API key is available in the Preview deployment and verify rejection/outage behavior. Use the memory limiter only for a controlled Preview smoke test; configure a durable limiter before public or Production use.
3. With `DREAM_IMAGE_FEATURE_ENABLED=false`, verify the route returns `feature_disabled` without a Google request.
4. In a controlled Preview test only, enable both flags and use an approved synthetic curated scene. Verify exactly one Imagen request, safety settings, image response size, no-store headers, and image rendering on iOS/web.
5. Review Google Cloud's applicable data processing terms, retention/abuse controls, safety behavior, spend controls, and region before production.
6. Keep production disabled until authenticated Preview evidence and the remaining manual accessibility/theme checks are recorded.

## Known constraints

- Returning an in-memory data URI avoids a persistent image bucket and deletion/retention configuration, but increases response size and transient memory use. The adapter rejects outputs above its base64 response limit; rejected output is not forwarded to the client.
- The app's current result workflow is in-memory. App restart discards the result; cloud persistence, native Photos saving, sharing, and provider-side deletion are not implemented by this integration.
- No service-account key is created or required. Moderation, durable limiting, billing alerts, and an end-to-end deployed Preview call remain separate release gates; no live provider call has been made.
