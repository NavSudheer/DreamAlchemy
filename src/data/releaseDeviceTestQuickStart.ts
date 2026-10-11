import type {
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseDeviceQuickStartPhase =
  | 'build-confirmation'
  | 'safe-test-setup'
  | 'core-smoke'
  | 'native-voice'
  | 'subscription-sandbox'
  | 'persistence-relaunch'
  | 'accessibility-layout'
  | 'optional-feature-boundaries'
  | 'sanitized-outcomes'
  | 'closeout';

export interface ReleaseDeviceQuickStartStep {
  id: string;
  order: number;
  phase: ReleaseDeviceQuickStartPhase;
  title: string;
  estimatedMinutes: number;
  instruction: string;
  observe: readonly string[];
  outcomeRule: string;
  initialOutcome: 'not-run';
  assignedTestIdentifiers: readonly ReleaseDeviceTestIdentifier[];
  boundary: string;
}

export interface ReleaseDeviceTestQuickStart {
  title: string;
  subtitle: string;
  scopeReminder: string;
  identifierReminder: string;
  executionReminder: string;
  evidenceReminder: string;
  orderedPhases: readonly ReleaseDeviceQuickStartPhase[];
  allowedOutcomes: readonly ReleaseDeviceTestOutcome[];
  steps: readonly ReleaseDeviceQuickStartStep[];
  prohibitedContent: readonly string[];
  closeoutStatement: string;
}

export const RELEASE_DEVICE_QUICK_START_PHASES = [
  'build-confirmation',
  'safe-test-setup',
  'core-smoke',
  'native-voice',
  'subscription-sandbox',
  'persistence-relaunch',
  'accessibility-layout',
  'optional-feature-boundaries',
  'sanitized-outcomes',
  'closeout',
] as const satisfies readonly ReleaseDeviceQuickStartPhase[];

export const RELEASE_DEVICE_QUICK_START_STEPS = [
  {
    id: 'confirm-assigned-candidate',
    order: 1,
    phase: 'build-confirmation',
    title: 'Confirm the assigned candidate',
    estimatedMinutes: 2,
    instruction:
      'Open the owner test brief and confirm that the installed Mac or iOS build matches the assigned public version and short build reference.',
    observe: [
      'The expected app name and icon are present.',
      'The public version and approved short build reference match the test brief.',
    ],
    outcomeRule:
      'Keep the session not run if the candidate cannot be confirmed; record a device or environment blocker if the assigned build is unavailable.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not record private install locations, account details, access links, or signing information.',
  },
  {
    id: 'prepare-safe-test-inputs',
    order: 2,
    phase: 'safe-test-setup',
    title: 'Prepare approved test inputs',
    estimatedMinutes: 2,
    instruction:
      'Use only the approved non-personal fixture, neutral voice phrase, and sandbox test account assigned for this pass.',
    observe: [
      'No personal dream or birth information is needed for the session.',
      'The sandbox account is available without copying its access details into notes.',
    ],
    outcomeRule:
      'Mark setup blocked if an approved fixture or sandbox account is required but unavailable; do not substitute personal information.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not copy fixture text, birth data, credentials, recovery details, or account identifiers into the outcome record.',
  },
  {
    id: 'run-core-journal-smoke',
    order: 3,
    phase: 'core-smoke',
    title: 'Run the journal-to-analysis-to-history smoke',
    estimatedMinutes: 5,
    instruction:
      'Using the approved non-personal fixture, complete the assigned journal entry, analysis, saved-history, reopen, and return-navigation path.',
    observe: [
      'Each required screen can be reached in the assigned order.',
      'Loading, completion, error, and return states remain understandable.',
      'The saved test record appears in the expected history location.',
    ],
    outcomeRule:
      'Record pass or fail only after completing the assigned hands-on path. Use the existing identifier from the owner checklist, not a new identifier.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not put the fixture text, analysis result, or saved record content in the report.',
  },
  {
    id: 'run-native-voice-checks',
    order: 4,
    phase: 'native-voice',
    title: 'Run native voice and permission checks',
    estimatedMinutes: 5,
    instruction:
      'On the assigned iOS device, use the approved neutral phrase to exercise permission approval, denial and recovery, recording, transcription, stop or cancel, and app backgrounding as assigned.',
    observe: [
      'Permission prompts and recovery guidance match the action taken.',
      'Recording, transcription, stopping, cancellation, and background transitions remain controllable.',
      'A denied or interrupted path does not silently claim success.',
    ],
    outcomeRule:
      'Leave unexecuted voice paths not run. Distinguish a reproducible app mismatch from unavailable device permissions or environment capability.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not record or report dream content, voice recordings, transcripts, device account details, or diagnostic output.',
  },
  {
    id: 'run-subscription-sandbox-checks',
    order: 5,
    phase: 'subscription-sandbox',
    title: 'Run subscription sandbox checks',
    estimatedMinutes: 6,
    instruction:
      'Use the assigned sandbox environment and test account to exercise only the purchase, restore, cancellation, entitlement refresh, expiry, and trial paths included in the brief.',
    observe: [
      'The visible entitlement state follows each completed sandbox action.',
      'Restore and refresh provide understandable progress and recovery behavior.',
      'Failed or cancelled actions do not incorrectly consume a trial or imply entitlement.',
    ],
    outcomeRule:
      'Classify sandbox or account unavailability as a device or environment blocker; record fail only for reproducible available product behavior.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not include account identifiers, credentials, receipts, product identifiers, prices, transaction details, or payloads in evidence.',
  },
  {
    id: 'check-persistence-after-relaunch',
    order: 6,
    phase: 'persistence-relaunch',
    title: 'Check persistence and relaunch',
    estimatedMinutes: 4,
    instruction:
      'After completing the assigned core checks, close and relaunch the app, then revisit the expected local state and navigation destinations.',
    observe: [
      'State intended to persist remains available after relaunch.',
      'Transient progress, errors, and dismissed controls do not return unexpectedly.',
      'Existing saved test records remain reachable without exposing their content in evidence.',
    ],
    outcomeRule:
      'Pass or fail requires the actual relaunch. Keep the item not run if only in-session behavior was reviewed.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not transcribe stored records or attach storage, database, log, or payload output.',
  },
  {
    id: 'check-accessibility-and-layout',
    order: 7,
    phase: 'accessibility-layout',
    title: 'Check accessibility and layout',
    estimatedMinutes: 5,
    instruction:
      'On the assigned surfaces, complete the brief’s VoiceOver, keyboard or switch, larger-text, light and dark appearance, rotation, and supported iPhone or iPad layout checks.',
    observe: [
      'Required controls have understandable names, states, focus, and reading order.',
      'Text and controls remain readable and operable at the assigned size and appearance.',
      'Content reflows without hiding required actions or creating unintended taps.',
    ],
    outcomeRule:
      'Record only checks executed hands-on. Keep unavailable device-specific checks not run or blocked, never inferred as pass.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Use sanitized text observations only; do not attach screen captures or identify device accounts.',
  },
  {
    id: 'preserve-astrology-boundary',
    order: 8,
    phase: 'optional-feature-boundaries',
    title: 'Preserve the Astrology boundary',
    estimatedMinutes: 1,
    instruction:
      'Treat Astrology as private Preview scope only and exercise only an explicitly assigned existing matrix case with approved synthetic inputs.',
    observe: [
      'Unassigned or Production-dependent behavior remains outside the owner device pass.',
      'Provider or Preview unavailability is recorded as a blocker rather than a product failure.',
    ],
    outcomeRule:
      'Use only a pre-existing assigned Astrology matrix identifier. Do not create an identifier or claim a case passed before execution.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not include birth data, coordinates, private Preview locations, provider details, or Production claims.',
  },
  {
    id: 'preserve-dream-image-boundary',
    order: 9,
    phase: 'optional-feature-boundaries',
    title: 'Preserve the Dream Image boundary',
    estimatedMinutes: 1,
    instruction:
      'Limit Dream Image review to assigned provider-neutral preparation cases and the expected disabled state.',
    observe: [
      'Catalog preparation remains separate from unavailable live generation.',
      'Every provider-dependent item remains blocked unless a later approved test plan changes the scope.',
    ],
    outcomeRule:
      'Use only a pre-existing assigned TC-IMG or BLK-IMG identifier. Do not claim generation or a pass for an unexecuted case.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not enter dream content, create or attach media, select a provider, or attempt live generation.',
  },
  {
    id: 'record-sanitized-outcomes',
    order: 10,
    phase: 'sanitized-outcomes',
    title: 'Record sanitized outcomes',
    estimatedMinutes: 3,
    instruction:
      'For each assigned check, copy its existing identifier and record pass, fail, blocked, not run, or not applicable with a brief sanitized text observation where required.',
    observe: [
      'A fail describes a reproducible mismatch in available product behavior.',
      'A blocker identifies device or environment limits separately from optional-provider limits.',
      'Unexecuted checks remain not run and no new test identifier is introduced.',
    ],
    outcomeRule:
      'Do not record a pass or fail without hands-on execution on the assigned surface.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Evidence is limited to an existing assigned identifier and a short sanitized text observation.',
  },
  {
    id: 'close-out-owner-session',
    order: 11,
    phase: 'closeout',
    title: 'Close out the owner session',
    estimatedMinutes: 2,
    instruction:
      'Review every assigned item, remove temporary unsafe notes, close private or sandbox sessions, and list only unresolved identifiers with sanitized observations.',
    observe: [
      'Every assigned item has one allowed outcome.',
      'Temporary credentials, private locations, and prohibited artifacts are not retained.',
      'The record states that device outcomes do not constitute launch approval.',
    ],
    outcomeRule:
      'Session closeout confirms accounting and cleanup only; it does not convert pending items to pass or authorize release.',
    initialOutcome: 'not-run',
    assignedTestIdentifiers: [],
    boundary:
      'Do not include or retain prohibited content, and do not make launch, submission, or Production approval claims.',
  },
] as const satisfies readonly ReleaseDeviceQuickStartStep[];

export const releaseDeviceTestQuickStart: ReleaseDeviceTestQuickStart = {
  title: 'Owner Mac and iOS device-test quick-start',
  subtitle:
    'An ordered first pass for the frozen candidate, with optional-provider work kept outside the core session.',
  scopeReminder:
    'Follow the assigned owner checklist and candidate build. This guide does not add test cases or expand release scope.',
  identifierReminder:
    'Copy only identifiers that already exist in the assigned checklist or approved matrix. This guide intentionally invents none.',
  executionReminder:
    'Every step starts not run. Pass and fail require hands-on execution on the assigned Mac or iOS surface.',
  evidenceReminder:
    'Keep evidence to the existing assigned identifier and a brief sanitized text observation.',
  orderedPhases: RELEASE_DEVICE_QUICK_START_PHASES,
  allowedOutcomes: [
    'pass',
    'fail',
    'blocked',
    'not-run',
    'not-applicable',
  ],
  steps: RELEASE_DEVICE_QUICK_START_STEPS,
  prohibitedContent: [
    'Dream content, journal text, voice recordings, transcripts, tags, analyses, or personal reflections',
    'Real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Generated media, media links, exports, or descriptions of generated media',
    'Private Preview, install, invitation, or access links and details',
    'Credentials, tokens, headers, cookies, receipts, account details, or private configuration',
    'Console output, logs, traces, crash dumps, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Launch, release, submission, or Production approval claims',
  ],
  closeoutStatement:
    'Completing this quick-start records device evidence only. It does not approve launch, submission, Production activation, or an optional provider.',
};

export function getReleaseDeviceTestQuickStart(): ReleaseDeviceTestQuickStart {
  return releaseDeviceTestQuickStart;
}

export function getReleaseDeviceQuickStartStep(
  id: string,
): ReleaseDeviceQuickStartStep | undefined {
  return releaseDeviceTestQuickStart.steps.find((step) => step.id === id);
}

export function getReleaseDeviceQuickStartStepsByPhase(
  phase: ReleaseDeviceQuickStartPhase,
): readonly ReleaseDeviceQuickStartStep[] {
  return releaseDeviceTestQuickStart.steps.filter(
    (step) => step.phase === phase,
  );
}

export function getReleaseDeviceQuickStartEstimatedMinutes(): number {
  return releaseDeviceTestQuickStart.steps.reduce(
    (total, step) => total + step.estimatedMinutes,
    0,
  );
}
