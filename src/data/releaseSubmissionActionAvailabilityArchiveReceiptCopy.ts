import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityArchiveDisplayValid,
  type ReleaseSubmissionActionAvailabilityArchiveDisplay,
  type ReleaseSubmissionActionAvailabilityArchiveOption,
} from './releaseSubmissionActionAvailabilityArchiveCopy';

export type ReleaseSubmissionActionAvailabilityArchiveReceiptSelection =
  | 'none'
  | ReleaseSubmissionActionAvailabilityArchiveOption;

export type ReleaseSubmissionActionAvailabilityArchiveReceiptSelectionMethod =
  | 'none'
  | 'explicit-owner-selection';

export interface ReleaseSubmissionActionAvailabilityArchiveReceipt {
  archiveDisplay: ReleaseSubmissionActionAvailabilityArchiveDisplay;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  presentationState: 'archive-view-presented';
  presentedTimestamp: string;
  presentedOptions: readonly ReleaseSubmissionActionAvailabilityArchiveOption[];
  preselectedOption: 'none';
  ownerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  selectionMethod: ReleaseSubmissionActionAvailabilityArchiveReceiptSelectionMethod;
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityArchiveReceiptCopy {
  title: string;
  subtitle: string;
  displayReminder: string;
  optionsReminder: string;
  selectionReminder: string;
  candidateReminder: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedReceiptFields: readonly string[];
  prohibitedReceiptContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityArchiveReceiptCopy: ReleaseSubmissionActionAvailabilityArchiveReceiptCopy = {
  title: 'Archive-view presentation receipt',
  subtitle:
    'Record that a valid H-203 archive display was presented without changing its options or starting an action.',
  displayReminder:
    'Record only that the valid archive view was presented and when it was presented.',
  optionsReminder:
    'Copy the available option list exactly from the archive display. Do not add, remove, reorder, recommend, or preselect an option.',
  selectionReminder:
    'Record none unless the owner explicitly selects retain record or an already available return to owner review option.',
  candidateReminder:
    'The receipt candidate must exactly match the configured and installed candidate identity in the validated archive display.',
  actionBoundary:
    'Presentation and selection do not invoke, simulate, authorize, upload, or submit anything. Upload and submission remain not performed.',
  deletionBoundary:
    'This receipt cannot delete, purge, remove, overwrite, expire, or otherwise change the retained record.',
  nonApprovalBoundary:
    'No presentation or selection infers acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedReceiptFields: [
    'Existing valid H-203 archive display',
    'Exact matching candidate build identity',
    'Archive-view-presented marker and presentation timestamp',
    'Exact presented option list',
    'No-preselected-option marker',
    'No owner selection or one explicit already-available option',
    'None or explicit-owner-selection method',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedReceiptContent: [
    'Credentials, tokens, secrets, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Purchase receipts, billing receipts, transaction receipts, or other account and store artifacts',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Inferred or preselected owner choices, action controls, simulations, execution status, authorization claims, upload or submission actions, or implied actions',
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

function hasExactOptions(
  actual: readonly ReleaseSubmissionActionAvailabilityArchiveOption[],
  expected: readonly ReleaseSubmissionActionAvailabilityArchiveOption[],
): boolean {
  return (
    actual.length === expected.length &&
    actual.every((option, index) => option === expected[index])
  );
}

function isSelectionValid(
  receipt: ReleaseSubmissionActionAvailabilityArchiveReceipt,
): boolean {
  if (receipt.ownerSelection === 'none') {
    return receipt.selectionMethod === 'none';
  }

  return (
    receipt.selectionMethod === 'explicit-owner-selection' &&
    receipt.presentedOptions.includes(receipt.ownerSelection)
  );
}

export function getReleaseSubmissionActionAvailabilityArchiveReceiptCopy(): ReleaseSubmissionActionAvailabilityArchiveReceiptCopy {
  return releaseSubmissionActionAvailabilityArchiveReceiptCopy;
}

export function isReleaseSubmissionActionAvailabilityArchiveReceiptValid(
  receipt: ReleaseSubmissionActionAvailabilityArchiveReceipt,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityArchiveDisplayValid(
      receipt.archiveDisplay,
    ) &&
    isSameCandidateIdentity(
      receipt.selectedCandidateIdentity,
      receipt.archiveDisplay.selectedCandidateIdentity,
    ) &&
    receipt.presentationState === 'archive-view-presented' &&
    receipt.presentedTimestamp.trim().length > 0 &&
    hasExactOptions(
      receipt.presentedOptions,
      receipt.archiveDisplay.availableArchiveOptions,
    ) &&
    receipt.preselectedOption === 'none' &&
    isSelectionValid(receipt) &&
    receipt.uploadState === 'not-performed' &&
    receipt.submissionState === 'not-performed' &&
    receipt.appStoreAcceptanceState === 'not-inferred' &&
    receipt.providerApprovalState === 'not-inferred' &&
    receipt.signingApprovalState === 'not-inferred' &&
    receipt.productionApprovalState === 'not-inferred'
  );
}
