import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalCloseoutCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummary {
  finalStatusCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalCloseout;
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
  nextProcess: 'none';
  continuationState: 'none';
  summaryState: 'completed-static-summary';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCopy {
  title: string;
  completedLabel: string;
  completedDescription: string;
  closeoutReminder: string;
  preservationReminder: string;
  staticBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedSummaryFields: readonly string[];
  prohibitedSummaryContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCopy = {
  title: 'Final-status completed summary',
  completedLabel: 'Completed and closed',
  completedDescription:
    'The valid immutable-final-status presentation closeout is summarized with no control, action, decision, next process, or continuation available.',
  closeoutReminder:
    'Use only a valid H-228 closeout. The terminal summary cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, final, status, final-status, final-status-closeout, and non-action state.',
  staticBoundary:
    'Expose static completed copy only. The summary has no selectable, dismissive, navigational, or executable surface.',
  terminalBoundary:
    'Next process and continuation remain none. Available controls and available actions must both remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The summary displays and collects no choices.',
  actionBoundary:
    'The summary cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The summary cannot delete, purge, remove, overwrite, expire, or otherwise change retained data.',
  nonApprovalBoundary:
    'Completed summary infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedSummaryFields: [
    'Existing valid H-228 immutable-final-status presentation closeout',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation states, closeout states, final state, status state, and immutable-final-status state',
    'Exact no-next-process and no-continuation states',
    'Completed-static-summary marker',
    'Empty available-actions and available-controls lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedSummaryContent: [
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryValid(
  summary: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummary,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalCloseoutValid(
      summary.finalStatusCloseout,
    ) &&
    isSameCandidateIdentity(
      summary.selectedCandidateIdentity,
      summary.finalStatusCloseout.selectedCandidateIdentity,
    ) &&
    summary.preservedOwnerSelection ===
      summary.finalStatusCloseout.preservedOwnerSelection &&
    summary.preservedNextProcess ===
      summary.finalStatusCloseout.preservedNextProcess &&
    summary.preservedGuidance ===
      summary.finalStatusCloseout.preservedGuidance &&
    summary.preservedAcknowledgement ===
      summary.finalStatusCloseout.preservedAcknowledgement &&
    summary.preservedCompletionState ===
      summary.finalStatusCloseout.preservedCompletionState &&
    summary.preservedPresentationState ===
      summary.finalStatusCloseout.preservedPresentationState &&
    summary.preservedCloseoutState ===
      summary.finalStatusCloseout.preservedCloseoutState &&
    summary.preservedFinalState ===
      summary.finalStatusCloseout.preservedFinalState &&
    summary.preservedFinalPresentationState ===
      summary.finalStatusCloseout.preservedFinalPresentationState &&
    summary.preservedFinalCloseoutState ===
      summary.finalStatusCloseout.preservedFinalCloseoutState &&
    summary.preservedStatusState ===
      summary.finalStatusCloseout.preservedStatusState &&
    summary.preservedStatusPresentationState ===
      summary.finalStatusCloseout.preservedStatusPresentationState &&
    summary.preservedStatusCloseoutState ===
      summary.finalStatusCloseout.preservedStatusCloseoutState &&
    summary.preservedFinalStatusState ===
      summary.finalStatusCloseout.preservedFinalStatusState &&
    summary.preservedFinalStatusPresentationState ===
      summary.finalStatusCloseout.preservedFinalStatusPresentationState &&
    summary.preservedFinalStatusCloseoutState ===
      summary.finalStatusCloseout.closeoutState &&
    summary.nextProcess === summary.finalStatusCloseout.nextProcess &&
    summary.nextProcess === 'none' &&
    summary.continuationState ===
      summary.finalStatusCloseout.continuationState &&
    summary.continuationState === 'none' &&
    summary.summaryState === 'completed-static-summary' &&
    summary.finalStatusCloseout.availableActions.length === 0 &&
    summary.finalStatusCloseout.availableControls.length === 0 &&
    summary.availableActions.length === 0 &&
    summary.availableControls.length === 0 &&
    summary.decisionState === 'not-presented' &&
    summary.storeActionState === 'not-presented' &&
    summary.uploadState === 'not-performed' &&
    summary.submissionState === 'not-performed' &&
    summary.appStoreAcceptanceState === 'not-inferred' &&
    summary.providerApprovalState === 'not-inferred' &&
    summary.signingApprovalState === 'not-inferred' &&
    summary.productionApprovalState === 'not-inferred'
  );
}
