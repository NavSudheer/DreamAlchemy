import {
  isReleaseOwnerTestCloseoutRecordValid,
  type ReleaseOwnerTestCloseoutRecord,
} from './releaseOwnerTestCloseoutCopy';

export type ReleaseOwnerReviewDecision =
  | 'more-testing-required'
  | 'fixes-required'
  | 'external-blocker-remains'
  | 'ready-for-separate-submission-review'
  | 'declined';

export type ReleaseOwnerReviewDecisionCategory =
  | 'testing-continuation'
  | 'defect-remediation'
  | 'dependency-blocker'
  | 'submission-readiness'
  | 'rejection';

export interface ReleaseOwnerReviewDecisionEntry {
  decision: ReleaseOwnerReviewDecision;
  category: ReleaseOwnerReviewDecisionCategory;
  title: string;
  shortLabel: string;
  prompt: string;
  description: string;
  selectionCriteria: readonly string[];
  ownerNextActions: readonly string[];
  prerequisiteCondition: string;
  isAutoSelected: false;
  grantsReleaseApproval: false;
  grantsSubmissionApproval: false;
  grantsProviderApproval: false;
  grantsAppStoreApproval: false;
  grantsProductionApproval: false;
  accessibilityLabel: string;
}

export interface ReleaseOwnerReviewDecisionRecord {
  decision: ReleaseOwnerReviewDecision;
  decidedBy: 'owner';
  selectionMethod: 'explicit-owner-selection';
  recordedTimestamp: string;
  sanitizedRationale?: string;
  closeoutRecord: ReleaseOwnerTestCloseoutRecord;
  approvalState: 'not-inferred';
}

export interface ReleaseOwnerReviewDecisionCopy {
  title: string;
  subtitle: string;
  closeoutPrerequisiteReminder: string;
  manualSelectionReminder: string;
  nonApprovalReminder: string;
  rationaleCharacterLimit: number;
  orderedDecisions: readonly ReleaseOwnerReviewDecision[];
  decisions: Readonly<
    Record<ReleaseOwnerReviewDecision, ReleaseOwnerReviewDecisionEntry>
  >;
  guidanceSteps: readonly string[];
  prohibitedDecisionContent: readonly string[];
}

export const RELEASE_OWNER_REVIEW_DECISION_ORDER = [
  'more-testing-required',
  'fixes-required',
  'external-blocker-remains',
  'ready-for-separate-submission-review',
  'declined',
] as const satisfies readonly ReleaseOwnerReviewDecision[];

export const RELEASE_OWNER_REVIEW_DECISIONS = {
  'more-testing-required': {
    decision: 'more-testing-required',
    category: 'testing-continuation',
    title: 'More testing required',
    shortLabel: 'Continue testing',
    prompt:
      'Are further owner-device test sessions required before an evaluation can be made?',
    description:
      'Assigned checklist items remain not run, or additional device and hardware surfaces require testing before an evaluation can proceed.',
    selectionCriteria: [
      'One or more assigned test identifiers or hands-on areas have outcome not-run.',
      'The test session was interrupted, paused, or concluded before completing scope.',
      'Additional physical device surfaces (such as iPad or alternate iOS versions) require hands-on evaluation.',
    ],
    ownerNextActions: [
      'Schedule follow-up owner test sessions to execute remaining not-run checks.',
      'Retain current reconciled closeout accounting as an interim session snapshot.',
    ],
    prerequisiteCondition:
      'Appropriate when outcomeCounts.notRun > 0 or session status is incomplete.',
    isAutoSelected: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'More testing required: assigned checks remain not run; testing must continue.',
  },
  'fixes-required': {
    decision: 'fixes-required',
    category: 'defect-remediation',
    title: 'Fixes required',
    shortLabel: 'Product fixes needed',
    prompt:
      'Does the candidate contain reproducible product defects that must be resolved?',
    description:
      'One or more reproducible product defects were observed and verified during hands-on owner testing.',
    selectionCriteria: [
      'One or more assigned test identifiers resulted in fail with classification reproducible-product-defect.',
      'Observable application behavior repeatedly differed from documented expectations on supported hardware.',
    ],
    ownerNextActions: [
      'Log defect reports referencing exact existing test identifiers and sanitized observations.',
      'Wait for engineering remediation and a newly confirmed candidate build before retesting.',
    ],
    prerequisiteCondition:
      'Appropriate when outcomeCounts.fail > 0 or reproducible product defects are identified.',
    isAutoSelected: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'Fixes required: reproducible product defects were observed and must be fixed.',
  },
  'external-blocker-remains': {
    decision: 'external-blocker-remains',
    category: 'dependency-blocker',
    title: 'External blocker remains',
    shortLabel: 'External blockers',
    prompt:
      'Do unresolved device, environment, or optional-provider blockers prevent completing testing?',
    description:
      'Testing could not proceed due to external prerequisites such as StoreKit sandbox issues, network restrictions, or unconfigured optional providers.',
    selectionCriteria: [
      'One or more assigned checks are blocked by device capability, permissions, sandbox, or network connectivity.',
      'Optional Astrology or Dream Image features are blocked by unconfigured external dependencies.',
    ],
    ownerNextActions: [
      'Restore local device, network, or Apple sandbox environment prerequisites if possible.',
      'Keep optional provider dependencies blocked in accordance with current release scope.',
      'Resume the session once external conditions are restored.',
    ],
    prerequisiteCondition:
      'Appropriate when outcomeCounts.blocked > 0 or session paused by blockers.',
    isAutoSelected: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'External blocker remains: external dependencies or environment limits block completion.',
  },
  'ready-for-separate-submission-review': {
    decision: 'ready-for-separate-submission-review',
    category: 'submission-readiness',
    title: 'Ready for separate submission review',
    shortLabel: 'Ready for submission review',
    prompt:
      'Is the candidate testing evidence reconciled, complete, and packaged for separate owner submission review?',
    description:
      'All assigned owner checks were executed without open reproducible product defects, and accounting is balanced. This indicates testing closeout is complete and packaged for the separate owner decision process.',
    selectionCriteria: [
      'Zero reproducible product defects remain (outcomeCounts.fail === 0).',
      "All assigned checklist items were executed (outcomeCounts['not-run'] === 0).",
      'Closeout accounting is fully balanced against a valid candidate build identity.',
      'Optional-feature and privacy boundaries remain intact and verified.',
    ],
    ownerNextActions: [
      'Deliver the reconciled closeout record to the separate owner release and submission workflow.',
      'Perform independent business, legal, and App Store submission evaluations outside this testing harness.',
    ],
    prerequisiteCondition:
      "Requires outcomeCounts.fail === 0, outcomeCounts['not-run'] === 0, and a fully balanced closeout record.",
    isAutoSelected: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'Ready for separate submission review: testing is complete; packaging for separate owner review.',
  },
  'declined': {
    decision: 'declined',
    category: 'rejection',
    title: 'Candidate declined',
    shortLabel: 'Declined',
    prompt:
      'Does the owner decline this candidate build for release consideration?',
    description:
      'The candidate build is rejected by the owner based on qualitative findings, strategic timing, scope realignment, or unsuitability.',
    selectionCriteria: [
      'Owner decides this candidate build will not proceed toward submission regardless of test counts.',
      'The build is superseded by newer release priorities or architectural changes.',
    ],
    ownerNextActions: [
      'Archive session evidence as a declined candidate snapshot.',
      'Identify required changes or updated release objectives for subsequent candidate cycles.',
    ],
    prerequisiteCondition:
      'Available at any time as an explicit owner prerogative.',
    isAutoSelected: false,
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    accessibilityLabel:
      'Candidate declined: owner rejected the candidate build for submission consideration.',
  },
} as const satisfies Readonly<
  Record<ReleaseOwnerReviewDecision, ReleaseOwnerReviewDecisionEntry>
>;

export const releaseOwnerReviewDecisionCopy: ReleaseOwnerReviewDecisionCopy = {
  title: 'Owner review decision prompts',
  subtitle:
    'Explicit, privacy-safe owner decision prompts following reconciled test-session closeout.',
  closeoutPrerequisiteReminder:
    'An owner decision requires a valid, balanced closeout record with matching candidate identity. Decisions cannot be made against incomplete or unverified closeouts.',
  manualSelectionReminder:
    'The owner review decision must be selected explicitly by the human owner. Automated systems, testing scripts, and closeout summaries must never auto-select a decision.',
  nonApprovalReminder:
    'Selecting ready-for-separate-submission-review indicates testing evidence is packaged for review; it does not approve, authorize, or trigger App Store submission, release, signing, or Production deployment.',
  rationaleCharacterLimit: 280,
  orderedDecisions: RELEASE_OWNER_REVIEW_DECISION_ORDER,
  decisions: RELEASE_OWNER_REVIEW_DECISIONS,
  guidanceSteps: [
    'Confirm the closeout record is structurally valid, balanced, and verified against candidate build identity.',
    'Review all classified findings, remaining blockers, and outcome counts.',
    'Select the single applicable decision prompt matching the verified session state.',
    'Provide an optional sanitized rationale (up to 280 characters) free of personal or diagnostic artifacts.',
    'Route the resulting decision record to the separate owner release management process.',
  ],
  prohibitedDecisionContent: [
    'Dream content, journal narratives, analyses, tags, or personal reflections',
    'Real birth dates, times, locations, coordinates, or profile identities',
    'Audio recordings, spoken phrases, voice transcripts, or media links',
    'Credentials, secret keys, tokens, headers, cookies, or account credentials',
    'StoreKit transaction receipts, billing tokens, or payment details',
    'Device UDIDs, serial numbers, IP addresses, or diagnostic logs',
    'Automated approval declarations or assertions that testing constitutes release authorization',
  ],
};

export function getReleaseOwnerReviewDecisionCopy(): ReleaseOwnerReviewDecisionCopy {
  return releaseOwnerReviewDecisionCopy;
}

export function getReleaseOwnerReviewDecisionEntry(
  decision: ReleaseOwnerReviewDecision,
): ReleaseOwnerReviewDecisionEntry {
  return releaseOwnerReviewDecisionCopy.decisions[decision];
}

export function isReleaseOwnerDecisionReadyForSubmissionReviewAllowed(
  closeout: ReleaseOwnerTestCloseoutRecord,
): boolean {
  if (!isReleaseOwnerTestCloseoutRecordValid(closeout)) {
    return false;
  }

  const hasNoProductDefects =
    closeout.outcomeCounts.fail === 0 &&
    closeout.identifiers.reproducibleDefects.length === 0;

  const hasNoPendingWork =
    closeout.outcomeCounts['not-run'] === 0 &&
    closeout.identifiers.notRun.length === 0;

  return hasNoProductDefects && hasNoPendingWork;
}

export function isReleaseOwnerReviewDecisionConsistent(
  decision: ReleaseOwnerReviewDecision,
  closeout: ReleaseOwnerTestCloseoutRecord,
): boolean {
  if (!isReleaseOwnerTestCloseoutRecordValid(closeout)) {
    return false;
  }

  switch (decision) {
    case 'ready-for-separate-submission-review':
      return isReleaseOwnerDecisionReadyForSubmissionReviewAllowed(closeout);

    case 'fixes-required':
      return (
        closeout.outcomeCounts.fail > 0 ||
        closeout.identifiers.reproducibleDefects.length > 0
      );

    case 'external-blocker-remains':
      return (
        closeout.outcomeCounts.blocked > 0 ||
        closeout.identifiers.deviceEnvironmentBlockers.length > 0 ||
        closeout.identifiers.optionalProviderBlockers.length > 0
      );

    case 'more-testing-required':
      return (
        closeout.outcomeCounts['not-run'] > 0 ||
        closeout.identifiers.notRun.length > 0 ||
        closeout.sessionStatus !== 'completed-pending-owner-review'
      );

    case 'declined':
      return true;

    default:
      return false;
  }
}

export function isReleaseOwnerReviewDecisionRecordValid(
  record: ReleaseOwnerReviewDecisionRecord,
): boolean {
  if (
    record.decidedBy !== 'owner' ||
    record.selectionMethod !== 'explicit-owner-selection' ||
    record.approvalState !== 'not-inferred' ||
    !record.recordedTimestamp ||
    !record.recordedTimestamp.trim()
  ) {
    return false;
  }

  if (
    record.sanitizedRationale !== undefined &&
    record.sanitizedRationale.length >
      releaseOwnerReviewDecisionCopy.rationaleCharacterLimit
  ) {
    return false;
  }

  return isReleaseOwnerReviewDecisionConsistent(
    record.decision,
    record.closeoutRecord,
  );
}
