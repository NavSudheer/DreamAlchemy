import {
  isReleaseCandidateBuildIdentityRecordValid,
  type ReleaseCandidateBuildIdentityRecord,
} from './releaseCandidateBuildIdentityCopy';
import type {
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseOwnerTestPreflightItemId =
  | 'confirm-build-identity'
  | 'confirm-clean-candidate-source'
  | 'prepare-approved-synthetic-inputs'
  | 'confirm-device-prerequisites'
  | 'confirm-network-prerequisites'
  | 'confirm-subscription-sandbox'
  | 'preserve-astrology-boundary'
  | 'preserve-dream-image-boundary'
  | 'prepare-sanitized-outcomes';

export type ReleaseOwnerTestPreflightItemState =
  | 'pending'
  | 'confirmed'
  | 'blocked'
  | 'not-applicable';

export type ReleaseOwnerTestPreflightRequirement =
  | 'required'
  | 'conditional';

export interface ReleaseOwnerTestPreflightItem {
  id: ReleaseOwnerTestPreflightItemId;
  title: string;
  instruction: string;
  confirmationChecks: readonly string[];
  blockedWhen: string;
  requirement: ReleaseOwnerTestPreflightRequirement;
  condition?: string;
  initialState: 'pending';
  relatedTestIdentifiers: readonly ReleaseDeviceTestIdentifier[];
  grantsReleaseApproval: false;
  grantsSubmissionApproval: false;
  grantsProviderApproval: false;
  grantsProductionApproval: false;
  boundary: string;
}

export interface ReleaseOwnerTestPreflightItemResult {
  itemId: ReleaseOwnerTestPreflightItemId;
  state: ReleaseOwnerTestPreflightItemState;
}

export interface ReleaseOwnerTestPreflightCopy {
  title: string;
  subtitle: string;
  pendingReminder: string;
  buildIdentityReminder: string;
  identifierReminder: string;
  outcomeReminder: string;
  approvalBoundary: string;
  orderedItems: readonly ReleaseOwnerTestPreflightItemId[];
  items: Readonly<
    Record<ReleaseOwnerTestPreflightItemId, ReleaseOwnerTestPreflightItem>
  >;
  allowedSessionOutcomes: readonly ReleaseDeviceTestOutcome[];
  prohibitedPreflightContent: readonly string[];
}

export const RELEASE_OWNER_TEST_PREFLIGHT_ITEM_ORDER = [
  'confirm-build-identity',
  'confirm-clean-candidate-source',
  'prepare-approved-synthetic-inputs',
  'confirm-device-prerequisites',
  'confirm-network-prerequisites',
  'confirm-subscription-sandbox',
  'preserve-astrology-boundary',
  'preserve-dream-image-boundary',
  'prepare-sanitized-outcomes',
] as const satisfies readonly ReleaseOwnerTestPreflightItemId[];

export const RELEASE_OWNER_TEST_PREFLIGHT_ITEMS = {
  'confirm-build-identity': {
    id: 'confirm-build-identity',
    title: 'Confirm configured and installed build identity',
    instruction:
      'Record the configured candidate identity and the version and build actually observed on the installed owner test surface.',
    confirmationChecks: [
      'Both configured and installed identity records pass the bounded build-identity validators.',
      'The observed installed public version and iOS build number match the configured candidate values.',
      'The observation timestamp records when the installed values were directly checked.',
    ],
    blockedWhen:
      'Keep preflight blocked when identity is invalid, unobserved, not compared, or different from the configured candidate.',
    requirement: 'required',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'A version/build match permits candidate testing only; it does not establish upload, signing, App Store, release, or approval state.',
  },
  'confirm-clean-candidate-source': {
    id: 'confirm-clean-candidate-source',
    title: 'Confirm clean candidate source',
    instruction:
      'Verify that the recorded short commit and branch identify the intended candidate and that no unintended local source or configuration changes are included.',
    confirmationChecks: [
      'The approved short commit and branch match the candidate identity record.',
      'Any intentional candidate changes are already represented by the recorded commit.',
      'No unrelated, temporary, debug-only, secret, or local configuration change is part of the candidate.',
    ],
    blockedWhen:
      'Keep preflight blocked until unintended or unexplained candidate-source differences are resolved through the approved source process.',
    requirement: 'required',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Record only the bounded branch name and short commit; do not retain repository links, patches, logs, credentials, or signing data.',
  },
  'prepare-approved-synthetic-inputs': {
    id: 'prepare-approved-synthetic-inputs',
    title: 'Prepare approved synthetic inputs',
    instruction:
      'Use only the approved non-personal journal fixture, neutral voice phrase, and assigned optional-feature synthetic profiles required by the session.',
    confirmationChecks: [
      'No real dream, birth, account, or identity information is needed.',
      'The fixtures are available through the approved process without copying their contents into the preflight record.',
      'Each optional-feature input is limited to its assigned private or provider-neutral scope.',
    ],
    blockedWhen:
      'Keep the affected test pending or blocked if a safe assigned fixture is unavailable; never substitute personal content.',
    requirement: 'required',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Do not place fixture text, birth values, spoken phrases, transcripts, or other source content in the outcome record.',
  },
  'confirm-device-prerequisites': {
    id: 'confirm-device-prerequisites',
    title: 'Confirm device prerequisites',
    instruction:
      'Confirm the assigned Mac or iOS surface supports the planned permissions, native capabilities, accessibility methods, appearance, text-size, rotation, and layout checks.',
    confirmationChecks: [
      'The assigned device class and public operating-system version are suitable for the planned paths.',
      'Required microphone, speech, accessibility, and interruption states can be exercised safely.',
      'The session does not require device identifiers, personal accounts, or personal content.',
    ],
    blockedWhen:
      'Classify an unavailable required device capability or permission setup as a device or environment blocker; do not infer a product result.',
    requirement: 'required',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Do not record device name, serial number, UDID, advertising identifier, Apple account, or other device-linked details.',
  },
  'confirm-network-prerequisites': {
    id: 'confirm-network-prerequisites',
    title: 'Confirm network prerequisites',
    instruction:
      'Confirm the approved connected, offline, slow-network, and interruption conditions required by the assigned session can be exercised without exposing private network details.',
    confirmationChecks: [
      'The planned network states are available and controlled for the assigned paths.',
      'No private address, network name, proxy value, header, token, or payload needs to be recorded.',
      'Provider-dependent optional paths remain blocked unless already assigned within approved scope.',
    ],
    blockedWhen:
      'Treat unavailable required connectivity conditions as a device or environment blocker, not a product pass or failure.',
    requirement: 'required',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Do not collect network credentials, addresses, logs, traces, request bodies, response bodies, or diagnostic captures.',
  },
  'confirm-subscription-sandbox': {
    id: 'confirm-subscription-sandbox',
    title: 'Confirm subscription sandbox availability',
    instruction:
      'Confirm the approved store sandbox and assigned test account can exercise the purchase, restore, cancellation, entitlement, expiry, and trial paths in scope.',
    confirmationChecks: [
      'The sandbox is distinct from personal and Production purchasing.',
      'The assigned transitions can be exercised without recording credentials, receipts, product details, or account data.',
      'Unavailable sandbox transitions are identified before product outcomes are recorded.',
    ],
    blockedWhen:
      'Record a device or environment blocker if a required sandbox or assigned transition is unavailable; do not substitute a real purchase.',
    requirement: 'conditional',
    condition:
      'Required only when subscription, entitlement, or trial checks are assigned to this owner session.',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Do not record account credentials, identifiers, receipts, transactions, prices, product identifiers, billing details, or store configuration.',
  },
  'preserve-astrology-boundary': {
    id: 'preserve-astrology-boundary',
    title: 'Preserve the Astrology private Preview boundary',
    instruction:
      'Confirm that Astrology work is limited to exact existing matrix identifiers assigned for private Preview testing with approved synthetic profiles.',
    confirmationChecks: [
      'Production Astrology remains disabled and outside owner native release claims.',
      'Only assigned private Preview cases are eligible for execution.',
      'Provider or protected-Preview unavailability remains an optional-provider blocker.',
    ],
    blockedWhen:
      'Do not proceed when the requested action requires Production activation, unassigned provider work, private access disclosure, or real birth data.',
    requirement: 'conditional',
    condition:
      'Required only when an existing Astrology matrix identifier is assigned to the session.',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Do not record birth data, coordinates, private Preview links, provider details, credentials, payloads, or Production claims.',
  },
  'preserve-dream-image-boundary': {
    id: 'preserve-dream-image-boundary',
    title: 'Preserve the Dream Image provider boundary',
    instruction:
      'Confirm that Dream Image work is limited to exact existing provider-neutral preparation identifiers and the expected disabled state.',
    confirmationChecks: [
      'Live generation, delivery, persistence, sharing, and provider-side behavior remain blocked.',
      'No provider is selected or activated for this session.',
      'Preparation behavior is evaluated independently from optional-provider blockers.',
    ],
    blockedWhen:
      'Do not proceed when the requested action requires dream content, live generation, generated media, provider selection, or provider credentials.',
    requirement: 'conditional',
    condition:
      'Required only when an existing Dream Image matrix or blocker identifier is assigned to the session.',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Do not record dream content, generated media, private access, provider details, credentials, payloads, or live-generation claims.',
  },
  'prepare-sanitized-outcomes': {
    id: 'prepare-sanitized-outcomes',
    title: 'Prepare sanitized outcome recording',
    instruction:
      'Use only the existing release outcome labels, exact assigned identifiers where applicable, counts, and brief sanitized visible observations allowed by the owner test contract.',
    confirmationChecks: [
      'No test identifier will be created, shortened, or modified.',
      'Pass and fail will be recorded only after hands-on execution.',
      'Device or environment blockers remain separate from optional-provider blockers.',
      'The record format contains no private content, technical artifacts, links, attachments, or approval claims.',
    ],
    blockedWhen:
      'Do not start outcome recording until unsafe evidence fields are removed and the exact assigned identifiers and allowed outcomes are available.',
    requirement: 'required',
    initialState: 'pending',
    relatedTestIdentifiers: [],
    grantsReleaseApproval: false,
    grantsSubmissionApproval: false,
    grantsProviderApproval: false,
    grantsProductionApproval: false,
    boundary:
      'Preflight confirmation permits recording only; it does not grant any product outcome or approval.',
  },
} as const satisfies Readonly<
  Record<ReleaseOwnerTestPreflightItemId, ReleaseOwnerTestPreflightItem>
>;

export const releaseOwnerTestPreflightCopy: ReleaseOwnerTestPreflightCopy = {
  title: 'Owner Mac and iOS test preflight',
  subtitle:
    'Privacy-safe checks to confirm the exact candidate, approved prerequisites, optional boundaries, and outcome format before hands-on testing.',
  pendingReminder:
    'Every preflight item starts pending. Confirm an item only from its stated observable checks; otherwise keep it pending, blocked, or not applicable.',
  buildIdentityReminder:
    'Configured source values and an actually observed installed build are distinct. Testing begins only after their public version and iOS build number match.',
  identifierReminder:
    'Use only exact existing identifiers accepted by the release device outcome contract when a matrix case applies. This preflight defines no test ids.',
  outcomeReminder:
    'Owner-session outcomes remain pass, fail, blocked, not run, or not applicable. Preflight completion does not assign any of them.',
  approvalBoundary:
    'No preflight item or completed preflight grants release, launch, submission, provider, or Production approval.',
  orderedItems: RELEASE_OWNER_TEST_PREFLIGHT_ITEM_ORDER,
  items: RELEASE_OWNER_TEST_PREFLIGHT_ITEMS,
  allowedSessionOutcomes: [
    'pass',
    'fail',
    'blocked',
    'not-run',
    'not-applicable',
  ],
  prohibitedPreflightContent: [
    'Dream content, journal text, analyses, tags, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Audio recordings, spoken phrases, voice transcripts, generated media, media links, exports, or descriptions of media',
    'Credentials, tokens, headers, cookies, secret keys, account details, store details, product details, or private configuration',
    'Receipts, billing tokens, transaction records, payment details, or subscription account data',
    'Device names, serial numbers, UDIDs, advertising identifiers, or other device identifiers',
    'Console output, build logs, traces, crash reports, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Private Preview, issue, repository, build, install, invitation, or access links and details',
    'Release, launch, submission, provider, or Production approval claims',
  ],
};

export function getReleaseOwnerTestPreflightCopy(): ReleaseOwnerTestPreflightCopy {
  return releaseOwnerTestPreflightCopy;
}

export function getReleaseOwnerTestPreflightItem(
  id: ReleaseOwnerTestPreflightItemId,
): ReleaseOwnerTestPreflightItem {
  return releaseOwnerTestPreflightCopy.items[id];
}

export function isReleaseOwnerPreflightBuildIdentityConfirmed(
  identity: ReleaseCandidateBuildIdentityRecord,
): boolean {
  return (
    isReleaseCandidateBuildIdentityRecordValid(identity) &&
    identity.comparison === 'matches-configured-values' &&
    identity.approvalState === 'not-inferred'
  );
}

export function isReleaseOwnerTestPreflightReady(
  results: readonly ReleaseOwnerTestPreflightItemResult[],
): boolean {
  const uniqueResults = new Map(
    results.map((result) => [result.itemId, result.state]),
  );

  if (uniqueResults.size !== results.length) {
    return false;
  }

  return releaseOwnerTestPreflightCopy.orderedItems.every((itemId) => {
    const item = releaseOwnerTestPreflightCopy.items[itemId];
    const state = uniqueResults.get(itemId);

    if (item.requirement === 'required') {
      return state === 'confirmed';
    }

    return state === 'confirmed' || state === 'not-applicable';
  });
}
