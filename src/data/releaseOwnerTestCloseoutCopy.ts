import {
  isReleaseCandidateBuildIdentityRecordValid,
  type ReleaseCandidateBuildIdentityRecord,
} from './releaseCandidateBuildIdentityCopy';
import type {
  ReleaseDeviceTestClassification,
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';
import {
  isReleaseOwnerTestSessionSnapshotBalanced,
  isReleaseOwnerTestSessionStatusConsistent,
  type ReleaseOwnerTestSessionIdentifierGroups,
  type ReleaseOwnerTestSessionOutcomeCounts,
  type ReleaseOwnerTestSessionSnapshot,
  type ReleaseOwnerTestSessionStatus,
} from './releaseOwnerTestSessionStatusCopy';

export type ReleaseOwnerTestCloseoutPhase =
  | 'confirm-candidate'
  | 'reconcile-accounting'
  | 'separate-findings'
  | 'preserve-pending-work'
  | 'sanitize-record'
  | 'owner-review-handoff';

export type ReleaseOwnerDecisionState = 'pending';

export interface ReleaseOwnerTestCloseoutRecord {
  candidateIdentity: ReleaseCandidateBuildIdentityRecord;
  sessionStatus: ReleaseOwnerTestSessionStatus;
  outcomeCounts: ReleaseOwnerTestSessionOutcomeCounts;
  assignedIdentifiers: readonly ReleaseDeviceTestIdentifier[];
  identifiers: ReleaseOwnerTestSessionIdentifierGroups;
  ownerDecisionState: ReleaseOwnerDecisionState;
  approvalState: 'not-inferred';
}

export interface ReleaseOwnerTestCloseoutStep {
  id: string;
  order: number;
  phase: ReleaseOwnerTestCloseoutPhase;
  title: string;
  instruction: string;
  confirmationChecks: readonly string[];
  completionRule: string;
  initialState: 'pending';
  boundary: string;
}

export interface ReleaseOwnerTestCloseoutCopy {
  title: string;
  subtitle: string;
  candidateReminder: string;
  accountingReminder: string;
  classificationReminder: string;
  pendingWorkReminder: string;
  decisionBoundary: string;
  approvalBoundary: string;
  orderedPhases: readonly ReleaseOwnerTestCloseoutPhase[];
  steps: readonly ReleaseOwnerTestCloseoutStep[];
  allowedOutcomes: readonly ReleaseDeviceTestOutcome[];
  issueClassifications: readonly ReleaseDeviceTestClassification[];
  prohibitedCloseoutContent: readonly string[];
}

export const RELEASE_OWNER_TEST_CLOSEOUT_PHASE_ORDER = [
  'confirm-candidate',
  'reconcile-accounting',
  'separate-findings',
  'preserve-pending-work',
  'sanitize-record',
  'owner-review-handoff',
] as const satisfies readonly ReleaseOwnerTestCloseoutPhase[];

export const RELEASE_OWNER_TEST_CLOSEOUT_STEPS = [
  {
    id: 'confirm-tested-candidate',
    order: 1,
    phase: 'confirm-candidate',
    title: 'Confirm the tested candidate',
    instruction:
      'Use the validated candidate build identity record from the owner session to confirm which configured and installed build the closeout describes.',
    confirmationChecks: [
      'Configured and installed public version and iOS build values were directly compared.',
      'The identity record is valid and reports matching configured values.',
      'The record retains approval state as not inferred.',
    ],
    completionRule:
      'Do not close out under an invalid, unobserved, not-compared, or mismatched candidate identity.',
    initialState: 'pending',
    boundary:
      'Candidate identity proves only which version/build was tested; it does not prove upload, signing, App Store, release, or approval state.',
  },
  {
    id: 'reconcile-assigned-identifiers',
    order: 2,
    phase: 'reconcile-accounting',
    title: 'Reconcile assigned identifiers',
    instruction:
      'Confirm that every exact assigned identifier appears once in one outcome group and that no unassigned or invented identifier is present.',
    confirmationChecks: [
      'Assigned identifiers are unique.',
      'Grouped identifiers are unique across pass, defect, both blocker classes, not run, and not applicable.',
      'The assigned and grouped identifier sets match exactly.',
    ],
    completionRule:
      'Keep closeout pending until duplicate, missing, unassigned, or non-exact identifiers are corrected.',
    initialState: 'pending',
    boundary:
      'Use only exact existing identifiers accepted by the release device outcome contract; this closeout defines no test ids.',
  },
  {
    id: 'reconcile-outcome-counts',
    order: 3,
    phase: 'reconcile-accounting',
    title: 'Reconcile outcome counts',
    instruction:
      'Count each assigned identifier once under pass, fail, blocked, not run, or not applicable and compare each count with its exact identifier group.',
    confirmationChecks: [
      'All counts are non-negative whole numbers.',
      'The five outcome counts sum to the assigned identifier total.',
      'Fail equals reproducible defect identifiers.',
      'Blocked equals device or environment blockers plus optional-provider blockers.',
      'Pass, not run, and not applicable match their corresponding identifier groups.',
    ],
    completionRule:
      'A closeout is not reconciled until counts, identifier groups, and assigned total agree.',
    initialState: 'pending',
    boundary:
      'Aggregate counts describe session accounting only and never imply approval or release readiness.',
  },
  {
    id: 'separate-reproducible-defects',
    order: 4,
    phase: 'separate-findings',
    title: 'Separate reproducible product defects',
    instruction:
      'Keep every failed exact identifier in the reproducible product defect group for focused remediation and retest.',
    confirmationChecks: [
      'Each failed identifier represents an available path with a reproducible observable mismatch.',
      'No external prerequisite or optional-provider limitation is classified as a product defect.',
    ],
    completionRule:
      'Do not merge failures with blockers, passes, pending checks, or approval decisions.',
    initialState: 'pending',
    boundary:
      'The closeout records identifiers and classification only; defect evidence remains in its separate sanitized record.',
  },
  {
    id: 'separate-device-blockers',
    order: 5,
    phase: 'separate-findings',
    title: 'Separate device or environment blockers',
    instruction:
      'Keep exact identifiers blocked by device capability, permission, sandbox, connectivity, assigned build, or test environment in their own group.',
    confirmationChecks: [
      'Each identifier was prevented from reaching the intended behavior by an external prerequisite.',
      'No blocked identifier is counted as pass or fail.',
    ],
    completionRule:
      'Preserve the device-environment-blocker classification until an approved resume flow produces new hands-on evidence.',
    initialState: 'pending',
    boundary:
      'Do not include device identifiers, account/store data, credentials, logs, or configuration details.',
  },
  {
    id: 'separate-provider-blockers',
    order: 6,
    phase: 'separate-findings',
    title: 'Separate optional-provider blockers',
    instruction:
      'Keep exact identifiers that depend on unavailable private Astrology or Dream Image provider paths in the optional-provider blocker group.',
    confirmationChecks: [
      'Provider-dependent behavior remains separate from available provider-neutral behavior.',
      'No provider is selected, activated, promised, or approved by closeout.',
    ],
    completionRule:
      'Preserve optional-provider blockers until a separately approved plan changes their scope and a valid resume flow is executed.',
    initialState: 'pending',
    boundary:
      'Do not include private Preview links, provider details, credentials, payloads, media, or Production claims.',
  },
  {
    id: 'list-remaining-not-run',
    order: 7,
    phase: 'preserve-pending-work',
    title: 'List remaining not-run identifiers',
    instruction:
      'Retain every assigned identifier that was not executed in the not-run group instead of omitting it or converting it to another outcome.',
    confirmationChecks: [
      'The not-run count matches the exact not-run identifier list.',
      'Each item remains visible as pending hands-on work.',
      'A completed-pending-owner-review session has no remaining not-run identifiers.',
    ],
    completionRule:
      'Do not claim session completion when assigned identifiers remain not run; retain an in-progress or matching paused status.',
    initialState: 'pending',
    boundary:
      'Not run is an accounting outcome, not evidence of success, failure, blocker clearance, or approval.',
  },
  {
    id: 'confirm-not-applicable-scope',
    order: 8,
    phase: 'preserve-pending-work',
    title: 'Confirm not-applicable scope',
    instruction:
      'Confirm that each not-applicable exact identifier is explicitly outside the assigned device, platform, feature, or session scope.',
    confirmationChecks: [
      'The not-applicable count matches its exact identifier list.',
      'No unavailable applicable check is hidden as not applicable.',
    ],
    completionRule:
      'Reclassify an applicable unavailable path under its correct blocker instead of leaving it not applicable.',
    initialState: 'pending',
    boundary:
      'Scope classification does not alter candidate functionality or approve exclusion from release requirements.',
  },
  {
    id: 'sanitize-closeout-record',
    order: 9,
    phase: 'sanitize-record',
    title: 'Sanitize the closeout record',
    instruction:
      'Keep the closeout limited to the validated build identity, session status, outcome counts, exact identifier groups, and pending owner decision state.',
    confirmationChecks: [
      'No narrative source content or private artifact is present.',
      'No credentials, receipts, device identifiers, links, logs, payloads, captures, or attachments are present.',
      'Findings remain linked only by their exact existing identifiers.',
    ],
    completionRule:
      'Remove prohibited material before handing the closeout to the owner review process.',
    initialState: 'pending',
    boundary:
      'Supporting observations remain in their separate sanitized outcome records and are not duplicated here.',
  },
  {
    id: 'handoff-owner-decision-pending',
    order: 10,
    phase: 'owner-review-handoff',
    title: 'Hand off with owner decision pending',
    instruction:
      'Set the separate owner decision state to pending and route the reconciled closeout for review.',
    confirmationChecks: [
      'The session status is consistent with its reconciled counts and blocker groups.',
      'The owner decision remains pending regardless of pass count or session completion.',
      'The record’s approval state remains not inferred.',
    ],
    completionRule:
      'Closeout completion means the session is accounted for and ready for owner review; it does not decide release or submission.',
    initialState: 'pending',
    boundary:
      'Never infer release, launch, submission, provider, App Store, signing, or Production approval from this handoff.',
  },
] as const satisfies readonly ReleaseOwnerTestCloseoutStep[];

export const releaseOwnerTestCloseoutCopy: ReleaseOwnerTestCloseoutCopy = {
  title: 'Owner Mac and iOS test-session closeout',
  subtitle:
    'A privacy-safe accounting and classification handoff for separate owner review.',
  candidateReminder:
    'Close out only against a valid configured-versus-installed build identity with matching candidate values.',
  accountingReminder:
    'Every exact assigned identifier appears once, and pass, fail, blocked, not-run, and not-applicable counts reconcile with their groups.',
  classificationReminder:
    'Keep reproducible product defects, device or environment blockers, and optional-provider blockers in separate groups.',
  pendingWorkReminder:
    'Retain every not-run identifier as pending work. Closeout never treats missing execution as success.',
  decisionBoundary:
    'The owner decision state is always pending in this closeout contract and is resolved only through a separate owner process.',
  approvalBoundary:
    'No closeout state, count, or identifier group grants release, launch, submission, provider, App Store, signing, or Production approval.',
  orderedPhases: RELEASE_OWNER_TEST_CLOSEOUT_PHASE_ORDER,
  steps: RELEASE_OWNER_TEST_CLOSEOUT_STEPS,
  allowedOutcomes: [
    'pass',
    'fail',
    'blocked',
    'not-run',
    'not-applicable',
  ],
  issueClassifications: [
    'none',
    'reproducible-product-defect',
    'device-environment-blocker',
    'optional-provider-blocker',
  ],
  prohibitedCloseoutContent: [
    'Dream content, journal text, analyses, tags, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Audio recordings, spoken phrases, voice transcripts, generated media, media links, exports, or descriptions of media',
    'Credentials, tokens, headers, cookies, secret keys, account details, store details, product details, or private configuration',
    'Receipts, billing tokens, transaction records, payment details, or subscription account data',
    'Device names, serial numbers, UDIDs, advertising identifiers, or other device identifiers',
    'Console output, build logs, traces, crash reports, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Private Preview, issue, repository, build, install, invitation, or access links and details',
    'Release, launch, submission, provider, App Store, signing, or Production approval claims',
  ],
};

function toSessionSnapshot(
  record: ReleaseOwnerTestCloseoutRecord,
): ReleaseOwnerTestSessionSnapshot {
  return {
    status: record.sessionStatus,
    assignedIdentifiers: record.assignedIdentifiers,
    outcomeCounts: record.outcomeCounts,
    identifiers: record.identifiers,
    reviewState: 'not-an-approval',
  };
}

export function getReleaseOwnerTestCloseoutCopy(): ReleaseOwnerTestCloseoutCopy {
  return releaseOwnerTestCloseoutCopy;
}

export function getReleaseOwnerTestCloseoutStepsByPhase(
  phase: ReleaseOwnerTestCloseoutPhase,
): readonly ReleaseOwnerTestCloseoutStep[] {
  return releaseOwnerTestCloseoutCopy.steps.filter(
    (step) => step.phase === phase,
  );
}

export function isReleaseOwnerTestCloseoutRecordValid(
  record: ReleaseOwnerTestCloseoutRecord,
): boolean {
  const snapshot = toSessionSnapshot(record);

  return (
    isReleaseCandidateBuildIdentityRecordValid(record.candidateIdentity) &&
    record.candidateIdentity.comparison === 'matches-configured-values' &&
    record.candidateIdentity.approvalState === 'not-inferred' &&
    record.ownerDecisionState === 'pending' &&
    record.approvalState === 'not-inferred' &&
    record.sessionStatus !== 'not-started' &&
    isReleaseOwnerTestSessionSnapshotBalanced(snapshot) &&
    isReleaseOwnerTestSessionStatusConsistent(snapshot)
  );
}
