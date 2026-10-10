# Astrology Production Gate Audit

**Reviewed:** 2026-10-10  
**Decision:** Private Preview testing may continue. Production enablement remains blocked.

## Verified boundaries

- The provider-connected browser Preview is isolated in `dreamalchemy-preview`; it does not replace or reconfigure the existing `dream-analysis` service used by native builds.
- Astrology remains an optional, consented reflection tool, separate from the base Jungian dream analysis.
- Chart requests reject dream/reflection fields, require explicit processing consent, bound request size, validate dates and coordinates, and use a server-held provider key.
- Reflection requests reject raw birth-profile and dream fields, reduce the calculated chart to a capped allowlist, limit output to 350 tokens, and use a server-held OpenAI key.
- The rate-limit adapter hashes the client identifier before sending it to a limiter and fails closed in Production if durable limiter configuration is absent.
- The final private Preview browser pass verified feature-disabled recovery, date-only and timed charts, visible Ascendant and Midheaven, field-specific timezone validation, and the separate capped AI reflection.
- Automated verification passes at 22 suites / 135 tests, plus TypeScript and whitespace checks.

## Production blockers

| Gate | Current state | Evidence required to clear |
| :--- | :--- | :--- |
| Durable anonymous limiter | Blocked | Configure the limiter endpoint, token, HMAC secret, chart/reflection budgets, and window; verify allowed, denied, unavailable, timeout, and `Retry-After` behavior in the deployed environment. |
| Spend protection | Blocked | Configure provider and OpenAI budget alerts or caps; document thresholds, owners, and an emergency disable path. |
| Redacted observability | Blocked | Demonstrate that logs and alerts exclude credentials, birth fields, coordinates, dream content, request bodies, and generated reflections while retaining public error codes and aggregate operational signals. |
| Mac/device test matrix | Blocked | Execute the remaining VoiceOver, keyboard/focus, light/dark and zoom, offline, relaunch persistence, local deletion, and DST/timezone checks with approved synthetic profiles. |
| Production rollout approval | Blocked | Review the completed gates, confirm the feature defaults off, approve the target project/environment, and verify rollback before accepting any Production traffic. |

## Triage boundary

- A reproducible mismatch in available validation, accessibility, persistence, deletion, privacy, or recovery behavior is a product defect.
- Provider outage, provider throttling, or provider timeout is a provider blocker when the app presents the expected safe recovery state.
- A disabled or misconfigured Preview route is a deployment blocker, not a product defect.
- Reports may contain only a matrix case ID, an approved public error code when displayed, and a brief sanitized observation.
- Do not include private Preview links, credentials, birth data, coordinates, dream content, request/response bodies, private logs, screenshots, or attachments.

## Rollout rule

No Preview success, automated result, or partial Mac pass clears Production by itself. Keep `ASTROLOGY_FEATURE_ENABLED` disabled for Production until every blocker above has dated evidence and explicit approval. The immediate rollback remains disabling the feature flag and redeploying; suspected credentials must also be revoked and replaced server-side.
