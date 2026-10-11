import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnSummary {
  returnCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseout;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  preservedNextProcess: 'owner-review';
  preservedGuidance: 'return-to-owner-review';
  preservedAcknowledgement: 'done';
  nextProcess: 'none';
  completionState: 'completed-neutral-summary';
  availableActions: readonly [];
  decisionState: 'not-presented';
  storeActionState: 'not-presented';
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnSummaryCopy {
  title: string;
  completedLabel: string;
  completedDescription: string;
  closeoutReminder: string;
  preservationReminder: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedSummaryFields: readonly string[];
  prohibitedSummaryContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnSummaryCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnSummaryCopy = {
  title: 'Owner-review return completed',
  completedLabel: 'Completed',
  completedDescription:
    'The neutral owner-review return context was presented, acknowledged, and closed with no action performed.',
  closeoutReminder:
    'Use only a valid H-210 closeout. This terminal summary reports existing state and does not reopen a route or workflow.',
  preservationReminder:
    'Preserve the exact candidate identity, owner selection, owner-review route, return guidance, done acknowledgement, and non-action states.',
  terminalBoundary:
    'Next process remains none. The completed summary exposes neutral copy only and has no available actions.',
  decisionBoundary:
    'Decision and store-action states remain not presented. No choice, recommendation, or approval is displayed or collected.',
  actionBoundary:
    'The summary cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The summary cannot delete, purge, remove, overwrite, expire, or otherwise change the retained record.',
  nonApprovalBoundary:
    'Completion infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedSummaryFields: [
    'Existing valid H-210 closeout',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, return guidance, and done acknowledgement',
    'No-next-process marker',
    'Completed-neutral-summary marker',
    'Empty available-actions list',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnSummaryCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnSummaryCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnSummaryCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnSummaryValid(
  summary: ReleaseSubmissionActionAvailabilityOwnerReviewReturnSummary,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutValid(
      summary.returnCloseout,
    ) &&
    isSameCandidateIdentity(
      summary.selectedCandidateIdentity,
      summary.returnCloseout.selectedCandidateIdentity,
    ) &&
    summary.preservedOwnerSelection ===
      summary.returnCloseout.preservedOwnerSelection &&
    summary.preservedNextProcess ===
      summary.returnCloseout.preservedNextProcess &&
    summary.preservedGuidance === summary.returnCloseout.preservedGuidance &&
    summary.preservedAcknowledgement ===
      summary.returnCloseout.preservedAcknowledgement &&
    summary.nextProcess === summary.returnCloseout.nextProcess &&
    summary.nextProcess === 'none' &&
    summary.completionState === 'completed-neutral-summary' &&
    summary.availableActions.length === 0 &&
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
