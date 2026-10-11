import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatus {
  finalCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseout;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  preservedNextProcess: 'owner-review';
  preservedGuidance: 'return-to-owner-review';
  preservedAcknowledgement: 'done';
  preservedCompletionState: 'completion-recorded-no-action-performed';
  preservedPresentationState: 'completion-record-presented';
  preservedCloseoutState: 'completion-presentation-closed-no-action-performed';
  preservedFinalState: 'final-record-no-action-performed';
  preservedFinalPresentationState: 'final-record-presented';
  preservedFinalCloseoutState: 'final-presentation-closed-no-action-performed';
  nextProcess: 'none';
  continuationState: 'none';
  statusState: 'closed-static-status';
  availableActions: readonly [];
  availableControls: readonly [];
  decisionState: 'not-presented';
  storeActionState: 'not-presented';
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusCopy {
  title: string;
  statusLabel: string;
  statusDescription: string;
  closeoutReminder: string;
  preservationReminder: string;
  staticBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedStatusFields: readonly string[];
  prohibitedStatusContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusCopy = {
  title: 'Final completion status',
  statusLabel: 'Closed',
  statusDescription:
    'The final presentation is closed with no control, action, decision, next process, or continuation available.',
  closeoutReminder:
    'Use only a valid H-218 closeout. The static status cannot extend, reopen, replace, or reinterpret the closed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, final-presentation, final-closeout, and non-action state.',
  staticBoundary:
    'Expose static closed status copy only. The status has no selectable, dismissive, navigational, or executable surface.',
  terminalBoundary:
    'Next process and continuation remain none. Available controls and available actions must both remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The status displays and collects no choices.',
  actionBoundary:
    'The status cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The status cannot delete, purge, remove, overwrite, expire, or otherwise change retained data.',
  nonApprovalBoundary:
    'Closed status infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedStatusFields: [
    'Existing valid H-218 final-presentation closeout',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, and final state',
    'Exact no-next-process and no-continuation states',
    'Closed-static-status marker',
    'Empty available-actions and available-controls lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedStatusContent: [
    'Credentials, tokens, secrets, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Purchase receipts, billing receipts, transaction receipts, or other account and store artifacts',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Owner decision prompts, recommendations, selections, store controls, action controls, simulations, execution status, authorization claims, upload or submission actions, implied actions, next-process links, or continuation controls',
    'Delete, purge, remove, overwrite, retention-expiry, or destructive record controls',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusValid(
  status: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatus,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutValid(
      status.finalCloseout,
    ) &&
    isSameCandidateIdentity(
      status.selectedCandidateIdentity,
      status.finalCloseout.selectedCandidateIdentity,
    ) &&
    status.preservedOwnerSelection ===
      status.finalCloseout.preservedOwnerSelection &&
    status.preservedNextProcess === status.finalCloseout.preservedNextProcess &&
    status.preservedGuidance === status.finalCloseout.preservedGuidance &&
    status.preservedAcknowledgement ===
      status.finalCloseout.preservedAcknowledgement &&
    status.preservedCompletionState ===
      status.finalCloseout.preservedCompletionState &&
    status.preservedPresentationState ===
      status.finalCloseout.preservedPresentationState &&
    status.preservedCloseoutState ===
      status.finalCloseout.preservedCloseoutState &&
    status.preservedFinalState === status.finalCloseout.preservedFinalState &&
    status.preservedFinalPresentationState ===
      status.finalCloseout.preservedFinalPresentationState &&
    status.preservedFinalCloseoutState === status.finalCloseout.closeoutState &&
    status.nextProcess === status.finalCloseout.nextProcess &&
    status.nextProcess === 'none' &&
    status.continuationState === status.finalCloseout.continuationState &&
    status.continuationState === 'none' &&
    status.statusState === 'closed-static-status' &&
    status.finalCloseout.availableActions.length === 0 &&
    status.finalCloseout.availableControls.length === 0 &&
    status.availableActions.length === 0 &&
    status.availableControls.length === 0 &&
    status.decisionState === 'not-presented' &&
    status.storeActionState === 'not-presented' &&
    status.uploadState === 'not-performed' &&
    status.submissionState === 'not-performed' &&
    status.appStoreAcceptanceState === 'not-inferred' &&
    status.providerApprovalState === 'not-inferred' &&
    status.signingApprovalState === 'not-inferred' &&
    status.productionApprovalState === 'not-inferred'
  );
}
