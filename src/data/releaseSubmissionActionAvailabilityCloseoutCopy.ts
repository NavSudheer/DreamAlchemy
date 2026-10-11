import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityReceiptValid,
  type ReleaseSubmissionActionAvailabilityReceipt,
} from './releaseSubmissionActionAvailabilityReceiptCopy';

export type ReleaseSubmissionActionAvailabilityCloseoutResponse =
  | 'no-response-recorded'
  | 'explicit-cancel-recorded'
  | 'explicit-return-to-owner-recorded';

export type ReleaseSubmissionActionAvailabilityCloseoutNextProcess =
  | 'owner-review'
  | 'none';

export interface ReleaseSubmissionActionAvailabilityCloseoutRecord {
  presentationReceipt: ReleaseSubmissionActionAvailabilityReceipt;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  closeoutState: 'closed-no-action-performed';
  responseState: ReleaseSubmissionActionAvailabilityCloseoutResponse;
  nextProcess: ReleaseSubmissionActionAvailabilityCloseoutNextProcess;
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityCloseoutCopy {
  title: string;
  subtitle: string;
  receiptReminder: string;
  candidateReminder: string;
  responseReminder: string;
  routingReminder: string;
  actionBoundary: string;
  nonApprovalBoundary: string;
  allowedResponseStates: readonly ReleaseSubmissionActionAvailabilityCloseoutResponse[];
  allowedNextProcesses: readonly ReleaseSubmissionActionAvailabilityCloseoutNextProcess[];
  allowedCloseoutFields: readonly string[];
  prohibitedCloseoutContent: readonly string[];
}

export const RELEASE_SUBMISSION_ACTION_AVAILABILITY_CLOSEOUT_RESPONSES = [
  'no-response-recorded',
  'explicit-cancel-recorded',
  'explicit-return-to-owner-recorded',
] as const satisfies readonly ReleaseSubmissionActionAvailabilityCloseoutResponse[];

export const RELEASE_SUBMISSION_ACTION_AVAILABILITY_CLOSEOUT_NEXT_PROCESSES = [
  'owner-review',
  'none',
] as const satisfies readonly ReleaseSubmissionActionAvailabilityCloseoutNextProcess[];

export const releaseSubmissionActionAvailabilityCloseoutCopy: ReleaseSubmissionActionAvailabilityCloseoutCopy = {
  title: 'Submission-action availability closeout',
  subtitle:
    'Close a valid availability presentation receipt while preserving its exact response and confirming no action was performed.',
  receiptReminder:
    'Use only a valid H-200 presentation receipt. Closeout must not replace, reinterpret, or add an owner response.',
  candidateReminder:
    'The closeout candidate must exactly match the configured and installed candidate identity preserved by the receipt.',
  responseReminder:
    'Keep no response distinct from explicit cancel and explicit return to owner. Absence, dismissal, timeout, or navigation is not a choice.',
  routingReminder:
    'Only an explicit return-to-owner response routes to owner review. No response or explicit cancel routes to no next process.',
  actionBoundary:
    'Closeout does not invoke, simulate, authorize, upload, or submit anything. Upload and submission remain not performed.',
  nonApprovalBoundary:
    'No closeout response, route, or state infers acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedResponseStates:
    RELEASE_SUBMISSION_ACTION_AVAILABILITY_CLOSEOUT_RESPONSES,
  allowedNextProcesses:
    RELEASE_SUBMISSION_ACTION_AVAILABILITY_CLOSEOUT_NEXT_PROCESSES,
  allowedCloseoutFields: [
    'Existing valid H-200 presentation receipt',
    'Exact matching candidate build identity',
    'Closed-no-action-performed marker',
    'Exact no-response, explicit-cancel, or explicit-return response state',
    'Derived owner-review or none next process',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedCloseoutContent: [
    'Credentials, tokens, secrets, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Purchase receipts, billing receipts, transaction receipts, or other account and store artifacts',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Inferred owner choices, upload or submission controls, simulations, execution status, authorization claims, or implied actions',
    'Acceptance, release, launch, App Store, provider, signing, or Production approval claims',
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

function isResponseAndRouteConsistent(
  receipt: ReleaseSubmissionActionAvailabilityReceipt,
  responseState: ReleaseSubmissionActionAvailabilityCloseoutResponse,
  nextProcess: ReleaseSubmissionActionAvailabilityCloseoutNextProcess,
): boolean {
  switch (receipt.ownerResponse) {
    case 'no-owner-response':
      return responseState === 'no-response-recorded' && nextProcess === 'none';

    case 'cancel':
      return (
        responseState === 'explicit-cancel-recorded' && nextProcess === 'none'
      );

    case 'return-to-owner':
      return (
        responseState === 'explicit-return-to-owner-recorded' &&
        nextProcess === 'owner-review'
      );

    default:
      return false;
  }
}

export function getReleaseSubmissionActionAvailabilityCloseoutCopy(): ReleaseSubmissionActionAvailabilityCloseoutCopy {
  return releaseSubmissionActionAvailabilityCloseoutCopy;
}

export function isReleaseSubmissionActionAvailabilityCloseoutRecordValid(
  record: ReleaseSubmissionActionAvailabilityCloseoutRecord,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityReceiptValid(
      record.presentationReceipt,
    ) &&
    isSameCandidateIdentity(
      record.selectedCandidateIdentity,
      record.presentationReceipt.selectedCandidateIdentity,
    ) &&
    record.closeoutState === 'closed-no-action-performed' &&
    isResponseAndRouteConsistent(
      record.presentationReceipt,
      record.responseState,
      record.nextProcess,
    ) &&
    record.uploadState === 'not-performed' &&
    record.submissionState === 'not-performed' &&
    record.appStoreAcceptanceState === 'not-inferred' &&
    record.providerApprovalState === 'not-inferred' &&
    record.signingApprovalState === 'not-inferred' &&
    record.productionApprovalState === 'not-inferred'
  );
}
