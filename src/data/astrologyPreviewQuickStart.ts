/**
 * Astrology Preview Quick Start
 *
 * A typed, content-only five-minute path for private browser testing. It uses
 * approved synthetic profiles and observable app behavior only. Production
 * changes, private access links, credentials, real birth data, and dream
 * content are explicitly outside scope.
 */

export type AstrologyPreviewQuickStartStepId =
  | 'open-preview'
  | 'prepare-synthetic-profiles'
  | 'run-date-only'
  | 'run-timed'
  | 'optional-reflection'
  | 'verify-local-deletion'
  | 'record-safe-result';

export type AstrologyPreviewQuickStartRequirement =
  | 'required'
  | 'conditional';

export type AstrologyPreviewQuickStartOutcome =
  | 'complete'
  | 'blocked'
  | 'skipped';

export interface AstrologyPreviewQuickStartStep {
  /** Stable step identifier. */
  id: AstrologyPreviewQuickStartStepId;
  /** One-based display order. */
  step: number;
  /** Short action title. */
  title: string;
  /** Approximate time allocated within the five-minute pass. */
  estimatedSeconds: number;
  /** Plain-language action for the private tester. */
  instruction: string;
  /** Observable completion check. */
  successCheck: string;
  /** Required or conditional session status. */
  requirement: AstrologyPreviewQuickStartRequirement;
  /** When a conditional step applies. */
  condition?: string;
  /** Safe next action if the step cannot complete. */
  blockedAction: string;
  /** Related cases in the Mac test matrix. */
  relatedTestCases: readonly string[];
}

export interface AstrologyPreviewQuickStartProfileRef {
  id: 'synthetic-date-only' | 'synthetic-timed-standard';
  label: string;
  expectedPrecision: 'date-only' | 'date-time-timezone';
  useForStep: Extract<
    AstrologyPreviewQuickStartStepId,
    'run-date-only' | 'run-timed'
  >;
}

export interface AstrologyPreviewQuickStartBundle {
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  startReminder: string;
  reportingReminder: string;
  profileRefs: readonly AstrologyPreviewQuickStartProfileRef[];
  steps: readonly AstrologyPreviewQuickStartStep[];
  allowedOutcomes: readonly AstrologyPreviewQuickStartOutcome[];
  outOfScope: readonly string[];
}

export const ASTROLOGY_PREVIEW_QUICK_START_PROFILES: readonly AstrologyPreviewQuickStartProfileRef[] = [
  {
    id: 'synthetic-date-only',
    label: 'Approved Date-Only Profile',
    expectedPrecision: 'date-only',
    useForStep: 'run-date-only',
  },
  {
    id: 'synthetic-timed-standard',
    label: 'Approved Timed Profile',
    expectedPrecision: 'date-time-timezone',
    useForStep: 'run-timed',
  },
] as const;

export const ASTROLOGY_PREVIEW_QUICK_START_STEPS: readonly AstrologyPreviewQuickStartStep[] = [
  {
    id: 'open-preview',
    step: 1,
    title: 'Open the assigned Preview',
    estimatedSeconds: 30,
    instruction:
      'Open the private Preview already assigned for this browser session and confirm that DreamAlchemy loads.',
    successCheck:
      'The Astrology screen opens in the expected Preview build.',
    requirement: 'required',
    blockedAction:
      'Mark the pass blocked and report that the assigned Preview did not open. Do not copy or share its access location.',
    relatedTestCases: [],
  },
  {
    id: 'prepare-synthetic-profiles',
    step: 2,
    title: 'Use the approved synthetic profiles',
    estimatedSeconds: 30,
    instruction:
      'Locate the approved date-only and timed sample profiles in the tester guidance. Use those fictitious values exactly as supplied.',
    successCheck:
      'Both synthetic profile identifiers are ready, with no personal information entered.',
    requirement: 'required',
    blockedAction:
      'Stop and request the approved synthetic profile guidance before continuing.',
    relatedTestCases: ['TC-TIME-01', 'TC-TIME-02', 'TC-TIME-05'],
  },
  {
    id: 'run-date-only',
    step: 3,
    title: 'Run the date-only pass',
    estimatedSeconds: 60,
    instruction:
      'Enter the approved date-only profile, leave time and timezone blank, review the disclosure, and submit once if calculation is available.',
    successCheck:
      'A successful result shows date-only precision, omits time-dependent angles and house numbers, and includes a missing-time uncertainty note.',
    requirement: 'conditional',
    condition:
      'Run when provider-connected calculation is available in the assigned private Preview.',
    blockedAction:
      'Record the displayed public error code, mark this step blocked, and continue without repeated submissions.',
    relatedTestCases: ['TC-TIME-01', 'TC-CONSENT-02'],
  },
  {
    id: 'run-timed',
    step: 4,
    title: 'Run the timed pass',
    estimatedSeconds: 60,
    instruction:
      'Replace the form values with the approved timed profile and submit once if calculation is available.',
    successCheck:
      'A successful result shows date-time-timezone precision and keeps provider-returned Ascendant, Midheaven, and available planet house numbers visible.',
    requirement: 'conditional',
    condition:
      'Run when provider-connected calculation is available in the assigned private Preview.',
    blockedAction:
      'Record the displayed public error code, mark this step blocked, and continue without repeated submissions.',
    relatedTestCases: ['TC-TIME-02', 'TC-TIME-05'],
  },
  {
    id: 'optional-reflection',
    step: 5,
    title: 'Optionally request a reflection',
    estimatedSeconds: 45,
    instruction:
      'If a synthetic chart is visible and reflection testing is included, choose the separate reflection action once. Skipping this step is valid.',
    successCheck:
      'If requested, the reflection appears separately from the calculated chart with non-predictive disclosure.',
    requirement: 'conditional',
    condition:
      'Applies only when the tester opts in, a synthetic chart exists, and the Preview reflection service is available.',
    blockedAction:
      'Record the displayed public error code or mark the step skipped; do not recalculate the chart solely to retry reflection.',
    relatedTestCases: ['TC-REFL-01', 'TC-REFL-04'],
  },
  {
    id: 'verify-local-deletion',
    step: 6,
    title: 'Verify local Astrology deletion',
    estimatedSeconds: 60,
    instruction:
      'Use the Astrology deletion control, confirm the scoped prompt, then reload the browser and return to Astrology.',
    successCheck:
      'The synthetic profile, chart, reflection, coordinates, and consent state do not return after reload.',
    requirement: 'required',
    blockedAction:
      'Mark deletion verification failed or blocked and describe only the visible Astrology state that remained.',
    relatedTestCases: ['TC-DEL-01', 'TC-DEL-03', 'TC-DEL-05'],
  },
  {
    id: 'record-safe-result',
    step: 7,
    title: 'Record a safe result',
    estimatedSeconds: 15,
    instruction:
      'Record each step as complete, blocked, or skipped. For failures, include the test case and only the displayed public error code.',
    successCheck:
      'The note contains no submitted field values, private access location, request contents, attachments, or non-public diagnostic details.',
    requirement: 'required',
    blockedAction:
      'Remove unsafe details before sharing the session result.',
    relatedTestCases: [],
  },
] as const;

export const ASTROLOGY_PREVIEW_QUICK_START_OUTCOMES: readonly AstrologyPreviewQuickStartOutcome[] = [
  'complete',
  'blocked',
  'skipped',
] as const;

export const ASTROLOGY_PREVIEW_QUICK_START_BUNDLE: AstrologyPreviewQuickStartBundle = {
  title: 'Five-Minute Astrology Preview Quick Start',
  subtitle:
    'A short private-browser pass using approved synthetic profiles and observable app behavior.',
  estimatedMinutes: 5,
  startReminder:
    'Use only the assigned private Preview and approved synthetic profile identifiers. Stop if either cannot be confirmed.',
  reportingReminder:
    'Report step outcomes, test case ids, and displayed public error codes only. Do not include field values, request contents, private access information, or attachments.',
  profileRefs: ASTROLOGY_PREVIEW_QUICK_START_PROFILES,
  steps: ASTROLOGY_PREVIEW_QUICK_START_STEPS,
  allowedOutcomes: ASTROLOGY_PREVIEW_QUICK_START_OUTCOMES,
  outOfScope: [
    'Production activation, rollout, or deployment changes',
    'Environment, feature-flag, provider, or service configuration',
    'Credentials, tokens, authorization data, or private access links',
    'Real birth dates, times, locations, coordinates, or other personal records',
    'Dream journal text, voice transcripts, tags, analyses, or personal reflections',
    'Astrological advice, diagnosis, prediction, or factual interpretation',
  ],
};

export function getAstrologyPreviewQuickStartBundle(): AstrologyPreviewQuickStartBundle {
  return ASTROLOGY_PREVIEW_QUICK_START_BUNDLE;
}

export function getAstrologyPreviewQuickStartStep(
  id: AstrologyPreviewQuickStartStepId,
): AstrologyPreviewQuickStartStep | undefined {
  return ASTROLOGY_PREVIEW_QUICK_START_STEPS.find(step => step.id === id);
}

export function getAstrologyPreviewQuickStartProfile(
  id: AstrologyPreviewQuickStartProfileRef['id'],
): AstrologyPreviewQuickStartProfileRef | undefined {
  return ASTROLOGY_PREVIEW_QUICK_START_PROFILES.find(profile => profile.id === id);
}

export function getAstrologyPreviewQuickStartEstimatedSeconds(): number {
  return ASTROLOGY_PREVIEW_QUICK_START_STEPS.reduce(
    (total, step) => total + step.estimatedSeconds,
    0,
  );
}

export function isRecognizedAstrologyPreviewQuickStartStep(
  value: unknown,
): value is AstrologyPreviewQuickStartStepId {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_QUICK_START_STEPS.some(step => step.id === value)
  );
}

export function isRecognizedAstrologyPreviewQuickStartOutcome(
  value: unknown,
): value is AstrologyPreviewQuickStartOutcome {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_QUICK_START_OUTCOMES.includes(
      value as AstrologyPreviewQuickStartOutcome,
    )
  );
}
