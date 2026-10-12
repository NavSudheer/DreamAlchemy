import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminal {
  terminalCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseout;
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
  nextProcess: 'none';
  continuationState: 'none';
  immutableState: 'immutable-closed-terminal';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalCopy {
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

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalCopy = {
  title: 'Immutable closed terminal',
  terminalLabel: 'Closed and immutable',
  terminalDescription:
    'The valid terminal-record presentation closeout is preserved with no control, action, decision, next process, or continuation available.',
  closeoutReminder:
    'Use only a valid H-237 closeout. The immutable terminal copy cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, status, final-status, summary, terminal, terminal-closeout, and non-action state.',
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
    'Existing valid H-237 immutable-terminal-record presentation closeout',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, final state, status state, immutable-final-status state, summary state, and terminal state',
    'Exact no-next-process and no-continuation states',
    'Immutable-closed-terminal marker',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalValid(
  terminal: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminal,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCloseoutValid(
      terminal.terminalCloseout,
    ) &&
    isSameCandidateIdentity(
      terminal.selectedCandidateIdentity,
      terminal.terminalCloseout.selectedCandidateIdentity,
    ) &&
    terminal.preservedOwnerSelection ===
      terminal.terminalCloseout.preservedOwnerSelection &&
    terminal.preservedNextProcess ===
      terminal.terminalCloseout.preservedNextProcess &&
    terminal.preservedGuidance === terminal.terminalCloseout.preservedGuidance &&
    terminal.preservedAcknowledgement ===
      terminal.terminalCloseout.preservedAcknowledgement &&
    terminal.preservedCompletionState ===
      terminal.terminalCloseout.preservedCompletionState &&
    terminal.preservedPresentationState ===
      terminal.terminalCloseout.preservedPresentationState &&
    terminal.preservedCloseoutState ===
      terminal.terminalCloseout.preservedCloseoutState &&
    terminal.preservedFinalState === terminal.terminalCloseout.preservedFinalState &&
    terminal.preservedFinalPresentationState ===
      terminal.terminalCloseout.preservedFinalPresentationState &&
    terminal.preservedFinalCloseoutState ===
      terminal.terminalCloseout.preservedFinalCloseoutState &&
    terminal.preservedStatusState ===
      terminal.terminalCloseout.preservedStatusState &&
    terminal.preservedStatusPresentationState ===
      terminal.terminalCloseout.preservedStatusPresentationState &&
    terminal.preservedStatusCloseoutState ===
      terminal.terminalCloseout.preservedStatusCloseoutState &&
    terminal.preservedFinalStatusState ===
      terminal.terminalCloseout.preservedFinalStatusState &&
    terminal.preservedFinalStatusPresentationState ===
      terminal.terminalCloseout.preservedFinalStatusPresentationState &&
    terminal.preservedFinalStatusCloseoutState ===
      terminal.terminalCloseout.preservedFinalStatusCloseoutState &&
    terminal.preservedSummaryState ===
      terminal.terminalCloseout.preservedSummaryState &&
    terminal.preservedSummaryPresentationState ===
      terminal.terminalCloseout.preservedSummaryPresentationState &&
    terminal.preservedSummaryCloseoutState ===
      terminal.terminalCloseout.preservedSummaryCloseoutState &&
    terminal.preservedTerminalState ===
      terminal.terminalCloseout.preservedTerminalState &&
    terminal.preservedTerminalPresentationState ===
      terminal.terminalCloseout.preservedTerminalPresentationState &&
    terminal.preservedTerminalCloseoutState ===
      terminal.terminalCloseout.closeoutState &&
    terminal.nextProcess === terminal.terminalCloseout.nextProcess &&
    terminal.nextProcess === 'none' &&
    terminal.continuationState === terminal.terminalCloseout.continuationState &&
    terminal.continuationState === 'none' &&
    terminal.immutableState === 'immutable-closed-terminal' &&
    terminal.terminalCloseout.availableActions.length === 0 &&
    terminal.terminalCloseout.availableControls.length === 0 &&
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
