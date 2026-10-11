import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityDisplayModelValid,
  type ReleaseSubmissionActionAvailabilityDisplayModel,
} from './releaseSubmissionActionAvailabilityCopy';

export type ReleaseSubmissionActionAvailabilityOwnerResponse =
  | 'no-owner-response'
  | 'return-to-owner'
  | 'cancel';

export type ReleaseSubmissionActionAvailabilityResponseMethod =
  | 'none'
  | 'explicit-owner-selection';

export interface ReleaseSubmissionActionAvailabilityReceipt {
  availabilityDisplay: ReleaseSubmissionActionAvailabilityDisplayModel;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  presentationState: 'availability-presented';
  presentedTimestamp: string;
  ownerResponse: ReleaseSubmissionActionAvailabilityOwnerResponse;
  responseMethod: ReleaseSubmissionActionAvailabilityResponseMethod;
  uploadState: 'not-performed';
  submissionState: 'not-performed';
  appStoreAcceptanceState: 'not-inferred';
  providerApprovalState: 'not-inferred';
  signingApprovalState: 'not-inferred';
  productionApprovalState: 'not-inferred';
}

export interface ReleaseSubmissionActionAvailabilityReceiptCopy {
  title: string;
  subtitle: string;
  presentationReminder: string;
  responseReminder: string;
  candidateReminder: string;
  actionBoundary: string;
  nonApprovalBoundary: string;
  allowedOwnerResponses: readonly ReleaseSubmissionActionAvailabilityOwnerResponse[];
  allowedReceiptFields: readonly string[];
  prohibitedReceiptContent: readonly string[];
}

export const RELEASE_SUBMISSION_ACTION_AVAILABILITY_OWNER_RESPONSES = [
  'no-owner-response',
  'return-to-owner',
  'cancel',
] as const satisfies readonly ReleaseSubmissionActionAvailabilityOwnerResponse[];

export const releaseSubmissionActionAvailabilityReceiptCopy: ReleaseSubmissionActionAvailabilityReceiptCopy = {
  title: 'Submission-action availability presentation receipt',
  subtitle:
    'A privacy-safe display record showing that valid availability information was presented without starting any action.',
  presentationReminder:
    'Record only that the valid H-199 availability view was presented and when it was presented.',
  responseReminder:
    'Record no owner response unless the owner explicitly selects return to owner or cancel. Never infer a response from dismissal, timeout, navigation, or inactivity.',
  candidateReminder:
    'The receipt candidate must exactly match the configured and installed candidate identity in the validated availability display.',
  actionBoundary:
    'This receipt does not invoke, simulate, authorize, upload, or submit anything. Upload and submission remain not performed for every response.',
  nonApprovalBoundary:
    'Presentation or response infers no acceptance, release, launch, App Store approval, provider approval, signing approval, or Production approval.',
  allowedOwnerResponses:
    RELEASE_SUBMISSION_ACTION_AVAILABILITY_OWNER_RESPONSES,
  allowedReceiptFields: [
    'Existing valid H-199 availability display',
    'Exact matching candidate build identity',
    'Availability-presented marker and presentation timestamp',
    'No owner response or explicit return-to-owner or cancel response',
    'None or explicit-owner-selection response method',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedReceiptContent: [
    'Credentials, tokens, secrets, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, transaction, or device details',
    'Purchase receipts, billing receipts, transaction receipts, or other account and store artifacts',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, console output, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Upload or submission controls, simulations, execution status, authorization claims, or implied actions',
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

function isOwnerResponseMethodValid(
  ownerResponse: ReleaseSubmissionActionAvailabilityOwnerResponse,
  responseMethod: ReleaseSubmissionActionAvailabilityResponseMethod,
): boolean {
  return ownerResponse === 'no-owner-response'
    ? responseMethod === 'none'
    : responseMethod === 'explicit-owner-selection';
}

export function getReleaseSubmissionActionAvailabilityReceiptCopy(): ReleaseSubmissionActionAvailabilityReceiptCopy {
  return releaseSubmissionActionAvailabilityReceiptCopy;
}

export function isReleaseSubmissionActionAvailabilityReceiptValid(
  receipt: ReleaseSubmissionActionAvailabilityReceipt,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityDisplayModelValid(
      receipt.availabilityDisplay,
    ) &&
    isSameCandidateIdentity(
      receipt.selectedCandidateIdentity,
      receipt.availabilityDisplay.selectedCandidateIdentity,
    ) &&
    receipt.presentationState === 'availability-presented' &&
    receipt.presentedTimestamp.trim().length > 0 &&
    RELEASE_SUBMISSION_ACTION_AVAILABILITY_OWNER_RESPONSES.includes(
      receipt.ownerResponse,
    ) &&
    isOwnerResponseMethodValid(receipt.ownerResponse, receipt.responseMethod) &&
    receipt.uploadState === 'not-performed' &&
    receipt.submissionState === 'not-performed' &&
    receipt.appStoreAcceptanceState === 'not-inferred' &&
    receipt.providerApprovalState === 'not-inferred' &&
    receipt.signingApprovalState === 'not-inferred' &&
    receipt.productionApprovalState === 'not-inferred'
  );
}
