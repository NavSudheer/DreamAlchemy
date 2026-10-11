import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalRecordValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalRecord,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceipt {
  finalRecord: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalRecord;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  preservedNextProcess: 'owner-review';
  preservedGuidance: 'return-to-owner-review';
  preservedAcknowledgement: 'done';
  preservedCompletionState: 'completion-recorded-no-action-performed';
  preservedPresentationState: 'completion-record-presented';
  preservedCloseoutState: 'completion-presentation-closed-no-action-performed';
  preservedFinalState: 'final-record-no-action-performed';
  nextProcess: 'none';
  presentationState: 'final-record-presented';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptCopy {
  title: string;
  presentedLabel: string;
  presentedDescription: string;
  recordReminder: string;
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

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptCopy = {
  title: 'Final-record presentation receipt',
  presentedLabel: 'Final record presented',
  presentedDescription:
    'The valid static final record was presented with no control, action, decision, or next process available.',
  recordReminder:
    'Use only a valid H-216 final record. The presentation receipt cannot extend, reopen, replace, or reinterpret the closed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, and non-action state.',
  timestampReminder:
    'Record only a non-empty timestamp for when the final record was presented. Add no interaction, account, store, device, or diagnostic detail.',
  staticBoundary:
    'Expose no controls. The receipt records presentation only and has no selectable, dismissive, navigational, or executable surface.',
  terminalBoundary:
    'Next process remains none. Available controls and available actions must both remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The receipt displays and collects no choices.',
  actionBoundary:
    'The receipt cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The receipt cannot delete, purge, remove, overwrite, expire, or otherwise change retained data.',
  nonApprovalBoundary:
    'Presentation infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedReceiptFields: [
    'Existing valid H-216 final record',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, earlier presentation state, closeout state, and final state',
    'Exact no-next-process state',
    'Final-record-presented marker and presentation timestamp',
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
    'Owner decision prompts, recommendations, selections, store controls, action controls, simulations, execution status, authorization claims, upload or submission actions, or implied actions',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceiptValid(
  receipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalReceipt,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalRecordValid(
      receipt.finalRecord,
    ) &&
    isSameCandidateIdentity(
      receipt.selectedCandidateIdentity,
      receipt.finalRecord.selectedCandidateIdentity,
    ) &&
    receipt.preservedOwnerSelection ===
      receipt.finalRecord.preservedOwnerSelection &&
    receipt.preservedNextProcess === receipt.finalRecord.preservedNextProcess &&
    receipt.preservedGuidance === receipt.finalRecord.preservedGuidance &&
    receipt.preservedAcknowledgement ===
      receipt.finalRecord.preservedAcknowledgement &&
    receipt.preservedCompletionState ===
      receipt.finalRecord.preservedCompletionState &&
    receipt.preservedPresentationState ===
      receipt.finalRecord.preservedPresentationState &&
    receipt.preservedCloseoutState ===
      receipt.finalRecord.preservedCloseoutState &&
    receipt.preservedFinalState === receipt.finalRecord.finalState &&
    receipt.nextProcess === receipt.finalRecord.nextProcess &&
    receipt.nextProcess === 'none' &&
    receipt.presentationState === 'final-record-presented' &&
    receipt.presentedTimestamp.trim().length > 0 &&
    receipt.finalRecord.availableActions.length === 0 &&
    receipt.finalRecord.availableControls.length === 0 &&
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
