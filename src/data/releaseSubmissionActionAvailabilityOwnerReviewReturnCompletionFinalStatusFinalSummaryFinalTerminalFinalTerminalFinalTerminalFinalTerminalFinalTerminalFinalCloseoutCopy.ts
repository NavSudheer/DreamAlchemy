import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceipt,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptCopy';

type PreservedReceiptState = Omit<
  ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceipt,
  | 'immutableFinalRecord'
  | 'presentationState'
  | 'presentedTimestamp'
  | 'availableActions'
  | 'availableControls'
>;

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseout
  extends PreservedReceiptState {
  finalReceipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceipt;
  preservedImmutableLockedSealedTerminalFinalPresentationState: 'immutable-locked-sealed-terminal-final-presented';
  closeoutState: 'immutable-locked-sealed-terminal-final-presentation-closed';
  availableActions: readonly [];
  availableControls: readonly [];
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy {
  title: string;
  closedDescription: string;
  receiptReminder: string;
  preservationReminder: string;
  terminalBoundary: string;
  actionBoundary: string;
  nonApprovalBoundary: string;
  allowedCloseoutFields: readonly string[];
  prohibitedCloseoutContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy = {
  title: 'Immutable locked sealed terminal final presentation closeout',
  closedDescription:
    'The valid H-295 presentation is closed without exposing a control, action, decision, next process, or continuation.',
  receiptReminder:
    'Use only a valid H-295 presentation receipt. This closeout cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every typed receipt state, including the full terminal chain and all non-action states.',
  terminalBoundary:
    'Expose no controls or continuation. Next process and continuation remain none, and action and control lists remain empty.',
  actionBoundary:
    'Decisions and store actions remain not presented; upload and submission remain not performed.',
  nonApprovalBoundary:
    'Closeout infers no acceptance, release, launch, App Store, provider, signing, or Production approval.',
  allowedCloseoutFields: [
    'Existing valid H-295 presentation receipt',
    'Exact matching candidate identity and full typed terminal chain',
    'Immutable-final presentation and presentation-closeout markers',
    'No next process or continuation and empty action/control lists',
    'Not-presented, not-performed, and not-inferred terminal states',
  ],
  prohibitedCloseoutContent: [
    'Credentials, tokens, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, traces, diagnostics, payloads, screenshots, recordings, media, attachments, dream or journal content, birth data, audio, transcripts, generated media, or other private user content',
    'Decisions, controls, simulations, authorizations, uploads, submissions, next-process links, continuation controls, or approval claims',
  ],
};

const RECEIPT_ONLY_FIELDS = new Set([
  'immutableFinalRecord',
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
  closeout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseout,
): boolean {
  const receiptFields = closeout.finalReceipt as unknown as Record<
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

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutValid(
  closeout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseout,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptValid(
      closeout.finalReceipt,
    ) &&
    isSameCandidateIdentity(
      closeout.selectedCandidateIdentity,
      closeout.finalReceipt.selectedCandidateIdentity,
    ) &&
    hasExactPreservedReceiptState(closeout) &&
    closeout.preservedImmutableLockedSealedTerminalFinalPresentationState ===
      closeout.finalReceipt.presentationState &&
    closeout.nextProcess === 'none' &&
    closeout.continuationState === 'none' &&
    closeout.closeoutState ===
      'immutable-locked-sealed-terminal-final-presentation-closed' &&
    closeout.finalReceipt.availableActions.length === 0 &&
    closeout.finalReceipt.availableControls.length === 0 &&
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
