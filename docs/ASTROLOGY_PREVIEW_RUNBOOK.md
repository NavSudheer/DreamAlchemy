# Astrology Preview activation runbook

**Status:** draft; Preview activation has not been performed  
**Scope:** private Mac testing only; Production remains disabled

## Confirm the deployment boundary first

The app currently defaults to `https://nextjs-boilerplate-eight-topaz-22.vercel.app` for both dream analysis and optional Astrology routes. In Vercel, that deployment is the `dream-analysis` project. Its configured Git source must be checked before activation: it currently points at `NavSudheer/dream-analysis` `main`, while the release work in this workspace is on `NavSudheer/DreamAlchemy` `rework-on-production`.

Do not add the Astrology key or enable the feature until a Preview deployment is proven to contain this branch's `api/astrology-chart.js`, `api/astrology-reflection.js`, and `api/astrology-rate-limit.js`. An environment variable cannot make routes available when the deployed source does not contain them.

## Server-only Preview variables

Configure these for **Preview only**, never as `EXPO_PUBLIC_*` values:

- `ASTROLOGY_FEATURE_ENABLED=false` for the first deployment.
- `ASTROLOGY_API_KEY` using the provider key stored directly in Vercel.
- `OPENAI_API_KEY` using the existing server-side secret after its Vercel warning is resolved.
- Optional `ASTROLOGY_API_URL`; omit it to use the reviewed `/v1/chart/full` default.
- Durable limiter variables from `ASTROLOGY_SETUP.md` before any shared or Production rollout.

Do not paste secret values into this repository, build logs, screenshots, test reports, or client configuration.

## Staged Preview smoke sequence

1. Deploy with the feature flag false. POST a synthetic consented chart request and verify the stable `feature_disabled` response without an upstream provider call.
2. Confirm the deployed source and Vercel environment scope, then set the Preview flag to true and redeploy.
3. Submit a synthetic date-only chart. Verify `precision: date-only`, no houses, no Ascendant or Midheaven, and an explicit uncertainty note.
4. Submit a synthetic chart with time and an IANA timezone. Verify planet houses plus Ascendant and Midheaven are returned.
5. Confirm the local location label and all dream/journal fields are absent from the browser request and Vercel/provider logs.
6. Verify stable handling for provider unavailability, invalid provider data, timeout, and HTTP 429. When the provider supplies a numeric `Retry-After`, confirm the proxy preserves it.
7. Run the Mac cases in `ASTROLOGY_MAC_TEST_MATRIX.md`, recording only synthetic, redacted data.

## Rollback

Set the Preview `ASTROLOGY_FEATURE_ENABLED` value to `false` and redeploy. If credential exposure is suspected, revoke the provider key before further testing and replace it only in Vercel. Do not rely on removing the client base URL as the primary kill switch.

Production stays blocked until the durable limiter, spending alerts, redacted observability, source-project alignment, and full Mac matrix have been verified.
