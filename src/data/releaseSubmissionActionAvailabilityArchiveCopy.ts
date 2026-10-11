import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityCloseoutRecordValid,
  type ReleaseSubmissionActionAvailabilityCloseoutNextProcess,
  type ReleaseSubmissionActionAvailabilityCloseoutRecord,
  type ReleaseSubmissionActionAvailabilityCloseoutResponse,
} from './releaseSubmissionActionAvailabilityCloseoutCopy';

export type ReleaseSubmissionActionAvailabilityArchiveOption =
  | 'retain-record'
  | 'return-to-owner-review';

export interface ReleaseSubmissionActionAvailabilityArchiveDisplay {
  closeoutRecord: ReleaseSubmissionActionAvailabilityCloseoutRecord;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  archivedResponseState: ReleaseSubmissionActionAvailabilityCloseoutResponse;
  archivedNextProcess: ReleaseSubmissionActionAvailabilityCloseoutNextProcess;
  archiveState: 'retained-no-action-performed';
  selectedArchiveOption: 'none';
  availableArchiveOptions: readonly ReleaseSubmissionActionAvailabilityArchiveOption[];
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityArchiveOptionEntry {
  option: ReleaseSubmissionActionAvailabilityArchiveOption;
  label: string;
  guidance: string;
  invokesAction: false;
  authorizesAction: false;
  deletesRecord: false;
  grantsApproval: false;
}

export interface ReleaseSubmissionActionAvailabilityArchiveCopy {
  title: string;
  subtitle: string;
  closeoutReminder: string;
  preservationReminder: string;
  routingReminder: string;
  actionBoundary: string;
  deletionBoundary: string;
  nonApprovalBoundary: string;
  options: Readonly<
    Record<
      ReleaseSubmissionActionAvailabilityArchiveOption,
      ReleaseSubmissionActionAvailabilityArchiveOptionEntry
    >
  >;
  allowedArchiveFields: readonly string[];
  prohibitedArchiveContent: readonly string[];
}

export const RELEASE_SUBMISSION_ACTION_AVAILABILITY_ARCHIVE_OPTIONS = {
  'retain-record': {
    option: 'retain-record',
    label: 'Retain record',
    guidance:
      'Keep the privacy-safe closeout record unchanged with no action selected or performed.',
    invokesAction: false,
    authorizesAction: false,
    deletesRecord: false,
    grantsApproval: false,
  },
  'return-to-owner-review': {
    option: 'return-to-owner-review',
    label: 'Return to owner review',
    guidance:
      'Display this option only when the preserved H-201 next process is owner-review; it returns context without starting another action.',
    invokesAction: false,
    authorizesAction: false,
    deletesRecord: false,
    grantsApproval: false,
  },
} as const satisfies Readonly<
  Record<
    ReleaseSubmissionActionAvailabilityArchiveOption,
    ReleaseSubmissionActionAvailabilityArchiveOptionEntry
  >
>;

export const releaseSubmissionActionAvailabilityArchiveCopy: ReleaseSubmissionActionAvailabilityArchiveCopy = {
  title: 'Submission-action availability archive',
  subtitle:
    'Present a privacy-safe retained view of a valid H-201 closeout without changing its state or starting an action.',
  closeoutReminder:
    'Use only a valid H-201 closeout. Preserve its candidate, response state, next process, and non-action states exactly.',
  preservationReminder:
    'Retain record is always available and leaves the closeout unchanged. No archive option is selected automatically.',
  routingReminder:
    'Return to owner review is available only when the existing closeout next process is owner-review. It does not create or infer a new route.',
  actionBoundary:
    'The archive display cannot invoke, simulate, authorize, upload, or submit anything. Upload and submission remain not performed.',
  deletionBoundary:
    'This archive model contains no delete, purge, remove, overwrite, or retention-expiry action.',
  nonApprovalBoundary:
    'No archive state or option infers acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  options: RELEASE_SUBMISSION_ACTION_AVAILABILITY_ARCHIVE_OPTIONS,
  allowedArchiveFields: [
    'Existing valid H-201 closeout record',
    'Exact matching candidate build identity',
    'Exact preserved response and next-process states',
    'Retained-no-action-performed marker',
    'No-selected-option marker',
    'Retain-record option and conditionally available return-to-owner-review option',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedArchiveContent: [
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

const RETAIN_ONLY_OPTIONS = [
  'retain-record',
] as const satisfies readonly ReleaseSubmissionActionAvailabilityArchiveOption[];

const OWNER_REVIEW_OPTIONS = [
  'retain-record',
  'return-to-owner-review',
] as const satisfies readonly ReleaseSubmissionActionAvailabilityArchiveOption[];

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

export function getReleaseSubmissionActionAvailabilityArchiveCopy(): ReleaseSubmissionActionAvailabilityArchiveCopy {
  return releaseSubmissionActionAvailabilityArchiveCopy;
}

export function isReleaseSubmissionActionAvailabilityArchiveDisplayValid(
  display: ReleaseSubmissionActionAvailabilityArchiveDisplay,
): boolean {
  if (
    !isReleaseSubmissionActionAvailabilityCloseoutRecordValid(
      display.closeoutRecord,
    ) ||
    !isSameCandidateIdentity(
      display.selectedCandidateIdentity,
      display.closeoutRecord.selectedCandidateIdentity,
    ) ||
    display.archivedResponseState !== display.closeoutRecord.responseState ||
    display.archivedNextProcess !== display.closeoutRecord.nextProcess ||
    display.archiveState !== 'retained-no-action-performed' ||
    display.selectedArchiveOption !== 'none' ||
    display.uploadState !== 'not-performed' ||
    display.submissionState !== 'not-performed' ||
    display.appStoreAcceptanceState !== 'not-inferred' ||
    display.providerApprovalState !== 'not-inferred' ||
    display.signingApprovalState !== 'not-inferred' ||
    display.productionApprovalState !== 'not-inferred'
  ) {
    return false;
  }

  const expectedOptions =
    display.archivedNextProcess === 'owner-review'
      ? OWNER_REVIEW_OPTIONS
      : RETAIN_ONLY_OPTIONS;

  return hasExactOptions(display.availableArchiveOptions, expectedOptions);
}
