import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnContextValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnContext,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnReceipt {
  returnContext: ReleaseSubmissionActionAvailabilityOwnerReviewReturnContext;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  preservedNextProcess: 'owner-review';
  preservedGuidance: 'return-to-owner-review';
  presentationState: 'owner-review-return-context-presented';
  presentedTimestamp: string;
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

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnReceiptCopy {
  title: string;
  subtitle: string;
  contextReminder: string;
  preservationReminder: string;
  presentationReminder: string;
  acknowledgementReminder: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedReceiptFields: readonly string[];
  prohibitedReceiptContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnReceiptCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnReceiptCopy = {
  title: 'Owner-review return-context receipt',
  subtitle:
    'Record presentation of a valid H-207 return context and its neutral done acknowledgement without starting another action.',
  contextReminder:
    'Use only a valid H-207 owner-review return context. The receipt does not create or reopen a decision or store action.',
  preservationReminder:
    'Preserve the exact candidate identity, owner selection, owner-review route, return guidance, and non-action states from the context.',
  presentationReminder:
    'Record only when the neutral context was presented. Do not add interaction, device, account, store, or diagnostic details.',
  acknowledgementReminder:
    'Record only the neutral done acknowledgement already exposed by the context. Done changes no state and starts no process.',
  decisionBoundary:
    'Decision and store-action states remain not presented. This receipt collects no owner, release, submission, provider, signing, or Production decision.',
  actionBoundary:
    'The receipt cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'The receipt cannot delete, purge, remove, overwrite, expire, or otherwise change the retained record.',
  nonApprovalBoundary:
    'No presentation record or acknowledgement infers acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedReceiptFields: [
    'Existing valid H-207 return context',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, and return guidance',
    'Owner-review-return-context-presented marker and presentation timestamp',
    'Neutral done acknowledgement',
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnReceiptCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnReceiptCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnReceiptCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnReceiptValid(
  receipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnReceipt,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnContextValid(
      receipt.returnContext,
    ) &&
    isSameCandidateIdentity(
      receipt.selectedCandidateIdentity,
      receipt.returnContext.selectedCandidateIdentity,
    ) &&
    receipt.preservedOwnerSelection ===
      receipt.returnContext.preservedOwnerSelection &&
    receipt.preservedNextProcess === receipt.returnContext.preservedNextProcess &&
    receipt.preservedGuidance === receipt.returnContext.preservedGuidance &&
    receipt.presentationState ===
      'owner-review-return-context-presented' &&
    receipt.presentedTimestamp.trim().length > 0 &&
    receipt.acknowledgement === 'done' &&
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
