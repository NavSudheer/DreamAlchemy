import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseOwnerSubmissionDecisionRecordValid,
  type ReleaseOwnerSubmissionDecisionRecord,
} from './releaseOwnerSubmissionDecisionCopy';

export type ReleaseSubmissionActionConfirmation =
  | 'cancel'
  | 'confirm-availability-only';

export interface ReleaseSubmissionActionConfirmationRecord {
  ownerSubmissionDecision: ReleaseOwnerSubmissionDecisionRecord;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  confirmation: ReleaseSubmissionActionConfirmation;
  confirmedBy: 'owner';
  confirmationMethod: 'second-explicit-owner-confirmation';
  recordedTimestamp: string;
  submissionActionState: 'not-performed';
  uploadState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionConfirmationEntry {
  confirmation: ReleaseSubmissionActionConfirmation;
  title: string;
  prompt: string;
  result: string;
  performsUpload: false;
  performsSubmission: false;
  grantsApproval: false;
}

export interface ReleaseSubmissionActionConfirmationCopy {
  title: string;
  subtitle: string;
  prerequisiteReminder: string;
  candidateReminder: string;
  secondConfirmationReminder: string;
  availabilityBoundary: string;
  actionBoundary: string;
  nonApprovalBoundary: string;
  orderedConfirmations: readonly ReleaseSubmissionActionConfirmation[];
  confirmations: Readonly<
    Record<
      ReleaseSubmissionActionConfirmation,
      ReleaseSubmissionActionConfirmationEntry
    >
  >;
  allowedRecordFields: readonly string[];
  prohibitedConfirmationContent: readonly string[];
}

export const RELEASE_SUBMISSION_ACTION_CONFIRMATION_ORDER = [
  'cancel',
  'confirm-availability-only',
] as const satisfies readonly ReleaseSubmissionActionConfirmation[];

export const RELEASE_SUBMISSION_ACTION_CONFIRMATIONS = {
  cancel: {
    confirmation: 'cancel',
    title: 'Cancel',
    prompt:
      'Should the separate submission action remain unavailable for this candidate?',
    result:
      'Stop at this checkpoint. Preserve the earlier owner decision and perform no upload or submission.',
    performsUpload: false,
    performsSubmission: false,
    grantsApproval: false,
  },
  'confirm-availability-only': {
    confirmation: 'confirm-availability-only',
    title: 'Confirm availability only',
    prompt:
      'Should a separate submission action be made available for this exact candidate?',
    result:
      'Record availability for a later, separately invoked action. Do not upload or submit anything from this confirmation.',
    performsUpload: false,
    performsSubmission: false,
    grantsApproval: false,
  },
} as const satisfies Readonly<
  Record<
    ReleaseSubmissionActionConfirmation,
    ReleaseSubmissionActionConfirmationEntry
  >
>;

export const releaseSubmissionActionConfirmationCopy: ReleaseSubmissionActionConfirmationCopy = {
  title: 'Confirm separate submission-action availability',
  subtitle:
    'A second explicit owner checkpoint after a valid authorization decision, without performing an upload or submission.',
  prerequisiteReminder:
    'Continue only from a valid explicit authorize-separate-submission-action owner decision.',
  candidateReminder:
    'The selected candidate identity must exactly match the candidate in the owner authorization decision. A different candidate requires its own testing and review sequence.',
  secondConfirmationReminder:
    'The owner must make this second selection directly. The earlier authorization, a default, or an automated process cannot supply confirmation.',
  availabilityBoundary:
    'Confirm-availability-only exposes a separately invoked action for the exact candidate; it does not invoke that action.',
  actionBoundary:
    'Cancel and confirm-availability-only both retain submission and upload state as not performed.',
  nonApprovalBoundary:
    'Neither confirmation claims legal correctness, App Store acceptance, release, launch, provider approval, signing approval, or Production approval.',
  orderedConfirmations: RELEASE_SUBMISSION_ACTION_CONFIRMATION_ORDER,
  confirmations: RELEASE_SUBMISSION_ACTION_CONFIRMATIONS,
  allowedRecordFields: [
    'Existing valid explicit owner authorization decision',
    'Matching candidate build identity',
    'One exact second owner confirmation marker',
    'Owner and second-explicit-confirmation markers',
    'Recorded timestamp',
    'Not-performed upload and submission markers',
    'Not-inferred acceptance and approval markers',
  ],
  prohibitedConfirmationContent: [
    'Credentials, passwords, tokens, headers, cookies, secret keys, or private configuration',
    'Signing certificates, provisioning profiles, entitlements, identities, signing keys, or notarization details',
    'Apple, developer, App Store Connect, provider, subscription, team, membership, account, billing, payment, receipt, transaction, or device details',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostic archives, request or response payloads, screenshots, recordings, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or descriptions of private user content',
    'Legal-correctness, App Store-acceptance, release, launch, upload, submission, provider, signing, or Production-approval claims',
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

export function getReleaseSubmissionActionConfirmationCopy(): ReleaseSubmissionActionConfirmationCopy {
  return releaseSubmissionActionConfirmationCopy;
}

export function isReleaseSubmissionActionConfirmationRecordValid(
  record: ReleaseSubmissionActionConfirmationRecord,
): boolean {
  return (
    isReleaseOwnerSubmissionDecisionRecordValid(
      record.ownerSubmissionDecision,
    ) &&
    record.ownerSubmissionDecision.decision ===
      'authorize-separate-submission-action' &&
    isSameCandidateIdentity(
      record.selectedCandidateIdentity,
      record.ownerSubmissionDecision.selectedCandidateIdentity,
    ) &&
    record.confirmedBy === 'owner' &&
    record.confirmationMethod === 'second-explicit-owner-confirmation' &&
    record.recordedTimestamp.trim().length > 0 &&
    record.submissionActionState === 'not-performed' &&
    record.uploadState === 'not-performed' &&
    record.appStoreAcceptanceState === 'not-inferred' &&
    record.providerApprovalState === 'not-inferred' &&
    record.signingApprovalState === 'not-inferred' &&
    record.productionApprovalState === 'not-inferred'
  );
}
