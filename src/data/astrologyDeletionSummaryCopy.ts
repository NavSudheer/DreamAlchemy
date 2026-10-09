/**
 * Astrology Deletion Summary & Data Scope Disclosure Copy
 *
 * A typed, content-only dataset of user-facing disclosures for deleting
 * local Astrology data, clearly explaining:
 * 1. Which local records are permanently removed from the device:
 *    - Saved birth profile (LocalBirthProfile: birth date, optional time, timezone, location label)
 *    - Calculated chart and placements (AstrologyChart: bodies, signs, houses, aspects, precision)
 *    - Generated AI reflection (AstrologyReflection: reflection text, timestamp, disclosure)
 *    - Active screen and draft form inputs
 * 2. What data is completely unaffected and preserved:
 *    - Personal dream journal entries, reflections, and audio notes
 *    - Dream tags, themes, patterns, and history
 *    - App settings and preferences
 * 3. The external processing caveat:
 *    - Local deletion immediately purges all records from this device.
 *    - Local deletion cannot retroactively retract, recall, or purge data previously
 *      transmitted across the network to external calculation or AI reflection endpoints,
 *      which are governed by external provider retention and privacy policies.
 *    - DreamAlchemy does not maintain remote user accounts or cloud profiles.
 *
 * Framing is non-predictive, non-diagnostic, and privacy-preserving.
 */

export type AstrologyDeletionScopeCategory =
  | 'local-removed'
  | 'unaffected-journal'
  | 'external-caveat';

export type AstrologyDeletionImpact = 'deleted' | 'preserved' | 'caveat';

export interface AstrologyDeletionScopeItem {
  /** Stable unique identifier */
  id: string;
  /** Human-readable item name */
  name: string;
  /** Categorical classification */
  category: AstrologyDeletionScopeCategory;
  /** Result of deletion on this data item */
  impact: AstrologyDeletionImpact;
  /** Storage location or data target */
  target: string;
  /** High-level description of what this data contains */
  description: string;
  /** In-depth explanation of the deletion impact or boundary */
  detail: string;
}

export interface AstrologyDeletionScopeSection {
  /** Unique category identifier */
  id: AstrologyDeletionScopeCategory;
  /** Section heading */
  title: string;
  /** Compact title for tabs, chips, or badges */
  shortTitle: string;
  /** Badge tag label */
  badgeLabel: string;
  /** Concise summary statement */
  summary: string;
  /** Comprehensive descriptive narrative */
  description: string;
  /** List of scoped items in this category */
  items: readonly AstrologyDeletionScopeItem[];
  /** Screen reader accessible label */
  accessibilityLabel: string;
}

export interface AstrologyDeletionDialogCopy {
  /** Alert dialog title */
  dialogTitle: string;
  /** Concise confirmation message for system alerts */
  dialogMessage: string;
  /** Extended disclosure text for comprehensive modals */
  detailedWarning: string;
  /** Destructive confirmation action button */
  confirmButtonLabel: string;
  /** Cancellation button label */
  cancelButtonLabel: string;
  /** Post-deletion success banner message */
  successMessage: string;
  /** Deletion failure banner message */
  errorMessage: string;
}

export interface AstrologyDeletionSummaryBundle {
  /** Main disclosure title */
  title: string;
  /** Subtitle context */
  subtitle: string;
  /** Primary warning header */
  warningHeader: string;
  /** Core privacy guarantee */
  coreNotice: string;
  /** Confirmation dialog copy */
  dialog: AstrologyDeletionDialogCopy;
  /** Dictionary of sections indexed by category */
  sections: Record<AstrologyDeletionScopeCategory, AstrologyDeletionScopeSection>;
  /** Recommended display ordering for category sections */
  orderedCategoryIds: readonly AstrologyDeletionScopeCategory[];
}

export const ASTROLOGY_DELETION_ITEMS: readonly AstrologyDeletionScopeItem[] = [
  // 1. Removed From Device
  {
    id: 'local-birth-profile',
    name: 'Saved Birth Profile',
    category: 'local-removed',
    impact: 'deleted',
    target: 'Local App Storage (dreamalchemy.astrology.profile.v1)',
    description:
      'Stored birth date, optional birth time, optional timezone, and optional display location label.',
    detail:
      'Permanently removed from local device storage. You will need to re-enter your birth details if you wish to calculate a chart again.',
  },
  {
    id: 'local-calculated-chart',
    name: 'Calculated Chart & Placements',
    category: 'local-removed',
    impact: 'deleted',
    target: 'Local App Storage (dreamalchemy.astrology.bundle.v1)',
    description:
      'Calculated planetary placements, house positions, geometric aspects, precision level, and uncertainty notes.',
    detail:
      'Permanently wiped from local storage. Celestial positions and aspect breakdowns will no longer appear on your screen.',
  },
  {
    id: 'local-ai-reflection',
    name: 'Generated AI Reflection',
    category: 'local-removed',
    impact: 'deleted',
    target: 'Local App Storage (dreamalchemy.astrology.bundle.v1)',
    description:
      'Saved archetypal reflection narrative, generation timestamp, and reflective disclosure notes.',
    detail:
      'Permanently erased from local storage. Any previous AI reflection commentary is wiped from the device.',
  },
  {
    id: 'screen-draft-state',
    name: 'Active Form & Screen Drafts',
    category: 'local-removed',
    impact: 'deleted',
    target: 'Screen State (In-Memory)',
    description:
      'Active input field text, coordinates, selected placement cards, and expanded aspect cards.',
    detail:
      'Reset immediately to initial empty state upon deletion.',
  },

  // 2. Unaffected Dream Journal Data
  {
    id: 'dream-journal-narratives',
    name: 'Personal Dream Journal Entries',
    category: 'unaffected-journal',
    impact: 'preserved',
    target: 'Local Dream Journal Storage',
    description:
      'Your written dream logs, morning reflections, voice transcripts, and personal diary notes.',
    detail:
      'Completely untouched. DreamAlchemy enforces strict data isolation: astrology records are stored separately and deleting them never affects your journal entries.',
  },
  {
    id: 'dream-themes-and-patterns',
    name: 'Dream Tags, Themes & Patterns',
    category: 'unaffected-journal',
    impact: 'preserved',
    target: 'Local Dream Journal Storage',
    description:
      'Recurring dream symbols, emotional markers, lucidity ratings, and journal pattern history.',
    detail:
      'Completely untouched. All journal metadata, saved dictionary connections, and pattern analysis remain intact.',
  },
  {
    id: 'app-settings-and-preferences',
    name: 'App Settings & Other Tool Data',
    category: 'unaffected-journal',
    impact: 'preserved',
    target: 'Local App Preferences Storage',
    description:
      'Theme preferences and data belonging to other DreamAlchemy tools.',
    detail:
      'Completely unaffected. Only astrology-specific storage keys are purged during this operation.',
  },

  // 3. External Processing Caveats
  {
    id: 'external-calculation-data',
    name: 'Previously Transmitted Calculation Requests',
    category: 'external-caveat',
    impact: 'caveat',
    target: 'External Chart Calculation Provider',
    description:
      'Birth parameters (date, time, coordinates, timezone) sent over the network when a chart was previously requested.',
    detail:
      'Local deletion removes the app’s saved copies on this device, but cannot retroactively recall requests already sent over the network. External provider handling and retention are governed by that provider’s terms and privacy policy.',
  },
  {
    id: 'external-reflection-data',
    name: 'Previously Transmitted AI Reflection Requests',
    category: 'external-caveat',
    impact: 'caveat',
    target: 'AI Reflection Provider via Server Route',
    description:
      'Compact placement and aspect summaries sent when generating an optional AI reflection.',
    detail:
      'Summaries previously delivered to the AI provider cannot be retracted from external logs or provider systems by deleting local device data.',
  },
  {
    id: 'no-central-account-purge',
    name: 'No Remote Account Deletion',
    category: 'external-caveat',
    impact: 'caveat',
    target: 'Server Infrastructure',
    description:
      'DreamAlchemy does not use user accounts, remote user profiles, or cloud databases.',
    detail:
      'Because there is no remote account or cloud profile, deletion is strictly local to this device; there is no remote account to delete or sync with.',
  },
] as const;

export const ASTROLOGY_DELETION_SECTIONS: Record<
  AstrologyDeletionScopeCategory,
  AstrologyDeletionScopeSection
> = {
  'local-removed': {
    id: 'local-removed',
    title: 'Removed From This Device',
    shortTitle: 'Local Data',
    badgeLabel: 'Permanently Deleted',
    summary:
      'All saved astrology profiles, calculated charts, reflections, and form inputs are permanently cleared from this device.',
    description:
      'Deleting local astrology data removes the saved birth profile and calculated bundle stored under the astrology storage keys on this device. Once deleted, this data cannot be recovered without entering it again.',
    items: ASTROLOGY_DELETION_ITEMS.filter((item) => item.category === 'local-removed'),
    accessibilityLabel: 'Summary of astrology records permanently removed from this device',
  },
  'unaffected-journal': {
    id: 'unaffected-journal',
    title: 'Dream Journals & Other Data Unaffected',
    shortTitle: 'Journal Intact',
    badgeLabel: 'Not Deleted',
    summary:
      'Your personal dream journal entries, dream patterns, and app preferences are not changed by this deletion.',
    description:
      'DreamAlchemy keeps your personal dream journal strictly isolated from astrology. Purging astrology data does not touch, alter, or delete any of your dream entries, notes, tags, or personal reflections.',
    items: ASTROLOGY_DELETION_ITEMS.filter((item) => item.category === 'unaffected-journal'),
    accessibilityLabel: 'Summary of journal data completely unaffected by astrology deletion',
  },
  'external-caveat': {
    id: 'external-caveat',
    title: 'External Provider Processing Caveat',
    shortTitle: 'External Data',
    badgeLabel: 'Network Caveat',
    summary:
      'Local deletion cannot retract or purge data previously sent to external calculation or AI reflection endpoints.',
    description:
      'When you previously calculated a chart or generated an AI reflection, parameters and compact summaries were transmitted across the network. Local deletion removes the app’s saved copies on this device, but cannot retract data already processed under external-provider retention policies.',
    items: ASTROLOGY_DELETION_ITEMS.filter((item) => item.category === 'external-caveat'),
    accessibilityLabel: 'Important caveat explaining that external provider data cannot be retracted',
  },
};

export const ASTROLOGY_DELETION_ORDERED_CATEGORIES: readonly AstrologyDeletionScopeCategory[] = [
  'local-removed',
  'unaffected-journal',
  'external-caveat',
] as const;

export const ASTROLOGY_DELETION_DIALOG_COPY: AstrologyDeletionDialogCopy = {
  dialogTitle: 'Delete local astrology data?',
  dialogMessage:
    'This permanently removes your saved birth profile, chart, and reflection from this device. Your dream journals remain unaffected, but data previously sent to external providers cannot be retracted.',
  detailedWarning:
    'Deleting local astrology data will permanently erase your saved birth profile, calculated placements, and AI reflections from this device. Your personal dream journal entries are completely unaffected. Please note that data previously transmitted to external providers for calculation or reflection cannot be retracted or recalled from external provider logs.',
  confirmButtonLabel: 'Delete',
  cancelButtonLabel: 'Cancel',
  successMessage: 'Local astrology data deleted.',
  errorMessage: 'Local astrology data could not be deleted.',
};

export const ASTROLOGY_DELETION_SUMMARY_BUNDLE: AstrologyDeletionSummaryBundle = {
  title: 'Astrology Data Deletion Scope',
  subtitle:
    'Clear disclosure of what is removed from this device, what remains untouched, and external limitations',
  warningHeader: 'Permanent Local Deletion',
  coreNotice:
    'Removing astrology data deletes local profiles, charts, and reflections without affecting dream journals. Previously transmitted external requests cannot be retracted.',
  dialog: ASTROLOGY_DELETION_DIALOG_COPY,
  sections: ASTROLOGY_DELETION_SECTIONS,
  orderedCategoryIds: ASTROLOGY_DELETION_ORDERED_CATEGORIES,
};

/**
 * Retrieve the deletion section for a specific category.
 */
export function getDeletionScopeSection(
  category: AstrologyDeletionScopeCategory,
): AstrologyDeletionScopeSection {
  return ASTROLOGY_DELETION_SECTIONS[category];
}

/**
 * Retrieve all deletion sections in recommended display order.
 */
export function getAllDeletionScopeSections(): AstrologyDeletionScopeSection[] {
  return ASTROLOGY_DELETION_ORDERED_CATEGORIES.map((id) => ASTROLOGY_DELETION_SECTIONS[id]);
}

/**
 * Retrieve all deletion scope items belonging to a given category.
 */
export function getDeletionItemsByCategory(
  category: AstrologyDeletionScopeCategory,
): readonly AstrologyDeletionScopeItem[] {
  return ASTROLOGY_DELETION_SECTIONS[category]?.items ?? [];
}

/**
 * Retrieve all deletion scope items across all categories.
 */
export function getAllDeletionItems(): readonly AstrologyDeletionScopeItem[] {
  return [...ASTROLOGY_DELETION_ITEMS];
}

/**
 * Retrieve an explicit statement confirming that dream journals are unaffected.
 */
export function getJournalUnaffectedStatement(): string {
  return (
    ASTROLOGY_DELETION_SECTIONS['unaffected-journal']?.summary ??
    'Dream journal records are strictly isolated and remain untouched when astrology data is deleted.'
  );
}

/**
 * Retrieve the explicit statement explaining the external provider caveat.
 */
export function getExternalProcessingCaveatStatement(): string {
  return (
    ASTROLOGY_DELETION_SECTIONS['external-caveat']?.summary ??
    'Local deletion cannot retract data previously transmitted to external calculation or reflection endpoints.'
  );
}

/**
 * Format a concise dialog message for confirmation alerts.
 */
export function formatDeletionConfirmDialogMessage(): string {
  return ASTROLOGY_DELETION_DIALOG_COPY.dialogMessage;
}

/**
 * Format a comprehensive disclosure string covering local deletion, journal safety, and external caveats.
 */
export function formatDetailedDeletionDisclosure(): string {
  return (
    'Local profile, chart, and reflection records are permanently removed from this device. ' +
    'Personal dream journals and app settings are completely unaffected. ' +
    'Data previously sent to external providers for calculation or reflection cannot be retracted from external systems.'
  );
}

/**
 * Type guard verifying whether a value is a recognized AstrologyDeletionScopeCategory.
 */
export function isRecognizedDeletionScopeCategory(
  value: unknown,
): value is AstrologyDeletionScopeCategory {
  return (
    typeof value === 'string' &&
    ASTROLOGY_DELETION_ORDERED_CATEGORIES.includes(value as AstrologyDeletionScopeCategory)
  );
}
