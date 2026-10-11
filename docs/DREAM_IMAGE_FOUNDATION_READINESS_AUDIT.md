# Dream Image Foundation Readiness Audit

**Reviewed:** 2026-10-11  
**Decision:** Provider-neutral preparation is ready for regression testing. Live generation remains intentionally unavailable.

## Foundation already present

- The studio uses seven application-owned curated scene prompts and four allowlisted artistic styles; there is no raw dream-text input.
- A saved-dream identifier is validated locally and is required before generation can become eligible, but it is removed from the server payload.
- Explicit artistic and external-processing consent is required before a provider request could start.
- The client payload contains only the selected curated prompt, style, and consent flags.
- The application-owned Edge route bounds JSON size, rejects unexpected fields, validates the exact prompt/style allowlists, and returns stable disabled or provider-unavailable errors.
- The current route never calls an image provider and supports no provider key or provider URL.
- Provider-neutral UI exists for progress, typed failures/retry, generated-result disclosure, regenerate, and in-memory deletion. Save/share, photo-library export, persistent files, and remote deletion are not represented as complete.
- The Mac matrix separates testable preparation/component behavior from `BLK-IMG-01` through `BLK-IMG-05` provider-release blockers.

## Privacy and product boundaries

- Dream Image generation is optional and separate from the base Jungian analysis.
- Raw journal text, analysis, tags, voice transcripts, personal identifiers, and the local dream ID are excluded from the route contract.
- Generated art is framed as symbolic visual poetry, not an objective interpretation, diagnosis, prediction, or representation of subconscious truth.
- Result media must remain transient until provider/CDN retention, access controls, local persistence, photo permissions, sharing, and deletion semantics are implemented and verified.

## Unresolved activation gates

| Blocker | State | Evidence required before clearance |
| :--- | :--- | :--- |
| `BLK-IMG-01` application proxy deployment | Open | Deploy the application-owned route in an isolated Preview and verify disabled, validation, body-limit, and provider-unavailable responses without exposing secrets. |
| `BLK-IMG-02` provider and cost controls | Open | Approve a provider against data-use, retention, output-rights, region, reliability, and cost criteria; configure server-only credentials plus spend caps/alerts. |
| `BLK-IMG-03` moderation | Open | Define and verify input/output moderation, stable rejection codes, safe recovery copy, and escalation boundaries. |
| `BLK-IMG-04` durable anonymous limiting | Open | Add and deploy durable request controls with privacy-preserving identifiers; verify allow, deny, timeout, unavailable, and retry behavior. |
| `BLK-IMG-05` transient delivery and deletion | Open | Verify asset URL access/lifetime, provider/CDN retention, local save permissions, sharing metadata, and deletion limitations. |

## Next unblocked work

Run the final provider-neutral regression and reconcile the Mac matrix with current behavior. This work may validate preparation, consent, exact payload exclusion, disabled/unconfigured route responses, typed recovery, progress accessibility, disclosure, regenerate, and in-memory deletion. It must not select a vendor, add credentials, enable the feature, claim live generation, or mark provider-dependent cases passed.

## Activation rule

Keep `DREAM_IMAGE_FEATURE_ENABLED` unset or `false` outside an explicitly approved isolated test environment. No preparation-screen pass, component test, or route-validation result clears live generation by itself; all five blocker rows require dated evidence and explicit approval.
