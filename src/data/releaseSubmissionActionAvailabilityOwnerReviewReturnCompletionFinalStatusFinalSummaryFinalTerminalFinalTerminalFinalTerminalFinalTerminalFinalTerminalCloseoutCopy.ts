import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalReceiptValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalReceipt,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalReceiptCopy';

type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalPreservedReceiptState = Omit<
  ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalReceipt,
  | 'immutableTerminal'
  | 'presentationState'
  | 'presentedTimestamp'
  | 'availableActions'
  | 'availableControls'
>;

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseout
  extends ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalPreservedReceiptState {
  terminalReceipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalReceipt;
  preservedLockedImmutableSealedTerminalPresentationState: 'locked-immutable-sealed-terminal-presented';
  closeoutState: 'locked-immutable-sealed-terminal-presentation-closed';
  availableActions: readonly [];
  availableControls: readonly [];
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutCopy {
  title: string;
  closedLabel: string;
  closedDescription: string;
  receiptReminder: string;
  preservationReminder: string;
  immutableBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  nonApprovalBoundary: string;
  allowedCloseoutFields: readonly string[];
  prohibitedCloseoutContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutCopy = {
  title: 'Locked immutable sealed terminal presentation closeout',
  closedLabel: 'Closed with no continuation',
  closedDescription:
    'The valid H-289 presentation is closed without exposing a control, action, decision, next process, or continuation.',
  receiptReminder:
    'Use only a valid H-289 receipt. This closeout cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every typed state carried by the receipt, including the full terminal chain and all non-action states.',
  immutableBoundary:
    'The closeout is a read-only representation of the validated receipt and cannot change a preserved value.',
  terminalBoundary:
    'Next process and continuation remain none. Available actions and controls remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The closeout displays and collects no choice.',
  actionBoundary:
    'Upload and submission remain not performed. The closeout cannot invoke, simulate, authorize, upload, submit, or expose a store action.',
  nonApprovalBoundary:
    'Closeout infers no acceptance, release, launch, App Store, provider, signing, or Production approval.',
  allowedCloseoutFields: [
    'Existing valid H-289 presentation receipt',
    'Exact matching candidate identity and full typed terminal chain',
    'Locked-immutable-sealed-terminal presentation and closeout markers',
    'No next process or continuation',
    'Empty action and control lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedCloseoutContent: [
    'Credentials, tokens, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Decision prompts, recommendations, selections, controls, simulations, authorization claims, uploads, submissions, implied actions, next-process links, or continuation controls',
    'Acceptance, release, launch, App Store, provider, signing, or Production approval claims',
  ],
};

const RECEIPT_ONLY_FIELDS = new Set([
  'immutableTerminal',
  'presentationState',
  'presentedTimestamp',
  'availableActions',
  'availableControls',
]);

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

function hasExactPreservedReceiptState(
  closeout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseout,
): boolean {
  const receiptFields = closeout.terminalReceipt as unknown as Record<
    string,
    unknown
  >;
  const closeoutFields = closeout as unknown as Record<string, unknown>;

  return Object.keys(receiptFields).every(
    (field) =>
      RECEIPT_ONLY_FIELDS.has(field) ||
      closeoutFields[field] === receiptFields[field],
  );
}

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutValid(
  closeout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseout,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalReceiptValid(
      closeout.terminalReceipt,
    ) &&
    isSameCandidateIdentity(
      closeout.selectedCandidateIdentity,
      closeout.terminalReceipt.selectedCandidateIdentity,
    ) &&
    hasExactPreservedReceiptState(closeout) &&
    closeout.preservedLockedImmutableSealedTerminalPresentationState ===
      closeout.terminalReceipt.presentationState &&
    closeout.nextProcess === 'none' &&
    closeout.continuationState === 'none' &&
    closeout.closeoutState ===
      'locked-immutable-sealed-terminal-presentation-closed' &&
    closeout.terminalReceipt.availableActions.length === 0 &&
    closeout.terminalReceipt.availableControls.length === 0 &&
    closeout.availableActions.length === 0 &&
    closeout.availableControls.length === 0 &&
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
