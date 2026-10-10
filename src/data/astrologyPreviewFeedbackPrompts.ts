/**
 * Astrology Preview Feedback Prompts
 *
 * Typed, content-only questions for private Preview evaluation. The prompts
 * focus on interface clarity and test behavior, use synthetic scenarios, and
 * never ask for personal birth data, dream content, attachments, contact
 * details, credentials, or other private information.
 */

export type AstrologyPreviewFeedbackCategory =
  | 'form-clarity'
  | 'consent-comprehension'
  | 'date-only-uncertainty'
  | 'timed-result-clarity'
  | 'error-recovery'
  | 'accessibility'
  | 'trust';

export type AstrologyPreviewFeedbackResponseKind =
  | 'clarity-scale'
  | 'ease-scale'
  | 'single-choice'
  | 'short-text';

export interface AstrologyPreviewFeedbackCategoryMeta {
  category: AstrologyPreviewFeedbackCategory;
  title: string;
  description: string;
}

export interface AstrologyPreviewFeedbackPrompt {
  /** Stable identifier for collection and analysis. */
  id: string;
  /** Preview experience area being evaluated. */
  category: AstrologyPreviewFeedbackCategory;
  /** Neutral question shown to the private tester. */
  question: string;
  /** Suggested response control. */
  responseKind: AstrologyPreviewFeedbackResponseKind;
  /** Ordered choices when a structured response is appropriate. */
  responseOptions?: readonly string[];
  /** Brief test context without requesting private information. */
  context: string;
  /** Safe-answer boundary shown beside the prompt. */
  answerGuidance: string;
  /** Relevant cases in the existing Mac test matrix. */
  relatedTestCases: readonly string[];
}

export interface AstrologyPreviewFeedbackBundle {
  title: string;
  introduction: string;
  privacyReminder: string;
  optionalityReminder: string;
  categories: Record<
    AstrologyPreviewFeedbackCategory,
    AstrologyPreviewFeedbackCategoryMeta
  >;
  orderedCategories: readonly AstrologyPreviewFeedbackCategory[];
  prompts: readonly AstrologyPreviewFeedbackPrompt[];
}

export const ASTROLOGY_PREVIEW_FEEDBACK_ORDERED_CATEGORIES: readonly AstrologyPreviewFeedbackCategory[] = [
  'form-clarity',
  'consent-comprehension',
  'date-only-uncertainty',
  'timed-result-clarity',
  'error-recovery',
  'accessibility',
  'trust',
] as const;

export const ASTROLOGY_PREVIEW_FEEDBACK_CATEGORIES: Record<
  AstrologyPreviewFeedbackCategory,
  AstrologyPreviewFeedbackCategoryMeta
> = {
  'form-clarity': {
    category: 'form-clarity',
    title: 'Form Clarity',
    description:
      'How understandable the field labels, formats, validation, and optional help are when using a supplied synthetic profile.',
  },
  'consent-comprehension': {
    category: 'consent-comprehension',
    title: 'Consent Comprehension',
    description:
      'How clearly the Preview distinguishes transmitted fields, local storage, optional reflection processing, and excluded data.',
  },
  'date-only-uncertainty': {
    category: 'date-only-uncertainty',
    title: 'Date-Only Uncertainty',
    description:
      'How understandable the missing-time limitations and omitted time-dependent results are.',
  },
  'timed-result-clarity': {
    category: 'timed-result-clarity',
    title: 'Timed-Result Clarity',
    description:
      'How clearly a timed chart presents precision, placements, aspects, and remaining uncertainty.',
  },
  'error-recovery': {
    category: 'error-recovery',
    title: 'Error Recovery',
    description:
      'Whether controlled failure messages explain the state and an appropriate next step without losing synthetic form progress.',
  },
  accessibility: {
    category: 'accessibility',
    title: 'Accessibility',
    description:
      'How perceivable and operable the Preview is with keyboard, VoiceOver, zoom, contrast, or another tested access method.',
  },
  trust: {
    category: 'trust',
    title: 'Trust & Boundaries',
    description:
      'How clearly the Preview communicates its optional, local-first, externally processed, non-predictive boundaries.',
  },
};

const CLARITY_OPTIONS = [
  'Very unclear',
  'Somewhat unclear',
  'Neither clear nor unclear',
  'Somewhat clear',
  'Very clear',
] as const;

const EASE_OPTIONS = [
  'Very difficult',
  'Somewhat difficult',
  'Neither easy nor difficult',
  'Somewhat easy',
  'Very easy',
] as const;

const SAFE_SHORT_TEXT_GUIDANCE =
  'Refer only to interface wording, control labels, or the supplied synthetic test scenario. Do not include personal data or attachments.';

export const ASTROLOGY_PREVIEW_FEEDBACK_PROMPTS: readonly AstrologyPreviewFeedbackPrompt[] = [
  {
    id: 'form-instructions-clarity',
    category: 'form-clarity',
    question:
      'How clear or unclear were the instructions for completing the form with the supplied synthetic profile?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_OPTIONS,
    context:
      'Consider labels, required and optional fields, accepted formats, and the available help panels.',
    answerGuidance:
      'Base the response on the supplied synthetic test values rather than any real person’s information.',
    relatedTestCases: ['TC-DATE-01', 'TC-TIME-05', 'TC-COORD-01'],
  },
  {
    id: 'form-wording-improvement',
    category: 'form-clarity',
    question:
      'Which field label, format instruction, or help panel, if any, was difficult to understand?',
    responseKind: 'short-text',
    context:
      'A response may name a control or quote a short interface label; it may also say that none were difficult.',
    answerGuidance: SAFE_SHORT_TEXT_GUIDANCE,
    relatedTestCases: ['TC-DATE-08', 'TC-TIME-07', 'TC-COORD-08'],
  },
  {
    id: 'consent-data-flow-clarity',
    category: 'consent-comprehension',
    question:
      'After reviewing the consent and data-sharing summary, how clear or unclear was the distinction between information sent for calculation, information stored locally, and information excluded from Astrology requests?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_OPTIONS,
    context:
      'Evaluate the disclosure wording and grouping, not the details of any submitted profile.',
    answerGuidance:
      'Do not repeat field values, coordinates, or any other submitted content in the response.',
    relatedTestCases: ['TC-CONSENT-03', 'TC-REFL-02', 'TC-REFL-03'],
  },
  {
    id: 'consent-choice-understanding',
    category: 'consent-comprehension',
    question:
      'Which statement best matches your understanding of the consent control after reading the on-screen explanation?',
    responseKind: 'single-choice',
    responseOptions: [
      'It is required only when choosing to send the listed calculation fields for processing',
      'It appears to cover both local-only use and external processing together',
      'Its purpose was unclear',
      'I did not review this control',
    ],
    context:
      'This question checks how the control is understood; there is no preferred response.',
    answerGuidance:
      'Choose the closest statement without adding any personal profile information.',
    relatedTestCases: ['TC-CONSENT-01', 'TC-CONSENT-02', 'TC-CONSENT-03'],
  },
  {
    id: 'date-only-limitations-clarity',
    category: 'date-only-uncertainty',
    question:
      'How clear or unclear was the explanation of what changes when the synthetic profile has no birth time?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_OPTIONS,
    context:
      'Consider the date-only precision label, uncertainty notice, and omission of time-dependent angles and house information.',
    answerGuidance:
      'Discuss only the displayed explanation and supplied date-only scenario.',
    relatedTestCases: ['TC-TIME-01', 'TC-TIME-07'],
  },
  {
    id: 'date-only-interpretation',
    category: 'date-only-uncertainty',
    question:
      'Which statement best matches what the date-only result communicated?',
    responseKind: 'single-choice',
    responseOptions: [
      'Time-dependent details were omitted and the remaining result included uncertainty guidance',
      'Time-dependent details appeared approximate rather than omitted',
      'The difference from a timed result was unclear',
      'I did not review a date-only result',
    ],
    context:
      'Choose the statement that reflects what the interface communicated, whether or not it matches the intended design.',
    answerGuidance:
      'Do not include the synthetic profile values or any real birth information.',
    relatedTestCases: ['TC-TIME-01'],
  },
  {
    id: 'timed-result-structure',
    category: 'timed-result-clarity',
    question:
      'How easy or difficult was it to distinguish the timed precision label, placements, aspects, and uncertainty notes?',
    responseKind: 'ease-scale',
    responseOptions: EASE_OPTIONS,
    context:
      'Evaluate the hierarchy and labels in the calculated-chart view produced with a supplied synthetic timed profile.',
    answerGuidance:
      'Base the response on layout and wording only; do not transcribe the calculated result.',
    relatedTestCases: ['TC-TIME-02', 'TC-TIME-05'],
  },
  {
    id: 'timed-result-language',
    category: 'timed-result-clarity',
    question:
      'Which result label or explanation, if any, would benefit from clearer wording?',
    responseKind: 'short-text',
    context:
      'A response may identify a heading or interface phrase and may also say that no wording change is needed.',
    answerGuidance: SAFE_SHORT_TEXT_GUIDANCE,
    relatedTestCases: ['TC-TIME-07', 'TC-CONSENT-04'],
  },
  {
    id: 'error-next-step-clarity',
    category: 'error-recovery',
    question:
      'After the controlled error state, how clear or unclear was the suggested next step?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_OPTIONS,
    context:
      'Consider the disabled, offline, rate-limit, unavailable, or timeout state exercised by the assigned test case.',
    answerGuidance:
      'Name only the public test case or public error code if needed; do not include request contents or private logs.',
    relatedTestCases: ['TC-ERR-01', 'TC-ERR-02', 'TC-ERR-03', 'TC-ERR-04'],
  },
  {
    id: 'error-form-state',
    category: 'error-recovery',
    question:
      'What happened to the synthetic form entries after the controlled error appeared?',
    responseKind: 'single-choice',
    responseOptions: [
      'All entries remained available',
      'Some entries remained available',
      'The entries were cleared',
      'I could not determine the result',
    ],
    context:
      'Select the observed interface behavior without reproducing the field values.',
    answerGuidance:
      'Do not list or copy the synthetic entries in the response.',
    relatedTestCases: ['TC-ERR-01', 'TC-ERR-02', 'TC-ERR-04'],
  },
  {
    id: 'accessibility-operation-ease',
    category: 'accessibility',
    question:
      'How easy or difficult was it to navigate and operate the tested controls with the selected accessibility setup?',
    responseKind: 'ease-scale',
    responseOptions: EASE_OPTIONS,
    context:
      'Consider focus order, control names, expanded states, status announcements, zoom, contrast, or keyboard operation as applicable.',
    answerGuidance:
      'Describe the control and observed behavior only; do not provide device account information or attachments.',
    relatedTestCases: [
      'TC-A11Y-01',
      'TC-A11Y-02',
      'TC-A11Y-03',
      'TC-A11Y-04',
      'TC-A11Y-05',
    ],
  },
  {
    id: 'accessibility-barrier',
    category: 'accessibility',
    question:
      'Which control or message, if any, was difficult to perceive, understand, or operate?',
    responseKind: 'short-text',
    context:
      'A response may identify the control, expected behavior, and observed behavior; it may also report no barrier.',
    answerGuidance: SAFE_SHORT_TEXT_GUIDANCE,
    relatedTestCases: ['TC-A11Y-01', 'TC-A11Y-03', 'TC-A11Y-05'],
  },
  {
    id: 'trust-boundary-clarity',
    category: 'trust',
    question:
      'How clear or unclear were the boundaries between local storage, external processing, optional AI reflection, and dream-journal isolation?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_OPTIONS,
    context:
      'Evaluate only what the interface and disclosures communicate.',
    answerGuidance:
      'Do not include personal examples, real records, or any information entered during testing.',
    relatedTestCases: ['TC-CONSENT-03', 'TC-REFL-02', 'TC-REFL-03', 'TC-DEL-02'],
  },
  {
    id: 'trust-information-gap',
    category: 'trust',
    question:
      'What additional interface explanation, if any, would help you evaluate the optional Preview’s privacy and non-predictive boundaries?',
    responseKind: 'short-text',
    context:
      'Comment on missing or unclear product information; a response may also say that the current explanation is sufficient.',
    answerGuidance: SAFE_SHORT_TEXT_GUIDANCE,
    relatedTestCases: ['TC-CONSENT-04', 'TC-REFL-04', 'TC-DEL-02'],
  },
] as const;

export const ASTROLOGY_PREVIEW_FEEDBACK_BUNDLE: AstrologyPreviewFeedbackBundle = {
  title: 'Private Astrology Preview Feedback',
  introduction:
    'Optional questions about the clarity, usability, accessibility, and stated boundaries of the private Preview.',
  privacyReminder:
    'Respond only about interface wording and supplied synthetic test scenarios. Do not provide real birth details, coordinates, dream content, screenshots, recordings, contact details, credentials, authorization data, or private logs.',
  optionalityReminder:
    'Every question is optional. “I did not review this” or no response is acceptable where applicable.',
  categories: ASTROLOGY_PREVIEW_FEEDBACK_CATEGORIES,
  orderedCategories: ASTROLOGY_PREVIEW_FEEDBACK_ORDERED_CATEGORIES,
  prompts: ASTROLOGY_PREVIEW_FEEDBACK_PROMPTS,
};

export function getAstrologyPreviewFeedbackBundle(): AstrologyPreviewFeedbackBundle {
  return ASTROLOGY_PREVIEW_FEEDBACK_BUNDLE;
}

export function getAstrologyPreviewFeedbackPrompt(
  id: string,
): AstrologyPreviewFeedbackPrompt | undefined {
  return ASTROLOGY_PREVIEW_FEEDBACK_PROMPTS.find(prompt => prompt.id === id);
}

export function getAstrologyPreviewFeedbackPromptsByCategory(
  category: AstrologyPreviewFeedbackCategory,
): AstrologyPreviewFeedbackPrompt[] {
  return ASTROLOGY_PREVIEW_FEEDBACK_PROMPTS.filter(
    prompt => prompt.category === category,
  );
}

export function getAllAstrologyPreviewFeedbackPrompts(): AstrologyPreviewFeedbackPrompt[] {
  return [...ASTROLOGY_PREVIEW_FEEDBACK_PROMPTS];
}

export function getAllAstrologyPreviewFeedbackCategories(): readonly AstrologyPreviewFeedbackCategory[] {
  return ASTROLOGY_PREVIEW_FEEDBACK_ORDERED_CATEGORIES;
}

export function isRecognizedAstrologyPreviewFeedbackCategory(
  value: unknown,
): value is AstrologyPreviewFeedbackCategory {
  return (
    typeof value === 'string' &&
    ASTROLOGY_PREVIEW_FEEDBACK_ORDERED_CATEGORIES.includes(
      value as AstrologyPreviewFeedbackCategory,
    )
  );
}
