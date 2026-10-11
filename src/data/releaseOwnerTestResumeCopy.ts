import {
  isReleaseCandidateBuildIdentityRecordValid,
  type ReleaseCandidateBuildIdentityRecord,
} from './releaseCandidateBuildIdentityCopy';
import type {
  ReleaseDeviceTestClassification,
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';
import type { ReleaseOwnerTestSessionStatus } from './releaseOwnerTestSessionStatusCopy';

export type ReleaseOwnerTestPausedStatus = Extract<
  ReleaseOwnerTestSessionStatus,
  'paused-by-device-blocker' | 'paused-by-optional-provider-blocker'
>;

export type ReleaseOwnerTestResumeBlockerClassification = Extract<
  ReleaseDeviceTestClassification,
  'device-environment-blocker' | 'optional-provider-blocker'
>;

export type ReleaseOwnerTestResumePrerequisiteState =
  | 'not-rechecked'
  | 'still-blocked'
  | 'cleared-awaiting-retest'
  | 'cleared-and-retested';

export type ReleaseOwnerTestResumePhase =
  | 'confirm-paused-record'
  | 'reconfirm-candidate'
  | 'recheck-prerequisite'
  | 'rerun-smallest-path'
  | 'run-adjacent-regression'
  | 'record-resumed-outcomes'
  | 'closeout';

export interface ReleaseOwnerTestResumePathResult {
  testIdentifier: ReleaseDeviceTestIdentifier;
  outcome: ReleaseDeviceTestOutcome;
  classification: ReleaseDeviceTestClassification;
  handsOnExecuted: boolean;
}

export interface ReleaseOwnerTestResumeRecord {
  pausedStatus: ReleaseOwnerTestPausedStatus;
  blockerClassification: ReleaseOwnerTestResumeBlockerClassification;
  blockedTestIdentifier: ReleaseDeviceTestIdentifier;
  pausedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  resumedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  prerequisiteState: ReleaseOwnerTestResumePrerequisiteState;
  targetPath: ReleaseOwnerTestResumePathResult;
  adjacentPath: ReleaseOwnerTestResumePathResult;
  resultingSessionStatus: ReleaseOwnerTestSessionStatus;
  approvalState: 'not-inferred';
}

export interface ReleaseOwnerTestResumeStep {
  id: string;
  order: number;
  phase: ReleaseOwnerTestResumePhase;
  title: string;
  instruction: string;
  confirmationChecks: readonly string[];
  outcomeRule: string;
  initialState: 'pending';
  boundary: string;
}

export interface ReleaseOwnerTestResumeCopy {
  title: string;
  subtitle: string;
  candidateReminder: string;
  blockerReminder: string;
  executionReminder: string;
  identifierReminder: string;
  evidenceReminder: string;
  approvalBoundary: string;
  orderedPhases: readonly ReleaseOwnerTestResumePhase[];
  steps: readonly ReleaseOwnerTestResumeStep[];
  prohibitedResumeContent: readonly string[];
}

export const RELEASE_OWNER_TEST_RESUME_PHASE_ORDER = [
  'confirm-paused-record',
  'reconfirm-candidate',
  'recheck-prerequisite',
  'rerun-smallest-path',
  'run-adjacent-regression',
  'record-resumed-outcomes',
  'closeout',
] as const satisfies readonly ReleaseOwnerTestResumePhase[];

export const RELEASE_OWNER_TEST_RESUME_STEPS = [
  {
    id: 'confirm-paused-session-status',
    order: 1,
    phase: 'confirm-paused-record',
    title: 'Confirm the paused session record',
    instruction:
      'Open the sanitized owner-session record and confirm the exact blocked identifier, paused status, blocker classification, and original candidate identity.',
    confirmationChecks: [
      'The paused status names either a device or environment blocker or an optional-provider blocker.',
      'The blocker classification matches the paused status.',
      'The blocked identifier is an exact existing identifier accepted by the release outcome contract.',
    ],
    outcomeRule:
      'Do not resume when the paused status, classification, exact identifier, or candidate identity is missing or inconsistent.',
    initialState: 'pending',
    boundary:
      'Use the sanitized session record only; do not reopen private links, attachments, logs, payloads, or unsafe evidence.',
  },
  {
    id: 'confirm-original-blocker-classification',
    order: 2,
    phase: 'confirm-paused-record',
    title: 'Preserve the original blocker class',
    instruction:
      'Keep the original classification attached to the blocked identifier until hands-on rerun evidence establishes a new test outcome.',
    confirmationChecks: [
      'A device, permission, sandbox, network, build, or environment prerequisite remains a device-environment blocker.',
      'An unavailable optional Astrology or Dream Image provider path remains an optional-provider blocker.',
      'Neither blocker is relabeled as a product defect or successful test result.',
    ],
    outcomeRule:
      'A cleared prerequisite changes only readiness to rerun; it never converts the prior blocked outcome into pass.',
    initialState: 'pending',
    boundary:
      'Do not broaden optional-feature scope, select a provider, or change deployment or Production configuration.',
  },
  {
    id: 'reconfirm-same-candidate',
    order: 3,
    phase: 'reconfirm-candidate',
    title: 'Reconfirm the same candidate identity',
    instruction:
      'Record a fresh installed-build observation and compare it with the configured identity used by the paused session.',
    confirmationChecks: [
      'Both paused and resumed identity records pass the build-identity validators.',
      'Public version, iOS build number, short commit, and branch remain the same candidate.',
      'The resumed observation has its own actual ISO timestamp.',
    ],
    outcomeRule:
      'If any candidate identity value differs, stop this resume flow and use the approved new-candidate process instead.',
    initialState: 'pending',
    boundary:
      'A same-candidate match permits retesting only; it does not prove upload, signing, App Store, release, or approval state.',
  },
  {
    id: 'recheck-blocked-prerequisite',
    order: 4,
    phase: 'recheck-prerequisite',
    title: 'Recheck the blocked prerequisite',
    instruction:
      'Recheck only the general device, environment, or approved optional-provider prerequisite that stopped the exact path.',
    confirmationChecks: [
      'The prerequisite is still blocked, or it is cleared and ready for a hands-on target rerun.',
      'No content, transaction, provider activation, private access detail, or technical artifact is needed in the record.',
    ],
    outcomeRule:
      'Record still blocked or cleared awaiting retest. “Cleared” is not a test pass and does not change the blocked identifier’s outcome by itself.',
    initialState: 'pending',
    boundary:
      'Do not record credentials, receipts, device identifiers, private network details, provider details, logs, payloads, screenshots, or links.',
  },
  {
    id: 'rerun-smallest-blocked-path',
    order: 5,
    phase: 'rerun-smallest-path',
    title: 'Rerun the smallest blocked path',
    instruction:
      'After the prerequisite is cleared, execute the shortest approved hands-on sequence that reaches the original exact blocked identifier’s expected behavior.',
    confirmationChecks: [
      'The target path is executed on the same confirmed candidate.',
      'Only approved synthetic or sandbox inputs are used.',
      'The observed result is evaluated independently from the cleared prerequisite.',
    ],
    outcomeRule:
      'Record pass or fail only after this hands-on execution. If another prerequisite blocks the target, preserve the appropriate blocker classification.',
    initialState: 'pending',
    boundary:
      'Do not include source input, voice content, media, account data, store data, or technical artifacts in the result.',
  },
  {
    id: 'run-one-adjacent-regression',
    order: 6,
    phase: 'run-adjacent-regression',
    title: 'Run one adjacent regression path',
    instruction:
      'Execute one assigned neighboring path most directly affected by the cleared prerequisite or resumed target, using its own exact existing identifier.',
    confirmationChecks: [
      'The adjacent identifier already exists in an approved matrix.',
      'The adjacent path is executed and recorded separately from the resumed target.',
      'A new mismatch is triaged independently rather than folded into the original blocker.',
    ],
    outcomeRule:
      'Never infer the adjacent outcome from the target rerun. Keep it not run if execution cannot safely occur, and retain any blocker classification.',
    initialState: 'pending',
    boundary:
      'Do not invent an adjacent identifier or expand into unassigned provider, purchase, destructive, or personal-data paths.',
  },
  {
    id: 'record-resumed-target-result',
    order: 7,
    phase: 'record-resumed-outcomes',
    title: 'Record the resumed target result',
    instruction:
      'Record the exact target identifier with one release outcome and its compatible classification after the smallest path is executed or blocked again.',
    confirmationChecks: [
      'Pass or fail has hands-on execution evidence.',
      'Fail is paired only with reproducible-product-defect.',
      'Blocked is paired only with device-environment-blocker or optional-provider-blocker.',
      'Not run and not applicable carry no issue classification.',
    ],
    outcomeRule:
      'The cleared prerequisite is not evidence for pass. Use only the newly observed target-path result.',
    initialState: 'pending',
    boundary:
      'The record contains exact identifiers and outcome classifications only; prohibited content and artifacts remain excluded.',
  },
  {
    id: 'record-adjacent-result-separately',
    order: 8,
    phase: 'record-resumed-outcomes',
    title: 'Record the adjacent result separately',
    instruction:
      'Record the adjacent identifier, outcome, and compatible classification as its own result.',
    confirmationChecks: [
      'The adjacent result does not overwrite or duplicate the target result.',
      'An unexecuted adjacent path remains not run.',
      'Any blocker retains its external classification.',
    ],
    outcomeRule:
      'Do not use target-path execution as evidence that the adjacent path passed.',
    initialState: 'pending',
    boundary:
      'Keep both records limited to exact identifiers, outcomes, and classifications without source content or attachments.',
  },
  {
    id: 'close-resumed-session',
    order: 9,
    phase: 'closeout',
    title: 'Close or continue the resumed session',
    instruction:
      'Reconcile the resumed target and adjacent outcomes, then return the overall session to in progress, a matching paused status, or completed pending owner review.',
    confirmationChecks: [
      'A remaining device or environment blocker uses the device-paused status.',
      'A remaining optional-provider blocker uses the provider-paused status.',
      'Completed pending owner review is used only after every assigned identifier is accounted for.',
    ],
    outcomeRule:
      'Session status describes testing progress only and never converts outcomes into release, submission, provider, or Production approval.',
    initialState: 'pending',
    boundary:
      'Remove temporary unsafe material and retain only the privacy-safe typed session record.',
  },
] as const satisfies readonly ReleaseOwnerTestResumeStep[];

export const releaseOwnerTestResumeCopy: ReleaseOwnerTestResumeCopy = {
  title: 'Resume an owner Mac or iOS test session',
  subtitle:
    'Privacy-safe guidance for retesting the same candidate after a device, environment, or optional-provider blocker.',
  candidateReminder:
    'Resume only when the configured and freshly observed installed identity still represent the same candidate used by the paused session.',
  blockerReminder:
    'Preserve device or environment and optional-provider classifications until new hands-on target-path evidence supports another outcome.',
  executionReminder:
    'Clearing a prerequisite permits rerun; it never produces pass. Execute the smallest blocked path and one adjacent path independently.',
  identifierReminder:
    'Use only exact existing identifiers accepted by the release device outcome contract. This resume copy defines no test ids.',
  evidenceReminder:
    'Record exact identifiers, outcomes, classifications, session status, and validated candidate identity only.',
  approvalBoundary:
    'No cleared prerequisite, resumed outcome, or completed session grants release, launch, submission, provider, or Production approval.',
  orderedPhases: RELEASE_OWNER_TEST_RESUME_PHASE_ORDER,
  steps: RELEASE_OWNER_TEST_RESUME_STEPS,
  prohibitedResumeContent: [
    'Dream content, journal text, analyses, tags, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Audio recordings, spoken phrases, voice transcripts, generated media, media links, exports, or descriptions of media',
    'Credentials, tokens, headers, cookies, secret keys, account details, store details, product details, or private configuration',
    'Receipts, billing tokens, transaction records, payment details, or subscription account data',
    'Device names, serial numbers, UDIDs, advertising identifiers, or other device identifiers',
    'Console output, build logs, traces, crash reports, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Private Preview, issue, repository, build, install, invitation, or access links and details',
    'Release, launch, submission, provider, or Production approval claims',
  ],
};

function isSameReleaseCandidate(
  paused: ReleaseCandidateBuildIdentityRecord,
  resumed: ReleaseCandidateBuildIdentityRecord,
): boolean {
  return (
    isReleaseCandidateBuildIdentityRecordValid(paused) &&
    isReleaseCandidateBuildIdentityRecordValid(resumed) &&
    paused.comparison === 'matches-configured-values' &&
    resumed.comparison === 'matches-configured-values' &&
    paused.configured.publicVersion === resumed.configured.publicVersion &&
    paused.configured.iosBuildNumber === resumed.configured.iosBuildNumber &&
    paused.configured.shortGitCommit === resumed.configured.shortGitCommit &&
    paused.configured.branchName === resumed.configured.branchName &&
    paused.installed.publicVersion === resumed.installed.publicVersion &&
    paused.installed.iosBuildNumber === resumed.installed.iosBuildNumber
  );
}

function isResumePathResultValid(
  result: ReleaseOwnerTestResumePathResult,
): boolean {
  if (result.outcome === 'pass') {
    return result.handsOnExecuted && result.classification === 'none';
  }

  if (result.outcome === 'fail') {
    return (
      result.handsOnExecuted &&
      result.classification === 'reproducible-product-defect'
    );
  }

  if (result.outcome === 'blocked') {
    return (
      result.classification === 'device-environment-blocker' ||
      result.classification === 'optional-provider-blocker'
    );
  }

  return !result.handsOnExecuted && result.classification === 'none';
}

export function getReleaseOwnerTestResumeCopy(): ReleaseOwnerTestResumeCopy {
  return releaseOwnerTestResumeCopy;
}

export function getReleaseOwnerTestResumeStepsByPhase(
  phase: ReleaseOwnerTestResumePhase,
): readonly ReleaseOwnerTestResumeStep[] {
  return releaseOwnerTestResumeCopy.steps.filter((step) => step.phase === phase);
}

export function isReleaseOwnerTestResumeRecordValid(
  record: ReleaseOwnerTestResumeRecord,
): boolean {
  const expectedPausedStatus: ReleaseOwnerTestPausedStatus =
    record.blockerClassification === 'device-environment-blocker'
      ? 'paused-by-device-blocker'
      : 'paused-by-optional-provider-blocker';

  if (
    record.pausedStatus !== expectedPausedStatus ||
    record.targetPath.testIdentifier !== record.blockedTestIdentifier ||
    record.adjacentPath.testIdentifier === record.blockedTestIdentifier ||
    record.approvalState !== 'not-inferred' ||
    !isSameReleaseCandidate(
      record.pausedCandidateIdentity,
      record.resumedCandidateIdentity,
    ) ||
    !isResumePathResultValid(record.targetPath) ||
    !isResumePathResultValid(record.adjacentPath)
  ) {
    return false;
  }

  if (record.prerequisiteState === 'not-rechecked') {
    return false;
  }

  if (record.prerequisiteState === 'still-blocked') {
    return (
      record.targetPath.outcome === 'blocked' &&
      record.targetPath.classification === record.blockerClassification &&
      record.resultingSessionStatus === expectedPausedStatus
    );
  }

  if (record.prerequisiteState === 'cleared-awaiting-retest') {
    return (
      record.targetPath.outcome === 'not-run' &&
      !record.targetPath.handsOnExecuted &&
      record.resultingSessionStatus === 'in-progress'
    );
  }

  if (!record.targetPath.handsOnExecuted) {
    return false;
  }

  if (record.targetPath.outcome === 'blocked') {
    return record.resultingSessionStatus ===
      (record.targetPath.classification === 'device-environment-blocker'
        ? 'paused-by-device-blocker'
        : 'paused-by-optional-provider-blocker');
  }

  return (
    record.resultingSessionStatus === 'in-progress' ||
    record.resultingSessionStatus === 'completed-pending-owner-review'
  );
}
