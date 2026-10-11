import type {
  ReleaseDeviceTestClassification,
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseCandidateAutomatedEvidenceKind =
  | 'test-suites'
  | 'test-cases'
  | 'type-check-errors'
  | 'lint-errors'
  | 'whitespace-errors';

export type ReleaseCandidateEvidenceState =
  | 'observed'
  | 'not-run'
  | 'blocked';

export type ReleaseCandidateHandsOnArea =
  | 'core-journal-analysis-history'
  | 'native-voice-permissions'
  | 'subscription-sandbox'
  | 'persistence-relaunch'
  | 'accessibility-layout'
  | 'optional-astrology-preview'
  | 'dream-image-preparation';

export interface ReleaseCandidateAutomatedEvidenceCount {
  kind: ReleaseCandidateAutomatedEvidenceKind;
  label: string;
  count: number;
  state: ReleaseCandidateEvidenceState;
  measuredAtCandidate: boolean;
}

export interface ReleaseCandidateClassifiedFinding {
  /** Use only when an approved matrix supplies an exact existing identifier. */
  testIdentifier?: ReleaseDeviceTestIdentifier;
  /** Use for an owner-checklist area that has no matrix identifier. */
  handsOnArea?: ReleaseCandidateHandsOnArea;
  outcome: Extract<ReleaseDeviceTestOutcome, 'fail' | 'blocked'>;
  classification: Exclude<ReleaseDeviceTestClassification, 'none'>;
}

export interface ReleaseCandidateHandoffRecord {
  publicVersion: string;
  shortBuildReference: string;
  automatedEvidence: readonly ReleaseCandidateAutomatedEvidenceCount[];
  pendingHandsOnAreas: readonly ReleaseCandidateHandsOnArea[];
  pendingTestIdentifiers: readonly ReleaseDeviceTestIdentifier[];
  reproducibleDefects: readonly ReleaseCandidateClassifiedFinding[];
  deviceEnvironmentBlockers: readonly ReleaseCandidateClassifiedFinding[];
  optionalProviderBlockers: readonly ReleaseCandidateClassifiedFinding[];
  approvalState: 'not-approved-by-handoff';
}

export interface ReleaseCandidateHandsOnAreaCopy {
  area: ReleaseCandidateHandsOnArea;
  label: string;
  pendingCopy: string;
}

export interface ReleaseCandidateHandoffCopy {
  title: string;
  subtitle: string;
  candidateIdentityPrompt: string;
  automatedEvidenceReminder: string;
  pendingChecksReminder: string;
  findingReminder: string;
  identifierReminder: string;
  evidenceReminder: string;
  nonApprovalBoundary: string;
  orderedHandsOnAreas: readonly ReleaseCandidateHandsOnArea[];
  handsOnAreaCopy: Readonly<
    Record<ReleaseCandidateHandsOnArea, ReleaseCandidateHandsOnAreaCopy>
  >;
  nextActionCopy: {
    reproducibleDefects: string;
    deviceEnvironmentBlockers: string;
    optionalProviderBlockers: string;
    pendingHandsOnChecks: string;
    noOpenFindings: string;
  };
  prohibitedHandoffContent: readonly string[];
}

export const RELEASE_CANDIDATE_HANDS_ON_AREA_ORDER = [
  'core-journal-analysis-history',
  'native-voice-permissions',
  'subscription-sandbox',
  'persistence-relaunch',
  'accessibility-layout',
  'optional-astrology-preview',
  'dream-image-preparation',
] as const satisfies readonly ReleaseCandidateHandsOnArea[];

export const RELEASE_CANDIDATE_HANDS_ON_AREA_COPY = {
  'core-journal-analysis-history': {
    area: 'core-journal-analysis-history',
    label: 'Core journal, analysis, and history',
    pendingCopy:
      'Complete the assigned journal-to-analysis-to-history path on the owner device with approved non-personal fixtures.',
  },
  'native-voice-permissions': {
    area: 'native-voice-permissions',
    label: 'Native voice and permissions',
    pendingCopy:
      'Complete the assigned permission, recording, transcription, interruption, and recovery paths on supported iOS hardware.',
  },
  'subscription-sandbox': {
    area: 'subscription-sandbox',
    label: 'Subscription sandbox',
    pendingCopy:
      'Complete the assigned purchase, restore, cancellation, expiry, entitlement, and trial checks in the approved sandbox.',
  },
  'persistence-relaunch': {
    area: 'persistence-relaunch',
    label: 'Persistence and relaunch',
    pendingCopy:
      'Close and relaunch the candidate, then verify the assigned durable and transient states hands-on.',
  },
  'accessibility-layout': {
    area: 'accessibility-layout',
    label: 'Accessibility and layout',
    pendingCopy:
      'Complete the assigned VoiceOver, focus, larger-text, appearance, rotation, iPhone, and iPad checks.',
  },
  'optional-astrology-preview': {
    area: 'optional-astrology-preview',
    label: 'Optional Astrology Preview',
    pendingCopy:
      'Run only assigned existing private Preview matrix cases; keep Production and unassigned provider work outside scope.',
  },
  'dream-image-preparation': {
    area: 'dream-image-preparation',
    label: 'Dream Image preparation',
    pendingCopy:
      'Run only assigned provider-neutral preparation and expected-disabled-state cases; keep live generation blocked.',
  },
} as const satisfies Readonly<
  Record<ReleaseCandidateHandsOnArea, ReleaseCandidateHandsOnAreaCopy>
>;

export const releaseCandidateHandoffCopy: ReleaseCandidateHandoffCopy = {
  title: 'Owner Mac and iOS candidate handoff',
  subtitle:
    'A concise handoff of candidate identity, measured automation, pending device work, and classified findings.',
  candidateIdentityPrompt:
    'Record the public app version and approved short build reference for the exact candidate being handed off.',
  automatedEvidenceReminder:
    'Record counts only from checks measured against this candidate. Mark an unexecuted or unavailable automated check not run or blocked instead of assuming zero findings.',
  pendingChecksReminder:
    'List every hands-on area still pending. A check remains pending until it is executed on its assigned owner Mac or iOS surface.',
  findingReminder:
    'Separate reproducible product defects from device or environment blockers and optional-provider blockers. Do not treat a blocker as a product failure.',
  identifierReminder:
    'Use only exact existing identifiers accepted by the release device outcome contract when a matrix identifier applies. This handoff defines no test ids.',
  evidenceReminder:
    'The handoff contains public candidate references, aggregate counts, typed areas, exact existing identifiers where applicable, and classifications only.',
  nonApprovalBoundary:
    'Automation, aggregate pass counts, completed device checks, and a handoff with no open findings do not establish release, launch, submission, provider, or Production approval.',
  orderedHandsOnAreas: RELEASE_CANDIDATE_HANDS_ON_AREA_ORDER,
  handsOnAreaCopy: RELEASE_CANDIDATE_HANDS_ON_AREA_COPY,
  nextActionCopy: {
    reproducibleDefects:
      'Address each verified product mismatch, then retest its exact existing identifier on a new confirmed candidate.',
    deviceEnvironmentBlockers:
      'Restore the assigned device, permission, sandbox, connectivity, build, or environment prerequisite before rerunning the affected check.',
    optionalProviderBlockers:
      'Keep the optional dependency blocked until a separately approved plan changes its scope; do not activate or select a provider from this handoff.',
    pendingHandsOnChecks:
      'Schedule the remaining areas on their assigned owner surfaces and preserve each as pending until execution.',
    noOpenFindings:
      'Reconcile counts and identifiers, retain the explicit non-approval boundary, and route any release decision through the separate owner approval process.',
  },
  prohibitedHandoffContent: [
    'Dream content, journal text, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Voice recordings, transcripts, generated media, media links, exports, or descriptions of media',
    'Private Preview, issue, install, invitation, or access links and details',
    'Credentials, tokens, headers, cookies, receipts, account details, store details, product details, or private configuration',
    'Console output, logs, traces, crash dumps, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Release, launch, submission, provider, or Production approval claims',
  ],
};

export function getReleaseCandidateHandoffCopy(): ReleaseCandidateHandoffCopy {
  return releaseCandidateHandoffCopy;
}

export function getReleaseCandidateHandsOnAreaCopy(
  area: ReleaseCandidateHandsOnArea,
): ReleaseCandidateHandsOnAreaCopy {
  return releaseCandidateHandoffCopy.handsOnAreaCopy[area];
}

export function isReleaseCandidateFindingConsistent(
  finding: ReleaseCandidateClassifiedFinding,
): boolean {
  const hasExactlyOneReference =
    Number(finding.testIdentifier !== undefined) +
      Number(finding.handsOnArea !== undefined) ===
    1;

  if (!hasExactlyOneReference) {
    return false;
  }

  if (finding.outcome === 'fail') {
    return finding.classification === 'reproducible-product-defect';
  }

  return (
    finding.classification === 'device-environment-blocker' ||
    finding.classification === 'optional-provider-blocker'
  );
}

export function isReleaseCandidateAutomatedEvidenceCountValid(
  evidence: ReleaseCandidateAutomatedEvidenceCount,
): boolean {
  if (!Number.isInteger(evidence.count) || evidence.count < 0) {
    return false;
  }

  if (evidence.state !== 'observed') {
    return evidence.count === 0 && !evidence.measuredAtCandidate;
  }

  return evidence.measuredAtCandidate;
}

export function isReleaseCandidateHandoffStructurallyValid(
  record: ReleaseCandidateHandoffRecord,
): boolean {
  if (
    !record.publicVersion.trim() ||
    !record.shortBuildReference.trim() ||
    record.approvalState !== 'not-approved-by-handoff'
  ) {
    return false;
  }

  const automatedEvidenceIsValid = record.automatedEvidence.every(
    isReleaseCandidateAutomatedEvidenceCountValid,
  );

  const defectsAreValid = record.reproducibleDefects.every(
    (finding) =>
      finding.outcome === 'fail' &&
      finding.classification === 'reproducible-product-defect' &&
      isReleaseCandidateFindingConsistent(finding),
  );

  const deviceBlockersAreValid = record.deviceEnvironmentBlockers.every(
    (finding) =>
      finding.outcome === 'blocked' &&
      finding.classification === 'device-environment-blocker' &&
      isReleaseCandidateFindingConsistent(finding),
  );

  const providerBlockersAreValid = record.optionalProviderBlockers.every(
    (finding) =>
      finding.outcome === 'blocked' &&
      finding.classification === 'optional-provider-blocker' &&
      isReleaseCandidateFindingConsistent(finding),
  );

  return (
    automatedEvidenceIsValid &&
    defectsAreValid &&
    deviceBlockersAreValid &&
    providerBlockersAreValid
  );
}
