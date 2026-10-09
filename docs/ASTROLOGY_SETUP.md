# Optional Astrology hybrid setup

DreamAlchemy keeps birth profiles, calculated charts, and AI reflections on the device. Vercel routes are stateless secret-bearing proxies; they do not require a database.

## Vercel environment variables

- `ASTROLOGY_FEATURE_ENABLED`: set to `true` only after the provider key and production controls are ready. Leave it unset or `false` to keep both routes disabled.
- `ASTROLOGY_API_KEY`: server-only chart provider key.
- `ASTROLOGY_API_URL`: optional chart endpoint override. Defaults to NatalChart.AI `/v1/chart/full`.
- `OPENAI_API_KEY`: existing server-only OpenAI key.
- `ASTROLOGY_REFLECTION_MODEL`: optional model override. Defaults to `gpt-4o-mini`.
- `ASTROLOGY_RATE_LIMIT_URL`: server-only URL for a durable limiter implementing the documented JSON contract.
- `ASTROLOGY_RATE_LIMIT_TOKEN`: server-only bearer token for that limiter.
- `ASTROLOGY_RATE_LIMIT_HASH_SECRET`: server-only HMAC key used to hash the anonymous client network identifier before it leaves the Vercel route.
- `ASTROLOGY_RATE_LIMIT_REQUIRED`: optional `true` override that fails closed outside production when limiter configuration is absent. Production fails closed automatically.
- `ASTROLOGY_CHART_RATE_LIMIT` / `ASTROLOGY_REFLECTION_RATE_LIMIT`: optional per-window budgets; each defaults to 10 and is bounded from 1 to 100.
- `ASTROLOGY_RATE_LIMIT_WINDOW_SECONDS`: optional quota window; defaults to 3600 seconds and is bounded from 60 to 86400.

Never prefix either secret with `EXPO_PUBLIC_`. Configure the variables for the intended Vercel environments and redeploy after changes.

The mobile app may set `EXPO_PUBLIC_API_BASE_URL` to the Vercel deployment origin. Secrets are never returned to the app.

The default provider contract was checked against the [NatalChart.AI developer documentation](https://www.natalchart.ai/developers). Its free API pool is currently limited to 10 requests per day, so use provider and Vercel rate controls before enabling the feature beyond private testing.

## Privacy boundary

1. Birth profile data is created and stored locally.
2. A chart request requires explicit reflective-use and external-processing consent.
3. Only date, optional time/timezone, and calculation coordinates are sent through Vercel to the chart provider. A local location label is not sent.
4. The AI route accepts a compact chart summary only and rejects raw dream, birth-profile, and birth fields.
5. The generated reflection is capped and stored locally with the chart.
6. Deleting local astrology data removes the profile, chart, and reflection bundle.

Configure the durable limiter endpoint and spending alerts before enabling the feature for users. The limiter request contains only an HMAC client identifier, route scope, bounded limit, and window—never birth data, coordinates, chart content, or dream text. The app should remain usable when either route is unavailable.

## Mac test smoke checklist

1. Add the server-only environment variables to a Vercel Preview deployment, keep `ASTROLOGY_FEATURE_ENABLED=false`, redeploy, and confirm Calculate shows the unavailable-build message without losing the local form.
2. Set `ASTROLOGY_FEATURE_ENABLED=true`, redeploy, and calculate a dated-only chart and a chart with time/timezone. Confirm neither the private location label nor coordinates reappear after relaunch.
3. Generate a reflection and confirm it is concise, non-predictive, and contains no dream text or local profile label.
4. Relaunch the app and confirm the saved profile, chart, and reflection reload from local storage.
5. Delete local astrology data, confirm the destructive prompt, relaunch, and verify the profile/chart/reflection remain deleted.
6. Disable the feature flag again after testing unless Vercel rate controls and provider/OpenAI spending alerts are active.
