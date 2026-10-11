import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnSummaryValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnSummary,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnSummaryCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionRecord {
  terminalSummary: ReleaseSubmissionActionAvailabilityOwnerReviewReturnSummary;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  preservedNextProcess: 'owner-review';
  preservedGuidance: 'return-to-owner-review';
  preservedAcknowledgement: 'done';
  nextProcess: 'none';
  completionState: 'completion-recorded-no-action-performed';
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCopy {
  title: string;
  completedLabel: string;
  completedDescription: string;
  summaryReminder: string;
  preservationReminder: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedCompletionFields: readonly string[];
  prohibitedCompletionContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCopy = {
  title: 'Owner-review return completion record',
  completedLabel: 'Completed',
  completedDescription:
    'The terminal owner-review return summary was recorded with no next process, control, or action available.',
  summaryReminder:
    'Use only a valid H-211 terminal summary. The completion record reports existing state and cannot extend or reopen the flow.',
  preservationReminder:
    'Preserve the exact candidate identity, owner selection, owner-review route, return guidance, done acknowledgement, no-next-process state, and non-action states.',
  terminalBoundary:
    'Next process remains none. Available controls and available actions must both remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The completion record displays and collects no choices.',
  actionBoundary:
    'The record cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The record cannot delete, purge, remove, overwrite, expire, or otherwise change retained data.',
  nonApprovalBoundary:
    'Completion infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedCompletionFields: [
    'Existing valid H-211 terminal summary',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, and done acknowledgement',
    'Exact no-next-process state',
    'Completion-recorded-no-action-performed marker',
    'Empty available-actions and available-controls lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedCompletionContent: [
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionRecordValid(
  record: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionRecord,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnSummaryValid(
      record.terminalSummary,
    ) &&
    isSameCandidateIdentity(
      record.selectedCandidateIdentity,
      record.terminalSummary.selectedCandidateIdentity,
    ) &&
    record.preservedOwnerSelection ===
      record.terminalSummary.preservedOwnerSelection &&
    record.preservedNextProcess ===
      record.terminalSummary.preservedNextProcess &&
    record.preservedGuidance === record.terminalSummary.preservedGuidance &&
    record.preservedAcknowledgement ===
      record.terminalSummary.preservedAcknowledgement &&
    record.nextProcess === record.terminalSummary.nextProcess &&
    record.nextProcess === 'none' &&
    record.completionState === 'completion-recorded-no-action-performed' &&
    record.terminalSummary.availableActions.length === 0 &&
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
