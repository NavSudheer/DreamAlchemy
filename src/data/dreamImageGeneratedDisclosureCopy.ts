/**
 * Dream Image Generated Result Disclosure Copy
 *
 * A typed, content-only dataset of user-facing disclosures and disclaimers
 * presented alongside generated Dream Image results, covering:
 * 1. AI-generated art labeling (synthetic visual reflection badge and notice).
 * 2. Curated prompt/style inputs (abstract catalog scene & style only; zero raw dream text).
 * 3. Non-objective & non-diagnostic framing (artistic reflection, not clinical diagnosis or prediction).
 * 4. External processing disclosure (curated prompt transmission through the application proxy).
 * 5. Local copy scope (current session memory; isolation from journal text).
 * 6. Provider and CDN retention limitations (provider-dependent operational retention).
 *
 * All copy is strictly non-diagnostic, non-predictive, privacy-preserving, and vendor-neutral.
 */

export type DreamImageDisclosureSectionId =
  | 'ai-art-labeling'
  | 'curated-inputs'
  | 'non-diagnostic'
  | 'external-processing'
  | 'local-copy-scope'
  | 'provider-retention-limitations';

export interface DreamImageDisclosureSection {
  /** Unique stable section identifier */
  id: DreamImageDisclosureSectionId;
  /** Section display title */
  title: string;
  /** Compact title for tabs, pills, or headers */
  shortTitle: string;
  /** Badge or category tag */
  badgeLabel: string;
  /** Concise 1-sentence summary */
  summary: string;
  /** Detailed explanatory paragraph */
  description: string;
  /** Structured key disclosure takeaways */
  bulletPoints: readonly string[];
  /** Screen reader accessible description */
  accessibilityLabel: string;
}

export interface DreamImageGeneratedDisclosureBundle {
  /** Main sheet or modal title */
  title: string;
  /** Subtitle or introductory note */
  subtitle: string;
  /** Primary badge label displayed over or beside the generated image */
  artBadgeLabel: string;
  /** Compact one-line disclaimer for footers or card captions */
  conciseNotice: string;
  /** Core privacy guarantee summary */
  privacyGuarantee: string;
  /** Dictionary of disclosure sections indexed by section ID */
  sections: Record<DreamImageDisclosureSectionId, DreamImageDisclosureSection>;
  /** Ordered list of section IDs for consistent display */
  orderedSectionIds: readonly DreamImageDisclosureSectionId[];
}

export const DREAM_IMAGE_DISCLOSURE_ORDERED_IDS: readonly DreamImageDisclosureSectionId[] = [
  'ai-art-labeling',
  'curated-inputs',
  'non-diagnostic',
  'external-processing',
  'local-copy-scope',
  'provider-retention-limitations',
] as const;

export const DREAM_IMAGE_DISCLOSURE_SECTIONS: Record<
  DreamImageDisclosureSectionId,
  DreamImageDisclosureSection
> = {
  'ai-art-labeling': {
    id: 'ai-art-labeling',
    title: 'AI-Generated Artwork',
    shortTitle: 'AI Art',
    badgeLabel: 'Synthetic Art',
    summary:
      'This image was synthesized by a generative AI model as an interpretive visual reflection.',
    description:
      'The generated visual reflection is synthetic artwork produced by an automated generative model. It is not human-authored photography, historical artwork, or a direct photographic capture of mental states.',
    bulletPoints: [
      'Synthesized computationally by generative AI algorithms.',
      'Constructed as an artistic visual metaphor for personal contemplation.',
      'Should not be treated as a literal record of a dream or real-world event.',
    ],
    accessibilityLabel:
      'Disclosure indicating that the artwork is synthetically created by generative artificial intelligence.',
  },

  'curated-inputs': {
    id: 'curated-inputs',
    title: 'Curated Prompt & Style Boundary',
    shortTitle: 'Inputs Used',
    badgeLabel: 'Curated Prompts Only',
    summary:
      'Created strictly from your chosen catalog template and aesthetic style, never from private journal text.',
    description:
      'To safeguard your privacy, this reflection was rendered solely from an approved abstract catalog scene prompt and your selected visual style. Your personal dream journal narrative, reflections, tags, timestamps, and personal identifiers were never sent to the generation service.',
    bulletPoints: [
      'Input limited strictly to curated catalog scene descriptions and visual styles.',
      'Raw personal dream entries and subconscious reflections never leave your device.',
      'The request contract does not accept names, contact details, or personal identifiers.',
    ],
    accessibilityLabel:
      'Disclosure verifying that only curated catalog prompts and styles were transmitted, preserving raw dream text on device.',
  },

  'non-diagnostic': {
    id: 'non-diagnostic',
    title: 'Non-Diagnostic & Exploratory Framing',
    shortTitle: 'Reflective Intent',
    badgeLabel: 'Contemplative Aid',
    summary:
      'An open-ended creative reflection for personal contemplation, not clinical assessment or prediction.',
    description:
      'Visual reflections are contemplative aids built from selected symbolic motifs. They do not constitute psychological analysis, diagnostic evaluations, medical advice, therapeutic prescriptions, or deterministic predictions of future events.',
    bulletPoints: [
      'Educational and introspective artistic reflection only.',
      'Not a substitute for professional mental healthcare or psychological evaluation.',
      'Does not claim objective accuracy, psychic meaning, or predictive validity.',
    ],
    accessibilityLabel:
      'Disclosure stating that the generated image is a creative reflection and not a psychological diagnosis or predictive claim.',
  },

  'external-processing': {
    id: 'external-processing',
    title: 'External Rendering Processing',
    shortTitle: 'External Service',
    badgeLabel: 'Secure Proxy',
    summary:
      'When generation is enabled, the curated scene and style are sent through DreamAlchemy’s application-owned server proxy to an external rendering service.',
    description:
      'Generating artwork requires transmitting the curated abstract scene and selected style to an external rendering provider. DreamAlchemy’s server route validates these inputs against exact allowlists and keeps provider credentials out of the app.',
    bulletPoints: [
      'Processed through an application-owned proxy that enforces strict input allowlists.',
      'External providers receive only the abstract scene prompt and style parameters.',
      'Mobile client never communicates directly with third-party provider APIs.',
    ],
    accessibilityLabel:
      'Disclosure describing the external cloud rendering process and serverless proxy protections.',
  },

  'local-copy-scope': {
    id: 'local-copy-scope',
    title: 'Local Copy Scope & Storage',
    shortTitle: 'Local Scope',
    badgeLabel: 'On-Device Copy',
    summary:
      'The current result is held only in this screen’s temporary session state.',
    description:
      'The generated result currently exists in temporary active session memory. Discarding or regenerating clears the active result from this screen. DreamAlchemy does not currently save generated images to its journal or cloud storage.',
    bulletPoints: [
      'Current result exists in active memory and can be cleared at any time.',
      'Discarding clears the active in-memory result from this screen.',
      'No generated image is currently attached to a saved dream entry.',
    ],
    accessibilityLabel:
      'Disclosure explaining that the image copy is held locally and kept separate from private journal metadata.',
  },

  'provider-retention-limitations': {
    id: 'provider-retention-limitations',
    title: 'Provider & CDN Retention Limitations',
    shortTitle: 'Retention Notice',
    badgeLabel: 'Transient Caching',
    summary:
      'External rendering providers and delivery networks may retain operational copies according to their own reviewed policies.',
    description:
      'DreamAlchemy does not operate remote user accounts or a persistent cloud image gallery. A selected rendering provider or delivery network may retain request data or generated assets for operational, safety, or delivery purposes. Exact retention and deletion behavior must be reviewed for the configured provider; clearing the result in the app cannot erase copies already processed externally.',
    bulletPoints: [
      'Image URL lifetime and access controls depend on the configured provider.',
      'Upstream retention and deletion schedules must be verified before provider activation.',
      'Clearing the in-app result cannot force deletion from external operational systems.',
    ],
    accessibilityLabel:
      'Disclosure regarding transient CDN caching and third-party operational retention limits.',
  },
};

export const DREAM_IMAGE_GENERATED_DISCLOSURE_BUNDLE: DreamImageGeneratedDisclosureBundle = {
  title: 'Dream Image Reflection Disclosure',
  subtitle:
    'Transparency regarding AI generation, data boundaries, and retention limits.',
  artBadgeLabel: 'AI-Generated Art',
  conciseNotice:
    'AI-generated reflection based on a curated scene template. Not a clinical assessment or predictive claim.',
  privacyGuarantee:
    'Generated exclusively from curated abstract scene templates. Your personal dream narrative, reflections, and tags remain strictly private on this device.',
  sections: DREAM_IMAGE_DISCLOSURE_SECTIONS,
  orderedSectionIds: DREAM_IMAGE_DISCLOSURE_ORDERED_IDS,
};

/**
 * Retrieve the full generated dream image disclosure bundle.
 */
export function getDreamImageGeneratedDisclosureBundle(): DreamImageGeneratedDisclosureBundle {
  return DREAM_IMAGE_GENERATED_DISCLOSURE_BUNDLE;
}

/**
 * Retrieve a specific disclosure section by its unique identifier.
 */
export function getDreamImageDisclosureSection(
  id: DreamImageDisclosureSectionId,
): DreamImageDisclosureSection {
  return DREAM_IMAGE_DISCLOSURE_SECTIONS[id];
}

/**
 * Retrieve all disclosure sections in the canonical display order.
 */
export function getAllDreamImageDisclosureSections(): DreamImageDisclosureSection[] {
  return DREAM_IMAGE_DISCLOSURE_ORDERED_IDS.map((id) => DREAM_IMAGE_DISCLOSURE_SECTIONS[id]);
}

/**
 * Retrieve a concise one-sentence disclosure for captions and result footers.
 */
export function getConciseGeneratedArtDisclosure(): string {
  return DREAM_IMAGE_GENERATED_DISCLOSURE_BUNDLE.conciseNotice;
}

/**
 * Retrieve the primary display badge label for AI-generated artwork.
 */
export function getGeneratedArtBadgeLabel(): string {
  return DREAM_IMAGE_GENERATED_DISCLOSURE_BUNDLE.artBadgeLabel;
}

/**
 * Retrieve the explicit statement verifying that personal dream logs were never sent.
 */
export function getDreamImageInputBoundaryGuarantee(): string {
  return DREAM_IMAGE_DISCLOSURE_SECTIONS['curated-inputs'].summary;
}

/**
 * Retrieve the transparent disclosure on provider and CDN cache retention limits.
 */
export function getDreamImageRetentionLimitationNotice(): string {
  return DREAM_IMAGE_DISCLOSURE_SECTIONS['provider-retention-limitations'].summary;
}

/**
 * Type guard verifying whether a value is a recognized DreamImageDisclosureSectionId.
 */
export function isRecognizedDisclosureSectionId(
  value: unknown,
): value is DreamImageDisclosureSectionId {
  return (
    typeof value === 'string' &&
    DREAM_IMAGE_DISCLOSURE_ORDERED_IDS.includes(value as DreamImageDisclosureSectionId)
  );
}
