/**
 * Astrology Coordinate Guidance & Help Copy
 *
 * A typed, content-only dataset of user-facing educational guidance explaining:
 * 1. Why latitude and longitude coordinates are required for astrological chart calculation.
 * 2. Valid coordinate ranges (latitude -90 to +90, longitude -180 to +180).
 * 3. Accepted decimal formats and representative geographic examples.
 * 4. Boundary-location uncertainty and approximate city-center precision.
 * 5. Ephemeral calculation privacy: coordinates are sent in transient calculation requests
 *    but are never saved to device storage or attached to local birth profiles.
 *
 * Framing is non-predictive, non-diagnostic, and privacy-first.
 */

export type CoordinateHelpSectionId =
  | 'why-required'
  | 'valid-ranges'
  | 'format-examples'
  | 'boundary-uncertainty'
  | 'privacy-storage';

export interface CoordinateRangeRule {
  /** Field name */
  field: 'latitude' | 'longitude';
  /** Display label */
  label: string;
  /** Minimum valid value in decimal degrees */
  min: number;
  /** Maximum valid value in decimal degrees */
  max: number;
  /** Direction represented by positive numbers */
  positiveDirection: string;
  /** Direction represented by negative numbers */
  negativeDirection: string;
  /** Explanatory description */
  description: string;
}

export interface CoordinateExample {
  /** Stable identifier */
  id: string;
  /** City or metropolitan area name */
  cityName: string;
  /** Country or region */
  region: string;
  /** Latitude in decimal degrees */
  latitude: number;
  /** Longitude in decimal degrees */
  longitude: number;
  /** Directional notes (e.g. North/West) */
  quadrant: string;
}

export interface CoordinateHelpSection {
  /** Unique section identifier */
  id: CoordinateHelpSectionId;
  /** Accessible section title */
  title: string;
  /** Short summary line */
  summary: string;
  /** Detailed educational paragraphs */
  content: string;
  /** Key bullet points for quick scanning */
  bulletPoints: string[];
  /** Screen reader accessible label */
  accessibilityLabel: string;
}

export interface AstrologyCoordinateHelpBundle {
  /** Panel header */
  title: string;
  /** Panel subtitle */
  subtitle: string;
  /** Core privacy guarantee */
  privacyGuarantee: string;
  /** Ordered list of help sections */
  sections: CoordinateHelpSection[];
  /** Rules for valid ranges */
  ranges: CoordinateRangeRule[];
  /** Concrete decimal examples */
  examples: CoordinateExample[];
}

export const COORDINATE_RANGE_RULES: readonly CoordinateRangeRule[] = [
  {
    field: 'latitude',
    label: 'Latitude',
    min: -90,
    max: 90,
    positiveDirection: 'North (0° to 90°)',
    negativeDirection: 'South (0° to -90°)',
    description:
      'Measures distance north or south of the Equator (0°). Use positive numbers for the Northern Hemisphere and negative numbers for the Southern Hemisphere.',
  },
  {
    field: 'longitude',
    label: 'Longitude',
    min: -180,
    max: 180,
    positiveDirection: 'East (0° to 180°)',
    negativeDirection: 'West (0° to -180°)',
    description:
      'Measures distance east or west of the Prime Meridian (0°). Use positive numbers for the Eastern Hemisphere and negative numbers for the Western Hemisphere.',
  },
] as const;

export const COORDINATE_EXAMPLES: readonly CoordinateExample[] = [
  {
    id: 'nyc',
    cityName: 'New York City',
    region: 'United States',
    latitude: 40.7128,
    longitude: -74.006,
    quadrant: 'North / West',
  },
  {
    id: 'london',
    cityName: 'London',
    region: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    quadrant: 'North / West',
  },
  {
    id: 'tokyo',
    cityName: 'Tokyo',
    region: 'Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    quadrant: 'North / East',
  },
  {
    id: 'sydney',
    cityName: 'Sydney',
    region: 'Australia',
    latitude: -33.8688,
    longitude: 151.2093,
    quadrant: 'South / East',
  },
  {
    id: 'sao-paulo',
    cityName: 'São Paulo',
    region: 'Brazil',
    latitude: -23.5505,
    longitude: -46.6333,
    quadrant: 'South / West',
  },
] as const;

export const COORDINATE_HELP_SECTIONS: Record<
  CoordinateHelpSectionId,
  CoordinateHelpSection
> = {
  'why-required': {
    id: 'why-required',
    title: 'Why Coordinates Are Needed',
    summary:
      'Coordinates establish the geographic vantage point on Earth at the moment of birth.',
    content:
      'Astrological chart calculations model the sky as seen from a specific location on Earth. While planetary sign placements (such as the Sun or outer planets) are broadly similar across the globe on a given day, location-dependent features—specifically the Ascendant (rising sign), Midheaven, and house boundaries—depend directly on your geographic vantage point and local horizon.',
    bulletPoints: [
      'Determines the local horizon and visible sky at birth.',
      'Required to calculate the Ascendant (rising sign) and Midheaven.',
      'Calculates house cusps and placements when a birth time is provided.',
      'City-level center coordinates are usually sufficient for reflective use.',
    ],
    accessibilityLabel: 'Why coordinates are needed for chart calculation',
  },
  'valid-ranges': {
    id: 'valid-ranges',
    title: 'Valid Coordinate Ranges',
    summary:
      'Latitude spans -90 to +90 degrees; longitude spans -180 to +180 degrees.',
    content:
      'Coordinates must be entered in standard decimal degrees. Latitude ranges from -90.0 (South Pole) to +90.0 (North Pole), with 0.0 at the Equator. Longitude ranges from -180.0 (International Date Line west) to +180.0 (International Date Line east), with 0.0 at the Greenwich Prime Meridian.',
    bulletPoints: [
      'Latitude: between -90 and +90 (e.g. 37.7749 for North, -33.8688 for South).',
      'Longitude: between -180 and +180 (e.g. 139.6503 for East, -122.4194 for West).',
      'Use decimal numbers only; symbols like °, \', or " are not accepted.',
      'A leading minus sign (-) designates South latitude or West longitude.',
    ],
    accessibilityLabel: 'Valid numerical ranges for latitude and longitude',
  },
  'format-examples': {
    id: 'format-examples',
    title: 'Decimal Format & Examples',
    summary:
      'Enter coordinates as plain decimal numbers, easily found via standard web maps.',
    content:
      'Coordinates should be formatted as plain decimal numbers with up to 4 to 6 decimal places. You do not need to look up a precise hospital or street address—coordinates for the center of the birth city, town, or metropolitan area are usually sufficient for personal reflection.',
    bulletPoints: [
      'Use plain numbers (e.g. 40.7128 and -74.0060).',
      'Do not include directional letters (N, S, E, W) in the numeric field.',
      'Approximate coordinates can be found by searching "[City Name] coordinates" in any map tool.',
      'General city-center precision avoids requesting a personal street address.',
    ],
    accessibilityLabel: 'Decimal format instructions and city examples',
  },
  'boundary-uncertainty': {
    id: 'boundary-uncertainty',
    title: 'Boundary-Location Uncertainty',
    summary:
      'Locations near borders, timezone lines, or extreme latitudes carry minor calculation variation.',
    content:
      'When coordinates represent approximate city centers or birthplaces lie near administrative timezone borders, coordinate differences can shift chart angles or house boundaries, especially when the recorded birth time is also approximate. At extreme polar latitudes, some standard quadrant house systems can produce compressed or undefined house divisions.',
    bulletPoints: [
      'Approximate coordinates may shift house cusps near degree boundaries.',
      'Timezone border regions rely on historical timezone resolution.',
      'High polar latitudes can compress certain house divisions.',
      'Treat the resulting interpretation as a symbolic reflective model, not a fact about personality or future events.',
    ],
    accessibilityLabel: 'Geographic and boundary location uncertainty notes',
  },
  'privacy-storage': {
    id: 'privacy-storage',
    title: 'Privacy & Storage Policy',
    summary:
      'Coordinates are sent only for chart calculation and are never saved to device storage.',
    content:
      'Your geographic coordinates are transient inputs to the chart request. When you calculate a chart, DreamAlchemy sends them through its server route to the external calculation provider. The app does not write coordinates to local storage or your birth profile. External processing and retention are governed by the calculation provider’s terms and privacy policy. Only your optional text label (for example, "Chicago, IL") may be kept locally for display.',
    bulletPoints: [
      'Coordinates are never written to local device storage.',
      'Local birth profiles retain only your optional friendly city label.',
      'Coordinates are transmitted to the server route and calculation provider only when you explicitly request a chart.',
      'The provider may process or log requests under its own terms and privacy policy.',
      'Personal dream journal narratives and notes are strictly separate and never sent.',
    ],
    accessibilityLabel: 'Privacy policy and ephemeral coordinate storage guarantee',
  },
};

export const COORDINATE_HELP_SECTION_IDS: readonly CoordinateHelpSectionId[] = [
  'why-required',
  'valid-ranges',
  'format-examples',
  'boundary-uncertainty',
  'privacy-storage',
] as const;

export const ASTROLOGY_COORDINATE_HELP: AstrologyCoordinateHelpBundle = {
  title: 'Birth Location Coordinates Help',
  subtitle: 'Understanding latitude, longitude, and chart calculation precision',
  privacyGuarantee:
    'DreamAlchemy sends coordinates for calculation but does not save them to your device or birth profile. Dream journal entries are not included in astrology requests.',
  sections: COORDINATE_HELP_SECTION_IDS.map((id) => COORDINATE_HELP_SECTIONS[id]),
  ranges: [...COORDINATE_RANGE_RULES],
  examples: [...COORDINATE_EXAMPLES],
};

/**
 * Retrieve help copy for a specific coordinate guidance section.
 */
export function getCoordinateHelpSection(
  id: CoordinateHelpSectionId,
): CoordinateHelpSection {
  return COORDINATE_HELP_SECTIONS[id];
}

/**
 * Retrieve all coordinate help sections in recommended reading order.
 */
export function getAllCoordinateHelpSections(): CoordinateHelpSection[] {
  return COORDINATE_HELP_SECTION_IDS.map((id) => COORDINATE_HELP_SECTIONS[id]);
}

/**
 * Validate whether a latitude value falls within the valid -90 to +90 degree range.
 */
export function isValidLatitude(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= -90 &&
    value <= 90
  );
}

/**
 * Validate whether a longitude value falls within the valid -180 to +180 degree range.
 */
export function isValidLongitude(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= -180 &&
    value <= 180
  );
}

/**
 * Comprehensive coordinate pair validation returning status and accessible error message.
 */
export function validateCoordinates(
  latitude: unknown,
  longitude: unknown,
): { isValid: boolean; errorMessage?: string } {
  if (latitude == null || latitude === '') {
    return { isValid: false, errorMessage: 'Latitude is required for chart calculation.' };
  }
  if (longitude == null || longitude === '') {
    return { isValid: false, errorMessage: 'Longitude is required for chart calculation.' };
  }

  const numLat = typeof latitude === 'number' ? latitude : Number(latitude);
  const numLng = typeof longitude === 'number' ? longitude : Number(longitude);

  if (!isValidLatitude(numLat)) {
    return {
      isValid: false,
      errorMessage: 'Latitude must be a valid number between -90 and 90 degrees.',
    };
  }

  if (!isValidLongitude(numLng)) {
    return {
      isValid: false,
      errorMessage: 'Longitude must be a valid number between -180 and 180 degrees.',
    };
  }

  return { isValid: true };
}

/**
 * Retrieve the summary privacy statement for coordinate usage.
 */
export function getCoordinatePrivacyStatement(): string {
  return (
    COORDINATE_HELP_SECTIONS['privacy-storage']?.summary ??
    ASTROLOGY_COORDINATE_HELP.privacyGuarantee
  );
}

/**
 * Retrieve the boundary location uncertainty guidance note.
 */
export function getCoordinateBoundaryUncertaintyNote(): string {
  return (
    COORDINATE_HELP_SECTIONS['boundary-uncertainty']?.summary ??
    'Approximate coordinates are suitable for reflective exploration.'
  );
}

/**
 * Type guard verifying whether a value is a recognized CoordinateHelpSectionId.
 */
export function isRecognizedCoordinateHelpSectionId(
  value: unknown,
): value is CoordinateHelpSectionId {
  return (
    typeof value === 'string' &&
    COORDINATE_HELP_SECTION_IDS.includes(value as CoordinateHelpSectionId)
  );
}
