import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutCopy';

type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalPreservedCloseoutState = Omit<
  ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseout,
  'terminalReceipt' | 'closeoutState' | 'availableActions' | 'availableControls'
>;

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinal
  extends ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalPreservedCloseoutState {
  terminalCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseout;
  preservedLockedImmutableSealedTerminalCloseoutState: 'locked-immutable-sealed-terminal-presentation-closed';
  finalState: 'immutable-locked-sealed-terminal-final';
  availableActions: readonly [];
  availableControls: readonly [];
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCopy {
  title: string;
  finalLabel: string;
  finalDescription: string;
  closeoutReminder: string;
  preservationReminder: string;
  immutableBoundary: string;
  terminalBoundary: string;
  decisionBoundary: string;
  actionBoundary: string;
  nonApprovalBoundary: string;
  allowedFinalFields: readonly string[];
  prohibitedFinalContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCopy = {
  title: 'Immutable locked sealed terminal final',
  finalLabel: 'Final and immutable',
  finalDescription:
    'The valid H-291 terminal closeout is preserved as static final copy with no control, action, decision, next process, or continuation.',
  closeoutReminder:
    'Use only a valid H-291 closeout. This final record cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every typed closeout state, including the full terminal chain and all non-action states.',
  immutableBoundary:
    'The final copy is a read-only representation of the validated closeout and cannot change a preserved value.',
  terminalBoundary:
    'Expose static final copy only. Next process and continuation remain none, and available actions and controls remain empty.',
  decisionBoundary:
    'Decision and store-action states remain not presented. The final copy displays and collects no choice.',
  actionBoundary:
    'Upload and submission remain not performed. The final copy cannot invoke, simulate, authorize, upload, submit, or expose a store action.',
  nonApprovalBoundary:
    'Final state infers no acceptance, release, launch, App Store, provider, signing, or Production approval.',
  allowedFinalFields: [
    'Existing valid H-291 closeout',
    'Exact matching candidate identity and full typed terminal chain',
    'Locked-immutable-sealed-terminal closeout and immutable-final markers',
    'No next process or continuation',
    'Empty action and control lists',
    'Not-presented decision and store-action states',
    'Not-performed upload and submission states',
    'Not-inferred acceptance and approval states',
  ],
  prohibitedFinalContent: [
    'Credentials, tokens, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, traces, crash reports, diagnostics, payloads, screenshots, recordings, media, or attachments',
    'Dream or journal content, analyses, personal reflections, birth data, coordinates, audio, transcripts, generated media, or other private user content',
    'Decision prompts, recommendations, selections, controls, simulations, authorization claims, uploads, submissions, implied actions, next-process links, or continuation controls',
    'Acceptance, release, launch, App Store, provider, signing, or Production approval claims',
  ],
};

const CLOSEOUT_ONLY_FIELDS = new Set([
  'terminalReceipt',
  'closeoutState',
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

function hasExactPreservedCloseoutState(
  finalRecord: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinal,
): boolean {
  const closeoutFields = finalRecord.terminalCloseout as unknown as Record<
    string,
    unknown
  >;
  const finalFields = finalRecord as unknown as Record<string, unknown>;

  return Object.keys(closeoutFields).every(
    (field) =>
      CLOSEOUT_ONLY_FIELDS.has(field) ||
      finalFields[field] === closeoutFields[field],
  );
}

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalValid(
  finalRecord: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinal,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCloseoutValid(
      finalRecord.terminalCloseout,
    ) &&
    isSameCandidateIdentity(
      finalRecord.selectedCandidateIdentity,
      finalRecord.terminalCloseout.selectedCandidateIdentity,
    ) &&
    hasExactPreservedCloseoutState(finalRecord) &&
    finalRecord.preservedLockedImmutableSealedTerminalCloseoutState ===
      finalRecord.terminalCloseout.closeoutState &&
    finalRecord.nextProcess === 'none' &&
    finalRecord.continuationState === 'none' &&
    finalRecord.finalState === 'immutable-locked-sealed-terminal-final' &&
    finalRecord.terminalCloseout.availableActions.length === 0 &&
    finalRecord.terminalCloseout.availableControls.length === 0 &&
    finalRecord.availableActions.length === 0 &&
    finalRecord.availableControls.length === 0 &&
    finalRecord.decisionState === 'not-presented' &&
    finalRecord.storeActionState === 'not-presented' &&
    finalRecord.uploadState === 'not-performed' &&
    finalRecord.submissionState === 'not-performed' &&
    finalRecord.appStoreAcceptanceState === 'not-inferred' &&
    finalRecord.providerApprovalState === 'not-inferred' &&
    finalRecord.signingApprovalState === 'not-inferred' &&
    finalRecord.productionApprovalState === 'not-inferred'
  );
}
