import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalReceiptValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalReceipt,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalReceiptCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseout {
  terminalReceipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalReceipt;
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
  preservedStatusPresentationState: 'static-status-presented';
  preservedStatusCloseoutState: 'static-status-presentation-closed-no-action-performed';
  preservedFinalStatusState: 'immutable-final-status';
  preservedFinalStatusPresentationState: 'immutable-final-status-presented';
  preservedFinalStatusCloseoutState: 'immutable-final-status-presentation-closed';
  preservedSummaryState: 'completed-static-summary';
  preservedSummaryPresentationState: 'completed-static-summary-presented';
  preservedSummaryCloseoutState: 'completed-static-summary-presentation-closed';
  preservedTerminalState: 'immutable-terminal-record';
  preservedTerminalPresentationState: 'immutable-terminal-record-presented';
  nextProcess: 'none';
  continuationState: 'none';
  closeoutState: 'immutable-terminal-record-presentation-closed';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutCopy {
  title: string;
  closedLabel: string;
  closedDescription: string;
  receiptReminder: string;
  preservationReminder: string;
  immutableBoundary: string;
  staticBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedCloseoutFields: readonly string[];
  prohibitedCloseoutContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutCopy = {
  title: 'Immutable-terminal-record presentation closeout',
  closedLabel: 'Closed with no continuation',
  closedDescription:
    'The valid immutable-terminal-record presentation was closed with no control, action, decision, next process, or continuation available.',
  receiptReminder:
    'Use only a valid H-235 immutable-terminal-record presentation receipt. The closeout cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, status, final-status, summary, terminal, terminal-presentation, and non-action state.',
  immutableBoundary:
    'The closeout is a read-only terminal representation and cannot change any preserved value.',
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
    'Existing valid H-235 immutable-terminal-record presentation receipt',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, final state, status state, immutable-final-status state, summary state, and terminal state',
    'Exact no-next-process and no-continuation states',
    'Immutable-terminal-record-presentation-closed marker',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutValid(
  closeout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseout,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalReceiptValid(
      closeout.terminalReceipt,
    ) &&
    isSameCandidateIdentity(
      closeout.selectedCandidateIdentity,
      closeout.terminalReceipt.selectedCandidateIdentity,
    ) &&
    closeout.preservedOwnerSelection ===
      closeout.terminalReceipt.preservedOwnerSelection &&
    closeout.preservedNextProcess ===
      closeout.terminalReceipt.preservedNextProcess &&
    closeout.preservedGuidance === closeout.terminalReceipt.preservedGuidance &&
    closeout.preservedAcknowledgement ===
      closeout.terminalReceipt.preservedAcknowledgement &&
    closeout.preservedCompletionState ===
      closeout.terminalReceipt.preservedCompletionState &&
    closeout.preservedPresentationState ===
      closeout.terminalReceipt.preservedPresentationState &&
    closeout.preservedCloseoutState ===
      closeout.terminalReceipt.preservedCloseoutState &&
    closeout.preservedFinalState ===
      closeout.terminalReceipt.preservedFinalState &&
    closeout.preservedFinalPresentationState ===
      closeout.terminalReceipt.preservedFinalPresentationState &&
    closeout.preservedFinalCloseoutState ===
      closeout.terminalReceipt.preservedFinalCloseoutState &&
    closeout.preservedStatusState ===
      closeout.terminalReceipt.preservedStatusState &&
    closeout.preservedStatusPresentationState ===
      closeout.terminalReceipt.preservedStatusPresentationState &&
    closeout.preservedStatusCloseoutState ===
      closeout.terminalReceipt.preservedStatusCloseoutState &&
    closeout.preservedFinalStatusState ===
      closeout.terminalReceipt.preservedFinalStatusState &&
    closeout.preservedFinalStatusPresentationState ===
      closeout.terminalReceipt.preservedFinalStatusPresentationState &&
    closeout.preservedFinalStatusCloseoutState ===
      closeout.terminalReceipt.preservedFinalStatusCloseoutState &&
    closeout.preservedSummaryState ===
      closeout.terminalReceipt.preservedSummaryState &&
    closeout.preservedSummaryPresentationState ===
      closeout.terminalReceipt.preservedSummaryPresentationState &&
    closeout.preservedSummaryCloseoutState ===
      closeout.terminalReceipt.preservedSummaryCloseoutState &&
    closeout.preservedTerminalState ===
      closeout.terminalReceipt.preservedTerminalState &&
    closeout.preservedTerminalPresentationState ===
      closeout.terminalReceipt.presentationState &&
    closeout.nextProcess === closeout.terminalReceipt.nextProcess &&
    closeout.nextProcess === 'none' &&
    closeout.continuationState ===
      closeout.terminalReceipt.continuationState &&
    closeout.continuationState === 'none' &&
    closeout.closeoutState ===
      'immutable-terminal-record-presentation-closed' &&
    closeout.terminalReceipt.availableActions.length === 0 &&
    closeout.terminalReceipt.availableControls.length === 0 &&
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
