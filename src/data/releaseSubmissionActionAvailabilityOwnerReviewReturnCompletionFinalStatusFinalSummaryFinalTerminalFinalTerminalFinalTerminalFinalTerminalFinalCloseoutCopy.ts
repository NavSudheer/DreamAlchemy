import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceipt,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseout {
  finalReceipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceipt;
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
  preservedTerminalCloseoutState: 'immutable-terminal-record-presentation-closed';
  preservedImmutableState: 'immutable-closed-terminal';
  preservedImmutablePresentationState: 'immutable-closed-terminal-presented';
  preservedImmutableCloseoutState: 'immutable-closed-terminal-presentation-closed';
  preservedImmutableFinalState: 'immutable-terminal-final';
  preservedImmutableFinalPresentationState: 'immutable-terminal-final-presented';
  preservedImmutableFinalCloseoutState: 'immutable-terminal-final-presentation-closed';
  preservedStaticTerminalState: 'static-immutable-terminal';
  preservedStaticTerminalPresentationState: 'static-immutable-terminal-presented';
  preservedStaticTerminalCloseoutState: 'static-immutable-terminal-presentation-closed';
  preservedSealedFinalState: 'sealed-static-terminal-final';
  preservedSealedFinalPresentationState: 'sealed-static-terminal-final-presented';
  preservedSealedFinalCloseoutState: 'sealed-static-terminal-final-presentation-closed';
  preservedLockedTerminalState: 'locked-static-terminal';
  preservedLockedTerminalPresentationState: 'locked-static-terminal-presented';
  preservedLockedTerminalCloseoutState: 'locked-static-terminal-presentation-closed';
  preservedImmutableLockedTerminalFinalState: 'immutable-locked-terminal-final';
  preservedImmutableLockedTerminalFinalPresentationState: 'immutable-locked-terminal-final-presented';
  preservedImmutableLockedTerminalFinalCloseoutState: 'immutable-locked-terminal-final-presentation-closed';
  preservedSealedImmutableLockedTerminalState: 'sealed-immutable-locked-terminal';
  preservedSealedImmutableLockedTerminalPresentationState: 'sealed-immutable-locked-terminal-presented';
  preservedSealedImmutableLockedTerminalCloseoutState: 'sealed-immutable-locked-terminal-presentation-closed';
  preservedImmutableSealedLockedTerminalFinalState: 'immutable-sealed-locked-terminal-final';
  preservedImmutableSealedLockedTerminalFinalPresentationState: 'immutable-sealed-locked-terminal-final-presented';
  nextProcess: 'none';
  continuationState: 'none';
  closeoutState: 'immutable-sealed-locked-terminal-final-presentation-closed';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy {
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

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy = {
  title: 'Immutable-sealed-locked-terminal-final presentation closeout',
  closedLabel: 'Closed with no continuation',
  closedDescription:
    'The valid immutable-sealed-locked-terminal-final presentation was closed with no control, action, decision, next process, or continuation available.',
  receiptReminder:
    'Use only a valid H-283 immutable-sealed-locked-terminal-final presentation receipt. The closeout cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, status, final-status, summary, terminal, immutable, immutable-final, static-terminal, sealed-final, locked-terminal, immutable-locked-terminal-final, sealed-immutable-locked-terminal, immutable-sealed-locked-terminal-final, final-presentation, and non-action state.',
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
    'Existing valid H-283 immutable-sealed-locked-terminal-final presentation receipt',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, final state, status state, immutable-final-status state, summary state, terminal states, immutable state, immutable-final state, static-terminal state, sealed-final state, locked-terminal state, immutable-locked-terminal-final state, sealed-immutable-locked-terminal state, and immutable-sealed-locked-terminal-final state',
    'Exact no-next-process and no-continuation states',
    'Immutable-sealed-locked-terminal-final-presentation-closed marker',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutValid(
  closeout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseout,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptValid(
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
      closeout.finalReceipt.preservedFinalPresentationState &&
    closeout.preservedFinalCloseoutState ===
      closeout.finalReceipt.preservedFinalCloseoutState &&
    closeout.preservedStatusState ===
      closeout.finalReceipt.preservedStatusState &&
    closeout.preservedStatusPresentationState ===
      closeout.finalReceipt.preservedStatusPresentationState &&
    closeout.preservedStatusCloseoutState ===
      closeout.finalReceipt.preservedStatusCloseoutState &&
    closeout.preservedFinalStatusState ===
      closeout.finalReceipt.preservedFinalStatusState &&
    closeout.preservedFinalStatusPresentationState ===
      closeout.finalReceipt.preservedFinalStatusPresentationState &&
    closeout.preservedFinalStatusCloseoutState ===
      closeout.finalReceipt.preservedFinalStatusCloseoutState &&
    closeout.preservedSummaryState === closeout.finalReceipt.preservedSummaryState &&
    closeout.preservedSummaryPresentationState ===
      closeout.finalReceipt.preservedSummaryPresentationState &&
    closeout.preservedSummaryCloseoutState ===
      closeout.finalReceipt.preservedSummaryCloseoutState &&
    closeout.preservedTerminalState ===
      closeout.finalReceipt.preservedTerminalState &&
    closeout.preservedTerminalPresentationState ===
      closeout.finalReceipt.preservedTerminalPresentationState &&
    closeout.preservedTerminalCloseoutState ===
      closeout.finalReceipt.preservedTerminalCloseoutState &&
    closeout.preservedImmutableState ===
      closeout.finalReceipt.preservedImmutableState &&
    closeout.preservedImmutablePresentationState ===
      closeout.finalReceipt.preservedImmutablePresentationState &&
    closeout.preservedImmutableCloseoutState ===
      closeout.finalReceipt.preservedImmutableCloseoutState &&
    closeout.preservedImmutableFinalState ===
      closeout.finalReceipt.preservedImmutableFinalState &&
    closeout.preservedImmutableFinalPresentationState ===
      closeout.finalReceipt.preservedImmutableFinalPresentationState &&
    closeout.preservedImmutableFinalCloseoutState ===
      closeout.finalReceipt.preservedImmutableFinalCloseoutState &&
    closeout.preservedStaticTerminalState ===
      closeout.finalReceipt.preservedStaticTerminalState &&
    closeout.preservedStaticTerminalPresentationState ===
      closeout.finalReceipt.preservedStaticTerminalPresentationState &&
    closeout.preservedStaticTerminalCloseoutState ===
      closeout.finalReceipt.preservedStaticTerminalCloseoutState &&
    closeout.preservedSealedFinalState ===
      closeout.finalReceipt.preservedSealedFinalState &&
    closeout.preservedSealedFinalPresentationState ===
      closeout.finalReceipt.preservedSealedFinalPresentationState &&
    closeout.preservedSealedFinalCloseoutState ===
      closeout.finalReceipt.preservedSealedFinalCloseoutState &&
    closeout.preservedLockedTerminalState ===
      closeout.finalReceipt.preservedLockedTerminalState &&
    closeout.preservedLockedTerminalPresentationState ===
      closeout.finalReceipt.preservedLockedTerminalPresentationState &&
    closeout.preservedLockedTerminalCloseoutState ===
      closeout.finalReceipt.preservedLockedTerminalCloseoutState &&
    closeout.preservedImmutableLockedTerminalFinalState ===
      closeout.finalReceipt.preservedImmutableLockedTerminalFinalState &&
    closeout.preservedImmutableLockedTerminalFinalPresentationState ===
      closeout.finalReceipt.preservedImmutableLockedTerminalFinalPresentationState &&
    closeout.preservedImmutableLockedTerminalFinalCloseoutState ===
      closeout.finalReceipt.preservedImmutableLockedTerminalFinalCloseoutState &&
    closeout.preservedSealedImmutableLockedTerminalState ===
      closeout.finalReceipt.preservedSealedImmutableLockedTerminalState &&
    closeout.preservedSealedImmutableLockedTerminalPresentationState ===
      closeout.finalReceipt.preservedSealedImmutableLockedTerminalPresentationState &&
    closeout.preservedSealedImmutableLockedTerminalCloseoutState ===
      closeout.finalReceipt.preservedSealedImmutableLockedTerminalCloseoutState &&
    closeout.preservedImmutableSealedLockedTerminalFinalState ===
      closeout.finalReceipt.preservedImmutableSealedLockedTerminalFinalState &&
    closeout.preservedImmutableSealedLockedTerminalFinalPresentationState ===
      closeout.finalReceipt.presentationState &&
    closeout.nextProcess === closeout.finalReceipt.nextProcess &&
    closeout.nextProcess === 'none' &&
    closeout.continuationState === closeout.finalReceipt.continuationState &&
    closeout.continuationState === 'none' &&
    closeout.closeoutState ===
      'immutable-sealed-locked-terminal-final-presentation-closed' &&
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
