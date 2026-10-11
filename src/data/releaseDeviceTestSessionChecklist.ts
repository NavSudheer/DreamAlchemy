import type {
  ReleaseDeviceTestClassification,
  ReleaseDeviceTestIdentifier,
  ReleaseDeviceTestOutcome,
} from './releaseDeviceTestOutcomeCopy';

export type ReleaseDeviceSessionPhase =
  | 'preflight-build'
  | 'approved-test-setup'
  | 'core-journal-flow'
  | 'native-voice-permissions'
  | 'subscription-sandbox'
  | 'persistence-relaunch'
  | 'accessibility-layout'
  | 'optional-feature-boundaries'
  | 'sanitized-outcomes'
  | 'closeout';

export type ReleaseDeviceSessionRequirement = 'required' | 'conditional';

export interface ReleaseDeviceSessionPhaseMeta {
  phase: ReleaseDeviceSessionPhase;
  title: string;
  purpose: string;
}

export interface ReleaseDeviceSessionChecklistItem {
  id: string;
  phase: ReleaseDeviceSessionPhase;
  title: string;
  instruction: string;
  observe: readonly string[];
  completionRule: string;
  requirement: ReleaseDeviceSessionRequirement;
  condition?: string;
  initialOutcome: 'not-run';
  boundary: string;
}

export interface ReleaseDeviceSessionChecklistResult {
  itemId: string;
  outcome: ReleaseDeviceTestOutcome;
  classification: ReleaseDeviceTestClassification;
  /** Use only when the assigned approved matrix supplies an existing id. */
  testIdentifier?: ReleaseDeviceTestIdentifier;
  sanitizedObservation?: string;
}

export interface ReleaseDeviceTestSessionChecklist {
  title: string;
  subtitle: string;
  scopeReminder: string;
  identifierReminder: string;
  executionReminder: string;
  evidenceReminder: string;
  orderedPhases: readonly ReleaseDeviceSessionPhase[];
  phases: Readonly<
    Record<ReleaseDeviceSessionPhase, ReleaseDeviceSessionPhaseMeta>
  >;
  items: readonly ReleaseDeviceSessionChecklistItem[];
  allowedOutcomes: readonly ReleaseDeviceTestOutcome[];
  prohibitedSessionContent: readonly string[];
  closeoutBoundary: string;
}

export const RELEASE_DEVICE_SESSION_ORDERED_PHASES = [
  'preflight-build',
  'approved-test-setup',
  'core-journal-flow',
  'native-voice-permissions',
  'subscription-sandbox',
  'persistence-relaunch',
  'accessibility-layout',
  'optional-feature-boundaries',
  'sanitized-outcomes',
  'closeout',
] as const satisfies readonly ReleaseDeviceSessionPhase[];

export const RELEASE_DEVICE_SESSION_PHASES = {
  'preflight-build': {
    phase: 'preflight-build',
    title: 'Preflight build confirmation',
    purpose:
      'Confirm the assigned candidate and device surface before recording any product result.',
  },
  'approved-test-setup': {
    phase: 'approved-test-setup',
    title: 'Approved test setup',
    purpose:
      'Prepare non-personal fixtures and sandbox access without adding private information to session notes.',
  },
  'core-journal-flow': {
    phase: 'core-journal-flow',
    title: 'Core journal, analysis, and history',
    purpose:
      'Exercise the primary saved-record flow and its observable loading, recovery, and navigation behavior.',
  },
  'native-voice-permissions': {
    phase: 'native-voice-permissions',
    title: 'Native voice and permissions',
    purpose:
      'Exercise native permission, recording, transcription, interruption, and recovery paths on the assigned device.',
  },
  'subscription-sandbox': {
    phase: 'subscription-sandbox',
    title: 'Subscription sandbox',
    purpose:
      'Review purchase and entitlement behavior only in the approved sandbox environment.',
  },
  'persistence-relaunch': {
    phase: 'persistence-relaunch',
    title: 'Persistence and relaunch',
    purpose:
      'Verify assigned durable and transient states after an actual close and relaunch.',
  },
  'accessibility-layout': {
    phase: 'accessibility-layout',
    title: 'Accessibility and layout',
    purpose:
      'Review operability, readability, focus, announcements, reflow, and supported device layouts hands-on.',
  },
  'optional-feature-boundaries': {
    phase: 'optional-feature-boundaries',
    title: 'Optional-feature boundaries',
    purpose:
      'Keep Astrology within assigned private Preview cases and Dream Images within provider-neutral preparation.',
  },
  'sanitized-outcomes': {
    phase: 'sanitized-outcomes',
    title: 'Sanitized outcome recording',
    purpose:
      'Classify executed, blocked, pending, and out-of-scope checks without retaining private artifacts.',
  },
  closeout: {
    phase: 'closeout',
    title: 'Session closeout',
    purpose:
      'Account for every assigned item, remove temporary unsafe notes, and end private or sandbox sessions.',
  },
} as const satisfies Readonly<
  Record<ReleaseDeviceSessionPhase, ReleaseDeviceSessionPhaseMeta>
>;

export const RELEASE_DEVICE_SESSION_CHECKLIST_ITEMS = [
  {
    id: 'preflight-confirm-build',
    phase: 'preflight-build',
    title: 'Confirm the assigned build',
    instruction:
      'Compare the installed app’s public version and approved short build reference with the owner session brief.',
    observe: [
      'The expected app name and icon are present.',
      'The public version and approved short build reference match the assigned candidate.',
    ],
    completionRule:
      'Do not begin product checks until the candidate is confirmed. If it cannot be confirmed, retain not run or record a device or environment blocker.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not record install links, signing details, private locations, account data, or configuration values.',
  },
  {
    id: 'preflight-confirm-scope',
    phase: 'preflight-build',
    title: 'Confirm assigned scope and identifiers',
    instruction:
      'Review the owner checklist and approved matrices for the checks assigned to this Mac or iOS session.',
    observe: [
      'Each assigned check has a source in the existing owner checklist or an approved matrix.',
      'Optional-feature and provider boundaries are understood before execution.',
    ],
    completionRule:
      'Use identifiers only when they already exist in the assigned approved matrix; this checklist does not create new identifiers.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not expand scope, change deployment settings, or interpret checklist completion as launch approval.',
  },
  {
    id: 'setup-approved-fixtures',
    phase: 'approved-test-setup',
    title: 'Prepare approved synthetic fixtures',
    instruction:
      'Use the assigned non-personal journal fixture, neutral voice phrase, and any approved optional-feature synthetic profile.',
    observe: [
      'The required fixtures are available without using personal material.',
      'Fixture contents are kept out of session evidence.',
    ],
    completionRule:
      'If an assigned safe fixture is unavailable, record the setup blocker rather than substituting personal content.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not copy dream content, birth data, voice transcripts, or fixture values into notes.',
  },
  {
    id: 'setup-sandbox-account',
    phase: 'approved-test-setup',
    title: 'Prepare the assigned sandbox account',
    instruction:
      'Confirm the approved subscription test account and sandbox environment are available through the assigned secure process.',
    observe: [
      'The sandbox account is clearly separate from a personal or Production account.',
      'No access detail needs to be copied into the outcome record.',
    ],
    completionRule:
      'Record blocked if the assigned sandbox cannot be used; do not create or substitute an unapproved account.',
    requirement: 'conditional',
    condition:
      'Required only when subscription or entitlement checks are assigned to this session.',
    initialOutcome: 'not-run',
    boundary:
      'Do not record credentials, account identifiers, recovery details, receipts, or private configuration.',
  },
  {
    id: 'core-create-and-analyze',
    phase: 'core-journal-flow',
    title: 'Exercise journal entry and analysis',
    instruction:
      'Use the approved non-personal fixture to complete the assigned entry, submission, loading, completion, and return path.',
    observe: [
      'Required controls remain understandable and usable through the full path.',
      'Progress and recovery states do not silently claim completion.',
      'A failed request does not incorrectly consume the assigned trial state.',
    ],
    completionRule:
      'Record pass or fail only after the complete assigned path is exercised hands-on; otherwise keep not run or blocked.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not include journal text, analysis output, request data, response data, or service logs in evidence.',
  },
  {
    id: 'core-history-and-return',
    phase: 'core-journal-flow',
    title: 'Exercise history and return navigation',
    instruction:
      'Open the saved test record from history, move through the assigned detail and return paths, and revisit the list.',
    observe: [
      'The expected saved record is reachable in the assigned history location.',
      'Back and return navigation lead to the expected screens without duplicating or losing the record.',
      'Empty, malformed, or unavailable destinations show understandable recovery where assigned.',
    ],
    completionRule:
      'Base the outcome on observed navigation and state only; do not transcribe the saved content.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not expose saved-record content, identifiers tied to a person, screenshots, or storage artifacts.',
  },
  {
    id: 'voice-permission-lifecycle',
    phase: 'native-voice-permissions',
    title: 'Exercise voice permission lifecycle',
    instruction:
      'On the assigned iOS device, exercise the assigned permission approval, denial, and recovery paths using the approved neutral phrase.',
    observe: [
      'The permission prompt and recovery guidance match the action taken.',
      'Denied or unavailable permission does not start recording or imply success.',
      'Returning after a settings change produces an understandable current state.',
    ],
    completionRule:
      'Distinguish reproducible product behavior from device permission or environment limitations; do not infer a result from documentation.',
    requirement: 'conditional',
    condition:
      'Run on an assigned device where native voice checks are supported and included in the brief.',
    initialOutcome: 'not-run',
    boundary:
      'Do not retain voice recordings, transcripts, permission screenshots, account details, or diagnostic logs.',
  },
  {
    id: 'voice-recording-interruptions',
    phase: 'native-voice-permissions',
    title: 'Exercise recording and interruptions',
    instruction:
      'Use the neutral phrase to exercise recording, transcription, stop, cancel, app backgrounding, and recovery paths assigned to the session.',
    observe: [
      'The visible recording state follows the owner’s action.',
      'Stop and cancel remain distinct and predictable.',
      'Backgrounding or interruption leaves a clear recoverable state.',
    ],
    completionRule:
      'A pass or fail requires hands-on execution of the specific assigned voice path; leave every other path not run.',
    requirement: 'conditional',
    condition:
      'Run only when native voice is available on the assigned device and permission setup permits the target path.',
    initialOutcome: 'not-run',
    boundary:
      'Do not report the spoken phrase or any transcription content.',
  },
  {
    id: 'subscription-purchase-and-restore',
    phase: 'subscription-sandbox',
    title: 'Exercise purchase and restore',
    instruction:
      'In the assigned sandbox, exercise only the purchase, restore, and entitlement-refresh paths listed in the owner brief.',
    observe: [
      'Progress and cancellation states remain understandable.',
      'The visible entitlement changes only after the corresponding sandbox result.',
      'Restore and refresh do not create contradictory access states.',
    ],
    completionRule:
      'Treat sandbox, store, or account unavailability as a device or environment blocker rather than a product failure.',
    requirement: 'conditional',
    condition:
      'Run only when the approved store sandbox and test account are available.',
    initialOutcome: 'not-run',
    boundary:
      'Do not include credentials, account identifiers, product identifiers, prices, receipts, transactions, or payloads.',
  },
  {
    id: 'subscription-cancel-expire-trial',
    phase: 'subscription-sandbox',
    title: 'Exercise cancellation, expiry, and trial behavior',
    instruction:
      'Follow the assigned sandbox sequence for cancellation, entitlement expiry, trial limits, and failed-request behavior.',
    observe: [
      'The visible access state follows the completed sandbox transition.',
      'A failed analysis request does not incorrectly consume a trial use.',
      'Cancellation or expiry guidance does not promise access that is not present.',
    ],
    completionRule:
      'Leave unavailable transitions blocked or not run; do not simulate an outcome outside the approved sandbox flow.',
    requirement: 'conditional',
    condition:
      'Run only for transitions supported by the assigned sandbox account and session brief.',
    initialOutcome: 'not-run',
    boundary:
      'Do not record store account data, transaction evidence, screenshots, logs, or private product configuration.',
  },
  {
    id: 'persistence-close-and-relaunch',
    phase: 'persistence-relaunch',
    title: 'Close and relaunch the app',
    instruction:
      'After completing the assigned core flow, fully close and relaunch the app, then revisit the expected local state and destinations.',
    observe: [
      'State intended to persist remains available after relaunch.',
      'Transient progress, errors, and dismissed controls do not return unexpectedly.',
      'Previously saved test records remain readable through the assigned interface path.',
    ],
    completionRule:
      'Do not claim a persistence result until the actual close and relaunch have been completed on the assigned surface.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not inspect, export, or attach databases, local storage, saved content, logs, or payloads.',
  },
  {
    id: 'accessibility-operability',
    phase: 'accessibility-layout',
    title: 'Review accessibility operability',
    instruction:
      'Complete the brief’s assigned VoiceOver, focus, keyboard or switch, label, state, and announcement checks.',
    observe: [
      'Required controls have understandable names, roles, states, and reading order.',
      'Focus remains visible and predictable where applicable.',
      'Status and error changes are perceivable through the tested access method.',
    ],
    completionRule:
      'Record results only for access methods exercised hands-on; keep unavailable checks not run or blocked.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Record sanitized control-level observations only; do not attach audio, video, or screenshots.',
  },
  {
    id: 'layout-supported-surfaces',
    phase: 'accessibility-layout',
    title: 'Review text, appearance, and layout',
    instruction:
      'Exercise assigned larger-text, light and dark appearance, rotation, narrow-width, iPhone, and iPad layouts.',
    observe: [
      'Text and controls remain readable and operable at the assigned size.',
      'Required actions are not clipped, hidden, or overlapped.',
      'Rotation and reflow do not create unintended taps or loss of context.',
    ],
    completionRule:
      'Base each outcome on the exact device and layout path executed; do not extend one surface’s result to another.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not capture device screens, notifications, account information, or unrelated app content.',
  },
  {
    id: 'optional-astrology-boundary',
    phase: 'optional-feature-boundaries',
    title: 'Preserve the Astrology boundary',
    instruction:
      'Exercise Astrology only when an existing approved matrix identifier is assigned, using its approved synthetic profile in the private Preview scope.',
    observe: [
      'Unassigned and Production-dependent Astrology behavior remains outside this session.',
      'Preview or provider unavailability is recorded as a blocker, not a product failure.',
    ],
    completionRule:
      'Do not create a new test identifier or record a pass before the assigned case is executed.',
    requirement: 'conditional',
    condition:
      'Applies only when a pre-existing Astrology matrix case is included in the owner session brief.',
    initialOutcome: 'not-run',
    boundary:
      'Do not include birth data, coordinates, private Preview links, provider details, credentials, or Production claims.',
  },
  {
    id: 'optional-dream-image-boundary',
    phase: 'optional-feature-boundaries',
    title: 'Preserve the Dream Image boundary',
    instruction:
      'Limit Dream Image review to assigned existing provider-neutral preparation cases and the expected disabled state.',
    observe: [
      'Catalog preparation remains separate from unavailable live generation.',
      'Every provider-dependent item remains blocked within this session.',
    ],
    completionRule:
      'Use only an existing assigned Dream Image matrix or blocker identifier and never claim an unexecuted result.',
    requirement: 'conditional',
    condition:
      'Applies only when an existing Dream Image preparation case is included in the owner session brief.',
    initialOutcome: 'not-run',
    boundary:
      'Do not enter dream content, create or attach media, choose a provider, or attempt live generation.',
  },
  {
    id: 'outcomes-classify-observations',
    phase: 'sanitized-outcomes',
    title: 'Classify each assigned outcome',
    instruction:
      'Mark each item pass, fail, blocked, not run, or not applicable using the release outcome definitions.',
    observe: [
      'Pass and fail are used only after hands-on execution.',
      'Fail is reserved for a reproducible mismatch in available product behavior.',
      'Device or environment blockers remain distinct from optional-provider blockers.',
    ],
    completionRule:
      'Keep an unexecuted applicable item not run and an unavailable dependency blocked; never promote either to pass.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Outcome labels describe device evidence only and do not authorize release or Production activation.',
  },
  {
    id: 'outcomes-sanitize-record',
    phase: 'sanitized-outcomes',
    title: 'Sanitize the outcome record',
    instruction:
      'Where an approved matrix supplies one, copy its existing identifier and add only the brief sanitized observation required by the outcome.',
    observe: [
      'No identifier was invented or modified.',
      'The observation describes visible behavior without including source content or technical artifacts.',
      'No screenshot, recording, export, or attachment is included.',
    ],
    completionRule:
      'Remove prohibited material before the result is shared. If safe evidence is insufficient, keep the item not run or blocked.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Allowed evidence is limited to an existing assigned identifier and brief sanitized text.',
  },
  {
    id: 'closeout-account-for-items',
    phase: 'closeout',
    title: 'Account for every assigned item',
    instruction:
      'Review the owner brief and confirm that every assigned item has one allowed outcome and any required sanitized observation.',
    observe: [
      'Pending checks remain not run rather than assumed successful.',
      'Blockers and reproducible product defects are listed separately.',
      'Optional-feature scope remains unchanged.',
    ],
    completionRule:
      'Session completeness means all assigned items are accounted for; it does not mean all items passed.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not convert coverage status into launch, submission, provider, or Production approval.',
  },
  {
    id: 'closeout-remove-unsafe-material',
    phase: 'closeout',
    title: 'End sessions and remove unsafe material',
    instruction:
      'Close private and sandbox sessions and remove temporary notes that are not part of the sanitized outcome record.',
    observe: [
      'No private access detail or credential remains in the report.',
      'No content, media, payload, log, screenshot, or attachment was retained.',
      'Only approved sanitized text outcomes remain for handoff.',
    ],
    completionRule:
      'Record closeout as an administrative completion only; it does not establish release readiness.',
    requirement: 'required',
    initialOutcome: 'not-run',
    boundary:
      'Do not retain or share any prohibited session material.',
  },
] as const satisfies readonly ReleaseDeviceSessionChecklistItem[];

export const releaseDeviceTestSessionChecklist: ReleaseDeviceTestSessionChecklist = {
  title: 'Owner Mac and iOS test session checklist',
  subtitle:
    'A privacy-safe sequence for hands-on testing of the assigned frozen candidate.',
  scopeReminder:
    'Follow the owner brief and approved matrices exactly. This checklist does not add cases, enable optional providers, or expand release scope.',
  identifierReminder:
    'Use a test identifier only when it already exists in an assigned approved matrix. Core owner-checklist items without matrix identifiers must not be given invented ids.',
  executionReminder:
    'Every item begins not run. Pass and fail require hands-on execution on the assigned Mac or iOS surface.',
  evidenceReminder:
    'Record only an existing assigned identifier where applicable and a brief sanitized text observation.',
  orderedPhases: RELEASE_DEVICE_SESSION_ORDERED_PHASES,
  phases: RELEASE_DEVICE_SESSION_PHASES,
  items: RELEASE_DEVICE_SESSION_CHECKLIST_ITEMS,
  allowedOutcomes: [
    'pass',
    'fail',
    'blocked',
    'not-run',
    'not-applicable',
  ],
  prohibitedSessionContent: [
    'Dream content, journal text, voice recordings, transcripts, tags, analyses, or personal reflections',
    'Real birth dates, times, locations, coordinates, profiles, or identifiers',
    'Generated media, media links, exports, or descriptions of generated media',
    'Private Preview, install, invitation, or access links and details',
    'Credentials, tokens, headers, cookies, receipts, account details, or private configuration',
    'Console output, logs, traces, crash dumps, diagnostic archives, or request and response payloads',
    'Screenshots, screen recordings, or other attachments',
    'Launch, release, submission, provider, or Production approval claims',
  ],
  closeoutBoundary:
    'A completed device session records evidence and remaining work only. It does not approve launch, submission, Production activation, or an optional provider.',
};

export function getReleaseDeviceTestSessionChecklist(): ReleaseDeviceTestSessionChecklist {
  return releaseDeviceTestSessionChecklist;
}

export function getReleaseDeviceSessionChecklistItem(
  id: string,
): ReleaseDeviceSessionChecklistItem | undefined {
  return releaseDeviceTestSessionChecklist.items.find(
    (item) => item.id === id,
  );
}

export function getReleaseDeviceSessionItemsByPhase(
  phase: ReleaseDeviceSessionPhase,
): readonly ReleaseDeviceSessionChecklistItem[] {
  return releaseDeviceTestSessionChecklist.items.filter(
    (item) => item.phase === phase,
  );
}

export function getRequiredReleaseDeviceSessionItems(): readonly ReleaseDeviceSessionChecklistItem[] {
  return releaseDeviceTestSessionChecklist.items.filter(
    (item) => item.requirement === 'required',
  );
}

export function getConditionalReleaseDeviceSessionItems(): readonly ReleaseDeviceSessionChecklistItem[] {
  return releaseDeviceTestSessionChecklist.items.filter(
    (item) => item.requirement === 'conditional',
  );
}
