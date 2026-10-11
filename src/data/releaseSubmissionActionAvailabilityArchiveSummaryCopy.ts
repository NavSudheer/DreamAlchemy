import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import type { ReleaseSubmissionActionAvailabilityArchiveReceiptSelection } from './releaseSubmissionActionAvailabilityArchiveReceiptCopy';
import {
  isReleaseSubmissionActionAvailabilityArchiveCloseoutRecordValid,
  type ReleaseSubmissionActionAvailabilityArchiveCloseoutNextProcess,
  type ReleaseSubmissionActionAvailabilityArchiveCloseoutRecord,
} from './releaseSubmissionActionAvailabilityArchiveCloseoutCopy';

export type ReleaseSubmissionActionAvailabilityArchiveSummaryGuidance =
  | 'return-to-owner-review'
  | 'none';

export interface ReleaseSubmissionActionAvailabilityArchiveSummaryDisplay {
  archiveCloseout: ReleaseSubmissionActionAvailabilityArchiveCloseoutRecord;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  summarizedOwnerSelection: ReleaseSubmissionActionAvailabilityArchiveReceiptSelection;
  summarizedNextProcess: ReleaseSubmissionActionAvailabilityArchiveCloseoutNextProcess;
  acknowledgement: 'done';
  ownerReviewGuidance: ReleaseSubmissionActionAvailabilityArchiveSummaryGuidance;
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityArchiveSummaryCopy {
  title: string;
  subtitle: string;
  closeoutReminder: string;
  preservationReminder: string;
  acknowledgementLabel: string;
  acknowledgementGuidance: string;
  returnToOwnerReviewGuidance: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  allowedSummaryFields: readonly string[];
  prohibitedSummaryContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityArchiveSummaryCopy: ReleaseSubmissionActionAvailabilityArchiveSummaryCopy = {
  title: 'Archive closeout summary',
  subtitle:
    'A privacy-safe summary of a valid H-205 closeout that confirms the preserved state without starting another action.',
  closeoutReminder:
    'Use only a valid H-205 archive closeout and preserve its candidate, owner selection, route, and non-action states exactly.',
  preservationReminder:
    'The summary reports the existing record. It does not replace, reinterpret, recommend, or infer an owner selection or next process.',
  acknowledgementLabel: 'Done',
  acknowledgementGuidance:
    'Acknowledge that the summary was viewed. Done does not change the record or start another process.',
  returnToOwnerReviewGuidance:
    'When the preserved next process is owner-review, the owner may return to that separate review context. This is guidance only, not an invoked action.',
  actionBoundary:
    'The summary cannot invoke, simulate, authorize, upload, or submit anything. Upload and submission remain not performed.',
  deletionBoundary:
    'The summary cannot delete, purge, remove, overwrite, expire, or otherwise change the retained record.',
  nonApprovalBoundary:
    'No summary field, acknowledgement, or guidance infers acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedSummaryFields: [
    'Existing valid H-205 archive closeout',
    'Exact matching candidate build identity',
    'Exact preserved owner selection and next-process states',
    'Neutral done acknowledgement',
    'Conditional return-to-owner-review guidance state',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedSummaryContent: [
    'Credentials, tokens, secrets, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Purchase receipts, billing receipts, transaction receipts, or other account and store artifacts',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Inferred owner choices, action controls beyond done, simulations, execution status, authorization claims, upload or submission actions, or implied actions',
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

function isGuidanceConsistent(
  nextProcess: ReleaseSubmissionActionAvailabilityArchiveCloseoutNextProcess,
  guidance: ReleaseSubmissionActionAvailabilityArchiveSummaryGuidance,
): boolean {
  return nextProcess === 'owner-review'
    ? guidance === 'return-to-owner-review'
    : guidance === 'none';
}

export function getReleaseSubmissionActionAvailabilityArchiveSummaryCopy(): ReleaseSubmissionActionAvailabilityArchiveSummaryCopy {
  return releaseSubmissionActionAvailabilityArchiveSummaryCopy;
}

export function isReleaseSubmissionActionAvailabilityArchiveSummaryDisplayValid(
  display: ReleaseSubmissionActionAvailabilityArchiveSummaryDisplay,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityArchiveCloseoutRecordValid(
      display.archiveCloseout,
    ) &&
    isSameCandidateIdentity(
      display.selectedCandidateIdentity,
      display.archiveCloseout.selectedCandidateIdentity,
    ) &&
    display.summarizedOwnerSelection ===
      display.archiveCloseout.preservedOwnerSelection &&
    display.summarizedNextProcess === display.archiveCloseout.nextProcess &&
    display.acknowledgement === 'done' &&
    isGuidanceConsistent(
      display.summarizedNextProcess,
      display.ownerReviewGuidance,
    ) &&
    display.uploadState === 'not-performed' &&
    display.submissionState === 'not-performed' &&
    display.appStoreAcceptanceState === 'not-inferred' &&
    display.providerApprovalState === 'not-inferred' &&
    display.signingApprovalState === 'not-inferred' &&
    display.productionApprovalState === 'not-inferred'
  );
}
