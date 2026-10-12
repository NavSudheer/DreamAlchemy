import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminal,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceipt {
  immutableTerminal: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminal;
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
  nextProcess: 'none';
  continuationState: 'none';
  presentationState: 'immutable-closed-terminal-presented';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceiptCopy {
  title: string;
  presentedLabel: string;
  presentedDescription: string;
  terminalReminder: string;
  preservationReminder: string;
  timestampReminder: string;
  immutableBoundary: string;
  staticBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedReceiptFields: readonly string[];
  prohibitedReceiptContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceiptCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceiptCopy = {
  title: 'Immutable-closed-terminal presentation receipt',
  presentedLabel: 'Immutable terminal presented',
  presentedDescription:
    'The valid immutable closed terminal was presented with no control, action, decision, next process, or continuation available.',
  terminalReminder:
    'Use only a valid H-239 immutable terminal. The presentation receipt cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, status, final-status, summary, terminal, immutable, and non-action state.',
  timestampReminder:
    'Record only a non-empty timestamp for when the immutable terminal was presented. Add no interaction, account, store, device, or diagnostic detail.',
  immutableBoundary:
    'The receipt is a read-only presentation record and cannot change any preserved value.',
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
    'Existing valid H-239 immutable terminal',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, final state, status state, immutable-final-status state, summary state, terminal state, and immutable state',
    'Exact no-next-process and no-continuation states',
    'Immutable-closed-terminal-presented marker and presentation timestamp',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceiptCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceiptCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceiptCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceiptValid(
  receipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalReceipt,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalValid(
      receipt.immutableTerminal,
    ) &&
    isSameCandidateIdentity(
      receipt.selectedCandidateIdentity,
      receipt.immutableTerminal.selectedCandidateIdentity,
    ) &&
    receipt.preservedOwnerSelection ===
      receipt.immutableTerminal.preservedOwnerSelection &&
    receipt.preservedNextProcess ===
      receipt.immutableTerminal.preservedNextProcess &&
    receipt.preservedGuidance === receipt.immutableTerminal.preservedGuidance &&
    receipt.preservedAcknowledgement ===
      receipt.immutableTerminal.preservedAcknowledgement &&
    receipt.preservedCompletionState ===
      receipt.immutableTerminal.preservedCompletionState &&
    receipt.preservedPresentationState ===
      receipt.immutableTerminal.preservedPresentationState &&
    receipt.preservedCloseoutState ===
      receipt.immutableTerminal.preservedCloseoutState &&
    receipt.preservedFinalState ===
      receipt.immutableTerminal.preservedFinalState &&
    receipt.preservedFinalPresentationState ===
      receipt.immutableTerminal.preservedFinalPresentationState &&
    receipt.preservedFinalCloseoutState ===
      receipt.immutableTerminal.preservedFinalCloseoutState &&
    receipt.preservedStatusState ===
      receipt.immutableTerminal.preservedStatusState &&
    receipt.preservedStatusPresentationState ===
      receipt.immutableTerminal.preservedStatusPresentationState &&
    receipt.preservedStatusCloseoutState ===
      receipt.immutableTerminal.preservedStatusCloseoutState &&
    receipt.preservedFinalStatusState ===
      receipt.immutableTerminal.preservedFinalStatusState &&
    receipt.preservedFinalStatusPresentationState ===
      receipt.immutableTerminal.preservedFinalStatusPresentationState &&
    receipt.preservedFinalStatusCloseoutState ===
      receipt.immutableTerminal.preservedFinalStatusCloseoutState &&
    receipt.preservedSummaryState ===
      receipt.immutableTerminal.preservedSummaryState &&
    receipt.preservedSummaryPresentationState ===
      receipt.immutableTerminal.preservedSummaryPresentationState &&
    receipt.preservedSummaryCloseoutState ===
      receipt.immutableTerminal.preservedSummaryCloseoutState &&
    receipt.preservedTerminalState ===
      receipt.immutableTerminal.preservedTerminalState &&
    receipt.preservedTerminalPresentationState ===
      receipt.immutableTerminal.preservedTerminalPresentationState &&
    receipt.preservedTerminalCloseoutState ===
      receipt.immutableTerminal.preservedTerminalCloseoutState &&
    receipt.preservedImmutableState === receipt.immutableTerminal.immutableState &&
    receipt.nextProcess === receipt.immutableTerminal.nextProcess &&
    receipt.nextProcess === 'none' &&
    receipt.continuationState ===
      receipt.immutableTerminal.continuationState &&
    receipt.continuationState === 'none' &&
    receipt.presentationState === 'immutable-closed-terminal-presented' &&
    receipt.presentedTimestamp.trim().length > 0 &&
    receipt.immutableTerminal.availableActions.length === 0 &&
    receipt.immutableTerminal.availableControls.length === 0 &&
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
