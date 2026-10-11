import type {
  ReleaseDeviceTestClassification,
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseOwnerTestSessionStatus =
  | 'not-started'
  | 'in-progress'
  | 'paused-by-device-blocker'
  | 'paused-by-optional-provider-blocker'
  | 'completed-pending-owner-review';

export type ReleaseOwnerTestSessionOutcomeCounts = Record<
  ReleaseDeviceTestOutcome,
  number
>;

export interface ReleaseOwnerTestSessionIdentifierGroups {
  passed: readonly ReleaseDeviceTestIdentifier[];
  reproducibleDefects: readonly ReleaseDeviceTestIdentifier[];
  deviceEnvironmentBlockers: readonly ReleaseDeviceTestIdentifier[];
  optionalProviderBlockers: readonly ReleaseDeviceTestIdentifier[];
  notRun: readonly ReleaseDeviceTestIdentifier[];
  notApplicable: readonly ReleaseDeviceTestIdentifier[];
}

export interface ReleaseOwnerTestSessionSnapshot {
  status: ReleaseOwnerTestSessionStatus;
  assignedIdentifiers: readonly ReleaseDeviceTestIdentifier[];
  outcomeCounts: ReleaseOwnerTestSessionOutcomeCounts;
  identifiers: ReleaseOwnerTestSessionIdentifierGroups;
  reviewState: 'not-an-approval';
}

export interface ReleaseOwnerTestSessionStatusEntry {
  status: ReleaseOwnerTestSessionStatus;
  label: string;
  badgeLabel: string;
  description: string;
  useWhen: readonly string[];
  doNotUseWhen: string;
  nextAction: string;
  pauseClassification?: Extract<
    ReleaseDeviceTestClassification,
    'device-environment-blocker' | 'optional-provider-blocker'
  >;
  impliesReleaseApproval: false;
  impliesSubmissionApproval: false;
  impliesProviderApproval: false;
  impliesProductionApproval: false;
  accessibilityLabel: string;
}

export interface ReleaseOwnerTestSessionStatusCopy {
  title: string;
  subtitle: string;
  countingReminder: string;
  identifierReminder: string;
  blockerReminder: string;
  completionBoundary: string;
  orderedStatuses: readonly ReleaseOwnerTestSessionStatus[];
  statuses: Readonly<
    Record<ReleaseOwnerTestSessionStatus, ReleaseOwnerTestSessionStatusEntry>
  >;
  allowedRecordFields: readonly string[];
  prohibitedRecordContent: readonly string[];
}

export const RELEASE_OWNER_TEST_SESSION_STATUS_ORDER = [
  'not-started',
  'in-progress',
  'paused-by-device-blocker',
  'paused-by-optional-provider-blocker',
  'completed-pending-owner-review',
] as const satisfies readonly ReleaseOwnerTestSessionStatus[];

export const RELEASE_OWNER_TEST_SESSION_STATUSES = {
  'not-started': {
    status: 'not-started',
    label: 'Owner testing not started',
    badgeLabel: 'Not started',
    description:
      'The assigned exact test identifiers have not yet been exercised on the owner Mac or iOS surfaces.',
    useWhen: [
      'Every assigned identifier remains not run.',
      'No pass, fail, blocked, or not-applicable outcome has been recorded.',
    ],
    doNotUseWhen:
      'Do not use after any assigned identifier has received an observed or scoped outcome.',
    nextAction:
      'Confirm the candidate and begin the assigned owner-device checklist without changing optional-feature boundaries.',
    impliesReleaseApproval: false,
    impliesSubmissionApproval: false,
    impliesProviderApproval: false,
    impliesProductionApproval: false,
    accessibilityLabel:
      'Owner Mac and iOS testing has not started; every assigned identifier remains not run.',
  },
  'in-progress': {
    status: 'in-progress',
    label: 'Owner testing in progress',
    badgeLabel: 'In progress',
    description:
      'At least one assigned identifier has an outcome and at least one assigned identifier still requires accounting.',
    useWhen: [
      'Hands-on execution has started on the confirmed candidate.',
      'Some identifiers are complete while others remain not run.',
      'No blocker currently pauses the overall assigned session.',
    ],
    doNotUseWhen:
      'Do not use when no assigned check has started, a blocker has paused the session, or every identifier has been accounted for.',
    nextAction:
      'Continue the smallest remaining assigned paths and update counts only after hands-on execution.',
    impliesReleaseApproval: false,
    impliesSubmissionApproval: false,
    impliesProviderApproval: false,
    impliesProductionApproval: false,
    accessibilityLabel:
      'Owner Mac and iOS testing is in progress; remaining identifiers are not yet complete.',
  },
  'paused-by-device-blocker': {
    status: 'paused-by-device-blocker',
    label: 'Paused by device or environment blocker',
    badgeLabel: 'Device blocked',
    description:
      'A required device capability, permission, sandbox, connectivity condition, assigned build, or environment prevents the next assigned path.',
    useWhen: [
      'At least one exact identifier is blocked with the device-environment-blocker classification.',
      'The unavailable prerequisite prevents meaningful progress on the paused session scope.',
    ],
    doNotUseWhen:
      'Do not use for an optional provider dependency or for available product behavior that reproducibly differs from its expectation.',
    nextAction:
      'Restore the approved device or environment prerequisite, then resume the exact blocked identifiers without inferring an outcome.',
    pauseClassification: 'device-environment-blocker',
    impliesReleaseApproval: false,
    impliesSubmissionApproval: false,
    impliesProviderApproval: false,
    impliesProductionApproval: false,
    accessibilityLabel:
      'Owner testing is paused by a device or environment blocker; no product or approval result is implied.',
  },
  'paused-by-optional-provider-blocker': {
    status: 'paused-by-optional-provider-blocker',
    label: 'Paused by optional-provider blocker',
    badgeLabel: 'Provider blocked',
    description:
      'An assigned optional Astrology or Dream Image path depends on a provider capability that remains unavailable or deliberately disabled.',
    useWhen: [
      'At least one exact identifier is blocked with the optional-provider-blocker classification.',
      'The paused session scope cannot continue without crossing the approved optional-feature boundary.',
    ],
    doNotUseWhen:
      'Do not use for a core device or environment prerequisite, or for a defect in available provider-neutral behavior.',
    nextAction:
      'Keep the optional dependency blocked and continue only independent assigned checks that remain within approved scope.',
    pauseClassification: 'optional-provider-blocker',
    impliesReleaseApproval: false,
    impliesSubmissionApproval: false,
    impliesProviderApproval: false,
    impliesProductionApproval: false,
    accessibilityLabel:
      'Owner testing is paused by an optional-provider blocker; no provider activation or approval is implied.',
  },
  'completed-pending-owner-review': {
    status: 'completed-pending-owner-review',
    label: 'Session complete, owner review pending',
    badgeLabel: 'Review pending',
    description:
      'Every assigned exact identifier has one counted outcome and the session record is ready for separate owner review.',
    useWhen: [
      'No assigned identifier remains not run.',
      'Outcome counts reconcile with the exact identifier groups.',
      'Defects, device or environment blockers, and optional-provider blockers remain separated.',
    ],
    doNotUseWhen:
      'Do not use when an assigned identifier is missing, duplicated, still not run, or placed under an inconsistent outcome or blocker group.',
    nextAction:
      'Route the reconciled counts and exact identifiers to the separate owner review process without converting completion into approval.',
    impliesReleaseApproval: false,
    impliesSubmissionApproval: false,
    impliesProviderApproval: false,
    impliesProductionApproval: false,
    accessibilityLabel:
      'Owner test session accounting is complete and owner review is pending; release, submission, provider, and Production approval are not granted.',
  },
} as const satisfies Readonly<
  Record<ReleaseOwnerTestSessionStatus, ReleaseOwnerTestSessionStatusEntry>
>;

export const releaseOwnerTestSessionStatusCopy: ReleaseOwnerTestSessionStatusCopy = {
  title: 'Owner Mac and iOS test-session status',
  subtitle:
    'Count-and-identifier status labels for the assigned owner-device session.',
  countingReminder:
    'Count each assigned exact identifier once under pass, fail, blocked, not run, or not applicable. The five counts must sum to the assigned identifier total.',
  identifierReminder:
    'Use only exact existing identifiers accepted by the release device outcome contract. This status copy defines no test ids.',
  blockerReminder:
    'Keep device or environment blockers separate from optional-provider blockers, and keep reproducible product defects under fail.',
  completionBoundary:
    'Completed pending owner review is an accounting state only. It never means release, submission, provider, or Production approval.',
  orderedStatuses: RELEASE_OWNER_TEST_SESSION_STATUS_ORDER,
  statuses: RELEASE_OWNER_TEST_SESSION_STATUSES,
  allowedRecordFields: [
    'Status',
    'Outcome counts',
    'Exact assigned test identifiers',
    'Exact identifiers grouped by outcome and blocker classification',
  ],
  prohibitedRecordContent: [
    'Dream content, journal text, analyses, tags, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Audio recordings, voice transcripts, generated media, media links, exports, or descriptions of media',
    'Credentials, tokens, headers, cookies, secret keys, account details, store details, product details, or private configuration',
    'Receipts, billing tokens, transaction records, payment details, or subscription account data',
    'Console output, logs, traces, crash reports, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Private Preview, issue, install, invitation, repository, or access links and details',
    'Release, launch, submission, provider, or Production approval claims',
  ],
};

function getIdentifierGroups(
  snapshot: ReleaseOwnerTestSessionSnapshot,
): readonly (readonly ReleaseDeviceTestIdentifier[])[] {
  return [
    snapshot.identifiers.passed,
    snapshot.identifiers.reproducibleDefects,
    snapshot.identifiers.deviceEnvironmentBlockers,
    snapshot.identifiers.optionalProviderBlockers,
    snapshot.identifiers.notRun,
    snapshot.identifiers.notApplicable,
  ];
}

function areCountsValid(
  counts: ReleaseOwnerTestSessionOutcomeCounts,
): boolean {
  return Object.values(counts).every(
    (count) => Number.isInteger(count) && count >= 0,
  );
}

export function getReleaseOwnerTestSessionStatusCopy(): ReleaseOwnerTestSessionStatusCopy {
  return releaseOwnerTestSessionStatusCopy;
}

export function getReleaseOwnerTestSessionStatus(
  status: ReleaseOwnerTestSessionStatus,
): ReleaseOwnerTestSessionStatusEntry {
  return releaseOwnerTestSessionStatusCopy.statuses[status];
}

export function isReleaseOwnerTestSessionSnapshotBalanced(
  snapshot: ReleaseOwnerTestSessionSnapshot,
): boolean {
  if (!areCountsValid(snapshot.outcomeCounts)) {
    return false;
  }

  const groupedIdentifiers = getIdentifierGroups(snapshot).flat();
  const assigned = new Set(snapshot.assignedIdentifiers);
  const grouped = new Set(groupedIdentifiers);
  const countTotal = Object.values(snapshot.outcomeCounts).reduce(
    (total, count) => total + count,
    0,
  );

  return (
    snapshot.reviewState === 'not-an-approval' &&
    assigned.size === snapshot.assignedIdentifiers.length &&
    grouped.size === groupedIdentifiers.length &&
    assigned.size === grouped.size &&
    snapshot.assignedIdentifiers.every((identifier) =>
      grouped.has(identifier),
    ) &&
    countTotal === assigned.size &&
    snapshot.outcomeCounts.pass === snapshot.identifiers.passed.length &&
    snapshot.outcomeCounts.fail ===
      snapshot.identifiers.reproducibleDefects.length &&
    snapshot.outcomeCounts.blocked ===
      snapshot.identifiers.deviceEnvironmentBlockers.length +
        snapshot.identifiers.optionalProviderBlockers.length &&
    snapshot.outcomeCounts['not-run'] === snapshot.identifiers.notRun.length &&
    snapshot.outcomeCounts['not-applicable'] ===
      snapshot.identifiers.notApplicable.length
  );
}

export function isReleaseOwnerTestSessionStatusConsistent(
  snapshot: ReleaseOwnerTestSessionSnapshot,
): boolean {
  if (!isReleaseOwnerTestSessionSnapshotBalanced(snapshot)) {
    return false;
  }

  const counts = snapshot.outcomeCounts;
  const observedCount = counts.pass + counts.fail + counts.blocked;

  if (snapshot.status === 'not-started') {
    return (
      counts['not-run'] === snapshot.assignedIdentifiers.length &&
      observedCount === 0 &&
      counts['not-applicable'] === 0
    );
  }

  if (snapshot.status === 'in-progress') {
    return observedCount + counts['not-applicable'] > 0 && counts['not-run'] > 0;
  }

  if (snapshot.status === 'paused-by-device-blocker') {
    return snapshot.identifiers.deviceEnvironmentBlockers.length > 0;
  }

  if (snapshot.status === 'paused-by-optional-provider-blocker') {
    return snapshot.identifiers.optionalProviderBlockers.length > 0;
  }

  return counts['not-run'] === 0;
}

export function isReleaseOwnerTestSessionStatus(
  value: string,
): value is ReleaseOwnerTestSessionStatus {
  return (
    RELEASE_OWNER_TEST_SESSION_STATUS_ORDER as readonly string[]
  ).includes(value);
}
