import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCloseoutCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalRecord {
  terminalCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCloseout;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  preservedNextProcess: 'owner-review';
  preservedGuidance: 'return-to-owner-review';
  preservedAcknowledgement: 'done';
  preservedCompletionState: 'completion-recorded-no-action-performed';
  preservedPresentationState: 'completion-record-presented';
  preservedCloseoutState: 'completion-presentation-closed-no-action-performed';
  nextProcess: 'none';
  finalState: 'final-record-no-action-performed';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCopy {
  title: string;
  finalLabel: string;
  finalDescription: string;
  closeoutReminder: string;
  preservationReminder: string;
  staticBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedFinalFields: readonly string[];
  prohibitedFinalContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCopy = {
  title: 'Owner-review return final record',
  finalLabel: 'Completed and closed',
  finalDescription:
    'The terminal completion flow is recorded as closed with no control, decision, action, or next process available.',
  closeoutReminder:
    'Use only a valid H-214 terminal closeout. The final record cannot extend, reopen, replace, or reinterpret the closed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every selection, route, guidance, acknowledgement, completion, presentation, closeout, and non-action state.',
  staticBoundary:
    'Expose static completion copy only. The final record has no selectable, dismissive, navigational, or executable control.',
  terminalBoundary:
    'Next process remains none. Available controls and available actions must both remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The final record displays and collects no choices.',
  actionBoundary:
    'The final record cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The final record cannot delete, purge, remove, overwrite, expire, or otherwise change retained data.',
  nonApprovalBoundary:
    'Final state infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedFinalFields: [
    'Existing valid H-214 terminal closeout',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, done acknowledgement, completion state, presentation state, and closeout state',
    'Exact no-next-process state',
    'Final-record-no-action-performed marker',
    'Empty available-actions and available-controls lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedFinalContent: [
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalRecordValid(
  record: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalRecord,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCloseoutValid(
      record.terminalCloseout,
    ) &&
    isSameCandidateIdentity(
      record.selectedCandidateIdentity,
      record.terminalCloseout.selectedCandidateIdentity,
    ) &&
    record.preservedOwnerSelection ===
      record.terminalCloseout.preservedOwnerSelection &&
    record.preservedNextProcess ===
      record.terminalCloseout.preservedNextProcess &&
    record.preservedGuidance === record.terminalCloseout.preservedGuidance &&
    record.preservedAcknowledgement ===
      record.terminalCloseout.preservedAcknowledgement &&
    record.preservedCompletionState ===
      record.terminalCloseout.preservedCompletionState &&
    record.preservedPresentationState ===
      record.terminalCloseout.preservedPresentationState &&
    record.preservedCloseoutState === record.terminalCloseout.closeoutState &&
    record.nextProcess === record.terminalCloseout.nextProcess &&
    record.nextProcess === 'none' &&
    record.finalState === 'final-record-no-action-performed' &&
    record.terminalCloseout.availableActions.length === 0 &&
    record.terminalCloseout.availableControls.length === 0 &&
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
