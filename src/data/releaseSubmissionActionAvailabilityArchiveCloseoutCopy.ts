import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityArchiveReceiptValid,
  type ReleaseSubmissionActionAvailabilityArchiveReceipt,
  type ReleaseSubmissionActionAvailabilityArchiveReceiptSelection,
} from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';

export type ReleaseSubmissionActionAvailabilityArchiveCloseoutNextProcess =
  | 'owner-review'
  | 'none';

export interface ReleaseSubmissionActionAvailabilityArchiveCloseoutRecord {
  archiveReceipt: ReleaseSubmissionActionAvailabilityArchiveReceipt;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  preservedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  nextProcess: ReleaseSubmissionActionAvailabilityArchiveCloseoutNextProcess;
  closeoutState: 'archive-view-closed-no-action-performed';
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityArchiveCloseoutCopy {
  title: string;
  subtitle: string;
  receiptReminder: string;
  candidateReminder: string;
  selectionReminder: string;
  routingReminder: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedNextProcesses: readonly ReleaseSubmissionActionAvailabilityArchiveCloseoutNextProcess[];
  allowedCloseoutFields: readonly string[];
  prohibitedCloseoutContent: readonly string[];
}

export const RELEASE_SUBMISSION_ACTION_AVAILABILITY_ARCHIVE_CLOSEOUT_NEXT_PROCESSES = [
  'owner-review',
  'none',
] as const satisfies readonly ReleaseSubmissionActionAvailabilityArchiveCloseoutNextProcess[];

export const releaseSubmissionActionAvailabilityArchiveCloseoutCopy: ReleaseSubmissionActionAvailabilityArchiveCloseoutCopy = {
  title: 'Archive-view closeout',
  subtitle:
    'Close a valid H-204 archive-view receipt while preserving the exact owner response and confirming that no action was performed.',
  receiptReminder:
    'Use only a valid H-204 receipt. Closeout must not replace, reinterpret, add, or infer an owner selection.',
  candidateReminder:
    'The closeout candidate must exactly match the configured and installed candidate identity preserved by the receipt.',
  selectionReminder:
    'Preserve none, retain record, or return to owner review exactly as recorded. Absence of a selection is not a choice.',
  routingReminder:
    'Only an explicitly available return-to-owner-review selection maps to owner-review. No selection and retain-record map to none.',
  actionBoundary:
    'Closeout does not invoke, simulate, authorize, upload, or submit anything. Upload and submission remain not performed.',
  deletionBoundary:
    'Closeout cannot delete, purge, remove, overwrite, expire, or otherwise change the retained record.',
  nonApprovalBoundary:
    'No preserved selection, route, or closeout state infers acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedNextProcesses:
    RELEASE_SUBMISSION_ACTION_AVAILABILITY_ARCHIVE_CLOSEOUT_NEXT_PROCESSES,
  allowedCloseoutFields: [
    'Existing valid H-204 archive-view receipt',
    'Exact matching candidate build identity',
    'Exact preserved owner selection or no-selection state',
    'Derived owner-review or none next process',
    'Archive-view-closed-no-action-performed marker',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedCloseoutContent: [
    'Credentials, tokens, secrets, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Purchase receipts, billing receipts, transaction receipts, or other account and store artifacts',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Inferred owner choices, action controls, simulations, execution status, authorization claims, upload or submission actions, or implied actions',
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

function isSelectionAndRouteConsistent(
  receipt: ReleaseSubmissionActionAvailabilityArchiveReceipt,
  preservedSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection,
  nextProcess: ReleaseSubmissionActionAvailabilityArchiveCloseoutNextProcess,
): boolean {
  if (preservedSelection !== receipt.ownerSelection) {
    return false;
  }

  switch (preservedSelection) {
    case 'return-to-owner-review':
      return (
        receipt.selectionMethod === 'explicit-owner-selection' &&
        receipt.presentedOptions.includes('return-to-owner-review') &&
        nextProcess === 'owner-review'
      );

    case 'retain-record':
      return (
        receipt.selectionMethod === 'explicit-owner-selection' &&
        receipt.presentedOptions.includes('retain-record') &&
        nextProcess === 'none'
      );

    case 'none':
      return receipt.selectionMethod === 'none' && nextProcess === 'none';

    default:
      return false;
  }
}

export function getReleaseSubmissionActionAvailabilityArchiveCloseoutCopy(): ReleaseSubmissionActionAvailabilityArchiveCloseoutCopy {
  return releaseSubmissionActionAvailabilityArchiveCloseoutCopy;
}

export function isReleaseSubmissionActionAvailabilityArchiveCloseoutRecordValid(
  record: ReleaseSubmissionActionAvailabilityArchiveCloseoutRecord,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityArchiveReceiptValid(
      record.archiveReceipt,
    ) &&
    isSameCandidateIdentity(
      record.selectedCandidateIdentity,
      record.archiveReceipt.selectedCandidateIdentity,
    ) &&
    isSelectionAndRouteConsistent(
      record.archiveReceipt,
      record.preservedOwnerSelection,
      record.nextProcess,
    ) &&
    record.closeoutState === 'archive-view-closed-no-action-performed' &&
    record.uploadState === 'not-performed' &&
    record.submissionState === 'not-performed' &&
    record.appStoreAcceptanceState === 'not-inferred' &&
    record.providerApprovalState === 'not-inferred' &&
    record.signingApprovalState === 'not-inferred' &&
    record.productionApprovalState === 'not-inferred'
  );
}
