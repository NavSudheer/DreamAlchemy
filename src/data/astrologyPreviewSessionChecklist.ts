/**
 * Astrology Preview Session Checklist
 *
 * Typed, content-only guidance for a private Preview test session. It covers
 * observable app behavior only; deployment changes, Production activation,
 * credentials, real birth data, and dream content are outside its scope.
 */

export type AstrologyPreviewSessionPhase =
  | 'preflight'
  | 'synthetic-inputs'
  | 'date-only-pass'
  | 'timed-pass'
  | 'reflection-opt-in'
  | 'local-deletion'
  | 'accessibility'
  | 'sanitized-evidence'
  | 'closeout';

export type AstrologyPreviewChecklistRequirement =
  | 'required'
  | 'conditional';

export type AstrologyPreviewChecklistOutcome =
  | 'not-run'
  | 'pass'
  | 'fail'
  | 'blocked'
  | 'not-applicable';

export interface AstrologyPreviewSessionPhaseMeta {
  phase: AstrologyPreviewSessionPhase;
  title: string;
  purpose: string;
}

export interface AstrologyPreviewSessionChecklistItem {
  /** Stable checklist identifier. */
  id: string;
  /** Session phase containing this item. */
  phase: AstrologyPreviewSessionPhase;
  /** Short action title. */
  title: string;
  /** Observable, non-technical tester action. */
  instruction: string;
  /** Evidence that the item is complete. */
  completionCheck: string;
  /** Whether the item always applies or depends on Preview availability. */
  requirement: AstrologyPreviewChecklistRequirement;
  /** Reason a conditional item may be marked blocked or not applicable. */
  condition?: string;
  /** Existing Mac test cases supported by this item. */
  relatedTestCases: readonly string[];
  /** Privacy and scope guardrail for this action. */
  boundary: string;
}

export interface AstrologyPreviewSessionChecklistBundle {
  title: string;
  subtitle: string;
  scopeReminder: string;
  evidenceReminder: string;
  orderedPhases: readonly AstrologyPreviewSessionPhase[];
  phases: Record<
    AstrologyPreviewSessionPhase,
    AstrologyPreviewSessionPhaseMeta
  >;
  items: readonly AstrologyPreviewSessionChecklistItem[];
  allowedOutcomes: readonly AstrologyPreviewChecklistOutcome[];
  outOfScope: readonly string[];
}

export const ASTROLOGY_PREVIEW_SESSION_ORDERED_PHASES: readonly AstrologyPreviewSessionPhase[] = [
  'preflight',
  'synthetic-inputs',
  'date-only-pass',
  'timed-pass',
  'reflection-opt-in',
  'local-deletion',
  'accessibility',
  'sanitized-evidence',
  'closeout',
] as const;

export const ASTROLOGY_PREVIEW_SESSION_PHASES: Record<
  AstrologyPreviewSessionPhase,
  AstrologyPreviewSessionPhaseMeta
> = {
  preflight: {
    phase: 'preflight',
    title: 'Preflight',
    purpose:
      'Confirm the private Preview and intended build are available before entering test data.',
  },
  'synthetic-inputs': {
    phase: 'synthetic-inputs',
    title: 'Synthetic Inputs',
    purpose:
      'Choose approved fictitious values and keep the session free of personal records.',
  },
  'date-only-pass': {
    phase: 'date-only-pass',
    title: 'Date-Only Pass',
    purpose:
      'Verify the result and uncertainty behavior when the synthetic profile has no birth time.',
  },
  'timed-pass': {
    phase: 'timed-pass',
    title: 'Timed Pass',
    purpose:
      'Verify the result structure when the supplied synthetic profile includes time and timezone.',
  },
  'reflection-opt-in': {
    phase: 'reflection-opt-in',
    title: 'Optional Reflection',
    purpose:
      'Exercise the separate reflection choice only when the private Preview service is available.',
  },
  'local-deletion': {
    phase: 'local-deletion',
    title: 'Local Deletion',
    purpose:
      'Confirm that the Astrology-only local state can be cleared and remains cleared after relaunch.',
  },
  accessibility: {
    phase: 'accessibility',
    title: 'Accessibility Spot Checks',
    purpose:
      'Sample keyboard, screen-reader, status-announcement, zoom, and theme behavior on the tested surface.',
  },
  'sanitized-evidence': {
    phase: 'sanitized-evidence',
    title: 'Sanitized Evidence',
    purpose:
      'Record reproducible results using case identifiers, outcomes, and public messages only.',
  },
  closeout: {
    phase: 'closeout',
    title: 'Session Closeout',
    purpose:
      'Leave the private test state tidy and record remaining failures or blockers without changing deployment settings.',
  },
};

export const ASTROLOGY_PREVIEW_SESSION_CHECKLIST_ITEMS: readonly AstrologyPreviewSessionChecklistItem[] = [
  {
    id: 'preflight-private-preview',
    phase: 'preflight',
    title: 'Open the assigned private Preview',
    instruction:
      'Use the private Preview location supplied for this session and confirm that DreamAlchemy opens to the expected app rather than an unrelated deployment or error page.',
    completionCheck:
      'Record pass, fail, or blocked together with the non-sensitive Preview label supplied by the test coordinator.',
    requirement: 'required',
    relatedTestCases: [],
    boundary:
      'Do not record access links, access values, browser session data, or deployment settings.',
  },
  {
    id: 'preflight-build-confirmation',
    phase: 'preflight',
    title: 'Confirm the assigned build reference',
    instruction:
      'Compare the build reference provided in the session brief with the build reference intended for this test pass.',
    completionCheck:
      'Record only the approved short build reference and tested surface, such as Safari or iOS Simulator.',
    requirement: 'required',
    relatedTestCases: [],
    boundary:
      'Stop and mark the session blocked if the build cannot be confirmed; do not change any environment or deployment configuration.',
  },
  {
    id: 'synthetic-select-date-only',
    phase: 'synthetic-inputs',
    title: 'Select the date-only synthetic profile',
    instruction:
      'Choose the approved date-only sample profile from the test guidance, leaving birth time and timezone blank as specified.',
    completionCheck:
      'Record the synthetic profile identifier, not its individual field values.',
    requirement: 'required',
    relatedTestCases: ['TC-TIME-01'],
    boundary:
      'Use only the supplied fictitious profile; do not substitute information about a real person.',
  },
  {
    id: 'synthetic-select-timed',
    phase: 'synthetic-inputs',
    title: 'Select the timed synthetic profile',
    instruction:
      'Choose the approved timed sample profile that includes a valid time and IANA timezone.',
    completionCheck:
      'Record the synthetic profile identifier and expected precision label only.',
    requirement: 'required',
    relatedTestCases: ['TC-TIME-02', 'TC-TIME-05'],
    boundary:
      'Keep all entries synthetic and omit field values from session evidence.',
  },
  {
    id: 'date-only-calculate',
    phase: 'date-only-pass',
    title: 'Run the date-only calculation',
    instruction:
      'With the approved date-only profile selected, review the disclosure, make the optional processing choice required by the assigned test, and submit once.',
    completionCheck:
      'Record whether the request completed, returned a public error state, or was blocked by Preview availability.',
    requirement: 'conditional',
    condition:
      'Run only when the assigned private Preview session includes provider-connected calculation.',
    relatedTestCases: ['TC-TIME-01', 'TC-CONSENT-01', 'TC-CONSENT-02'],
    boundary:
      'Do not repeatedly submit, change deployment state, or include submitted fields in evidence.',
  },
  {
    id: 'date-only-result-review',
    phase: 'date-only-pass',
    title: 'Review date-only uncertainty',
    instruction:
      'Confirm that a successful result uses date-only precision, omits Ascendant, Midheaven, and house numbers, and presents a missing-time uncertainty note.',
    completionCheck:
      'Record each observable result as pass or fail without copying the chart contents.',
    requirement: 'conditional',
    condition:
      'Applies only after a successful date-only calculation.',
    relatedTestCases: ['TC-TIME-01'],
    boundary:
      'Evaluate displayed structure and disclosure only; do not interpret the chart or make personal claims.',
  },
  {
    id: 'timed-calculate',
    phase: 'timed-pass',
    title: 'Run the timed calculation',
    instruction:
      'With the approved timed profile selected, review the disclosure and submit once through the assigned private Preview flow.',
    completionCheck:
      'Record whether the request completed, returned a public error state, or was blocked by Preview availability.',
    requirement: 'conditional',
    condition:
      'Run only when the assigned private Preview session includes provider-connected calculation.',
    relatedTestCases: ['TC-TIME-02', 'TC-TIME-05'],
    boundary:
      'Do not repeatedly submit, change service settings, or copy submitted values into evidence.',
  },
  {
    id: 'timed-result-review',
    phase: 'timed-pass',
    title: 'Review timed-result structure',
    instruction:
      'Confirm that a successful result uses the expected timed precision label, displays provider-returned Ascendant and Midheaven placements, and preserves available planet house numbers.',
    completionCheck:
      'Record each observable result as pass or fail without transcribing placements or aspects.',
    requirement: 'conditional',
    condition:
      'Applies only after a successful timed calculation.',
    relatedTestCases: ['TC-TIME-02', 'TC-TIME-05'],
    boundary:
      'Review presentation and precision only; astrological interpretation is not part of this checklist.',
  },
  {
    id: 'reflection-separate-choice',
    phase: 'reflection-opt-in',
    title: 'Verify the separate reflection choice',
    instruction:
      'From a successful synthetic chart, confirm that creating a written reflection requires a separate, deliberate action and presents its own progress state.',
    completionCheck:
      'Record whether the separate action and status were present; choosing the action remains optional.',
    requirement: 'conditional',
    condition:
      'Applies only when a synthetic chart exists and reflection testing is included in the session brief.',
    relatedTestCases: ['TC-REFL-01', 'TC-ERR-05'],
    boundary:
      'Do not enter or attach dream material, personal notes, or additional profile information.',
  },
  {
    id: 'reflection-result-boundary',
    phase: 'reflection-opt-in',
    title: 'Review the reflection boundary',
    instruction:
      'If a reflection completes, confirm that it is concise, visibly non-predictive, and presented separately from the calculated chart.',
    completionCheck:
      'Record pass or fail for the disclosure and separation without copying reflection text.',
    requirement: 'conditional',
    condition:
      'Applies only after the tester voluntarily requests and receives a reflection.',
    relatedTestCases: ['TC-REFL-04'],
    boundary:
      'Do not evaluate the reflection as factual, diagnostic, or personally meaningful.',
  },
  {
    id: 'deletion-confirmation',
    phase: 'local-deletion',
    title: 'Review and confirm local deletion',
    instruction:
      'Open the Astrology deletion control, review the scope notice, and confirm deletion when the session calls for a destructive local-state check.',
    completionCheck:
      'Record whether the confirmation named Astrology-only local data and whether the screen returned to an empty Astrology state.',
    requirement: 'required',
    relatedTestCases: ['TC-DEL-01', 'TC-DEL-02', 'TC-DEL-03'],
    boundary:
      'The check concerns only synthetic Astrology session data; do not open, inspect, or alter dream journals.',
  },
  {
    id: 'deletion-relaunch',
    phase: 'local-deletion',
    title: 'Confirm deletion after relaunch',
    instruction:
      'Reload or relaunch the tested surface and return to Astrology.',
    completionCheck:
      'Confirm the synthetic profile, chart, reflection, coordinates, and consent state do not reappear.',
    requirement: 'required',
    relatedTestCases: ['TC-DEL-05'],
    boundary:
      'Verify only the Astrology screen; unrelated app records are outside this session.',
  },
  {
    id: 'accessibility-keyboard-focus',
    phase: 'accessibility',
    title: 'Spot-check keyboard and focus order',
    instruction:
      'Navigate the form, help controls, consent control, and primary actions with the keyboard or simulator controls available on the tested surface.',
    completionCheck:
      'Record whether focus order and visible focus behavior were understandable and usable.',
    requirement: 'required',
    relatedTestCases: ['TC-A11Y-05'],
    boundary:
      'Describe controls by their interface labels only; no device account or user information is needed.',
  },
  {
    id: 'accessibility-voiceover-status',
    phase: 'accessibility',
    title: 'Spot-check labels and status announcements',
    instruction:
      'When VoiceOver is available for the assigned pass, sample input labels, help expansion state, validation feedback, and request status announcements.',
    completionCheck:
      'Record the control label and pass or fail outcome; quote only short interface wording when necessary.',
    requirement: 'conditional',
    condition:
      'Applies when VoiceOver testing is included and available on the assigned device or simulator.',
    relatedTestCases: ['TC-A11Y-01', 'TC-A11Y-02', 'TC-A11Y-03'],
    boundary:
      'Do not record audio, device identifiers, or account information.',
  },
  {
    id: 'accessibility-theme-zoom',
    phase: 'accessibility',
    title: 'Spot-check theme and zoom',
    instruction:
      'Review the Astrology screen in light and dark appearance and at the assigned browser zoom or text-size setting.',
    completionCheck:
      'Record any unreadable text, clipped control, missing state indicator, or contrast concern by interface label.',
    requirement: 'required',
    relatedTestCases: ['TC-A11Y-04'],
    boundary:
      'Capture only layout observations; personal desktop or device content is outside scope.',
  },
  {
    id: 'evidence-record-outcomes',
    phase: 'sanitized-evidence',
    title: 'Record structured outcomes',
    instruction:
      'For each executed case, record the case id, allowed outcome, tested surface, approved short build reference, synthetic profile id, and concise observed behavior.',
    completionCheck:
      'Confirm every failure or blocker has reproducible synthetic steps and, when present, only the public error code.',
    requirement: 'required',
    relatedTestCases: [],
    boundary:
      'Do not include submitted field values, private links, request bodies, personal identifiers, or non-public logs.',
  },
  {
    id: 'evidence-sanitize-attachments',
    phase: 'sanitized-evidence',
    title: 'Sanitize optional visual evidence',
    instruction:
      'Prefer text-only evidence. If the approved session process requires a visual capture, crop it to the relevant app control or message and inspect it before attachment.',
    completionCheck:
      'Confirm the attachment contains no browser access data, other tabs, system paths, notifications, field values, or unrelated app content.',
    requirement: 'conditional',
    condition:
      'Applies only when visual evidence is explicitly permitted for the session.',
    relatedTestCases: [],
    boundary:
      'Never capture private access screens, developer credential panes, or personal content.',
  },
  {
    id: 'closeout-review-status',
    phase: 'closeout',
    title: 'Review pass, fail, and blocked items',
    instruction:
      'Confirm every checklist item has an allowed outcome and that blocked provider-dependent steps are distinguished from app defects.',
    completionCheck:
      'List only unresolved case ids, concise observations, and public error codes for follow-up.',
    requirement: 'required',
    relatedTestCases: [],
    boundary:
      'Do not attempt to clear a blocker by changing deployment, service, or Production settings.',
  },
  {
    id: 'closeout-end-session',
    phase: 'closeout',
    title: 'End the private session',
    instruction:
      'Confirm the synthetic Astrology data was deleted as planned, close private Preview tabs, and remove any temporary local text notes that were not added to the sanitized report.',
    completionCheck:
      'Record session closeout as complete or note the non-sensitive reason it remains blocked.',
    requirement: 'required',
    relatedTestCases: ['TC-DEL-05'],
    boundary:
      'Do not change deployment configuration or retain private access information in the report.',
  },
] as const;

export const ASTROLOGY_PREVIEW_CHECKLIST_OUTCOMES: readonly AstrologyPreviewChecklistOutcome[] = [
  'not-run',
  'pass',
  'fail',
  'blocked',
  'not-applicable',
] as const;

export const ASTROLOGY_PREVIEW_SESSION_CHECKLIST_BUNDLE: AstrologyPreviewSessionChecklistBundle = {
  title: 'Private Astrology Preview Session Checklist',
  subtitle:
    'A privacy-safe sequence for observable Mac and iOS Simulator Preview checks.',
  scopeReminder:
    'Follow the assigned private Preview session brief. Mark unavailable provider-dependent steps blocked rather than changing service configuration.',
  evidenceReminder:
    'Record case ids, allowed outcomes, synthetic profile ids, public error codes, and concise interface observations only.',
  orderedPhases: ASTROLOGY_PREVIEW_SESSION_ORDERED_PHASES,
  phases: ASTROLOGY_PREVIEW_SESSION_PHASES,
  items: ASTROLOGY_PREVIEW_SESSION_CHECKLIST_ITEMS,
  allowedOutcomes: ASTROLOGY_PREVIEW_CHECKLIST_OUTCOMES,
  outOfScope: [
    'Production activation or rollout decisions',
    'Deployment, environment, feature-flag, or provider configuration changes',
    'Credential, token, authorization-header, or private-access handling',
    'Real birth records, identifying locations, or personal coordinates',
    'Dream journals, voice transcripts, tags, analyses, or personal reflections',
    'Astrological advice, factual claims, diagnosis, or prediction',
  ],
};

export function getAstrologyPreviewSessionChecklistBundle(): AstrologyPreviewSessionChecklistBundle {
  return ASTROLOGY_PREVIEW_SESSION_CHECKLIST_BUNDLE;
}

export function getAstrologyPreviewSessionChecklistItem(
  id: string,
): AstrologyPreviewSessionChecklistItem | undefined {
  return ASTROLOGY_PREVIEW_SESSION_CHECKLIST_ITEMS.find(item => item.id === id);
}

export function getAstrologyPreviewSessionItemsByPhase(
  phase: AstrologyPreviewSessionPhase,
): AstrologyPreviewSessionChecklistItem[] {
  return ASTROLOGY_PREVIEW_SESSION_CHECKLIST_ITEMS.filter(
    item => item.phase === phase,
  );
}

export function getRequiredAstrologyPreviewSessionItems(): AstrologyPreviewSessionChecklistItem[] {
  return ASTROLOGY_PREVIEW_SESSION_CHECKLIST_ITEMS.filter(
    item => item.requirement === 'required',
  );
}

export function getConditionalAstrologyPreviewSessionItems(): AstrologyPreviewSessionChecklistItem[] {
  return ASTROLOGY_PREVIEW_SESSION_CHECKLIST_ITEMS.filter(
    item => item.requirement === 'conditional',
  );
}

export function isRecognizedAstrologyPreviewSessionPhase(
  value: unknown,
): value is AstrologyPreviewSessionPhase {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_SESSION_ORDERED_PHASES.includes(
      value as AstrologyPreviewSessionPhase,
    )
  );
}

export function isRecognizedAstrologyPreviewChecklistOutcome(
  value: unknown,
): value is AstrologyPreviewChecklistOutcome {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_CHECKLIST_OUTCOMES.includes(
      value as AstrologyPreviewChecklistOutcome,
    )
  );
}
