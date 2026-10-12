import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCloseoutCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinal {
  summaryCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCloseout;
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
  nextProcess: 'none';
  continuationState: 'none';
  terminalState: 'immutable-terminal-record';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCopy {
  title: string;
  finalLabel: string;
  finalDescription: string;
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

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCopy = {
  title: 'Immutable terminal record',
  finalLabel: 'Completed, closed, and final',
  finalDescription:
    'The valid completed-summary closeout is preserved with no control, action, decision, next process, or continuation available.',
  closeoutReminder:
    'Use only a valid H-232 closeout. The immutable terminal record cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, status, final-status, summary, summary-closeout, and non-action state.',
  immutableBoundary:
    'The terminal record is a read-only representation of the validated closeout and cannot change any preserved value.',
  staticBoundary:
    'Expose static final copy only. The record has no selectable, dismissive, navigational, or executable surface.',
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
    'Existing valid H-232 terminal-summary presentation closeout',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, final state, status state, immutable-final-status state, and summary state',
    'Exact no-next-process and no-continuation states',
    'Immutable-terminal-record marker',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalValid(
  record: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinal,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCloseoutValid(
      record.summaryCloseout,
    ) &&
    isSameCandidateIdentity(
      record.selectedCandidateIdentity,
      record.summaryCloseout.selectedCandidateIdentity,
    ) &&
    record.preservedOwnerSelection ===
      record.summaryCloseout.preservedOwnerSelection &&
    record.preservedNextProcess === record.summaryCloseout.preservedNextProcess &&
    record.preservedGuidance === record.summaryCloseout.preservedGuidance &&
    record.preservedAcknowledgement ===
      record.summaryCloseout.preservedAcknowledgement &&
    record.preservedCompletionState ===
      record.summaryCloseout.preservedCompletionState &&
    record.preservedPresentationState ===
      record.summaryCloseout.preservedPresentationState &&
    record.preservedCloseoutState ===
      record.summaryCloseout.preservedCloseoutState &&
    record.preservedFinalState === record.summaryCloseout.preservedFinalState &&
    record.preservedFinalPresentationState ===
      record.summaryCloseout.preservedFinalPresentationState &&
    record.preservedFinalCloseoutState ===
      record.summaryCloseout.preservedFinalCloseoutState &&
    record.preservedStatusState ===
      record.summaryCloseout.preservedStatusState &&
    record.preservedStatusPresentationState ===
      record.summaryCloseout.preservedStatusPresentationState &&
    record.preservedStatusCloseoutState ===
      record.summaryCloseout.preservedStatusCloseoutState &&
    record.preservedFinalStatusState ===
      record.summaryCloseout.preservedFinalStatusState &&
    record.preservedFinalStatusPresentationState ===
      record.summaryCloseout.preservedFinalStatusPresentationState &&
    record.preservedFinalStatusCloseoutState ===
      record.summaryCloseout.preservedFinalStatusCloseoutState &&
    record.preservedSummaryState ===
      record.summaryCloseout.preservedSummaryState &&
    record.preservedSummaryPresentationState ===
      record.summaryCloseout.preservedSummaryPresentationState &&
    record.preservedSummaryCloseoutState === record.summaryCloseout.closeoutState &&
    record.nextProcess === record.summaryCloseout.nextProcess &&
    record.nextProcess === 'none' &&
    record.continuationState === record.summaryCloseout.continuationState &&
    record.continuationState === 'none' &&
    record.terminalState === 'immutable-terminal-record' &&
    record.summaryCloseout.availableActions.length === 0 &&
    record.summaryCloseout.availableControls.length === 0 &&
    record.availableActions.length === 0 &&
    record.availableControls.length === 0 &&
    record.decisionState === 'not-presented' &&
    record.storeActionState === 'not-presented' &&
    record.uploadState === 'not-performed' &&
    record.submissionState === 'not-performed' &&
    record.appStoreAcceptanceState === 'not-inferred' &&
    record.providerApprovalState === 'not-inferred' &&
    record.signingApprovalState === 'not-inferred' &&
    record.productionApprovalState === 'not-inferred'
  );
}
