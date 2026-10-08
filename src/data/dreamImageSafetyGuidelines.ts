/**
 * Dream Image Safety & Accessibility Guidelines
 *
 * A typed, content-only dataset of safety principles, boundary rules, and
 * accessibility criteria for optional, curated Dream Image generation.
 *
 * Enforces key privacy, ethical, and accessibility boundaries:
 * 1. Disallows copying/transmitting raw dream journal narratives or private logs.
 * 2. Disallows personal identifiers (names, addresses, PII) in prompt descriptions.
 * 3. Disallows medical, diagnostic, psychiatric, or predictive/fortune claims.
 * 4. Disallows inaccessible, missing, empty, or placeholder image alternative text.
 *
 * All guidance is educational, privacy-preserving, and non-prescriptive.
 */

export type DreamImageSafetyCategory =
  | 'raw-journal'
  | 'personal-identifiers'
  | 'medical-predictive'
  | 'accessibility';

export interface DreamImageSafetyGuideline {
  /** Stable unique identifier */
  id: string;
  /** Categorical grouping */
  category: DreamImageSafetyCategory;
  /** Human-readable title */
  title: string;
  /** Clear, definitive rule statement */
  rule: string;
  /** Detailed description explaining the boundary and its purpose */
  description: string;
  /** Privacy or ethical rationale for the guideline */
  rationale: string;
  /** Illustrative examples of disallowed inputs or antipatterns */
  disallowedExamples: string[];
  /** Recommended constructive practices or compliant prompt approaches */
  recommendedPractices: string[];
  /** Optional screen-reader or assistive-technology specific guidance */
  accessibilityNote?: string;
}

export interface DreamImageSafetyChecklistItem {
  /** Stable checklist item identifier */
  id: string;
  /** Associated guideline identifier */
  guidelineId: string;
  /** Short label for review checkboxes or UI disclosure lists */
  label: string;
  /** Concise summary of what is disallowed */
  disallowedSummary: string;
  /** Concise summary of what is recommended */
  recommendedSummary: string;
}

export const DREAM_IMAGE_SAFETY_GUIDELINES: DreamImageSafetyGuideline[] = [
  {
    id: 'safety-disallowed-raw-journal',
    category: 'raw-journal',
    title: 'Disallow Raw Journal Text',
    rule: 'Never paste or transmit unedited dream journal entries, private stream-of-consciousness logs, or intimate personal narratives.',
    description:
      'Raw dream journal entries frequently contain vulnerable subconscious thoughts, private personal memories, and sensitive daytime contexts that belong strictly on the local device. Visual generation prompts must always be curated into abstract, symbolic scene descriptions rather than verbatim journal logs.',
    rationale:
      'Protects dreamer privacy by guaranteeing that uncurated subconscious reflections and private journal entries remain strictly on-device and are never sent over the network.',
    disallowedExamples: [
      'Pasting full diary text: "Last night I woke up terrified because my boss was yelling at me in my childhood bedroom..."',
      'Unedited dream notes containing personal emotional confessions or diary logs.',
      'Raw audio transcription fragments describing intimate waking life conflicts.',
    ],
    recommendedPractices: [
      'Transform the dream feeling into an abstract visual motif, such as "An open doorway glowing with warm amber light at twilight."',
      'Focus on symbolic scenery: "A tranquil lake reflecting violet twilight and a crescent moon with gentle ripples."',
      'Use curated, pre-defined templates provided by the Dream Alchemy catalog.',
    ],
    accessibilityNote:
      'Curated abstract prompts yield predictable visual compositions that can be cleanly described to screen-reader users.',
  },
  {
    id: 'safety-disallowed-personal-identifiers',
    category: 'personal-identifiers',
    title: 'Disallow Personal Identifiers (PII)',
    rule: 'Never include real names of living individuals, residential addresses, phone numbers, workplace identifiers, or identifiable likenesses.',
    description:
      'Curated scene prompts must maintain complete anonymity for the dreamer and anyone who appears in their dreams. Prompts must avoid real names, specific private domestic addresses, workplaces, or identifying social details. Characters must be generalized into archetypal figures and locations into evocative metaphorical spaces.',
    rationale:
      'Prevents inadvertent leakage of personally identifiable information (PII) to external image providers and safeguards personal relationships.',
    disallowedExamples: [
      'Including specific names: "My friend Sarah Johnson talking to my colleague David Miller from Acme Corp..."',
      'Private addresses or coordinates: "A house located at 742 Evergreen Terrace in Springfield..."',
      'Contact details, social media handles, account numbers, or school/employer names.',
    ],
    recommendedPractices: [
      'Use universal archetypes: "Two silhouetted travelers conversing beside an old lantern in an ancient courtyard."',
      'Use metaphorical settings: "A quiet stone library with tall arched windows looking out onto mist-covered pines."',
      'Emphasize symbolic presence rather than photographic specificity.',
    ],
    accessibilityNote:
      'Archetypal descriptions allow screen readers to convey universal emotional tone without confusing listeners with personal references.',
  },
  {
    id: 'safety-disallowed-medical-predictive',
    category: 'medical-predictive',
    title: 'Disallow Medical & Predictive Claims',
    rule: 'Never frame generated imagery as clinical medical diagnoses, psychiatric therapy, psychic predictions, or deterministic destiny.',
    description:
      'Dream Alchemy is an educational, contemplative, and artistic companion. Artwork generation must never be represented as psychological diagnostic testing, clinical trauma evaluation, physical or mental illness prognosis, or fortune-telling prophecies.',
    rationale:
      'Preserves ethical boundaries by preventing misleading medical advice, unsupported psychological diagnoses, and fatalistic determinism.',
    disallowedExamples: [
      'Diagnostic prompts: "Generate an image diagnosing my clinical depression and chronic anxiety disorder."',
      'Predictive claims: "An image revealing whether I will pass my bar exam next Tuesday or win the lottery."',
      'Medical assertions: "Visual proof that my recurring nightmare was caused by a specific brain lesion."',
    ],
    recommendedPractices: [
      'Frame imagery as subjective artistic reflection: "A winding forest path parting through morning mist toward distant sunlit ridges."',
      'Explore emotional atmosphere openly: "Turbulent ocean waters gradually smoothing into calm turquoise waves under dawn skies."',
      'Contemplate archetypal motifs with open-ended curiosity rather than certainty.',
    ],
    accessibilityNote:
      'Non-medical framing ensures assistive technology announcements remain reflective, calm, and supportive.',
  },
  {
    id: 'safety-inaccessible-alt-text',
    category: 'accessibility',
    title: 'Disallow Inaccessible Alternative Text',
    rule: 'Never leave generated images without descriptive alternative text; avoid empty strings, generic filenames, or vague placeholder labels.',
    description:
      'Every generated dream image must be paired with concise, descriptive alternative text that conveys the visual subject, artistic style, lighting, and palette. Blind and low-vision dreamers rely on screen readers to experience the visual reflection fully. Empty strings, filenames (e.g. "image_123.jpg"), or non-descriptive labels (e.g. "image" or "dream art") are strictly prohibited.',
    rationale:
      'Supports more equitable access to optional visual reflections by giving screen-reader users a useful description of the generated artwork.',
    disallowedExamples: [
      'Missing or empty alt text: altText=""',
      'Generic placeholders: "image", "picture", "photo", "dream art", "artwork"',
      'Raw filename or technical metadata: "generated_canvas_827391.png" or "1024x1024_render"',
      'Subjective judgment without description: "A very pretty picture that looks cool"',
    ],
    recommendedPractices: [
      'State artistic medium and subject: "Watercolor illustration of a tranquil alpine lake under violet twilight, reflecting a slender crescent moon."',
      'Highlight dominant palette and lighting: "Ethereal painting of an ancient stone archway bathed in soft amber light amidst violet clouds."',
      'Keep descriptions concise (typically 1–2 descriptive sentences) without redundant prefixes like "image of".',
    ],
    accessibilityNote:
      'Screen readers announce image presence automatically; alt text should describe the visual content directly without saying "image of" or "picture of".',
  },
];

export const DREAM_IMAGE_SAFETY_CATEGORIES: DreamImageSafetyCategory[] = [
  'raw-journal',
  'personal-identifiers',
  'medical-predictive',
  'accessibility',
];

export const DREAM_IMAGE_SAFETY_CHECKLIST: DreamImageSafetyChecklistItem[] = [
  {
    id: 'chk-no-raw-journal',
    guidelineId: 'safety-disallowed-raw-journal',
    label: 'Curated Scene (No Raw Journal)',
    disallowedSummary: 'No verbatim dream diary entries, unedited private narratives, or intimate logs.',
    recommendedSummary: 'Use abstract symbolic scene descriptions or catalog templates.',
  },
  {
    id: 'chk-no-personal-identifiers',
    guidelineId: 'safety-disallowed-personal-identifiers',
    label: 'Anonymous & Archetypal (No PII)',
    disallowedSummary: 'No real names, home addresses, phone numbers, or identifiable people.',
    recommendedSummary: 'Use universal archetypes (traveler, guide) and metaphorical landscapes.',
  },
  {
    id: 'chk-no-medical-predictive',
    guidelineId: 'safety-disallowed-medical-predictive',
    label: 'Artistic Reflection (No Medical/Predictive Claims)',
    disallowedSummary: 'No psychological diagnoses, medical assertions, or predictive fortune-telling.',
    recommendedSummary: 'Frame visual motifs as open-ended, non-prescriptive artistic reflections.',
  },
  {
    id: 'chk-accessible-alt-text',
    guidelineId: 'safety-inaccessible-alt-text',
    label: 'Accessible Alt Text (No Vague Placeholders)',
    disallowedSummary: 'No empty alt text, filenames, or generic labels like "image" or "photo".',
    recommendedSummary: 'Provide descriptive visual summaries covering medium, subject, lighting, and palette.',
  },
];

/**
 * Common non-descriptive alt text placeholders that fail accessibility standards.
 */
const INACCESSIBLE_ALT_PATTERNS = [
  '',
  'image',
  'img',
  'picture',
  'photo',
  'photograph',
  'dream',
  'dream image',
  'dream art',
  'artwork',
  'untitled',
  'placeholder',
];

/**
 * Retrieve a safety guideline by its unique identifier.
 */
export function getSafetyGuidelineById(
  id: string,
): DreamImageSafetyGuideline | undefined {
  return DREAM_IMAGE_SAFETY_GUIDELINES.find(guideline => guideline.id === id);
}

/**
 * Retrieve all safety guidelines belonging to a specific category.
 */
export function getSafetyGuidelinesByCategory(
  category: DreamImageSafetyCategory,
): DreamImageSafetyGuideline[] {
  return DREAM_IMAGE_SAFETY_GUIDELINES.filter(
    guideline => guideline.category === category,
  );
}

/**
 * Retrieve all safety guidelines.
 */
export function getAllSafetyGuidelines(): DreamImageSafetyGuideline[] {
  return DREAM_IMAGE_SAFETY_GUIDELINES;
}

/**
 * Retrieve all supported safety category keys.
 */
export function getAllSafetyCategories(): DreamImageSafetyCategory[] {
  return [...DREAM_IMAGE_SAFETY_CATEGORIES];
}

/**
 * Check whether a safety guideline exists for a given ID.
 */
export function hasSafetyGuideline(id: string): boolean {
  return getSafetyGuidelineById(id) !== undefined;
}

/**
 * Retrieve the summary safety checklist.
 */
export function getSafetyChecklist(): DreamImageSafetyChecklistItem[] {
  return DREAM_IMAGE_SAFETY_CHECKLIST;
}

/**
 * Type guard verifying whether a value is a valid DreamImageSafetyCategory.
 */
export function isValidSafetyCategory(
  value: unknown,
): value is DreamImageSafetyCategory {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_SAFETY_CATEGORIES.includes(value as DreamImageSafetyCategory)
  );
}

/**
 * Applies the project's baseline alternative-text heuristics. This catches empty,
 * very short, placeholder, and raw-filename values; it is not a complete
 * accessibility conformance assessment.
 */
export function isDescriptiveAltText(altText: string): boolean {
  if (typeof altText !== 'string') {
    return false;
  }
  const trimmed = altText.trim().toLowerCase();
  if (trimmed.length < 10) {
    return false;
  }
  if (INACCESSIBLE_ALT_PATTERNS.includes(trimmed)) {
    return false;
  }
  // Check for raw filenames like .jpg, .png, .webp, .svg
  if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(trimmed)) {
    return false;
  }
  return true;
}

/**
 * Retrieve accessibility guidelines for image alternative text.
 */
export function getAccessibilityAltTextGuidance(): DreamImageSafetyGuideline | undefined {
  return getSafetyGuidelineById('safety-inaccessible-alt-text');
}
