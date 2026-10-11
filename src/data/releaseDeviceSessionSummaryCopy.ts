import {
  isReleaseDeviceTestIdentifier,
  type ReleaseDeviceTestClassification,
  type ReleaseDeviceTestIdentifier,
  type ReleaseDeviceTestOutcome,
  type ReleaseDeviceTestOutcomeReport,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseDeviceSessionNextAction =
  | 'investigate-reproducible-defects'
  | 'clear-device-environment-blockers'
  | 'preserve-optional-provider-blockers'
  | 'complete-not-run-checks'
  | 'review-not-applicable-scope'
  | 'close-session-evidence';

export interface ReleaseDeviceSessionOutcomeCounts {
  pass: number;
  fail: number;
  blocked: number;
  'not-run': number;
  'not-applicable': number;
}

export interface ReleaseDeviceSessionClassifiedIdentifiers {
  reproducibleProductDefects: readonly ReleaseDeviceTestIdentifier[];
  deviceEnvironmentBlockers: readonly ReleaseDeviceTestIdentifier[];
  optionalProviderBlockers: readonly ReleaseDeviceTestIdentifier[];
  passedChecks: readonly ReleaseDeviceTestIdentifier[];
  notRunChecks: readonly ReleaseDeviceTestIdentifier[];
  notApplicableChecks: readonly ReleaseDeviceTestIdentifier[];
}

export interface ReleaseDeviceSessionSummary {
  totalAssigned: number;
  outcomeCounts: ReleaseDeviceSessionOutcomeCounts;
  identifiers: ReleaseDeviceSessionClassifiedIdentifiers;
  nextActions: readonly ReleaseDeviceSessionNextAction[];
  approvalState: 'not-determined-by-summary';
}

export interface ReleaseDeviceSessionNextActionCopy {
  action: ReleaseDeviceSessionNextAction;
  title: string;
  description: string;
  accessibilityLabel: string;
}

export interface ReleaseDeviceSessionSummaryCopy {
  title: string;
  subtitle: string;
  countingReminder: string;
  classificationReminder: string;
  identifierReminder: string;
  evidenceReminder: string;
  approvalBoundary: string;
  orderedOutcomes: readonly ReleaseDeviceTestOutcome[];
  outcomeLabels: Readonly<Record<ReleaseDeviceTestOutcome, string>>;
  orderedNextActions: readonly ReleaseDeviceSessionNextAction[];
  nextActionCopy: Readonly<
    Record<ReleaseDeviceSessionNextAction, ReleaseDeviceSessionNextActionCopy>
  >;
  prohibitedSummaryContent: readonly string[];
}

export const RELEASE_DEVICE_SESSION_SUMMARY_OUTCOME_ORDER = [
  'pass',
  'fail',
  'blocked',
  'not-run',
  'not-applicable',
] as const satisfies readonly ReleaseDeviceTestOutcome[];

export const RELEASE_DEVICE_SESSION_SUMMARY_OUTCOME_LABELS = {
  pass: 'Pass',
  fail: 'Fail',
  blocked: 'Blocked',
  'not-run': 'Not run',
  'not-applicable': 'Not applicable',
} as const satisfies Readonly<Record<ReleaseDeviceTestOutcome, string>>;

export const RELEASE_DEVICE_SESSION_NEXT_ACTION_ORDER = [
  'investigate-reproducible-defects',
  'clear-device-environment-blockers',
  'preserve-optional-provider-blockers',
  'complete-not-run-checks',
  'review-not-applicable-scope',
  'close-session-evidence',
] as const satisfies readonly ReleaseDeviceSessionNextAction[];

export const RELEASE_DEVICE_SESSION_NEXT_ACTION_COPY = {
  'investigate-reproducible-defects': {
    action: 'investigate-reproducible-defects',
    title: 'Investigate reproducible defects',
    description:
      'Review each failed exact identifier, address only the verified product mismatch, and use the approved owner-device retest flow after a candidate fix.',
    accessibilityLabel:
      'Next action: investigate reproducible product defects and retest affected identifiers after a candidate fix.',
  },
  'clear-device-environment-blockers': {
    action: 'clear-device-environment-blockers',
    title: 'Clear device or environment blockers',
    description:
      'Restore the assigned build, device capability, permission, sandbox, connectivity condition, or test environment before rerunning the blocked identifiers.',
    accessibilityLabel:
      'Next action: restore device or environment prerequisites, then rerun the blocked identifiers.',
  },
  'preserve-optional-provider-blockers': {
    action: 'preserve-optional-provider-blockers',
    title: 'Keep optional-provider work blocked',
    description:
      'Leave optional Astrology or Dream Image provider-dependent identifiers blocked until a separately approved plan changes their scope.',
    accessibilityLabel:
      'Next action: preserve optional-provider blockers; no provider activation or approval is implied.',
  },
  'complete-not-run-checks': {
    action: 'complete-not-run-checks',
    title: 'Complete remaining device checks',
    description:
      'Schedule the not-run identifiers on their assigned Mac or iOS surface and keep them pending until hands-on execution.',
    accessibilityLabel:
      'Next action: complete remaining not-run checks through hands-on device execution.',
  },
  'review-not-applicable-scope': {
    action: 'review-not-applicable-scope',
    title: 'Review not-applicable scope',
    description:
      'Confirm that each not-applicable identifier is explicitly outside the assigned device, platform, feature, or session scope.',
    accessibilityLabel:
      'Next action: confirm that every not-applicable identifier is outside the assigned scope.',
  },
  'close-session-evidence': {
    action: 'close-session-evidence',
    title: 'Close the sanitized session record',
    description:
      'Confirm the counts match the exact identifier lists, remove prohibited material, and hand off the summary as device evidence only.',
    accessibilityLabel:
      'Next action: reconcile counts and exact identifiers, then close the sanitized device-evidence record.',
  },
} as const satisfies Readonly<
  Record<ReleaseDeviceSessionNextAction, ReleaseDeviceSessionNextActionCopy>
>;

export const releaseDeviceSessionSummaryCopy: ReleaseDeviceSessionSummaryCopy = {
  title: 'Owner Mac and iOS session summary',
  subtitle:
    'A privacy-safe aggregate of assigned device outcomes and remaining actions.',
  countingReminder:
    'Count each exact assigned identifier once under pass, fail, blocked, not run, or not applicable. Total assigned must equal the sum of all five counts.',
  classificationReminder:
    'Failed identifiers are reproducible product defects. Blocked identifiers must be separated into device or environment blockers and optional-provider blockers.',
  identifierReminder:
    'List only exact existing identifiers accepted by the release device outcome contract. This summary defines no test ids.',
  evidenceReminder:
    'The aggregate contains counts and exact identifiers only. Keep any supporting observation in its separate sanitized text outcome record.',
  approvalBoundary:
    'Counts, including a summary with only passes, never establish release, launch, submission, provider, or Production approval.',
  orderedOutcomes: RELEASE_DEVICE_SESSION_SUMMARY_OUTCOME_ORDER,
  outcomeLabels: RELEASE_DEVICE_SESSION_SUMMARY_OUTCOME_LABELS,
  orderedNextActions: RELEASE_DEVICE_SESSION_NEXT_ACTION_ORDER,
  nextActionCopy: RELEASE_DEVICE_SESSION_NEXT_ACTION_COPY,
  prohibitedSummaryContent: [
    'Dream content, journal text, personal reflections, or real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Voice recordings, transcripts, generated media, media links, exports, or descriptions of media',
    'Private Preview, issue, install, invitation, or access links and details',
    'Credentials, tokens, headers, cookies, receipts, account details, store details, or private configuration',
    'Console output, logs, traces, crash dumps, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Release, launch, submission, provider, or Production approval claims',
  ],
};

function createEmptyOutcomeCounts(): ReleaseDeviceSessionOutcomeCounts {
  return {
    pass: 0,
    fail: 0,
    blocked: 0,
    'not-run': 0,
    'not-applicable': 0,
  };
}

function createEmptyIdentifierGroups(): {
  reproducibleProductDefects: ReleaseDeviceTestIdentifier[];
  deviceEnvironmentBlockers: ReleaseDeviceTestIdentifier[];
  optionalProviderBlockers: ReleaseDeviceTestIdentifier[];
  passedChecks: ReleaseDeviceTestIdentifier[];
  notRunChecks: ReleaseDeviceTestIdentifier[];
  notApplicableChecks: ReleaseDeviceTestIdentifier[];
} {
  return {
    reproducibleProductDefects: [],
    deviceEnvironmentBlockers: [],
    optionalProviderBlockers: [],
    passedChecks: [],
    notRunChecks: [],
    notApplicableChecks: [],
  };
}

function isOutcomeClassificationConsistent(
  outcome: ReleaseDeviceTestOutcome,
  classification: ReleaseDeviceTestClassification,
): boolean {
  if (outcome === 'fail') {
    return classification === 'reproducible-product-defect';
  }

  if (outcome === 'blocked') {
    return (
      classification === 'device-environment-blocker' ||
      classification === 'optional-provider-blocker'
    );
  }

  return classification === 'none';
}

export function buildReleaseDeviceSessionSummary(
  reports: readonly ReleaseDeviceTestOutcomeReport[],
): ReleaseDeviceSessionSummary | undefined {
  const identifiers = new Set<ReleaseDeviceTestIdentifier>();
  const outcomeCounts = createEmptyOutcomeCounts();
  const classifiedIdentifiers = createEmptyIdentifierGroups();

  for (const report of reports) {
    if (
      !isReleaseDeviceTestIdentifier(report.testIdentifier) ||
      identifiers.has(report.testIdentifier) ||
      !isOutcomeClassificationConsistent(
        report.outcome,
        report.classification,
      )
    ) {
      return undefined;
    }

    identifiers.add(report.testIdentifier);
    outcomeCounts[report.outcome] += 1;

    if (report.outcome === 'pass') {
      classifiedIdentifiers.passedChecks.push(report.testIdentifier);
    } else if (report.outcome === 'fail') {
      classifiedIdentifiers.reproducibleProductDefects.push(
        report.testIdentifier,
      );
    } else if (report.outcome === 'not-run') {
      classifiedIdentifiers.notRunChecks.push(report.testIdentifier);
    } else if (report.outcome === 'not-applicable') {
      classifiedIdentifiers.notApplicableChecks.push(report.testIdentifier);
    } else if (report.classification === 'device-environment-blocker') {
      classifiedIdentifiers.deviceEnvironmentBlockers.push(
        report.testIdentifier,
      );
    } else {
      classifiedIdentifiers.optionalProviderBlockers.push(
        report.testIdentifier,
      );
    }
  }

  const nextActions: ReleaseDeviceSessionNextAction[] = [];

  if (classifiedIdentifiers.reproducibleProductDefects.length > 0) {
    nextActions.push('investigate-reproducible-defects');
  }
  if (classifiedIdentifiers.deviceEnvironmentBlockers.length > 0) {
    nextActions.push('clear-device-environment-blockers');
  }
  if (classifiedIdentifiers.optionalProviderBlockers.length > 0) {
    nextActions.push('preserve-optional-provider-blockers');
  }
  if (classifiedIdentifiers.notRunChecks.length > 0) {
    nextActions.push('complete-not-run-checks');
  }
  if (classifiedIdentifiers.notApplicableChecks.length > 0) {
    nextActions.push('review-not-applicable-scope');
  }
  nextActions.push('close-session-evidence');

  return {
    totalAssigned: reports.length,
    outcomeCounts,
    identifiers: classifiedIdentifiers,
    nextActions,
    approvalState: 'not-determined-by-summary',
  };
}

export function getReleaseDeviceSessionSummaryCopy(): ReleaseDeviceSessionSummaryCopy {
  return releaseDeviceSessionSummaryCopy;
}

export function getReleaseDeviceSessionNextActionCopy(
  action: ReleaseDeviceSessionNextAction,
): ReleaseDeviceSessionNextActionCopy {
  return releaseDeviceSessionSummaryCopy.nextActionCopy[action];
}

export function isReleaseDeviceSessionSummaryBalanced(
  summary: ReleaseDeviceSessionSummary,
): boolean {
  const countTotal = RELEASE_DEVICE_SESSION_SUMMARY_OUTCOME_ORDER.reduce(
    (total, outcome) => total + summary.outcomeCounts[outcome],
    0,
  );

  const identifierTotal =
    summary.identifiers.reproducibleProductDefects.length +
    summary.identifiers.deviceEnvironmentBlockers.length +
    summary.identifiers.optionalProviderBlockers.length +
    summary.identifiers.passedChecks.length +
    summary.identifiers.notRunChecks.length +
    summary.identifiers.notApplicableChecks.length;

  return (
    summary.totalAssigned === countTotal &&
    summary.totalAssigned === identifierTotal &&
    summary.approvalState === 'not-determined-by-summary'
  );
}
