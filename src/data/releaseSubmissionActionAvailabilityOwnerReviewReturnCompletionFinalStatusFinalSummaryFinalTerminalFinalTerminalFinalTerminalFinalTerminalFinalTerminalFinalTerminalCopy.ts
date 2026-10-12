import type { ReleaseCandidateBuildIdentityRecord } from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutValid,
  type ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseout,
} from './releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutCopy';

type PreservedCloseoutState = Omit<
  ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseout,
  'finalReceipt' | 'closeoutState' | 'availableActions' | 'availableControls'
>;

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminal
  extends PreservedCloseoutState {
  finalCloseout: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseout;
  preservedImmutableLockedSealedTerminalFinalCloseoutState: 'immutable-locked-sealed-terminal-final-presentation-closed';
  terminalState: 'sealed-locked-immutable-final-terminal';
  availableActions: readonly [];
  availableControls: readonly [];
}

export interface ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCopy {
  title: string;
  terminalDescription: string;
  closeoutReminder: string;
  preservationReminder: string;
  terminalBoundary: string;
  actionBoundary: string;
  nonApprovalBoundary: string;
  allowedTerminalFields: readonly string[];
  prohibitedTerminalContent: readonly string[];
}

export const releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCopy: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCopy = {
  title: 'Sealed locked immutable final terminal',
  terminalDescription:
    'The valid H-297 closeout is preserved as static terminal copy without exposing a control, action, decision, next process, or continuation.',
  closeoutReminder:
    'Use only a valid H-297 closeout. This terminal record cannot extend, reopen, replace, or reinterpret the completed flow.',
  preservationReminder:
    'Preserve the exact candidate identity and every typed closeout state, including the full terminal chain and all non-action states.',
  terminalBoundary:
    'Expose static terminal copy only. Next process and continuation remain none, and action and control lists remain empty.',
  actionBoundary:
    'Decisions and store actions remain not presented; upload and submission remain not performed.',
  nonApprovalBoundary:
    'Terminal state infers no acceptance, release, launch, App Store, provider, signing, or Production approval.',
  allowedTerminalFields: [
    'Existing valid H-297 closeout',
    'Exact matching candidate identity and full typed terminal chain',
    'Immutable-final closeout and sealed terminal markers',
    'No next process or continuation and empty action/control lists',
    'Not-presented, not-performed, and not-inferred terminal states',
  ],
  prohibitedTerminalContent: [
    'Credentials, tokens, signing material, private configuration, or account, team, store, provider, subscription, billing, payment, receipt, transaction, or device details',
    'Public or private Preview, repository, build, install, invitation, portal, issue, support, policy, or access links',
    'Logs, traces, diagnostics, payloads, screenshots, recordings, media, attachments, dream or journal content, birth data, audio, transcripts, generated media, or other private user content',
    'Decisions, controls, simulations, authorizations, uploads, submissions, next-process links, continuation controls, or approval claims',
  ],
};

const CLOSEOUT_ONLY_FIELDS = new Set([
  'finalReceipt',
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
  terminal: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminal,
): boolean {
  const closeoutFields = terminal.finalCloseout as unknown as Record<
    string,
    unknown
  >;
  const terminalFields = terminal as unknown as Record<string, unknown>;

  return Object.keys(closeoutFields).every(
    (field) =>
      CLOSEOUT_ONLY_FIELDS.has(field) ||
      terminalFields[field] === closeoutFields[field],
  );
}

export function getReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCopy(): ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCopy {
  return releaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalCopy;
}

export function isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalValid(
  terminal: ReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminal,
): boolean {
  return (
    isReleaseSubmissionActionAvailabilityOwnerReviewReturnCompletionFinalStatusFinalSummaryFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalTerminalFinalCloseoutValid(
      terminal.finalCloseout,
    ) &&
    isSameCandidateIdentity(
      terminal.selectedCandidateIdentity,
      terminal.finalCloseout.selectedCandidateIdentity,
    ) &&
    hasExactPreservedCloseoutState(terminal) &&
    terminal.preservedImmutableLockedSealedTerminalFinalCloseoutState ===
      terminal.finalCloseout.closeoutState &&
    terminal.nextProcess === 'none' &&
    terminal.continuationState === 'none' &&
    terminal.terminalState === 'sealed-locked-immutable-final-terminal' &&
    terminal.finalCloseout.availableActions.length === 0 &&
    terminal.finalCloseout.availableControls.length === 0 &&
    terminal.availableActions.length === 0 &&
    terminal.availableControls.length === 0 &&
    terminal.decisionState === 'not-presented' &&
    terminal.storeActionState === 'not-presented' &&
    terminal.uploadState === 'not-performed' &&
    terminal.submissionState === 'not-performed' &&
    terminal.appStoreAcceptanceState === 'not-inferred' &&
    terminal.providerApprovalState === 'not-inferred' &&
    terminal.signingApprovalState === 'not-inferred' &&
    terminal.productionApprovalState === 'not-inferred'
  );
}
