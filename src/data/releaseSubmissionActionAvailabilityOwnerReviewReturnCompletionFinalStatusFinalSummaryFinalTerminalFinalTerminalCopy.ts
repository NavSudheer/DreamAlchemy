import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalCloseoutCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminal {
  finalCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalCloseout;
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
  nextProcess: 'none';
  continuationState: 'none';
  terminalState: 'static-immutable-terminal';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalCopy {
  title: string;
  terminalLabel: string;
  terminalDescription: string;
  closeoutReminder: string;
  preservationReminder: string;
  immutableBoundary: string;
  staticBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedTerminalFields: readonly string[];
  prohibitedTerminalContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalCopy = {
  title: 'Static immutable terminal',
  terminalLabel: 'Terminal and immutable',
  terminalDescription:
    'The valid immutable-terminal-final closeout is preserved with no control, action, decision, next process, or continuation available.',
  closeoutReminder:
    'Use only a valid H-249 closeout. The immutable terminal copy cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, status, final-status, summary, terminal, immutable, immutable-final, immutable-final-closeout, and non-action state.',
  immutableBoundary:
    'The terminal copy is a read-only representation of the validated closeout and cannot change any preserved value.',
  staticBoundary:
    'Expose static terminal copy only. The record has no selectable, dismissive, navigational, or executable surface.',
  terminalBoundary:
    'Next process and continuation remain none. Available controls and available actions must both remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The record displays and collects no choices.',
  actionBoundary:
    'The record cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The record cannot delete, purge, remove, overwrite, expire, or otherwise change retained data.',
  nonApprovalBoundary:
    'Terminal state infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedTerminalFields: [
    'Existing valid H-249 immutable-terminal-final presentation closeout',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, final state, status state, immutable-final-status state, summary state, terminal states, immutable state, and immutable-final state',
    'Exact no-next-process and no-continuation states',
    'Static-immutable-terminal marker',
    'Empty available-actions and available-controls lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedTerminalContent: [
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalValid(
  terminal: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminal,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalCloseoutValid(
      terminal.finalCloseout,
    ) &&
    isSameCandidateIdentity(
      terminal.selectedCandidateIdentity,
      terminal.finalCloseout.selectedCandidateIdentity,
    ) &&
    terminal.preservedOwnerSelection ===
      terminal.finalCloseout.preservedOwnerSelection &&
    terminal.preservedNextProcess === terminal.finalCloseout.preservedNextProcess &&
    terminal.preservedGuidance === terminal.finalCloseout.preservedGuidance &&
    terminal.preservedAcknowledgement ===
      terminal.finalCloseout.preservedAcknowledgement &&
    terminal.preservedCompletionState ===
      terminal.finalCloseout.preservedCompletionState &&
    terminal.preservedPresentationState ===
      terminal.finalCloseout.preservedPresentationState &&
    terminal.preservedCloseoutState ===
      terminal.finalCloseout.preservedCloseoutState &&
    terminal.preservedFinalState === terminal.finalCloseout.preservedFinalState &&
    terminal.preservedFinalPresentationState ===
      terminal.finalCloseout.preservedFinalPresentationState &&
    terminal.preservedFinalCloseoutState ===
      terminal.finalCloseout.preservedFinalCloseoutState &&
    terminal.preservedStatusState ===
      terminal.finalCloseout.preservedStatusState &&
    terminal.preservedStatusPresentationState ===
      terminal.finalCloseout.preservedStatusPresentationState &&
    terminal.preservedStatusCloseoutState ===
      terminal.finalCloseout.preservedStatusCloseoutState &&
    terminal.preservedFinalStatusState ===
      terminal.finalCloseout.preservedFinalStatusState &&
    terminal.preservedFinalStatusPresentationState ===
      terminal.finalCloseout.preservedFinalStatusPresentationState &&
    terminal.preservedFinalStatusCloseoutState ===
      terminal.finalCloseout.preservedFinalStatusCloseoutState &&
    terminal.preservedSummaryState ===
      terminal.finalCloseout.preservedSummaryState &&
    terminal.preservedSummaryPresentationState ===
      terminal.finalCloseout.preservedSummaryPresentationState &&
    terminal.preservedSummaryCloseoutState ===
      terminal.finalCloseout.preservedSummaryCloseoutState &&
    terminal.preservedTerminalState ===
      terminal.finalCloseout.preservedTerminalState &&
    terminal.preservedTerminalPresentationState ===
      terminal.finalCloseout.preservedTerminalPresentationState &&
    terminal.preservedTerminalCloseoutState ===
      terminal.finalCloseout.preservedTerminalCloseoutState &&
    terminal.preservedImmutableState ===
      terminal.finalCloseout.preservedImmutableState &&
    terminal.preservedImmutablePresentationState ===
      terminal.finalCloseout.preservedImmutablePresentationState &&
    terminal.preservedImmutableCloseoutState ===
      terminal.finalCloseout.preservedImmutableCloseoutState &&
    terminal.preservedImmutableFinalState ===
      terminal.finalCloseout.preservedImmutableFinalState &&
    terminal.preservedImmutableFinalPresentationState ===
      terminal.finalCloseout.preservedImmutableFinalPresentationState &&
    terminal.preservedImmutableFinalCloseoutState ===
      terminal.finalCloseout.closeoutState &&
    terminal.nextProcess === terminal.finalCloseout.nextProcess &&
    terminal.nextProcess === 'none' &&
    terminal.continuationState === terminal.finalCloseout.continuationState &&
    terminal.continuationState === 'none' &&
    terminal.terminalState === 'static-immutable-terminal' &&
    terminal.finalCloseout.availableActions.length === 0 &&
    terminal.finalCloseout.availableControls.length === 0 &&
    terminal.availableActions.length === 0 &&
    terminal.availableControls.length === 0 &&
    terminal.decisionState === 'not-presented' &&
    terminal.storeActionState === 'not-presented' &&
    terminal.uploadState === 'not-performed' &&
    terminal.submissionState === 'not-performed' &&
    terminal.appStoreAcceptanceState === 'not-inferred' &&
    terminal.providerApprovalState === 'not-inferred' &&
    terminal.signingApprovalState === 'not-inferred' &&
    terminal.productionApprovalState === 'not-inferred'
  );
}
