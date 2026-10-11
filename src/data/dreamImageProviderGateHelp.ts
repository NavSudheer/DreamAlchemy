/**
 * Dream Image Provider Gate Help
 *
 * Typed, content-only evidence guidance for BLK-IMG-01 through BLK-IMG-05.
 * Dream Images remain optional and disabled by default. This module neither
 * names nor selects a provider and cannot authorize a Production rollout.
 */

export type DreamImageProviderGateId =
  | 'BLK-IMG-01'
  | 'BLK-IMG-02'
  | 'BLK-IMG-03'
  | 'BLK-IMG-04'
  | 'BLK-IMG-05';

export type DreamImageProviderGateEvidenceKind =
  | 'architecture-review'
  | 'contract-test'
  | 'preview-check'
  | 'policy-review'
  | 'control-verification'
  | 'accessibility-review';

export interface DreamImageProviderGateEvidenceItem {
  /** Stable evidence item within its gate. */
  id: string;
  /** Short evidence label. */
  label: string;
  /** Type of review or verification required. */
  kind: DreamImageProviderGateEvidenceKind;
  /** Provider-neutral evidence requirement. */
  requirement: string;
  /** Observable signal that the evidence is ready for owner review. */
  reviewSignal: string;
}

export interface DreamImageProviderGateHelpEntry {
  /** Existing blocker identifier from the Dream Image Mac matrix. */
  id: DreamImageProviderGateId;
  /** Gate title. */
  title: string;
  /** Compact label for status displays. */
  shortTitle: string;
  /** Current provider-neutral blocker summary. */
  blockerSummary: string;
  /** Evidence required before an authorized clearance review. */
  evidenceNeeded: readonly DreamImageProviderGateEvidenceItem[];
  /** Concise questions for checking evidence completeness. */
  reviewQuestions: readonly string[];
  /** Evidence that does not clear the gate. */
  insufficientEvidence: readonly string[];
  /** Boundary on who may decide the gate is cleared. */
  decisionBoundary: string;
  /** Screen-reader description. */
  accessibilityLabel: string;
}

export interface DreamImageProviderGateHelpBundle {
  title: string;
  subtitle: string;
  defaultState: 'disabled';
  optionalityReminder: string;
  reviewReminder: string;
  orderedGateIds: readonly DreamImageProviderGateId[];
  gates: Record<DreamImageProviderGateId, DreamImageProviderGateHelpEntry>;
  prohibitedEvidence: readonly string[];
}

export const DREAM_IMAGE_PROVIDER_GATE_ORDER: readonly DreamImageProviderGateId[] = [
  'BLK-IMG-01',
  'BLK-IMG-02',
  'BLK-IMG-03',
  'BLK-IMG-04',
  'BLK-IMG-05',
] as const;

export const DREAM_IMAGE_PROVIDER_GATE_HELP: Record<
  DreamImageProviderGateId,
  DreamImageProviderGateHelpEntry
> = {
  'BLK-IMG-01': {
    id: 'BLK-IMG-01',
    title: 'Private Preview Route',
    shortTitle: 'Preview Route',
    blockerSummary:
      'The application-owned validation route must be available in a private Preview and connected to the Preview client before provider work is exercised.',
    evidenceNeeded: [
      {
        id: 'preview-build-boundary',
        label: 'Preview Build Boundary',
        kind: 'architecture-review',
        requirement:
          'Record the approved short build reference showing that the private Preview contains the reviewed application-owned route and client boundary.',
        reviewSignal:
          'The build reference and route contract version match the release candidate under review without exposing a private location.',
      },
      {
        id: 'disabled-response',
        label: 'Disabled-by-Default Response',
        kind: 'preview-check',
        requirement:
          'Verify the private Preview returns the documented feature-disabled state before any provider call and leaves curated preparation available.',
        reviewSignal:
          'The recorded test-case outcome identifies the stable disabled state and confirms that no provider-dependent result was claimed.',
      },
      {
        id: 'validation-contract',
        label: 'Validation Contract',
        kind: 'contract-test',
        requirement:
          'Verify consent, exact curated prompt/style allowlisting, unexpected-field rejection, content-type handling, and body-size limits at the application-owned route.',
        reviewSignal:
          'Focused contract-test outcomes cover each rejection boundary using catalog-owned synthetic inputs.',
      },
    ],
    reviewQuestions: [
      'Does the tested Preview contain the reviewed route and matching client contract?',
      'Does the route remain disabled by default and stop before provider work?',
      'Are only exact curated prompts, supported styles, and explicit consent accepted?',
    ],
    insufficientEvidence: [
      'A locally passing preparation screen without the Preview route.',
      'A private route location or access instruction without contract-test outcomes.',
      'An assertion that the route is ready without disabled-state and validation evidence.',
    ],
    decisionBoundary:
      'This gate becomes eligible for authorized review only after all route evidence is recorded. The help copy cannot deploy, connect, or approve the Preview.',
    accessibilityLabel:
      'Blocker one evidence guidance for the disabled-by-default private Dream Image Preview route.',
  },

  'BLK-IMG-02': {
    id: 'BLK-IMG-02',
    title: 'Provider Evaluation & Server Boundary',
    shortTitle: 'Provider Review',
    blockerSummary:
      'A provider candidate must pass a provider-neutral evaluation and fit the server-only boundary before any adapter is connected.',
    evidenceNeeded: [
      {
        id: 'provider-evaluation-record',
        label: 'Completed Evaluation Record',
        kind: 'policy-review',
        requirement:
          'Record reviewed evidence for data use, retention, training restrictions, moderation, output rights, processing regions, reliability, and support boundaries.',
        reviewSignal:
          'Each evaluation dimension cites independently reviewable terms or control evidence and records unresolved conditions without relying on informal assurances.',
      },
      {
        id: 'server-only-adapter-review',
        label: 'Server-Only Adapter Review',
        kind: 'architecture-review',
        requirement:
          'Verify the proposed adapter remains behind the application-owned route and does not change the curated client request boundary.',
        reviewSignal:
          'The architecture review confirms that clients receive no provider authentication material or provider-specific request contract.',
      },
      {
        id: 'spending-control-review',
        label: 'Spending Control Review',
        kind: 'control-verification',
        requirement:
          'Record owner-reviewed hard limits or equivalent stop controls and alert thresholds appropriate to the private sandbox cohort.',
        reviewSignal:
          'Control verification documents what stops additional paid work and who receives alerts, without including account details.',
      },
    ],
    reviewQuestions: [
      'Are data-use, retention, rights, regional, safety, and cost terms independently reviewable?',
      'Does the design preserve the application-owned proxy and curated request contract?',
      'Are spending stop controls verified rather than described as future work?',
    ],
    insufficientEvidence: [
      'Vendor marketing copy, verbal assurances, or unsupported reliability claims.',
      'A provider name, price quote, demo, or generated sample without a completed evaluation.',
      'A client-side SDK or authentication proposal that bypasses the application-owned route.',
    ],
    decisionBoundary:
      'Only an authorized evaluation owner may select a provider candidate after reviewing the full evidence. This entry names no provider and grants no approval.',
    accessibilityLabel:
      'Blocker two evidence guidance for provider-neutral evaluation and the server-only adapter boundary.',
  },

  'BLK-IMG-03': {
    id: 'BLK-IMG-03',
    title: 'Upstream Moderation Contract',
    shortTitle: 'Moderation',
    blockerSummary:
      'The exact catalog allowlist must be paired with a reviewed server-side moderation step before rendering can begin.',
    evidenceNeeded: [
      {
        id: 'moderation-sequence',
        label: 'Moderation Sequence Review',
        kind: 'architecture-review',
        requirement:
          'Verify that exact prompt/style validation and unexpected-field rejection occur before a server-side moderation decision and any rendering work.',
        reviewSignal:
          'The reviewed sequence shows that rejected inputs cannot reach rendering and that freeform client prompts are never accepted.',
      },
      {
        id: 'moderation-error-contract',
        label: 'Stable Moderation Error',
        kind: 'contract-test',
        requirement:
          'Verify a controlled moderation rejection maps to the documented public error state without returning private provider detail.',
        reviewSignal:
          'The contract test records the stable status and recovery behavior using catalog-owned synthetic inputs only.',
      },
      {
        id: 'moderation-copy-review',
        label: 'Recovery Copy Review',
        kind: 'accessibility-review',
        requirement:
          'Verify the rejection state is understandable, non-diagnostic, non-predictive, accessible, and preserves the prepared catalog selection.',
        reviewSignal:
          'Manual review records concise text-only outcomes for message clarity, focus, announcement, and retained selection state.',
      },
    ],
    reviewQuestions: [
      'Does moderation occur before rendering and after strict catalog validation?',
      'Is rejection mapped to a stable public state without private provider detail?',
      'Does the user-facing recovery state preserve preparation and remain accessible?',
    ],
    insufficientEvidence: [
      'Client-side allowlisting alone.',
      'A claim that a provider moderates content without a reviewed request sequence and rejection contract.',
      'A generated sample or moderation dashboard capture.',
    ],
    decisionBoundary:
      'This gate remains blocked until the moderation sequence, public error contract, and accessible recovery behavior are reviewed together.',
    accessibilityLabel:
      'Blocker three evidence guidance for server-side moderation and accessible rejection handling.',
  },

  'BLK-IMG-04': {
    id: 'BLK-IMG-04',
    title: 'Durable Throttling & Cost Protection',
    shortTitle: 'Rate Controls',
    blockerSummary:
      'Paid image requests require durable anonymous throttling and verified cost protections that work across server instances.',
    evidenceNeeded: [
      {
        id: 'durable-limiter-design',
        label: 'Durable Limiter Design',
        kind: 'architecture-review',
        requirement:
          'Verify request counters use a durable backend, bounded expiry, and a one-way anonymous identifier rather than raw network or account identity.',
        reviewSignal:
          'The architecture record identifies the counter scope, expiry, quota boundary, and fail-safe behavior without exposing configuration values.',
      },
      {
        id: 'rate-limit-contract',
        label: 'Rate-Limit Contract',
        kind: 'contract-test',
        requirement:
          'Verify controlled quota exhaustion returns the documented public rate-limit state and a bounded retry interval before additional paid work.',
        reviewSignal:
          'Repeatable contract-test outcomes show enforcement across requests and confirm the provider is not called after the limit is reached.',
      },
      {
        id: 'cost-stop-controls',
        label: 'Cost Stop Controls',
        kind: 'control-verification',
        requirement:
          'Record owner verification of spending stop controls, alert thresholds, and the response owner for unusual consumption.',
        reviewSignal:
          'The evidence identifies tested control behavior and ownership without account, billing, or credential details.',
      },
    ],
    reviewQuestions: [
      'Is throttling durable across server instances and independent of user accounts?',
      'Does quota exhaustion stop upstream work and return a stable recovery state?',
      'Are cost stop controls and response ownership verified?',
    ],
    insufficientEvidence: [
      'Per-instance memory counters or client-only cooldowns.',
      'An untested quota value or an alert without a stop control.',
      'Raw network identifiers, billing records, dashboard captures, or private configuration output.',
    ],
    decisionBoundary:
      'This gate remains blocked until durable enforcement and owner-reviewed cost controls have controlled-test evidence. No limit value in this copy authorizes rollout.',
    accessibilityLabel:
      'Blocker four evidence guidance for durable anonymous throttling and cost protection.',
  },

  'BLK-IMG-05': {
    id: 'BLK-IMG-05',
    title: 'Transient Delivery & Retention',
    shortTitle: 'Delivery & Retention',
    blockerSummary:
      'Remote delivery requires reviewed access, expiry, purge, and disclosure controls without permanent account-linked storage.',
    evidenceNeeded: [
      {
        id: 'delivery-access-review',
        label: 'Delivery Access Review',
        kind: 'architecture-review',
        requirement:
          'Verify generated assets use a reviewed transient delivery mechanism with bounded access and no searchable or account-linked location.',
        reviewSignal:
          'The architecture record documents access controls and delivery scope without including an asset, URL, or identifier.',
      },
      {
        id: 'retention-expiry-review',
        label: 'Retention & Expiry Review',
        kind: 'policy-review',
        requirement:
          'Record independently reviewable retention terms, configured expiry behavior, purge responsibility, and any limits on deletion claims.',
        reviewSignal:
          'The reviewed record distinguishes configured controls from external retention limits and contains no unsupported promise of immediate deletion.',
      },
      {
        id: 'delivery-contract-test',
        label: 'Delivery Contract Test',
        kind: 'contract-test',
        requirement:
          'Verify response metadata is bounded, descriptive alternative text is required, expired delivery references fail safely, and no personal association is introduced.',
        reviewSignal:
          'Controlled outcomes cover success metadata, expiry, invalid response, and descriptive-text requirements without retaining generated media.',
      },
      {
        id: 'local-copy-disclosure',
        label: 'Local Copy & Deletion Disclosure',
        kind: 'accessibility-review',
        requirement:
          'Verify copy distinguishes transient remote delivery, app-managed local copies, separate system-library copies, and external deletion limits.',
        reviewSignal:
          'Text-only accessibility review confirms that storage and deletion scopes are understandable and avoid absolute retention guarantees.',
      },
    ],
    reviewQuestions: [
      'Are delivery access and expiry controls documented and independently reviewable?',
      'Are retention and purge limits disclosed without absolute deletion promises?',
      'Does the result contract require descriptive text and avoid personal association?',
      'Are remote, app-local, and system-library copy scopes clearly separated?',
    ],
    insufficientEvidence: [
      'A generated asset, asset URL, media file, or visual sample.',
      'An undocumented temporary-storage claim or unverified expiry estimate.',
      'A promise that local deletion retracts provider or delivery-system data.',
    ],
    decisionBoundary:
      'This gate remains blocked until access, retention, expiry, result metadata, and disclosure evidence are jointly reviewed. No media sample grants clearance.',
    accessibilityLabel:
      'Blocker five evidence guidance for transient image delivery, retention, expiry, and deletion disclosures.',
  },
};

export const DREAM_IMAGE_PROVIDER_GATE_HELP_BUNDLE: DreamImageProviderGateHelpBundle = {
  title: 'Dream Image Provider Gate Help',
  subtitle:
    'Provider-neutral evidence requirements for the five optional Dream Image release blockers.',
  defaultState: 'disabled',
  optionalityReminder:
    'Dream Images remain optional. Curated preparation continues to work without a provider, and live generation stays disabled while any gate is unresolved.',
  reviewReminder:
    'Evidence may make a gate ready for authorized review; it does not select a provider, enable generation, approve Production, or override another gate.',
  orderedGateIds: DREAM_IMAGE_PROVIDER_GATE_ORDER,
  gates: DREAM_IMAGE_PROVIDER_GATE_HELP,
  prohibitedEvidence: [
    'Dream journal text, analyses, tags, voice transcripts, names, or personal details',
    'Generated images, image files, image URLs, image descriptions, or media exports',
    'Private Preview links, invitations, access values, or browser session data',
    'Credentials, tokens, authorization headers, cookies, or configuration values',
    'Raw logs, console output, network traces, diagnostic dumps, or monitoring exports',
    'Request or response payloads and private provider-returned content',
    'Vendor promises, marketing claims, verbal assurances, or unsupported guarantees',
    'Statements that a gate, provider, sandbox, or Production rollout is approved',
  ],
};

export function getDreamImageProviderGateHelpBundle(): DreamImageProviderGateHelpBundle {
  return DREAM_IMAGE_PROVIDER_GATE_HELP_BUNDLE;
}

export function getDreamImageProviderGateHelp(
  id: DreamImageProviderGateId,
): DreamImageProviderGateHelpEntry {
  return DREAM_IMAGE_PROVIDER_GATE_HELP[id];
}

export function getAllDreamImageProviderGateHelpEntries(): DreamImageProviderGateHelpEntry[] {
  return DREAM_IMAGE_PROVIDER_GATE_ORDER.map(
    id => DREAM_IMAGE_PROVIDER_GATE_HELP[id],
  );
}

export function getDreamImageProviderGateEvidenceItems(
  id: DreamImageProviderGateId,
): readonly DreamImageProviderGateEvidenceItem[] {
  return DREAM_IMAGE_PROVIDER_GATE_HELP[id].evidenceNeeded;
}

export function isRecognizedDreamImageProviderGateId(
  value: unknown,
): value is DreamImageProviderGateId {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_PROVIDER_GATE_ORDER.includes(value as DreamImageProviderGateId)
  );
}
