import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionConfirmationRecordValid,
  type ReleaseSubmissionActionConfirmationRecord,
} from './releaseSubmissionActionConfirmationCopy';

export type ReleaseSubmissionActionAvailabilityNextStep =
  | 'cancel'
  | 'return-to-owner';

export interface ReleaseSubmissionActionAvailabilityDisplayModel {
  confirmationRecord: ReleaseSubmissionActionConfirmationRecord;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  availabilityState: 'confirmation-recorded-action-not-started';
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  selectedNextStep: 'none';
  availableNextSteps: readonly ReleaseSubmissionActionAvailabilityNextStep[];
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityNextStepEntry {
  nextStep: ReleaseSubmissionActionAvailabilityNextStep;
  label: string;
  guidance: string;
  invokesUpload: false;
  invokesSubmission: false;
  grantsAuthorization: false;
  grantsApproval: false;
}

export interface ReleaseSubmissionActionAvailabilityCopy {
  title: string;
  statusLabel: string;
  statusDescription: string;
  candidateReminder: string;
  actionBoundary: string;
  ownerBoundary: string;
  nonApprovalBoundary: string;
  orderedNextSteps: readonly ReleaseSubmissionActionAvailabilityNextStep[];
  nextSteps: Readonly<
    Record<
      ReleaseSubmissionActionAvailabilityNextStep,
      ReleaseSubmissionActionAvailabilityNextStepEntry
    >
  >;
  allowedDisplayFields: readonly string[];
  prohibitedDisplayContent: readonly string[];
}

export const RELEASE_SUBMISSION_ACTION_AVAILABILITY_NEXT_STEP_ORDER = [
  'cancel',
  'return-to-owner',
] as const satisfies readonly ReleaseSubmissionActionAvailabilityNextStep[];

export const RELEASE_SUBMISSION_ACTION_AVAILABILITY_NEXT_STEPS = {
  cancel: {
    nextStep: 'cancel',
    label: 'Cancel',
    guidance:
      'Close this availability view and leave upload and submission not performed.',
    invokesUpload: false,
    invokesSubmission: false,
    grantsAuthorization: false,
    grantsApproval: false,
  },
  'return-to-owner': {
    nextStep: 'return-to-owner',
    label: 'Return to owner',
    guidance:
      'Return control to the owner without starting, simulating, or authorizing an upload or submission.',
    invokesUpload: false,
    invokesSubmission: false,
    grantsAuthorization: false,
    grantsApproval: false,
  },
} as const satisfies Readonly<
  Record<
    ReleaseSubmissionActionAvailabilityNextStep,
    ReleaseSubmissionActionAvailabilityNextStepEntry
  >
>;

export const releaseSubmissionActionAvailabilityCopy: ReleaseSubmissionActionAvailabilityCopy = {
  title: 'Submission action availability',
  statusLabel: 'Confirmation recorded; no action started',
  statusDescription:
    'The owner confirmed availability only for the exact candidate. No upload or submission was invoked, simulated, authorized, or performed.',
  candidateReminder:
    'Display the exact configured and installed candidate identity from the valid confirmation record without adding account, store, signing, or device details.',
  actionBoundary:
    'This model presents a confirmation result only. It exposes no upload or submission command and cannot change action state.',
  ownerBoundary:
    'Only cancel and return-to-owner guidance is available, with no preselected next step.',
  nonApprovalBoundary:
    'Availability infers no App Store acceptance, release, launch, provider approval, signing approval, or Production approval.',
  orderedNextSteps: RELEASE_SUBMISSION_ACTION_AVAILABILITY_NEXT_STEP_ORDER,
  nextSteps: RELEASE_SUBMISSION_ACTION_AVAILABILITY_NEXT_STEPS,
  allowedDisplayFields: [
    'Valid confirm-availability-only record',
    'Exact matching candidate build identity',
    'Confirmation-recorded and action-not-started status',
    'Not-performed upload and submission states',
    'No-selected-next-step marker',
    'Cancel and return-to-owner guidance',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedDisplayContent: [
    'Credentials, tokens, secrets, signing material, private configuration, or account, team, store, provider, subscription, billing, receipt, transaction, or device details',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, or other private user content',
    'Upload or submission controls, simulations, execution status, authorization claims, or implied actions',
    'App Store acceptance, release, launch, provider, signing, or Production approval claims',
  ],
};

function isSameCandidateIdentity(
  first: ReleaseCandidateBuildIdentityRecord,
  second: ReleaseCandidateBuildIdentityRecord,
): boolean {
  return (
    first.configured.publicVersion === second.configured.publicVersion &&
    first.configured.iosBuildNumber === second.configured.iosBuildNumber &&
    first.configured.shortGitCommit === second.configured.shortGitCommit &&
    first.configured.branchName === second.configured.branchName &&
    first.installed.publicVersion === second.installed.publicVersion &&
    first.installed.iosBuildNumber === second.installed.iosBuildNumber &&
    first.installed.observedTimestamp === second.installed.observedTimestamp &&
    first.comparison === second.comparison &&
    first.approvalState === second.approvalState
  );
}

function hasExactNextSteps(
  nextSteps: readonly ReleaseSubmissionActionAvailabilityNextStep[],
): boolean {
  return (
    nextSteps.length ===
      RELEASE_SUBMISSION_ACTION_AVAILABILITY_NEXT_STEP_ORDER.length &&
    nextSteps.every(
      (nextStep, index) =>
        nextStep === RELEASE_SUBMISSION_ACTION_AVAILABILITY_NEXT_STEP_ORDER[index],
    )
  );
}

export function getReleaseSubmissionActionAvailabilityCopy(): ReleaseSubmissionActionAvailabilityCopy {
  return releaseSubmissionActionAvailabilityCopy;
}

export function isReleaseSubmissionActionAvailabilityDisplayModelValid(
  model: ReleaseSubmissionActionAvailabilityDisplayModel,
): boolean {
  return (
    isReleaseSubmissionActionConfirmationRecordValid(model.confirmationRecord) &&
    model.confirmationRecord.confirmation === 'confirm-availability-only' &&
    isSameCandidateIdentity(
      model.selectedCandidateIdentity,
      model.confirmationRecord.selectedCandidateIdentity,
    ) &&
    model.availabilityState === 'confirmation-recorded-action-not-started' &&
    model.uploadState === 'not-performed' &&
    model.submissionState === 'not-performed' &&
    model.selectedNextStep === 'none' &&
    hasExactNextSteps(model.availableNextSteps) &&
    model.appStoreAcceptanceState === 'not-inferred' &&
    model.providerApprovalState === 'not-inferred' &&
    model.signingApprovalState === 'not-inferred' &&
    model.productionApprovalState === 'not-inferred'
  );
}
