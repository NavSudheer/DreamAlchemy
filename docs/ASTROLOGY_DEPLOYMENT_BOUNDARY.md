# Astrology Deployment Boundary

**Audit date:** 2026-10-09  
**Scope:** existing Vercel chart/reflection routes; no provider change and no production enablement

## Current controls

- `ASTROLOGY_FEATURE_ENABLED` keeps both routes disabled unless the server value is exactly `true`.
- `ASTROLOGY_API_KEY` and `OPENAI_API_KEY` are read only by server routes; they must remain Vercel secrets or uncommitted local environment values.
- Both endpoints require explicit processing-consent flags.
- The chart route validates the birth date, optional time, and coordinate ranges before contacting the provider.
- The reflection route rejects raw dream and birth/profile containers, caps chart collections, constructs an allowlisted model summary, limits model output, and uses non-predictive instructions.
- Both routes call a provider-neutral durable-limiter boundary before paid upstream work. Production fails closed when limiter settings are missing; local/Preview work may remain unconfigured for controlled testing.
- The limiter boundary HMAC-hashes the anonymous client network identifier before sending quota metadata and never receives birth, coordinate, chart, reflection, or dream content.
- Client storage remains local; coordinates are not written to the local profile or bundle.

## Blocking findings

1. **Durable limiter backend not configured.** The provider-neutral boundary, fail-closed production behavior, bounded quotas, HMAC identifier, HTTP 429, and `Retry-After` contract are implemented and tested. Production remains blocked until a durable endpoint and secrets are selected, configured, and smoke-tested.
2. **Wildcard CORS is not an access control.** `Access-Control-Allow-Origin: *` permits browser calls from any origin. CORS must be narrowed for web deployment, but native clients may not send an `Origin` header, so origin filtering cannot replace abuse controls.
3. **Upstream timeout implemented; deployment verification pending.** Both provider calls now use bounded abort signals and stable `provider_timeout` responses; the configured Preview environment still needs a timeout smoke check.
4. **Request guards implemented; deployment verification pending.** Both routes require JSON when a content type is supplied, reject declared or parsed oversized bodies, and return stable public validation codes. Focused route tests cover these boundaries.
5. **Provider-connected verification is incomplete.** H-046 still requires Preview access and server-only keys. No production enablement should occur until the real error, deletion, privacy, and quota paths have been exercised.

## Approved implementation shape

- Keep production disabled by default. Enable only a controlled Preview environment during Mac testing.
- Configure a durable server-side limiter behind the provider-neutral HTTP contract already called before provider work. Preserve separate chart and reflection budgets, HTTP 429 plus `Retry-After`, and a short retention window for HMAC identifiers.
- Preserve provider privacy by logging only request IDs, coarse result state, latency, and status. Never log request bodies, birth parameters, coordinates, chart content, reflection text, or secrets.
- Add an upstream timeout using an abort signal and map timeout/provider-unavailable/rate-limit states to stable public error codes without returning provider payloads.
- Enforce `POST` JSON, a small body-size ceiling, and the existing allowlists. Reject unexpected sensitive top-level fields on the reflection route rather than forwarding or logging them.
- Configure a web origin allowlist for deployed web clients. Treat it as browser hardening, not authentication; native abuse protection remains the server-side limiter and platform/deployment controls.

## Enablement gate

Provider-connected production enablement remains **blocked** until all of the following are evidenced:

- server-only secrets configured in the intended Vercel environment;
- durable limiter endpoint and secrets configured, then verified with a deployed 429 and `Retry-After` response (the local contract test already passes);
- upstream timeouts and stable public error mapping covered by route tests;
- request size, content type, and sensitive-field rejection covered by route tests;
- Preview chart and reflection success/failure smoke pass completed without sensitive logs;
- Mac/iOS Simulator accessibility, relaunch, persistence, and deletion cases recorded using the manual matrix.

Local Mac UI testing with the provider disabled or stubbed remains safe and ready.
