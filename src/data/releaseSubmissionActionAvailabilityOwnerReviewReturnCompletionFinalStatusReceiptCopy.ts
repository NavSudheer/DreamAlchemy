import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatus,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceipt {
  staticStatus: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatus;
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
  preservedStatusState: 'closed-static-status';
  nextProcess: 'none';
  continuationState: 'none';
  presentationState: 'static-status-presented';
  presentedTimestamp: string;
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceiptCopy {
  title: string;
  presentedLabel: string;
  presentedDescription: string;
  statusReminder: string;
  preservationReminder: string;
  timestampReminder: string;
  staticBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedReceiptFields: readonly string[];
  prohibitedReceiptContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceiptCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceiptCopy = {
  title: 'Static-status presentation receipt',
  presentedLabel: 'Closed status presented',
  presentedDescription:
    'The valid static closed status was presented with no control, action, decision, next process, or continuation available.',
  statusReminder:
    'Use only a valid H-220 static status. The presentation receipt cannot extend, reopen, replace, or reinterpret the closed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, final-presentation, final-closeout, status, and non-action state.',
  timestampReminder:
    'Record only a non-empty timestamp for when the static status was presented. Add no interaction, account, store, device, or diagnostic detail.',
  staticBoundary:
    'Expose no controls. The receipt records presentation only and has no selectable, dismissive, navigational, or executable surface.',
  terminalBoundary:
    'Next process and continuation remain none. Available controls and available actions must both remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The receipt displays and collects no choices.',
  actionBoundary:
    'The receipt cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The receipt cannot delete, purge, remove, overwrite, expire, or otherwise change retained data.',
  nonApprovalBoundary:
    'Presentation infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedReceiptFields: [
    'Existing valid H-220 static status',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, final state, and static-status state',
    'Exact no-next-process and no-continuation states',
    'Static-status-presented marker and presentation timestamp',
    'Empty available-actions and available-controls lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedReceiptContent: [
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceiptCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceiptCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceiptCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceiptValid(
  receipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusReceipt,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusValid(
      receipt.staticStatus,
    ) &&
    isSameCandidateIdentity(
      receipt.selectedCandidateIdentity,
      receipt.staticStatus.selectedCandidateIdentity,
    ) &&
    receipt.preservedOwnerSelection ===
      receipt.staticStatus.preservedOwnerSelection &&
    receipt.preservedNextProcess === receipt.staticStatus.preservedNextProcess &&
    receipt.preservedGuidance === receipt.staticStatus.preservedGuidance &&
    receipt.preservedAcknowledgement ===
      receipt.staticStatus.preservedAcknowledgement &&
    receipt.preservedCompletionState ===
      receipt.staticStatus.preservedCompletionState &&
    receipt.preservedPresentationState ===
      receipt.staticStatus.preservedPresentationState &&
    receipt.preservedCloseoutState === receipt.staticStatus.preservedCloseoutState &&
    receipt.preservedFinalState === receipt.staticStatus.preservedFinalState &&
    receipt.preservedFinalPresentationState ===
      receipt.staticStatus.preservedFinalPresentationState &&
    receipt.preservedFinalCloseoutState ===
      receipt.staticStatus.preservedFinalCloseoutState &&
    receipt.preservedStatusState === receipt.staticStatus.statusState &&
    receipt.nextProcess === receipt.staticStatus.nextProcess &&
    receipt.nextProcess === 'none' &&
    receipt.continuationState === receipt.staticStatus.continuationState &&
    receipt.continuationState === 'none' &&
    receipt.presentationState === 'static-status-presented' &&
    receipt.presentedTimestamp.trim().length > 0 &&
    receipt.staticStatus.availableActions.length === 0 &&
    receipt.staticStatus.availableControls.length === 0 &&
    receipt.availableActions.length === 0 &&
    receipt.availableControls.length === 0 &&
    receipt.decisionState === 'not-presented' &&
    receipt.storeActionState === 'not-presented' &&
    receipt.uploadState === 'not-performed' &&
    receipt.submissionState === 'not-performed' &&
    receipt.appStoreAcceptanceState === 'not-inferred' &&
    receipt.providerApprovalState === 'not-inferred' &&
    receipt.signingApprovalState === 'not-inferred' &&
    receipt.productionApprovalState === 'not-inferred'
  );
}
