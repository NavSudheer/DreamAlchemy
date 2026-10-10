# Astrology Preview activation runbook

**Status:** private Preview active and smoke-verified on 2026-10-09
**Scope:** private Mac testing only; Production remains disabled

## Confirm the deployment boundary first

The existing native app default remains `https://nextjs-boilerplate-eight-topaz-22.vercel.app`, backed by the `dream-analysis` project. It was not replaced or reconfigured.

Private browser testing uses the separate `dreamalchemy-preview` Vercel project, sourced from `NavSudheer/DreamAlchemy` branch `rework-on-production`. Its Expo web build serves clean routes from `dist`, and the web Astrology client uses that deployment's own origin. Native builds continue to use the existing service unless `EXPO_PUBLIC_API_BASE_URL` is explicitly configured.

## Server-only Preview variables

The following are configured for **Preview / `rework-on-production` only**, never as `EXPO_PUBLIC_*` values:

- `ASTROLOGY_FEATURE_ENABLED` was verified as `false`, then changed to `true` only after the disabled-state smoke check passed.
- `ASTROLOGY_API_KEY` using the provider key stored directly in Vercel.
- `OPENAI_API_KEY` using the existing server-side secret after its Vercel warning is resolved.
- Optional `ASTROLOGY_API_URL`; omit it to use the reviewed `/v1/chart/full` default.
- Durable limiter variables from `ASTROLOGY_SETUP.md` before any shared or Production rollout.

Do not paste secret values into this repository, build logs, screenshots, test reports, or client configuration.

## Staged Preview smoke sequence

1. Deploy with the feature flag false. A synthetic consented request was verified to present the stable Astrology-not-enabled state while preserving form inputs.
2. Confirm the deployed source and Vercel environment scope, then set the Preview flag to true and redeploy. The final verified browser deployment is `7UM3p5ZhDr5cxVnqhk2tTob2RbL2` (`dreamalchemy-preview-mq8l45ytd.vercel.app`).
3. Submit a synthetic date-only chart. Verified: `precision: date-only`, 17 placements, omitted houses/angles, and explicit missing-time uncertainty.
4. Submit a synthetic chart with time and `America/Toronto`. Verified: `precision: date-time-timezone`, 19 placements, planet house numbers, and visible Ascendant and Midheaven rows in the concise chart view.
5. Confirm the local location label and all dream/journal fields are absent from the browser request and Vercel/provider logs.
6. Verify stable handling for provider unavailability, invalid provider data, timeout, and HTTP 429. When the provider supplies a numeric `Retry-After`, confirm the proxy preserves it.
7. Request the optional capped AI reflection from the synthetic timed chart. Verified: the separate opt-in returned a concise reflection with the non-predictive disclosure and saved it locally.
8. Enter `India` as the timezone with a valid time. Verified exact field-specific guidance: `Timezone "India" is not valid. Use an IANA timezone such as "Asia/Kolkata".`
9. Run the remaining Mac cases in `ASTROLOGY_MAC_TEST_MATRIX.md`, recording only synthetic, redacted data.

## Rollback

Set the Preview `ASTROLOGY_FEATURE_ENABLED` value to `false` and redeploy. If credential exposure is suspected, revoke the provider key before further testing and replace it only in Vercel. Do not rely on removing the client base URL as the primary kill switch.

Production stays blocked until the durable limiter, spending alerts, redacted observability, and full Mac matrix have been verified. The private Preview is not a replacement for the existing `dream-analysis` service.
