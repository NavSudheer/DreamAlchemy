/**
 * Astrology Minor Body & Point Glossary
 *
 * A typed, content-only collection of non-predictive, archetypal glossary entries
 * for provider-returned lunar nodes, centaurs, lunar points, and asteroids:
 * True Node, Chiron, Lilith, Ceres, Pallas, Juno, and Vesta.
 *
 * All entries are strictly educational, symbolic, non-predictive, and non-diagnostic.
 * They frame each entity as a traditional cultural-historical metaphor and contemplative lens
 * for inner reflection, making zero claims regarding determinism, medical diagnosis, or fortune-telling.
 */

import { getCanonicalBodyName } from './astrologyBodyAliases';

export type MinorBodyCategory = 'node' | 'centaur' | 'point' | 'asteroid';

export interface AstrologyMinorBodyGlossaryEntry {
  /** Stable unique identifier (e.g., 'minor-true-node') */
  id: string;
  /** Canonical display name */
  name: string;
  /** Categorical classification */
  category: MinorBodyCategory;
  /** Brief educational summary of astronomical classification */
  astronomicalNature: string;
  /** High-level archetypal theme */
  archetypalTheme: string;
  /** Traditional cultural-historical or mythological metaphor */
  traditionalMetaphor: string;
  /** Contemplative, non-predictive lens for personal reflection */
  contemplativePerspective: string;
  /** Distinctive symbolic keywords */
  keywords: string[];
  /** Screen-reader accessible description */
  accessibilityDescription: string;
}

export const ASTROLOGY_MINOR_BODY_GLOSSARY: AstrologyMinorBodyGlossaryEntry[] = [
  {
    id: 'minor-true-node',
    name: 'True Node',
    category: 'node',
    astronomicalNature:
      "Astronomical orbital intersection where the Moon's path crosses the ecliptic traveling northward (ascending lunar node).",
    archetypalTheme: 'Emergent Direction & Unfolding Growth',
    traditionalMetaphor:
      "The Dragon's Head (Caput Draconis); an intake point in classical astrology representing curiosity turning toward unfamiliar terrain and emerging developmental edges.",
    contemplativePerspective:
      'Invites reflective curiosity about the growing edges of your experience, and the unfamiliar qualities or perspectives that feel challenging yet enriching to cultivate.',
    keywords: [
      'growth edge',
      'emergent direction',
      'unfolding potential',
      'curiosity',
      'developmental horizon',
    ],
    accessibilityDescription:
      'True Node: Lunar orbital intersection symbolizing emergent growth edges, developmental horizons, and unfolding potential.',
  },
  {
    id: 'minor-chiron',
    name: 'Chiron',
    category: 'centaur',
    astronomicalNature:
      'Centaur-class celestial body following an eccentric orbit between Saturn and Uranus.',
    archetypalTheme: 'Vulnerability, Empathy & Integrative Wisdom',
    traditionalMetaphor:
      'The Wounded Healer and mentor of myth; representing where lived encounters with vulnerability transform into deep empathy, humility, and mentorship for others.',
    contemplativePerspective:
      'Prompts compassionate reflection on where your personal challenges and tender sensitivities have deepened your capacity for understanding, patient resilience, and empathy.',
    keywords: [
      'compassionate empathy',
      'integrative meaning',
      'tender wisdom',
      'lived vulnerability',
      'mentorship',
    ],
    accessibilityDescription:
      'Chiron: Centaur body symbolizing compassionate empathy, lived vulnerability, and the transformative integration of personal challenges.',
  },
  {
    id: 'minor-lilith',
    name: 'Lilith',
    category: 'point',
    astronomicalNature:
      "The lunar apogee, representing the point in the Moon's elliptical orbit farthest from the Earth.",
    archetypalTheme: 'Instinctual Autonomy, Raw Truth & Wilderness',
    traditionalMetaphor:
      'The Black Moon; the uncolonized wilderness of the psyche, representing instinctual independence, authenticity, and refusal of false compromise.',
    contemplativePerspective:
      'Serves as a reflective prompt to notice where you are called to honor your authentic, untamed truth, hold firm personal boundaries, and reclaim marginalized inner wisdom.',
    keywords: [
      'instinctual autonomy',
      'raw authenticity',
      'uncompromising truth',
      'wilderness',
      'sovereignty',
    ],
    accessibilityDescription:
      'Lilith: Lunar apogee point symbolizing instinctual autonomy, uncompromised inner truth, and reclaiming personal sovereignty.',
  },
  {
    id: 'minor-ceres',
    name: 'Ceres',
    category: 'asteroid',
    astronomicalNature:
      'The largest celestial body and dwarf planet in the asteroid belt between Mars and Jupiter.',
    archetypalTheme: 'Nourishment, Caregiving & Cycles of Renewal',
    traditionalMetaphor:
      'The harvest goddess (Demeter); representing bodily sustenance, maternal nurturance, mourning life transitions, and the rhythm of seasonal regeneration.',
    contemplativePerspective:
      'Encourages reflection on how you nurture yourself and others, how you navigate periods of fallow rest or loss, and where you find sustained replenishment.',
    keywords: [
      'nourishment',
      'caregiving',
      'cycles of renewal',
      'seasonal harvest',
      'restorative tending',
    ],
    accessibilityDescription:
      'Ceres: Asteroid and dwarf planet symbolizing nourishment, caregiving, seasonal transitions, and the rhythm of grief and replenishment.',
  },
  {
    id: 'minor-pallas',
    name: 'Pallas',
    category: 'asteroid',
    astronomicalNature:
      'A large asteroid orbiting in the main belt between Mars and Jupiter.',
    archetypalTheme: 'Strategic Insight, Pattern Recognition & Creative Intellect',
    traditionalMetaphor:
      'Pallas Athena; representing strategic foresight, insightful pattern perception, ethical craft, and calm, principled defense.',
    contemplativePerspective:
      'Invites contemplation on how your mind perceives underlying patterns in complex situations, and where calm, objective strategy guides constructive action.',
    keywords: [
      'pattern recognition',
      'strategic insight',
      'creative intellect',
      'clarity',
      'principled wisdom',
    ],
    accessibilityDescription:
      'Pallas: Main-belt asteroid symbolizing strategic insight, creative pattern recognition, ethical discernment, and intellectual clarity.',
  },
  {
    id: 'minor-juno',
    name: 'Juno',
    category: 'asteroid',
    astronomicalNature:
      'Main-belt asteroid orbiting between Mars and Jupiter.',
    archetypalTheme: 'Commitment, Mutuality & Relational Equality',
    traditionalMetaphor:
      'The goddess of sacred alliance (Hera); representing mutual covenants, dedicated partnership commitments, and balancing respect between equals.',
    contemplativePerspective:
      'Prompts inquiry into the nature of your meaningful commitments, what makes a partnership feel truly mutual, and how power is balanced in shared endeavors.',
    keywords: [
      'sacred commitment',
      'relational equality',
      'mutuality',
      'fairness',
      'shared devotion',
    ],
    accessibilityDescription:
      'Juno: Main-belt asteroid symbolizing mutual commitment, relational equality, dedicated partnership, and honoring interpersonal covenants.',
  },
  {
    id: 'minor-vesta',
    name: 'Vesta',
    category: 'asteroid',
    astronomicalNature:
      'The brightest asteroid in the main asteroid belt between Mars and Jupiter.',
    archetypalTheme: 'Sacred Focus, Inner Flame & Dedicated Devotion',
    traditionalMetaphor:
      'The keeper of the sacred hearth fire (Hestia); representing concentrated inward focus, quiet sanctuary, and dedicated devotion to preserving what is vital.',
    contemplativePerspective:
      'An invitation to reflect on what central flame or purpose you tend with quiet devotion, and how you maintain an inner sanctuary amidst external noise.',
    keywords: [
      'inner flame',
      'sacred focus',
      'dedicated devotion',
      'quiet sanctuary',
      'integrity',
    ],
    accessibilityDescription:
      'Vesta: Main-belt asteroid symbolizing sacred focus, dedicated devotion to a central purpose, and tending an inner sanctuary.',
  },
];

export const ALL_MINOR_BODY_NAMES: string[] = ASTROLOGY_MINOR_BODY_GLOSSARY.map(
  entry => entry.name,
);

/**
 * Retrieve a minor body glossary entry by name, ID, or recognized alias.
 * Leverages alias normalization to resolve provider-returned formats
 * (e.g., 'true_node', 'Black Moon Lilith', 'pallas-athena').
 */
export function getMinorBodyGlossaryEntry(
  bodyName: string,
): AstrologyMinorBodyGlossaryEntry | undefined {
  if (!bodyName || typeof bodyName !== 'string') {
    return undefined;
  }

  const trimmed = bodyName.trim().toLowerCase();

  // 1. Direct ID or name match
  const direct = ASTROLOGY_MINOR_BODY_GLOSSARY.find(
    entry =>
      entry.id.toLowerCase() === trimmed ||
      entry.name.toLowerCase() === trimmed,
  );
  if (direct) {
    return direct;
  }

  // 2. Resolve through canonical body aliases
  const canonical = getCanonicalBodyName(bodyName);
  if (canonical) {
    return ASTROLOGY_MINOR_BODY_GLOSSARY.find(
      entry => entry.name.toLowerCase() === canonical.toLowerCase(),
    );
  }

  return undefined;
}

/**
 * Retrieve all 7 minor body glossary entries.
 */
export function getAllMinorBodyGlossaryEntries(): AstrologyMinorBodyGlossaryEntry[] {
  return ASTROLOGY_MINOR_BODY_GLOSSARY;
}

/**
 * Retrieve all canonical minor body names.
 */
export function getAllMinorBodyNames(): string[] {
  return [...ALL_MINOR_BODY_NAMES];
}

/**
 * Check whether a minor body glossary entry exists for the given name or alias.
 */
export function hasMinorBodyGlossaryEntry(bodyName: string): boolean {
  return getMinorBodyGlossaryEntry(bodyName) !== undefined;
}

/**
 * Filter minor body entries by astronomical category (node, centaur, point, asteroid).
 */
export function getMinorBodiesByCategory(
  category: MinorBodyCategory,
): AstrologyMinorBodyGlossaryEntry[] {
  return ASTROLOGY_MINOR_BODY_GLOSSARY.filter(
    entry => entry.category === category,
  );
}

/**
 * Retrieve the screen-reader accessible description for a minor body.
 */
export function getMinorBodyAccessibilityDescription(bodyName: string): string {
  const entry = getMinorBodyGlossaryEntry(bodyName);
  return entry?.accessibilityDescription ?? `${bodyName} placement`;
}
