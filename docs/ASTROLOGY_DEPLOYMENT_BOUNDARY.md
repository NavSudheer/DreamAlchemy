# Astrology Deployment Boundary

**Audit date:** 2026-10-09  
**Scope:** existing Vercel chart/reflection routes; no provider change and no production enablement

## Current controls

- `ASTROLOGY_FEATURE_ENABLED` keeps both routes disabled unless the server value is exactly `true`.
- `ASTROLOGY_API_KEY` and `OPENAI_API_KEY` are read only by server routes; they must remain Vercel secrets or uncommitted local environment values.
- Both endpoints require explicit processing-consent flags.
- The chart route validates the birth date, optional time, and coordinate ranges before contacting the provider.
- The reflection route rejects raw dream and birth/profile containers, caps chart collections, constructs an allowlisted model summary, limits model output, and uses non-predictive instructions.
- Client storage remains local; coordinates are not written to the local profile or bundle.

## Blocking findings

1. **No server-side request throttling.** The routes do not currently enforce a per-client or deployment request budget. The chart route also maps every non-success provider response to 502, so a provider 429 cannot reach the client's tested rate-limit presentation.
2. **Wildcard CORS is not an access control.** `Access-Control-Allow-Origin: *` permits browser calls from any origin. CORS must be narrowed for web deployment, but native clients may not send an `Origin` header, so origin filtering cannot replace abuse controls.
3. **No explicit upstream timeout.** A slow chart provider or model request may occupy the serverless invocation until platform timeout.
4. **No explicit request-size/content-type guard.** The reflection summary is capped after parsing, but both routes should reject oversized or unexpected request bodies before expensive provider work.
5. **Provider-connected verification is incomplete.** H-046 still requires Preview access and server-only keys. No production enablement should occur until the real error, deletion, privacy, and quota paths have been exercised.

## Approved implementation shape

- Keep production disabled by default. Enable only a controlled Preview environment during Mac testing.
- Add a durable server-side limiter (for example, a Vercel/Upstash-compatible store) before provider calls. Use separate chart and reflection budgets, return HTTP 429 plus `Retry-After`, and avoid retaining raw birth data or long-lived raw IP addresses as limiter metadata.
- Preserve provider privacy by logging only request IDs, coarse result state, latency, and status. Never log request bodies, birth parameters, coordinates, chart content, reflection text, or secrets.
- Add an upstream timeout using an abort signal and map timeout/provider-unavailable/rate-limit states to stable public error codes without returning provider payloads.
- Enforce `POST` JSON, a small body-size ceiling, and the existing allowlists. Reject unexpected sensitive top-level fields on the reflection route rather than forwarding or logging them.
- Configure a web origin allowlist for deployed web clients. Treat it as browser hardening, not authentication; native abuse protection remains the server-side limiter and platform/deployment controls.

## Enablement gate

Provider-connected production enablement remains **blocked** until all of the following are evidenced:

- server-only secrets configured in the intended Vercel environment;
- durable throttling verified with a controlled 429 and `Retry-After` response;
- upstream timeouts and stable public error mapping covered by route tests;
- request size, content type, and sensitive-field rejection covered by route tests;
- Preview chart and reflection success/failure smoke pass completed without sensitive logs;
- Mac/iOS Simulator accessibility, relaunch, persistence, and deletion cases recorded using the manual matrix.

Local Mac UI testing with the provider disabled or stubbed remains safe and ready.
