/**
 * Astrology Preview Device Check Copy
 *
 * Typed, content-only guidance for the remaining hands-on Mac, browser,
 * simulator, and device checks. Every item starts as not run. A pass or fail
 * requires actual device execution with approved synthetic inputs and a
 * sanitized observation.
 */

import type { AstrologyPreviewPublicErrorCode } from './astrologyPreviewTroubleshooting';

export type AstrologyPreviewDeviceCheckId =
  | 'voiceover'
  | 'keyboard-focus'
  | 'appearance-zoom'
  | 'offline-recovery'
  | 'relaunch-persistence'
  | 'local-deletion'
  | 'dst-timezone';

export type AstrologyPreviewDeviceCheckOutcome =
  | 'not-run'
  | 'pass'
  | 'fail'
  | 'blocked'
  | 'not-applicable';

export type AstrologyPreviewDeviceTestCaseId =
  | 'TC-A11Y-01'
  | 'TC-A11Y-02'
  | 'TC-A11Y-03'
  | 'TC-A11Y-04'
  | 'TC-A11Y-05'
  | 'TC-ERR-02'
  | 'TC-PERSIST-01'
  | 'TC-PERSIST-02'
  | 'TC-PERSIST-03'
  | 'TC-DEL-01'
  | 'TC-DEL-02'
  | 'TC-DEL-03'
  | 'TC-DEL-05'
  | 'TC-TIME-02'
  | 'TC-TIME-05'
  | 'TC-TIME-07';

export type AstrologyPreviewApprovedSyntheticProfileId =
  | 'synthetic-date-only'
  | 'synthetic-timed-standard'
  | 'synthetic-leap-year';

export interface AstrologyPreviewDeviceCheckEntry {
  /** Stable device-check identifier. */
  id: AstrologyPreviewDeviceCheckId;
  /** User-facing check title. */
  title: string;
  /** Short status-list label. */
  shortTitle: string;
  /** Why hands-on execution is still required. */
  purpose: string;
  /** Existing Mac matrix cases covered by the check. */
  relatedTestCases: readonly AstrologyPreviewDeviceTestCaseId[];
  /** Approved fictitious profiles permitted for the check. */
  syntheticProfileIds: readonly AstrologyPreviewApprovedSyntheticProfileId[];
  /** Concise operator actions. */
  steps: readonly string[];
  /** Observable behavior to evaluate. */
  expectedObservation: string;
  /** Safe evidence instruction. */
  evidenceInstruction: string;
  /** Default until hands-on execution occurs. */
  initialOutcome: 'not-run';
  /** Screen-reader description of the check. */
  accessibilityLabel: string;
}

export type AstrologyPreviewDeviceCheckResult =
  | {
      checkId: AstrologyPreviewDeviceCheckId;
      outcome: 'not-run' | 'blocked' | 'not-applicable';
      testCaseIds: readonly AstrologyPreviewDeviceTestCaseId[];
      publicErrorCode?: AstrologyPreviewPublicErrorCode;
      sanitizedObservation?: string;
    }
  | {
      checkId: AstrologyPreviewDeviceCheckId;
      outcome: 'pass' | 'fail';
      /** Prevents a pass or fail claim based only on docs or automated tests. */
      deviceExecuted: true;
      testCaseIds: readonly AstrologyPreviewDeviceTestCaseId[];
      publicErrorCode?: AstrologyPreviewPublicErrorCode;
      sanitizedObservation: string;
    };

export interface AstrologyPreviewDeviceCheckBundle {
  title: string;
  subtitle: string;
  executionReminder: string;
  evidenceReminder: string;
  orderedChecks: readonly AstrologyPreviewDeviceCheckId[];
  checks: Record<AstrologyPreviewDeviceCheckId, AstrologyPreviewDeviceCheckEntry>;
  allowedOutcomes: readonly AstrologyPreviewDeviceCheckOutcome[];
  allowedEvidenceFields: readonly [
    'testCaseIds',
    'publicErrorCode',
    'sanitizedObservation',
  ];
  outOfScope: readonly string[];
}

export const ASTROLOGY_PREVIEW_DEVICE_CHECK_ORDER: readonly AstrologyPreviewDeviceCheckId[] = [
  'voiceover',
  'keyboard-focus',
  'appearance-zoom',
  'offline-recovery',
  'relaunch-persistence',
  'local-deletion',
  'dst-timezone',
] as const;

export const ASTROLOGY_PREVIEW_DEVICE_CHECKS: Record<
  AstrologyPreviewDeviceCheckId,
  AstrologyPreviewDeviceCheckEntry
> = {
  voiceover: {
    id: 'voiceover',
    title: 'VoiceOver Labels & Announcements',
    shortTitle: 'VoiceOver',
    purpose:
      'Confirm spoken labels, expanded states, validation messages, and progress updates on the assigned Apple surface.',
    relatedTestCases: ['TC-A11Y-01', 'TC-A11Y-02', 'TC-A11Y-03'],
    syntheticProfileIds: ['synthetic-date-only'],
    steps: [
      'Enable VoiceOver on the assigned Mac or simulator before opening the Astrology form.',
      'Move through form controls and help toggles, then trigger one synthetic validation message.',
      'If provider testing is assigned, listen to one calculation status update.',
    ],
    expectedObservation:
      'Controls have understandable names, help toggles announce expanded or collapsed state, and new validation or status text is announced without trapping focus.',
    evidenceInstruction:
      'Record the TC-A11Y case id and a brief text observation naming only the affected interface control.',
    initialOutcome: 'not-run',
    accessibilityLabel:
      'Device check for VoiceOver control labels, expanded states, and live status announcements.',
  },

  'keyboard-focus': {
    id: 'keyboard-focus',
    title: 'Keyboard & Focus Order',
    shortTitle: 'Keyboard Focus',
    purpose:
      'Confirm the browser form and actions can be reached and operated in a coherent sequence without pointer input.',
    relatedTestCases: ['TC-A11Y-05'],
    syntheticProfileIds: ['synthetic-date-only'],
    steps: [
      'Use the keyboard to move from the first field through help controls, consent, calculation, and deletion actions.',
      'Open and close a help panel, correct one synthetic validation issue, and continue navigating.',
    ],
    expectedObservation:
      'Focus proceeds in a usable order, remains visible, and does not become trapped or disappear after help or validation changes.',
    evidenceInstruction:
      'Record TC-A11Y-05 and a sanitized text observation identifying the control where focus behavior changed, if any.',
    initialOutcome: 'not-run',
    accessibilityLabel:
      'Browser device check for keyboard operation and visible focus order.',
  },

  'appearance-zoom': {
    id: 'appearance-zoom',
    title: 'Light, Dark & Zoom Readability',
    shortTitle: 'Theme & Zoom',
    purpose:
      'Check that content remains readable and operable across appearance modes and enlarged browser or device text.',
    relatedTestCases: ['TC-A11Y-04'],
    syntheticProfileIds: ['synthetic-date-only'],
    steps: [
      'Review the form and one expanded help panel in light and dark appearance.',
      'Increase browser zoom or the assigned device text size and revisit form controls, disclosures, and action buttons.',
    ],
    expectedObservation:
      'Text and controls retain readable contrast, selected and error states remain distinguishable, and content does not clip or block required actions.',
    evidenceInstruction:
      'Record TC-A11Y-04 and a concise sanitized observation; describe the affected label or region without attaching a capture.',
    initialOutcome: 'not-run',
    accessibilityLabel:
      'Device check for Astrology screen readability in light mode, dark mode, and enlarged display settings.',
  },

  'offline-recovery': {
    id: 'offline-recovery',
    title: 'Offline Recovery',
    shortTitle: 'Offline',
    purpose:
      'Verify a disconnected request produces understandable recovery guidance without clearing the synthetic draft.',
    relatedTestCases: ['TC-ERR-02'],
    syntheticProfileIds: ['synthetic-date-only'],
    steps: [
      'Load the assigned Preview and complete the form with the approved synthetic date-only profile.',
      'Use the assigned device or browser network control to go offline, then submit once.',
      'Confirm the message and retained draft before restoring the connection.',
    ],
    expectedObservation:
      'The app presents an offline recovery message, preserves the synthetic form entries, and remains usable after connectivity returns.',
    evidenceInstruction:
      'Record TC-ERR-02, any displayed public error code, and a sanitized observation of the message and form state.',
    initialOutcome: 'not-run',
    accessibilityLabel:
      'Device check for offline error recovery and preservation of synthetic form entries.',
  },

  'relaunch-persistence': {
    id: 'relaunch-persistence',
    title: 'Relaunch Persistence',
    shortTitle: 'Persistence',
    purpose:
      'Confirm a successfully saved synthetic Astrology result restores after relaunch while calculation coordinates do not.',
    relatedTestCases: ['TC-PERSIST-01', 'TC-PERSIST-02', 'TC-PERSIST-03'],
    syntheticProfileIds: ['synthetic-timed-standard'],
    steps: [
      'Complete one successful timed calculation with the approved synthetic profile when provider testing is available.',
      'Reload the browser or relaunch the assigned app surface, then return to Astrology.',
      'Review restored profile and result state and confirm coordinate fields remain empty.',
    ],
    expectedObservation:
      'The locally saved synthetic profile and chart return with their precision, placements, and aspects, while latitude and longitude do not return.',
    evidenceInstruction:
      'Record the TC-PERSIST case ids and a sanitized structural observation without copying profile values or chart content.',
    initialOutcome: 'not-run',
    accessibilityLabel:
      'Device check for local Astrology persistence after relaunch and non-restoration of coordinates.',
  },

  'local-deletion': {
    id: 'local-deletion',
    title: 'Destructive Local Astrology Deletion',
    shortTitle: 'Local Deletion',
    purpose:
      'Confirm the destructive prompt and removal of synthetic Astrology state on the assigned device or browser.',
    relatedTestCases: ['TC-DEL-01', 'TC-DEL-02', 'TC-DEL-03', 'TC-DEL-05'],
    syntheticProfileIds: ['synthetic-date-only', 'synthetic-timed-standard'],
    steps: [
      'Open the local Astrology deletion action after completing the assigned synthetic checks.',
      'Review the scope and external-processing limitation, then confirm deletion.',
      'Reload or relaunch and return to Astrology.',
    ],
    expectedObservation:
      'The confirmation clearly scopes deletion to local Astrology data, and the synthetic profile, chart, reflection, coordinates, and consent state remain cleared after relaunch.',
    evidenceInstruction:
      'Record the TC-DEL case ids and a sanitized observation of Astrology state only; do not open or inspect dream journals.',
    initialOutcome: 'not-run',
    accessibilityLabel:
      'Device check for destructive confirmation and persistent deletion of local synthetic Astrology data.',
  },

  'dst-timezone': {
    id: 'dst-timezone',
    title: 'Timezone & DST Guidance Spot Check',
    shortTitle: 'Timezone & DST',
    purpose:
      'Confirm valid timed input accepts an approved IANA timezone and explains historical clock and daylight-saving uncertainty.',
    relatedTestCases: ['TC-TIME-02', 'TC-TIME-05', 'TC-TIME-07'],
    syntheticProfileIds: ['synthetic-timed-standard', 'synthetic-leap-year'],
    steps: [
      'Use an approved timed synthetic profile with its supplied IANA timezone.',
      'Open the birth-time and timezone help, then review the historical clock and daylight-saving explanation.',
      'If calculation is available, confirm the result uses date-time-timezone precision.',
    ],
    expectedObservation:
      'The valid IANA timezone is accepted, help copy describes historical timezone and daylight-saving uncertainty, and any successful result shows the expected timed precision.',
    evidenceInstruction:
      'Record the TC-TIME case ids and a sanitized observation of labels, help text, validation, and precision only.',
    initialOutcome: 'not-run',
    accessibilityLabel:
      'Device spot check for IANA timezone input and historical daylight-saving uncertainty guidance.',
  },
};

export const ASTROLOGY_PREVIEW_DEVICE_CHECK_OUTCOMES: readonly AstrologyPreviewDeviceCheckOutcome[] = [
  'not-run',
  'pass',
  'fail',
  'blocked',
  'not-applicable',
] as const;

export const ASTROLOGY_PREVIEW_DEVICE_CHECK_BUNDLE: AstrologyPreviewDeviceCheckBundle = {
  title: 'Astrology Preview Device Checks',
  subtitle:
    'Concise hands-on checks that remain unverified until executed on the assigned Mac, browser, simulator, or device.',
  executionReminder:
    'Every check begins as not run. Mark pass or fail only after hands-on execution with an approved synthetic profile on the assigned surface.',
  evidenceReminder:
    'Record only test-case ids, displayed public error codes, and brief sanitized observations. Do not attach images, recordings, exports, request data, or private logs.',
  orderedChecks: ASTROLOGY_PREVIEW_DEVICE_CHECK_ORDER,
  checks: ASTROLOGY_PREVIEW_DEVICE_CHECKS,
  allowedOutcomes: ASTROLOGY_PREVIEW_DEVICE_CHECK_OUTCOMES,
  allowedEvidenceFields: [
    'testCaseIds',
    'publicErrorCode',
    'sanitizedObservation',
  ],
  outOfScope: [
    'Private Preview links, invitations, access values, or browser session data',
    'Credentials, tokens, authorization headers, cookies, or private logs',
    'Real birth dates, times, locations, coordinates, or identifying records',
    'Dream journal text, audio, tags, analyses, or personal reflections',
    'Production activation, deployment changes, or provider configuration',
    'Pass claims based only on documentation, automated tests, or another surface',
  ],
};

export function getAstrologyPreviewDeviceCheckBundle(): AstrologyPreviewDeviceCheckBundle {
  return ASTROLOGY_PREVIEW_DEVICE_CHECK_BUNDLE;
}

export function getAstrologyPreviewDeviceCheck(
  id: AstrologyPreviewDeviceCheckId,
): AstrologyPreviewDeviceCheckEntry {
  return ASTROLOGY_PREVIEW_DEVICE_CHECKS[id];
}

export function getAllAstrologyPreviewDeviceChecks(): AstrologyPreviewDeviceCheckEntry[] {
  return ASTROLOGY_PREVIEW_DEVICE_CHECK_ORDER.map(
    id => ASTROLOGY_PREVIEW_DEVICE_CHECKS[id],
  );
}

export function getAstrologyPreviewDeviceChecksByTestCase(
  testCaseId: AstrologyPreviewDeviceTestCaseId,
): AstrologyPreviewDeviceCheckEntry[] {
  return getAllAstrologyPreviewDeviceChecks().filter(check =>
    check.relatedTestCases.includes(testCaseId),
  );
}

export function isExecutedAstrologyPreviewDeviceResult(
  result: AstrologyPreviewDeviceCheckResult,
): result is Extract<
  AstrologyPreviewDeviceCheckResult,
  { outcome: 'pass' | 'fail' }
> {
  return result.outcome === 'pass' || result.outcome === 'fail';
}

export function isRecognizedAstrologyPreviewDeviceCheckId(
  value: unknown,
): value is AstrologyPreviewDeviceCheckId {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_DEVICE_CHECK_ORDER.includes(
      value as AstrologyPreviewDeviceCheckId,
    )
  );
}

export function isRecognizedAstrologyPreviewDeviceCheckOutcome(
  value: unknown,
): value is AstrologyPreviewDeviceCheckOutcome {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_DEVICE_CHECK_OUTCOMES.includes(
      value as AstrologyPreviewDeviceCheckOutcome,
    )
  );
}
