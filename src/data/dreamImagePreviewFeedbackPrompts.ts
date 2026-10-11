export type DreamImagePreviewFeedbackCategory =
  | 'catalog-clarity'
  | 'style-selection'
  | 'consent-comprehension'
  | 'privacy-boundaries'
  | 'disabled-state-clarity'
  | 'accessibility'
  | 'trust';

export type DreamImagePreviewFeedbackResponseKind =
  | 'clarity-scale'
  | 'ease-scale'
  | 'confidence-scale'
  | 'single-choice'
  | 'optional-short-text';

export interface DreamImagePreviewFeedbackCategoryMeta {
  category: DreamImagePreviewFeedbackCategory;
  title: string;
  description: string;
}

export interface DreamImagePreviewFeedbackPrompt {
  id: string;
  category: DreamImagePreviewFeedbackCategory;
  question: string;
  responseKind: DreamImagePreviewFeedbackResponseKind;
  responseOptions?: readonly string[];
  context: string;
  responseGuidance: string;
  responseFormat: 'sanitized-text-only';
}

export interface DreamImagePreviewFeedbackBundle {
  title: string;
  introduction: string;
  scopeReminder: string;
  responseReminder: string;
  prohibitedResponseContent: readonly string[];
  orderedCategories: readonly DreamImagePreviewFeedbackCategory[];
  categories: Readonly<
    Record<
      DreamImagePreviewFeedbackCategory,
      DreamImagePreviewFeedbackCategoryMeta
    >
  >;
  prompts: readonly DreamImagePreviewFeedbackPrompt[];
}

const CLARITY_SCALE = [
  'Very unclear',
  'Somewhat unclear',
  'Neither clear nor unclear',
  'Somewhat clear',
  'Very clear',
  'Not reviewed',
] as const;

const EASE_SCALE = [
  'Very difficult',
  'Somewhat difficult',
  'Neither easy nor difficult',
  'Somewhat easy',
  'Very easy',
  'Not reviewed',
] as const;

const CONFIDENCE_SCALE = [
  'Not at all confident',
  'Slightly confident',
  'Moderately confident',
  'Very confident',
  'Completely confident',
  'Not sure',
] as const;

const OPTIONAL_TEXT_GUIDANCE =
  'Optional. Refer only to visible preparation-screen wording or behavior, using brief sanitized text. “No comment” is acceptable.';

export const DREAM_IMAGE_PREVIEW_FEEDBACK_ORDERED_CATEGORIES = [
  'catalog-clarity',
  'style-selection',
  'consent-comprehension',
  'privacy-boundaries',
  'disabled-state-clarity',
  'accessibility',
  'trust',
] as const satisfies readonly DreamImagePreviewFeedbackCategory[];

export const DREAM_IMAGE_PREVIEW_FEEDBACK_CATEGORIES = {
  'catalog-clarity': {
    category: 'catalog-clarity',
    title: 'Catalog clarity',
    description:
      'How understandable the approved scene choices, descriptions, and selected state are.',
  },
  'style-selection': {
    category: 'style-selection',
    title: 'Style selection',
    description:
      'How understandable and usable the approved style choices are within preparation.',
  },
  'consent-comprehension': {
    category: 'consent-comprehension',
    title: 'Consent comprehension',
    description:
      'How clearly the preparation screen explains the optional consent step and its limits.',
  },
  'privacy-boundaries': {
    category: 'privacy-boundaries',
    title: 'Privacy boundaries',
    description:
      'How clearly the preparation screen communicates what must not be entered or shared.',
  },
  'disabled-state-clarity': {
    category: 'disabled-state-clarity',
    title: 'Disabled-state clarity',
    description:
      'How clearly the screen distinguishes preparation from unavailable live generation.',
  },
  accessibility: {
    category: 'accessibility',
    title: 'Accessibility',
    description:
      'How perceivable and operable the preparation controls are with the tested access method.',
  },
  trust: {
    category: 'trust',
    title: 'Trust',
    description:
      'How the visible language and boundaries affect confidence in the preparation experience.',
  },
} as const satisfies Readonly<
  Record<
    DreamImagePreviewFeedbackCategory,
    DreamImagePreviewFeedbackCategoryMeta
  >
>;

export const DREAM_IMAGE_PREVIEW_FEEDBACK_PROMPTS = [
  {
    id: 'catalog-choice-clarity',
    category: 'catalog-clarity',
    question:
      'How clear or unclear were the names and descriptions of the approved catalog scenes?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_SCALE,
    context:
      'Consider whether the visible catalog copy helped distinguish one approved scene from another.',
    responseGuidance:
      'Respond about the interface copy only; do not describe personal material or add a new scene.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'catalog-selection-state',
    category: 'catalog-clarity',
    question:
      'How easy or difficult was it to identify which catalog scene was selected?',
    responseKind: 'ease-scale',
    responseOptions: EASE_SCALE,
    context:
      'Consider the visible label, border, radio state, and any other selection indicator you reviewed.',
    responseGuidance:
      'Choose one option based only on the preparation-screen behavior.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'style-choice-clarity',
    category: 'style-selection',
    question:
      'How clear or unclear were the differences among the approved style choices?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_SCALE,
    context:
      'Consider the visible style names and summaries, without evaluating generated output.',
    responseGuidance:
      'Respond only about the preparation controls; do not state a provider preference.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'style-selection-use',
    category: 'style-selection',
    question:
      'How easy or difficult was it to change the selected style and confirm the new selection?',
    responseKind: 'ease-scale',
    responseOptions: EASE_SCALE,
    context:
      'Base the response on the approved catalog controls and their selected-state feedback.',
    responseGuidance:
      'Do not comment on image quality or live generation.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'consent-purpose-clarity',
    category: 'consent-comprehension',
    question:
      'How clear or unclear was the purpose of the consent step in the preparation flow?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_SCALE,
    context:
      'Evaluate only what the visible explanation communicates about the optional preparation step.',
    responseGuidance:
      'Do not include information entered elsewhere or details about access to the Preview.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'consent-understanding',
    category: 'consent-comprehension',
    question:
      'Which statement best matches your understanding after reading the consent explanation?',
    responseKind: 'single-choice',
    responseOptions: [
      'The consent step applies to an optional future action, while preparation can be reviewed without creating media',
      'The consent step appears required to review the preparation choices',
      'The purpose or timing of consent was unclear',
      'I did not review the consent explanation',
    ],
    context:
      'This question checks comprehension; each response is accepted as an observation.',
    responseGuidance:
      'Choose the closest statement without adding personal examples.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'privacy-boundary-clarity',
    category: 'privacy-boundaries',
    question:
      'How clear or unclear were the limits on what may be used during the preparation pass?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_SCALE,
    context:
      'Consider whether the screen clearly confines the pass to approved catalog selections and synthetic inputs.',
    responseGuidance:
      'Do not repeat or supply any excluded content in the response.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'privacy-wording-gap',
    category: 'privacy-boundaries',
    question:
      'Which privacy instruction, if any, would benefit from clearer wording?',
    responseKind: 'optional-short-text',
    context:
      'You may identify a visible heading or short interface phrase, or say that no change is needed.',
    responseGuidance: OPTIONAL_TEXT_GUIDANCE,
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'disabled-state-understanding',
    category: 'disabled-state-clarity',
    question:
      'How clear or unclear was it that preparation could be reviewed while live generation remained unavailable?',
    responseKind: 'clarity-scale',
    responseOptions: CLARITY_SCALE,
    context:
      'Consider the unavailable-state heading, explanation, and preparation guidance.',
    responseGuidance:
      'Evaluate the message only; do not attempt or discuss live generation.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'disabled-state-interpretation',
    category: 'disabled-state-clarity',
    question:
      'Which statement best matches what the disabled state communicated?',
    responseKind: 'single-choice',
    responseOptions: [
      'Preparation choices remain reviewable, but live generation is unavailable',
      'Both preparation choices and live generation appear unavailable',
      'Live generation appears available',
      'The distinction was unclear',
      'I did not review the disabled state',
    ],
    context:
      'Choose the statement that reflects the visible interface, whether or not it matches the intended design.',
    responseGuidance:
      'Do not add generation feedback, technical details, or private access information.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'accessibility-operation',
    category: 'accessibility',
    question:
      'How easy or difficult was it to perceive and operate the preparation controls with the access method you tested?',
    responseKind: 'ease-scale',
    responseOptions: EASE_SCALE,
    context:
      'Consider labels, announcements, focus, selected states, contrast, reflow, and tap handling as applicable.',
    responseGuidance:
      'Respond only after hands-on review; choose “Not reviewed” if the check was not performed.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'accessibility-barrier',
    category: 'accessibility',
    question:
      'Which preparation control or message, if any, was difficult to perceive, understand, or operate?',
    responseKind: 'optional-short-text',
    context:
      'You may name the visible control and briefly state the observed behavior, or report no barrier.',
    responseGuidance: OPTIONAL_TEXT_GUIDANCE,
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'trust-boundary-confidence',
    category: 'trust',
    question:
      'After reviewing the preparation screen, how confident are you that its current limits are understandable?',
    responseKind: 'confidence-scale',
    responseOptions: CONFIDENCE_SCALE,
    context:
      'Consider the visible optionality, consent, privacy, and disabled-state language together.',
    responseGuidance:
      'Rate only the clarity of the current interface boundaries, not a provider or future service.',
    responseFormat: 'sanitized-text-only',
  },
  {
    id: 'trust-information-gap',
    category: 'trust',
    question:
      'What additional preparation-screen explanation, if any, would help you understand its current boundaries?',
    responseKind: 'optional-short-text',
    context:
      'You may identify missing or unclear product information, or say the current explanation is sufficient.',
    responseGuidance: OPTIONAL_TEXT_GUIDANCE,
    responseFormat: 'sanitized-text-only',
  },
] as const satisfies readonly DreamImagePreviewFeedbackPrompt[];

export const dreamImagePreviewFeedbackBundle: DreamImagePreviewFeedbackBundle = {
  title: 'Dream Image preparation feedback',
  introduction:
    'Optional, neutral questions about the provider-neutral preparation experience. There are no preferred answers.',
  scopeReminder:
    'Review only catalog preparation, consent and privacy copy, the expected disabled state, accessibility, and trust boundaries. Do not evaluate live generation.',
  responseReminder:
    'Responses must be sanitized text only. Skip any question you did not review or do not wish to answer.',
  prohibitedResponseContent: [
    'Dream content, journal text, or personal examples',
    'Generated media, media links, or descriptions of generated media',
    'Private Preview links or access details',
    'Credentials, tokens, headers, cookies, or private configuration',
    'Logs, traces, or request and response payloads',
    'Screenshots or attachments',
    'Provider names, selections, preferences, or recommendations',
    'Live-generation results, quality judgments, or claims',
  ],
  orderedCategories: DREAM_IMAGE_PREVIEW_FEEDBACK_ORDERED_CATEGORIES,
  categories: DREAM_IMAGE_PREVIEW_FEEDBACK_CATEGORIES,
  prompts: DREAM_IMAGE_PREVIEW_FEEDBACK_PROMPTS,
};

export function getDreamImagePreviewFeedbackBundle(): DreamImagePreviewFeedbackBundle {
  return dreamImagePreviewFeedbackBundle;
}

export function getDreamImagePreviewFeedbackPrompt(
  id: string,
): DreamImagePreviewFeedbackPrompt | undefined {
  return dreamImagePreviewFeedbackBundle.prompts.find(
    (prompt) => prompt.id === id,
  );
}

export function getDreamImagePreviewFeedbackPromptsByCategory(
  category: DreamImagePreviewFeedbackCategory,
): readonly DreamImagePreviewFeedbackPrompt[] {
  return dreamImagePreviewFeedbackBundle.prompts.filter(
    (prompt) => prompt.category === category,
  );
}

export function isDreamImagePreviewFeedbackCategory(
  value: string,
): value is DreamImagePreviewFeedbackCategory {
  return (
    DREAM_IMAGE_PREVIEW_FEEDBACK_ORDERED_CATEGORIES as readonly string[]
  ).includes(value);
}
