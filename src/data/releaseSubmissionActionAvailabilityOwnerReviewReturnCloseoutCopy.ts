import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnReceiptValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnReceipt,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnReceiptCopy';

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseout {
  returnReceipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnReceipt;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  preservedNextProcess: 'owner-review';
  preservedGuidance: 'return-to-owner-review';
  preservedAcknowledgement: 'done';
  closeoutState: 'owner-review-return-closed-no-action-performed';
  nextProcess: 'none';
  decisionState: 'not-presented';
  storeActionState: 'not-presented';
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutCopy {
  title: string;
  subtitle: string;
  receiptReminder: string;
  preservationReminder: string;
  acknowledgementReminder: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedCloseoutFields: readonly string[];
  prohibitedCloseoutContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutCopy = {
  title: 'Owner-review return closeout',
  subtitle:
    'Close a valid H-208 return-context receipt while preserving its exact state and confirming that no action was performed.',
  receiptReminder:
    'Use only a valid H-208 receipt. Closeout must not replace, reinterpret, add, or infer context, acknowledgement, or intent.',
  preservationReminder:
    'Preserve the exact candidate identity, owner selection, owner-review route, return guidance, done acknowledgement, and non-action states.',
  acknowledgementReminder:
    'Done records only that the neutral context was acknowledged. It is not a decision, authorization, or action.',
  terminalBoundary:
    'The closeout exposes no next process. Its next-process state is none and cannot be derived into another route.',
  decisionBoundary:
    'Decision and store-action states remain not presented. This closeout displays and collects no decisions.',
  actionBoundary:
    'Closeout cannot invoke, simulate, authorize, upload, submit, or expose a store action. Upload and submission remain not performed.',
  deletionBoundary:
    'Closeout cannot delete, purge, remove, overwrite, expire, or otherwise change the retained record.',
  nonApprovalBoundary:
    'No closeout state or preserved field infers acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedCloseoutFields: [
    'Existing valid H-208 return-context receipt',
    'Exact matching candidate build identity',
    'Exact preserved owner selection, owner-review route, and return guidance',
    'Exact preserved done acknowledgement',
    'Owner-review-return-closed-no-action-performed marker',
    'No-next-process marker',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedCloseoutContent: [
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseoutValid(
  closeout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCloseout,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnReceiptValid(
      closeout.returnReceipt,
    ) &&
    isSameCandidateIdentity(
      closeout.selectedCandidateIdentity,
      closeout.returnReceipt.selectedCandidateIdentity,
    ) &&
    closeout.preservedOwnerSelection ===
      closeout.returnReceipt.preservedOwnerSelection &&
    closeout.preservedNextProcess ===
      closeout.returnReceipt.preservedNextProcess &&
    closeout.preservedGuidance === closeout.returnReceipt.preservedGuidance &&
    closeout.preservedAcknowledgement ===
      closeout.returnReceipt.acknowledgement &&
    closeout.closeoutState ===
      'owner-review-return-closed-no-action-performed' &&
    closeout.nextProcess === 'none' &&
    closeout.decisionState === 'not-presented' &&
    closeout.storeActionState === 'not-presented' &&
    closeout.uploadState === 'not-performed' &&
    closeout.submissionState === 'not-performed' &&
    closeout.appStoreAcceptanceState === 'not-inferred' &&
    closeout.providerApprovalState === 'not-inferred' &&
    closeout.signingApprovalState === 'not-inferred' &&
    closeout.productionApprovalState === 'not-inferred'
  );
}
