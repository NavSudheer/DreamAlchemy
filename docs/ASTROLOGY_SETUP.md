# Optional Astrology hybrid setup

DreamAlchemy keeps birth profiles, calculated charts, and AI reflections on the device. Vercel routes are stateless secret-bearing proxies; they do not require a database.

## Vercel environment variables

- `ASTROLOGY_FEATURE_ENABLED`: set to `true` only after the provider key and production controls are ready. Leave it unset or `false` to keep both routes disabled.
- `ASTROLOGY_API_KEY`: server-only chart provider key.
- `ASTROLOGY_API_URL`: optional chart endpoint override. Defaults to NatalChart.AI `/v1/chart/full`.
- `OPENAI_API_KEY`: existing server-only OpenAI key.
- `ASTROLOGY_REFLECTION_MODEL`: optional model override. Defaults to `gpt-4o-mini`.

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

Configure Vercel/provider rate limits and spending alerts before enabling the feature for users. The app should remain usable when either route is unavailable.
