export type DreamImagePreviewSessionPhase =
  | 'preflight-scope'
  | 'approved-catalog'
  | 'scene-and-style'
  | 'consent-and-privacy'
  | 'expected-disabled-state'
  | 'device-checks'
  | 'sanitized-outcomes'
  | 'closeout';

export type DreamImagePreviewChecklistOutcome =
  | 'not-run'
  | 'pass'
  | 'fail'
  | 'blocked'
  | 'not-applicable';

export type DreamImagePreviewChecklistDependency =
  | 'preparation-only'
  | 'provider-dependent';

export interface DreamImagePreviewSessionPhaseMeta {
  phase: DreamImagePreviewSessionPhase;
  title: string;
  purpose: string;
}

export interface DreamImagePreviewSessionChecklistItem {
  id: string;
  phase: DreamImagePreviewSessionPhase;
  title: string;
  instruction: string;
  completionCheck: string;
  dependency: DreamImagePreviewChecklistDependency;
  requiredOutcome?: 'blocked';
  relatedReferenceIds: readonly string[];
  boundary: string;
}

export interface DreamImagePreviewSessionChecklistBundle {
  title: string;
  subtitle: string;
  scopeReminder: string;
  evidenceReminder: string;
  providerBoundary: string;
  orderedPhases: readonly DreamImagePreviewSessionPhase[];
  phases: Readonly<
    Record<DreamImagePreviewSessionPhase, DreamImagePreviewSessionPhaseMeta>
  >;
  items: readonly DreamImagePreviewSessionChecklistItem[];
  allowedOutcomes: readonly DreamImagePreviewChecklistOutcome[];
  prohibitedSessionContent: readonly string[];
}

export const DREAM_IMAGE_PREVIEW_SESSION_ORDERED_PHASES = [
  'preflight-scope',
  'approved-catalog',
  'scene-and-style',
  'consent-and-privacy',
  'expected-disabled-state',
  'device-checks',
  'sanitized-outcomes',
  'closeout',
] as const satisfies readonly DreamImagePreviewSessionPhase[];

export const DREAM_IMAGE_PREVIEW_SESSION_PHASES = {
  'preflight-scope': {
    phase: 'preflight-scope',
    title: 'Preflight scope',
    purpose:
      'Confirm that the session is limited to provider-neutral preparation and approved synthetic inputs.',
  },
  'approved-catalog': {
    phase: 'approved-catalog',
    title: 'Approved catalog',
    purpose:
      'Confirm that only the supplied scene and style catalog is used during the session.',
  },
  'scene-and-style': {
    phase: 'scene-and-style',
    title: 'Scene and style checks',
    purpose:
      'Review catalog copy, selection behavior, and selected-state clarity without creating media.',
  },
  'consent-and-privacy': {
    phase: 'consent-and-privacy',
    title: 'Consent and privacy',
    purpose:
      'Review the visible consent explanation, privacy boundaries, and preparation-only scope.',
  },
  'expected-disabled-state': {
    phase: 'expected-disabled-state',
    title: 'Expected disabled state',
    purpose:
      'Confirm that preparation remains available while live generation is clearly unavailable.',
  },
  'device-checks': {
    phase: 'device-checks',
    title: 'Device checks',
    purpose:
      'Complete the assigned hands-on accessibility, appearance, viewport, and input checks.',
  },
  'sanitized-outcomes': {
    phase: 'sanitized-outcomes',
    title: 'Sanitized outcomes',
    purpose:
      'Record test identifiers, outcomes, and brief sanitized text observations only.',
  },
  closeout: {
    phase: 'closeout',
    title: 'Closeout',
    purpose:
      'Review unresolved preparation results, preserve every provider block, and end the session cleanly.',
  },
} as const satisfies Readonly<
  Record<DreamImagePreviewSessionPhase, DreamImagePreviewSessionPhaseMeta>
>;

export const DREAM_IMAGE_PREVIEW_SESSION_CHECKLIST_ITEMS = [
  {
    id: 'preflight-confirm-preparation-scope',
    phase: 'preflight-scope',
    title: 'Confirm preparation-only scope',
    instruction:
      'Read the session brief and confirm that the pass covers only the provider-neutral Dream Image preparation experience.',
    completionCheck:
      'The tester can identify the preparation boundary and the expected disabled state before selecting anything.',
    dependency: 'preparation-only',
    relatedReferenceIds: [],
    boundary:
      'Do not enable, attempt, or claim live generation, and do not change any service or deployment setting.',
  },
  {
    id: 'preflight-confirm-safe-evidence',
    phase: 'preflight-scope',
    title: 'Confirm safe evidence rules',
    instruction:
      'Agree to record only existing test or blocker identifiers, an allowed outcome, and a brief sanitized text observation.',
    completionCheck:
      'The session notes are prepared as text only and contain no private location or technical artifact.',
    dependency: 'preparation-only',
    relatedReferenceIds: [],
    boundary:
      'Do not collect screenshots, attachments, logs, payloads, credentials, or private links.',
  },
  {
    id: 'catalog-confirm-approved-options',
    phase: 'approved-catalog',
    title: 'Confirm approved catalog options',
    instruction:
      'Review the visible scene and style choices and confirm that the session will use only the approved catalog options.',
    completionCheck:
      'No free-form, personal, or externally supplied content is needed to continue.',
    dependency: 'preparation-only',
    relatedReferenceIds: ['TC-IMG-SCENE-01', 'TC-IMG-STYLE-01'],
    boundary:
      'Do not enter dream content or propose a new scene, style, prompt, or provider.',
  },
  {
    id: 'catalog-select-synthetic-start',
    phase: 'approved-catalog',
    title: 'Choose the approved starting selections',
    instruction:
      'Select the assigned synthetic catalog scene and style pair from the visible choices.',
    completionCheck:
      'Record only the approved catalog identifiers and whether their selected states are visible.',
    dependency: 'preparation-only',
    relatedReferenceIds: ['TC-IMG-SCENE-02', 'TC-IMG-STYLE-01'],
    boundary:
      'Do not add descriptive text, personal context, or other input.',
  },
  {
    id: 'scene-review-copy-and-state',
    phase: 'scene-and-style',
    title: 'Review scene clarity and selection',
    instruction:
      'Move among the assigned catalog scenes and review their names, descriptions, and selected-state feedback.',
    completionCheck:
      'Each exercised scene is distinguishable and the current selection is clear.',
    dependency: 'preparation-only',
    relatedReferenceIds: [
      'TC-IMG-SCENE-02',
      'TC-IMG-SCENE-03',
      'TC-IMG-SCENE-04',
    ],
    boundary:
      'Evaluate the visible preparation interface only; do not describe a dream or expected image.',
  },
  {
    id: 'style-review-copy-and-state',
    phase: 'scene-and-style',
    title: 'Review style clarity and selection',
    instruction:
      'Move among the assigned catalog styles and review their names, summaries, and selected-state feedback.',
    completionCheck:
      'Each exercised style is distinguishable and the chosen style remains clear after selection changes.',
    dependency: 'preparation-only',
    relatedReferenceIds: [
      'TC-IMG-STYLE-01',
      'TC-IMG-STYLE-02',
      'TC-IMG-STYLE-03',
      'TC-IMG-STYLE-04',
    ],
    boundary:
      'Do not assess generated output, name a provider preference, or claim that generation occurred.',
  },
  {
    id: 'consent-review-explanation',
    phase: 'consent-and-privacy',
    title: 'Review consent comprehension',
    instruction:
      'Read the consent explanation and identify what is optional, what preparation permits, and what remains unavailable.',
    completionCheck:
      'Record whether the purpose and timing of consent are understandable without taking a provider-dependent action.',
    dependency: 'preparation-only',
    relatedReferenceIds: ['TC-IMG-CONSENT-01', 'TC-IMG-CONSENT-02'],
    boundary:
      'Do not submit content or treat consent review as approval for generation.',
  },
  {
    id: 'privacy-review-boundaries',
    phase: 'consent-and-privacy',
    title: 'Review privacy boundaries',
    instruction:
      'Review the visible privacy and safety guidance for the preparation flow.',
    completionCheck:
      'The screen makes clear that approved catalog selections are sufficient and private content must not be supplied.',
    dependency: 'preparation-only',
    relatedReferenceIds: ['TC-IMG-CONSENT-03', 'TC-IMG-SCENE-05'],
    boundary:
      'Do not enter, copy, quote, or summarize dream content or any other private material.',
  },
  {
    id: 'disabled-review-message',
    phase: 'expected-disabled-state',
    title: 'Review the expected disabled message',
    instruction:
      'Read the unavailable-state heading, explanation, and guidance without attempting generation.',
    completionCheck:
      'The screen clearly distinguishes available catalog preparation from unavailable live generation.',
    dependency: 'preparation-only',
    relatedReferenceIds: ['TC-IMG-FAIL-01'],
    boundary:
      'A clear disabled state is expected behavior and is not evidence of live-generation availability.',
  },
  {
    id: 'disabled-preserve-preparation',
    phase: 'expected-disabled-state',
    title: 'Confirm preparation remains usable',
    instruction:
      'After reviewing the disabled message, return to the catalog choices and change an approved selection.',
    completionCheck:
      'Preparation controls remain usable while the service stays unavailable.',
    dependency: 'preparation-only',
    relatedReferenceIds: ['TC-IMG-FAIL-01', 'TC-IMG-SCENE-02'],
    boundary:
      'Do not bypass the unavailable state or attempt a request.',
  },
  {
    id: 'disabled-provider-operation',
    phase: 'expected-disabled-state',
    title: 'Keep provider operations blocked',
    instruction:
      'Do not exercise generation, moderation, throttling, delivery, or storage behavior during this preparation session.',
    completionCheck:
      'Record the applicable BLK-IMG identifier as blocked if a provider-dependent result is requested.',
    dependency: 'provider-dependent',
    requiredOutcome: 'blocked',
    relatedReferenceIds: [
      'BLK-IMG-02',
      'BLK-IMG-03',
      'BLK-IMG-04',
      'BLK-IMG-05',
    ],
    boundary:
      'Do not select a provider, send a request, create media, or claim a provider-dependent result.',
  },
  {
    id: 'device-voiceover-and-keyboard',
    phase: 'device-checks',
    title: 'Complete VoiceOver and keyboard checks',
    instruction:
      'On the assigned device, review scene and style announcements, keyboard reachability, focus order, and selected states.',
    completionCheck:
      'Record a pass or fail only after hands-on execution; otherwise keep each unexecuted item not run or blocked.',
    dependency: 'preparation-only',
    relatedReferenceIds: [
      'TC-IMG-A11Y-01',
      'TC-IMG-A11Y-02',
      'TC-IMG-STYLE-04',
    ],
    boundary:
      'Record only sanitized interface observations; do not capture audio, screen content, or device account details.',
  },
  {
    id: 'device-appearance-and-viewport',
    phase: 'device-checks',
    title: 'Complete appearance and viewport checks',
    instruction:
      'Review the preparation screen in light and dark appearance, then exercise the assigned narrow viewport and tap path.',
    completionCheck:
      'Record a pass or fail only after hands-on review of readability, reflow, clipping, and tap handling.',
    dependency: 'preparation-only',
    relatedReferenceIds: ['TC-IMG-A11Y-04', 'TC-IMG-A11Y-05'],
    boundary:
      'Do not attach visual evidence or include unrelated device or desktop content.',
  },
  {
    id: 'outcomes-record-text',
    phase: 'sanitized-outcomes',
    title: 'Record sanitized text outcomes',
    instruction:
      'For each exercised preparation item, record its existing TC-IMG or BLK-IMG identifier, allowed outcome, and a concise observation.',
    completionCheck:
      'Every note is reproducible, text-only, and free of private or technical artifacts.',
    dependency: 'preparation-only',
    relatedReferenceIds: [],
    boundary:
      'Do not include links, credentials, logs, payloads, screenshots, attachments, dream content, or generated media.',
  },
  {
    id: 'outcomes-separate-blockers',
    phase: 'sanitized-outcomes',
    title: 'Separate preparation results from blockers',
    instruction:
      'Classify observable preparation behavior independently from deployment or provider-dependent blockers.',
    completionCheck:
      'A provider-dependent item remains blocked and is never reported as a preparation pass or fail.',
    dependency: 'preparation-only',
    relatedReferenceIds: [
      'BLK-IMG-01',
      'BLK-IMG-02',
      'BLK-IMG-03',
      'BLK-IMG-04',
      'BLK-IMG-05',
    ],
    boundary:
      'Do not infer provider readiness, selection, approval, or live-generation behavior.',
  },
  {
    id: 'closeout-review-outcomes',
    phase: 'closeout',
    title: 'Review session outcomes',
    instruction:
      'Confirm that every checklist item is marked not run, pass, fail, blocked, or not applicable and that pass or fail reflects executed preparation checks only.',
    completionCheck:
      'Unresolved items list only their existing identifier and sanitized text observation.',
    dependency: 'preparation-only',
    relatedReferenceIds: [],
    boundary:
      'Do not convert an unexecuted or provider-dependent item into a pass or fail.',
  },
  {
    id: 'closeout-end-private-session',
    phase: 'closeout',
    title: 'End the private session',
    instruction:
      'Close the preparation session and remove any temporary notes that were not included in the sanitized text outcome.',
    completionCheck:
      'Only the approved sanitized text record remains for handoff.',
    dependency: 'preparation-only',
    relatedReferenceIds: [],
    boundary:
      'Do not retain private locations, access details, attachments, or prohibited content.',
  },
] as const satisfies readonly DreamImagePreviewSessionChecklistItem[];

export const DREAM_IMAGE_PREVIEW_CHECKLIST_OUTCOMES = [
  'not-run',
  'pass',
  'fail',
  'blocked',
  'not-applicable',
] as const satisfies readonly DreamImagePreviewChecklistOutcome[];

export const dreamImagePreviewSessionChecklist: DreamImagePreviewSessionChecklistBundle = {
  title: 'Private Dream Image preparation session checklist',
  subtitle:
    'An ordered, provider-neutral checklist for reviewing preparation without enabling generation.',
  scopeReminder:
    'Use approved synthetic catalog selections only. This session does not test or authorize live generation.',
  evidenceReminder:
    'Record only existing TC-IMG or BLK-IMG identifiers, allowed outcomes, and brief sanitized text observations.',
  providerBoundary:
    'Every provider-dependent item must remain blocked. Do not attempt to clear it within this session.',
  orderedPhases: DREAM_IMAGE_PREVIEW_SESSION_ORDERED_PHASES,
  phases: DREAM_IMAGE_PREVIEW_SESSION_PHASES,
  items: DREAM_IMAGE_PREVIEW_SESSION_CHECKLIST_ITEMS,
  allowedOutcomes: DREAM_IMAGE_PREVIEW_CHECKLIST_OUTCOMES,
  prohibitedSessionContent: [
    'Dream content, journal text, or personal examples',
    'Generated media, media links, or descriptions of generated media',
    'Private Preview links or access details',
    'Credentials, tokens, headers, cookies, or private configuration',
    'Logs, traces, or request and response payloads',
    'Screenshots or attachments',
    'Provider selections, preferences, recommendations, or approvals',
    'Claims that live generation was available, attempted, or completed',
  ],
};

export function getDreamImagePreviewSessionChecklist(): DreamImagePreviewSessionChecklistBundle {
  return dreamImagePreviewSessionChecklist;
}

export function getDreamImagePreviewSessionChecklistItem(
  id: string,
): DreamImagePreviewSessionChecklistItem | undefined {
  return dreamImagePreviewSessionChecklist.items.find((item) => item.id === id);
}

export function getDreamImagePreviewSessionItemsByPhase(
  phase: DreamImagePreviewSessionPhase,
): readonly DreamImagePreviewSessionChecklistItem[] {
  return dreamImagePreviewSessionChecklist.items.filter(
    (item) => item.phase === phase,
  );
}

export function getProviderDependentDreamImagePreviewSessionItems(): readonly DreamImagePreviewSessionChecklistItem[] {
  return dreamImagePreviewSessionChecklist.items.filter(
    (item) => item.dependency === 'provider-dependent',
  );
}

export function isDreamImagePreviewChecklistOutcomeAllowed(
  dependency: DreamImagePreviewChecklistDependency,
  outcome: DreamImagePreviewChecklistOutcome,
): boolean {
  if (dependency === 'provider-dependent') {
    return outcome === 'blocked';
  }

  return dreamImagePreviewSessionChecklist.allowedOutcomes.includes(outcome);
}
