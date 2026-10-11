import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceipt,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseout {
  finalReceipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceipt;
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
  nextProcess: 'none';
  continuationState: 'none';
  closeoutState: 'final-presentation-closed-no-action-performed';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutCopy {
  title: string;
  closedLabel: string;
  closedDescription: string;
  receiptReminder: string;
  preservationReminder: string;
  staticBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedCloseoutFields: readonly string[];
  prohibitedCloseoutContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutCopy = {
  title: 'Final-presentation closeout',
  closedLabel: 'Closed with no continuation',
  closedDescription:
    'The valid final-record presentation was closed with no control, action, decision, next process, or continuation available.',
  receiptReminder:
    'Use only a valid H-217 final-record presentation receipt. The closeout cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, final-presentation, and non-action state.',
  staticBoundary:
    'Expose no controls. The closeout has no selectable, dismissive, navigational, or executable surface.',
  terminalBoundary:
    'Next process and continuation remain none. Available controls and available actions must both remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The closeout displays and collects no choices.',
  actionBoundary:
    'The closeout cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The closeout cannot delete, purge, remove, overwrite, expire, or otherwise change retained data.',
  nonApprovalBoundary:
    'Closeout infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedCloseoutFields: [
    'Existing valid H-217 final-record presentation receipt',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, earlier presentation state, earlier closeout state, final state, and final-presentation state',
    'Exact no-next-process and no-continuation states',
    'Final-presentation-closed-no-action-performed marker',
    'Empty available-actions and available-controls lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedCloseoutContent: [
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseoutValid(
  closeout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCloseout,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptValid(
      closeout.finalReceipt,
    ) &&
    isSameCandidateIdentity(
      closeout.selectedCandidateIdentity,
      closeout.finalReceipt.selectedCandidateIdentity,
    ) &&
    closeout.preservedOwnerSelection ===
      closeout.finalReceipt.preservedOwnerSelection &&
    closeout.preservedNextProcess === closeout.finalReceipt.preservedNextProcess &&
    closeout.preservedGuidance === closeout.finalReceipt.preservedGuidance &&
    closeout.preservedAcknowledgement ===
      closeout.finalReceipt.preservedAcknowledgement &&
    closeout.preservedCompletionState ===
      closeout.finalReceipt.preservedCompletionState &&
    closeout.preservedPresentationState ===
      closeout.finalReceipt.preservedPresentationState &&
    closeout.preservedCloseoutState ===
      closeout.finalReceipt.preservedCloseoutState &&
    closeout.preservedFinalState === closeout.finalReceipt.preservedFinalState &&
    closeout.preservedFinalPresentationState ===
      closeout.finalReceipt.presentationState &&
    closeout.nextProcess === closeout.finalReceipt.nextProcess &&
    closeout.nextProcess === 'none' &&
    closeout.continuationState === 'none' &&
    closeout.closeoutState ===
      'final-presentation-closed-no-action-performed' &&
    closeout.finalReceipt.availableActions.length === 0 &&
    closeout.finalReceipt.availableControls.length === 0 &&
    closeout.availableActions.length === 0 &&
    closeout.availableControls.length === 0 &&
    closeout.decisionState === 'not-presented' &&
    closeout.storeActionState === 'not-presented' &&
    closeout.uploadState === 'not-performed' &&
    closeout.submissionState === 'not-performed' &&
    closeout.appStoreAcceptanceState === 'not-inferred' &&
    closeout.providerApprovalState === 'not-inferred' &&
    closeout.signingApprovalState === 'not-inferred' &&
    closeout.productionApprovalState === 'not-inferred'
  );
}
