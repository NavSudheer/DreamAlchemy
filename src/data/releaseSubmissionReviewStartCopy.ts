import {
  isReleaseCandidateBuildIdentityRecordValid,
  type ReleaseCandidateBuildIdentityRecord,
} from './releaseCandidateBuildIdentityCopy';
import {
  isReleaseOwnerReviewDecisionRecordValid,
  type ReleaseOwnerReviewDecisionRecord,
} from './releaseOwnerReviewDecisionCopy';

export type ReleaseSubmissionReviewItemId =
  | 'current-store-requirements'
  | 'listing-claims'
  | 'privacy-disclosures'
  | 'submission-assets'
  | 'support-and-policy-links'
  | 'configured-offerings'
  | 'selected-build-identity';

export type ReleaseSubmissionReviewItemState =
  | 'pending'
  | 'reviewed'
  | 'blocked'
  | 'not-applicable';

export interface ReleaseSubmissionReviewItem {
  id: ReleaseSubmissionReviewItemId;
  title: string;
  purpose: string;
  checks: readonly string[];
  completionRule: string;
  initialState: 'pending';
  grantsReleaseApproval: false;
  grantsSubmissionApproval: false;
  grantsProviderApproval: false;
  grantsAppStoreApproval: false;
  grantsProductionApproval: false;
  boundary: string;
}

export interface ReleaseSubmissionReviewItemResult {
  itemId: ReleaseSubmissionReviewItemId;
  state: ReleaseSubmissionReviewItemState;
}

export interface ReleaseSubmissionReviewStartRecord {
  ownerDecision: ReleaseOwnerReviewDecisionRecord;
  selectedCandidateIdentity: ReleaseCandidateBuildIdentityRecord;
  items: readonly ReleaseSubmissionReviewItemResult[];
  reviewState: 'pending-checks';
  approvalState: 'not-granted-by-review-start';
}

export interface ReleaseSubmissionReviewStartCopy {
  title: string;
  subtitle: string;
  entryRequirement: string;
  candidateReminder: string;
  pendingReminder: string;
  evidenceReminder: string;
  approvalBoundary: string;
  orderedItems: readonly ReleaseSubmissionReviewItemId[];
  items: Readonly<
    Record<ReleaseSubmissionReviewItemId, ReleaseSubmissionReviewItem>
  >;
  allowedRecordFields: readonly string[];
  prohibitedReviewContent: readonly string[];
}

export const RELEASE_SUBMISSION_REVIEW_ITEM_ORDER = [
  'current-store-requirements',
  'listing-claims',
  'privacy-disclosures',
  'submission-assets',
  'support-and-policy-links',
  'configured-offerings',
  'selected-build-identity',
] as const satisfies readonly ReleaseSubmissionReviewItemId[];

export const RELEASE_SUBMISSION_REVIEW_ITEMS = {
  'current-store-requirements': {
    id: 'current-store-requirements',
    title: 'Current store requirements',
    purpose:
      'Review the requirements currently applicable to the intended App Store submission through the approved current-source process.',
    checks: [
      'Confirm the relevant current submission, review-information, metadata, privacy, age-rating, and platform requirements.',
      'Separate current verified requirements from historical planning notes or assumptions.',
      'Record only review state in this contract; keep source locations and account-specific details outside it.',
    ],
    completionRule:
      'Keep pending until the applicable current requirements have been reviewed for the selected candidate and intended submission path.',
    initialState: 'pending',
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Reviewing requirements does not assert compliance, acceptance, or App Store approval.',
  },
  'listing-claims': {
    id: 'listing-claims',
    title: 'Store listing and marketing claims',
    purpose:
      'Compare every proposed public claim with the delivered candidate scope and the separate claim-evidence checklist.',
    checks: [
      'Retain only implemented claims with all required candidate evidence.',
      'Remove private Preview, blocked, excluded, medical, predictive, provider, and guaranteed-outcome claims.',
      'Do not invent or repeat unverified prices, product identifiers, subscription terms, availability, or provider promises.',
    ],
    completionRule:
      'Keep pending until every proposed headline, feature bullet, description, caption, and comparison maps to an eligible evidence-backed candidate area.',
    initialState: 'pending',
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    boundary:
      'A reviewed claim is not a release or submission approval and does not authorize an excluded or blocked feature.',
  },
  'privacy-disclosures': {
    id: 'privacy-disclosures',
    title: 'Privacy disclosures',
    purpose:
      'Compare actual candidate data behavior with the separate privacy disclosure checklist and owner review outcomes.',
    checks: [
      'Confirm implemented and device-pending data paths have their required evidence for the exact candidate.',
      'Preserve private Preview, blocked, and excluded states instead of describing them as active public behavior.',
      'Route the evidence through separate policy and legal review without asserting compliance or disclosure correctness here.',
    ],
    completionRule:
      'Keep pending until every disclosure area has a valid privacy-safe review outcome and unresolved evidence is accounted for.',
    initialState: 'pending',
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Privacy review status does not constitute legal advice, legal compliance, App Store correctness, or approval.',
  },
  'submission-assets': {
    id: 'submission-assets',
    title: 'Submission assets',
    purpose:
      'Confirm that the required asset set exists for the selected candidate and matches only delivered, eligible public scope.',
    checks: [
      'Review required device sizes, localization coverage, captions, ordering, and candidate consistency through the approved asset process.',
      'Remove depictions or captions for private Preview, blocked, excluded, or unverified behavior.',
      'Record only the item state in this contract; do not attach asset files or captures.',
    ],
    completionRule:
      'Keep pending until the approved asset process confirms completeness and scope alignment for the current requirements.',
    initialState: 'pending',
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    boundary:
      'This record never contains screenshots, recordings, media, attachments, device identifiers, or private content.',
  },
  'support-and-policy-links': {
    id: 'support-and-policy-links',
    title: 'Support and policy links',
    purpose:
      'Verify that the intended public support, privacy, and terms destinations are current, reachable, accurate, and aligned with the selected candidate.',
    checks: [
      'Review only public intended destinations through the approved link-check process.',
      'Confirm support and policy wording matches current candidate behavior and public contact process.',
      'Record only review state here; do not copy public or private URLs into this contract.',
    ],
    completionRule:
      'Keep pending until every required public destination has been reviewed for reachability, accuracy, and current scope.',
    initialState: 'pending',
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Do not include private Preview, repository, build, install, account, portal, issue, invitation, or access links.',
  },
  'configured-offerings': {
    id: 'configured-offerings',
    title: 'Configured subscription offerings',
    purpose:
      'Verify the actual sandbox or store configuration intended for the selected candidate through the approved account-secure process.',
    checks: [
      'Review configured offerings, entitlement mapping, trial behavior, restore behavior, and availability without copying account or store details here.',
      'Use current observed configuration rather than historical prices, product identifiers, or strategy documents.',
      'Keep unavailable sandbox or configuration checks blocked rather than inventing commercial details.',
    ],
    completionRule:
      'Keep pending until the approved secure review confirms the intended current configuration and all remaining blockers are accounted for.',
    initialState: 'pending',
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Do not record prices, product identifiers, receipts, transactions, account/team details, credentials, or private store configuration.',
  },
  'selected-build-identity': {
    id: 'selected-build-identity',
    title: 'Selected build identity',
    purpose:
      'Reconfirm that the selected candidate identity is the same validated build reviewed in the owner closeout and explicit decision.',
    checks: [
      'Validate configured public version, iOS build number, short commit, and branch values.',
      'Confirm installed public version and iOS build number matched the configured candidate at owner testing.',
      'Confirm the selected identity equals the closeout candidate identity without inferring upload, processing, signing, or store selection state.',
    ],
    completionRule:
      'Keep pending when identity is invalid, mismatched, or not the exact candidate associated with the explicit owner decision.',
    initialState: 'pending',
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsAppStoreApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Build identity confirms only which candidate entered review; it does not establish upload, signing, App Store, release, or approval state.',
  },
} as const satisfies Readonly<
  Record<ReleaseSubmissionReviewItemId, ReleaseSubmissionReviewItem>
>;

export const releaseSubmissionReviewStartCopy: ReleaseSubmissionReviewStartCopy = {
  title: 'Start separate submission review',
  subtitle:
    'Open a new pending review stage only after the owner explicitly selects ready for separate submission review.',
  entryRequirement:
    'A valid reconciled closeout and an explicit ready-for-separate-submission-review owner decision are required. No other outcome, count, or automation result can start this review.',
  candidateReminder:
    'Carry forward the same valid candidate identity from owner closeout. A changed candidate requires its own testing, closeout, and explicit decision.',
  pendingReminder:
    'Every submission-review item starts pending and remains pending or blocked until its separate current evidence is reviewed.',
  evidenceReminder:
    'This record stores only the validated owner decision, candidate identity, and item states. Supporting artifacts remain in their approved external processes.',
  approvalBoundary:
    'Starting or completing these checks never grants release, launch, submission, provider, App Store, signing, or Production approval.',
  orderedItems: RELEASE_SUBMISSION_REVIEW_ITEM_ORDER,
  items: RELEASE_SUBMISSION_REVIEW_ITEMS,
  allowedRecordFields: [
    'Validated explicit owner-decision record',
    'Validated selected candidate identity',
    'Submission-review item identifiers and states',
    'Pending-checks review marker',
    'Not-granted-by-review-start approval marker',
  ],
  prohibitedReviewContent: [
    'Credentials, tokens, headers, cookies, secret keys, signing certificates, profiles, keys, or private configuration',
    'Apple account, team, membership, App Store Connect, provider, subscription account, or device data',
    'Receipts, billing tokens, transaction records, payment details, prices, product identifiers, or configured store details',
    'Device names, serial numbers, UDIDs, advertising identifiers, or other device identifiers',
    'Console output, build logs, traces, crash reports, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, generated media, listing assets, or other attachments',
    'Private Preview, issue, repository, build, install, invitation, portal, account, or access links and details',
    'Dream content, journal text, analyses, tags, personal reflections, real birth data, audio recordings, spoken phrases, voice transcripts, or descriptions of media',
    'Release, launch, submission, provider, App Store, signing, or Production approval claims',
  ],
};

function isSameSelectedCandidate(
  selected: ReleaseCandidateBuildIdentityRecord,
  reviewed: ReleaseCandidateBuildIdentityRecord,
): boolean {
  return (
    isReleaseCandidateBuildIdentityRecordValid(selected) &&
    isReleaseCandidateBuildIdentityRecordValid(reviewed) &&
    selected.comparison === 'matches-configured-values' &&
    reviewed.comparison === 'matches-configured-values' &&
    selected.configured.publicVersion === reviewed.configured.publicVersion &&
    selected.configured.iosBuildNumber === reviewed.configured.iosBuildNumber &&
    selected.configured.shortGitCommit === reviewed.configured.shortGitCommit &&
    selected.configured.branchName === reviewed.configured.branchName &&
    selected.installed.publicVersion === reviewed.installed.publicVersion &&
    selected.installed.iosBuildNumber === reviewed.installed.iosBuildNumber
  );
}

export function getReleaseSubmissionReviewStartCopy(): ReleaseSubmissionReviewStartCopy {
  return releaseSubmissionReviewStartCopy;
}

export function getReleaseSubmissionReviewItem(
  id: ReleaseSubmissionReviewItemId,
): ReleaseSubmissionReviewItem {
  return releaseSubmissionReviewStartCopy.items[id];
}

export function isReleaseSubmissionReviewStartRecordValid(
  record: ReleaseSubmissionReviewStartRecord,
): boolean {
  if (
    !isReleaseOwnerReviewDecisionRecordValid(record.ownerDecision) ||
    record.ownerDecision.decision !==
      'ready-for-separate-submission-review' ||
    record.reviewState !== 'pending-checks' ||
    record.approvalState !== 'not-granted-by-review-start' ||
    !isSameSelectedCandidate(
      record.selectedCandidateIdentity,
      record.ownerDecision.closeoutRecord.candidateIdentity,
    )
  ) {
    return false;
  }

  const itemStates = new Map(
    record.items.map((item) => [item.itemId, item.state]),
  );

  return (
    itemStates.size === record.items.length &&
    record.items.length === releaseSubmissionReviewStartCopy.orderedItems.length &&
    releaseSubmissionReviewStartCopy.orderedItems.every(
      (itemId) => itemStates.get(itemId) === 'pending',
    )
  );
}
