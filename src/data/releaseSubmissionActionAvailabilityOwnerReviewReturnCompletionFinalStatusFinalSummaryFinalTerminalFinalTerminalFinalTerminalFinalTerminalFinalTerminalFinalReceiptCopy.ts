import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinal,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCopy';

type PreservedFinalState = Omit<
  ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinal,
  'terminalCloseout' | 'finalState' | 'availableActions' | 'availableControls'
>;

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceipt
  extends PreservedFinalState {
  immutableFinalRecord: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinal;
  preservedImmutableLockedSealedTerminalFinalState: 'immutable-locked-sealed-terminal-final';
  presentationState: 'immutable-locked-sealed-terminal-final-presented';
  presentedTimestamp: string;
  availableActions: readonly [];
  availableControls: readonly [];
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptCopy {
  title: string;
  presentedDescription: string;
  finalReminder: string;
  timestampReminder: string;
  terminalBoundary: string;
  actionBoundary: string;
  nonApprovalBoundary: string;
  allowedReceiptFields: readonly string[];
  prohibitedReceiptContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptCopy = {
  title: 'Immutable locked sealed terminal final presentation receipt',
  presentedDescription:
    'The valid H-293 immutable final was presented without exposing a control, action, decision, next process, or continuation.',
  finalReminder:
    'Use only a valid H-293 immutable final record and preserve its exact candidate and full typed terminal chain.',
  timestampReminder:
    'Record only a non-empty presentation timestamp. Add no interaction, account, store, device, private-content, or diagnostic detail.',
  terminalBoundary:
    'Expose no controls or continuation. Next process and continuation remain none, and action and control lists remain empty.',
  actionBoundary:
    'Decisions and store actions remain not presented; upload and submission remain not performed.',
  nonApprovalBoundary:
    'Presentation infers no acceptance, release, launch, App Store, provider, signing, or Production approval.',
  allowedReceiptFields: [
    'Existing valid H-293 immutable final record',
    'Exact matching candidate identity and full typed terminal chain',
    'Immutable-final presentation marker and non-empty timestamp',
    'No next process or continuation and empty action/control lists',
    'Not-presented, not-performed, and not-inferred terminal states',
  ],
  prohibitedReceiptContent: [
    'Credentials, tokens, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, traces, diagnostics, payloads, screenshots, recordings, media, attachments, dream or journal content, birth data, audio, transcripts, generated media, or other private user content',
    'Decisions, controls, simulations, authorizations, uploads, submissions, next-process links, continuation controls, or approval claims',
  ],
};

const FINAL_ONLY_FIELDS = new Set([
  'terminalCloseout',
  'finalState',
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

function hasExactPreservedFinalState(
  receipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceipt,
): boolean {
  const finalFields = receipt.immutableFinalRecord as unknown as Record<
    string,
    unknown
  >;
  const receiptFields = receipt as unknown as Record<string, unknown>;

  return Object.keys(finalFields).every(
    (field) =>
      FINAL_ONLY_FIELDS.has(field) || receiptFields[field] === finalFields[field],
  );
}

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceiptValid(
  receipt: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalReceipt,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalValid(
      receipt.immutableFinalRecord,
    ) &&
    isSameCandidateIdentity(
      receipt.selectedCandidateIdentity,
      receipt.immutableFinalRecord.selectedCandidateIdentity,
    ) &&
    hasExactPreservedFinalState(receipt) &&
    receipt.preservedImmutableLockedSealedTerminalFinalState ===
      receipt.immutableFinalRecord.finalState &&
    receipt.nextProcess === 'none' &&
    receipt.continuationState === 'none' &&
    receipt.presentationState ===
      'immutable-locked-sealed-terminal-final-presented' &&
    receipt.presentedTimestamp.trim().length > 0 &&
    receipt.immutableFinalRecord.availableActions.length === 0 &&
    receipt.immutableFinalRecord.availableControls.length === 0 &&
    receipt.availableActions.length === 0 &&
    receipt.availableControls.length === 0 &&
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
