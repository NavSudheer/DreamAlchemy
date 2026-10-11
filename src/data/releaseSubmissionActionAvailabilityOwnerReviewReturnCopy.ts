import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityArchiveSummaryDisplayValid,
  type ReleaseSubmissionActionAvailabilityArchiveSummaryDisplay,
} from './releaseSubmissionActionAvailabilityArchiveSummaryCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnContext {
  archiveSummary: ReleaseSubmissionActionAvailabilityArchiveSummaryDisplay;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  preservedNextProcess: 'owner-review';
  preservedGuidance: 'return-to-owner-review';
  contextState: 'neutral-owner-review-return-context';
  acknowledgement: 'done';
  decisionState: 'not-presented';
  storeActionState: 'not-presented';
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCopy {
  title: string;
  subtitle: string;
  eligibilityReminder: string;
  preservationReminder: string;
  contextReminder: string;
  acknowledgementLabel: string;
  acknowledgementGuidance: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedContextFields: readonly string[];
  prohibitedContextContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCopy = {
  title: 'Return to owner-review context',
  subtitle:
    'Present neutral context from an eligible H-206 summary without offering a decision or store action.',
  eligibilityReminder:
    'Use only a valid H-206 summary whose preserved route is owner-review and whose guidance is return-to-owner-review.',
  preservationReminder:
    'Preserve the exact candidate identity, owner selection, next-process route, guidance, and non-action states from the summary.',
  contextReminder:
    'This view returns context only. It does not reopen, replace, infer, recommend, or select an owner decision.',
  acknowledgementLabel: 'Done',
  acknowledgementGuidance:
    'Acknowledge that the neutral return context was viewed. Done does not change the record or start another process.',
  decisionBoundary:
    'No release, submission, store, provider, signing, or Production decision is displayed or collected here.',
  actionBoundary:
    'The return context cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The return context cannot delete, purge, remove, overwrite, expire, or otherwise change the retained record.',
  nonApprovalBoundary:
    'No context field, route, guidance, or acknowledgement infers acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedContextFields: [
    'Existing eligible H-206 archive summary',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, and return guidance',
    'Neutral owner-review return-context marker',
    'Neutral done acknowledgement',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedContextContent: [
    'Credentials, tokens, secrets, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Purchase receipts, billing receipts, transaction receipts, or other account and store artifacts',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Owner decision prompts, recommendations, selections, store controls, action controls beyond done, simulations, execution status, authorization claims, upload or submission actions, or implied actions',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnContextValid(
  context: ReleaseSubmissionActionAvailabilityOwnerReviewReturnContext,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityArchiveSummaryDisplayValid(
      context.archiveSummary,
    ) &&
    context.archiveSummary.summarizedNextProcess === 'owner-review' &&
    context.archiveSummary.ownerReviewGuidance === 'return-to-owner-review' &&
    isSameCandidateIdentity(
      context.selectedCandidateIdentity,
      context.archiveSummary.selectedCandidateIdentity,
    ) &&
    context.preservedOwnerSelection ===
      context.archiveSummary.summarizedOwnerSelection &&
    context.preservedNextProcess ===
      context.archiveSummary.summarizedNextProcess &&
    context.preservedGuidance === context.archiveSummary.ownerReviewGuidance &&
    context.contextState === 'neutral-owner-review-return-context' &&
    context.acknowledgement === 'done' &&
    context.decisionState === 'not-presented' &&
    context.storeActionState === 'not-presented' &&
    context.uploadState === 'not-performed' &&
    context.submissionState === 'not-performed' &&
    context.appStoreAcceptanceState === 'not-inferred' &&
    context.providerApprovalState === 'not-inferred' &&
    context.signingApprovalState === 'not-inferred' &&
    context.productionApprovalState === 'not-inferred'
  );
}
