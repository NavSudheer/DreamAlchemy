# Planning index
Updated: 2026-09-29

Start here for the current update. These documents supersede conflicting timelines, statuses, pricing proposals, and release instructions in older plans.

## Active documents
- [Roadmap](ROADMAP.md): implemented baseline, proposed additions, and scope decisions.
- [Release checklist](RELEASE_CHECKLIST.md): feature completion, testing, and submission gates.

## Working agreement
1. Collect the owner's remaining ideas and select the update's feature scope.
2. Build and test the selected features locally, including browser checks where supported.
3. When the selected scope is complete, the owner performs device testing.
4. Fix device findings, prepare final assets, and submit the completed update.
Do not split features into additional releases merely to meet the old launch deadlines. Proposed items are not commitments until selected.

## Document roles
| Location | Role |
| --- | --- |
| docs/planning/ | Current source of truth for scope, priority, and readiness |
| notes/*roadmap.md | Detailed idea inventories; not approved release scope |
| notes/dream_techniques_ui_design.md | Original design reference; current theme/components take precedence |
| notes/*strategy*.md, notes/revenuecat_implementation_plan.md | Historical business and implementation proposals |
| PROJECT_SUMMARY.md | Historical architecture snapshot; use the current roadmap for status |
| LAUNCH_POLISH_PLAN.md, FINAL_LAUNCH_CHECKLIST.md, FINAL_SUBMISSION_CHECKLIST.md | Superseded initial-launch plans |
| SUBSCRIPTION_SETUP_GUIDE.md, SUBSCRIPTION_DEBUGGING_GUIDE.md | Operational references; verify against current code/dashboard |
| SCREENSHOT_GUIDE.md, APP_STORE_DESCRIPTION.md | Asset references; refresh after feature scope is complete |
| PRIVACY_POLICY.md, TERMS_OF_SERVICE.md, docs/*.html | Policy content, not feature plans; review against final behavior |

Older files remain in place to preserve context and existing links. Their historical dates, projections, product IDs, store requirements, and completion claims are not current evidence.

## Maintenance
Update roadmap status when implementation or validation changes. Distinguish implemented locally, browser-tested, device-tested, and released. Record new ideas in the roadmap before treating them as release requirements.
