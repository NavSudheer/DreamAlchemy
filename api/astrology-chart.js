const DEFAULT_ASTROLOGY_API_URL = 'https://api.natalchart.ai/v1/chart/full';

export const config = { runtime: 'edge' };

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

const isFiniteCoordinate = (value, min, max) =>
  typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;

export default async function handler(request) {
  if (request.method === 'OPTIONS') return json({}, 204);
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (process.env.ASTROLOGY_FEATURE_ENABLED !== 'true') {
    return json({ error: 'Astrology is not enabled.' }, 503);
  }

  const apiKey = process.env.ASTROLOGY_API_KEY;
  if (!apiKey) return json({ error: 'Astrology is not configured.' }, 503);

  try {
    const body = await request.json();
    const { birth, consent } = body ?? {};
    if (consent?.reflectiveUseAcknowledged !== true || consent?.externalProcessingAllowed !== true) {
      return json({ error: 'Explicit astrology processing consent is required.' }, 400);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birth?.date ?? '')) {
      return json({ error: 'A valid birth date is required.' }, 400);
    }
    if (!isFiniteCoordinate(birth?.latitude, -90, 90) || !isFiniteCoordinate(birth?.longitude, -180, 180)) {
      return json({ error: 'Valid coordinates are required for chart calculation.' }, 400);
    }
    if (birth?.time != null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(birth.time)) {
      return json({ error: 'Birth time must use HH:mm or be omitted.' }, 400);
    }

    const providerResponse = await fetch(process.env.ASTROLOGY_API_URL || DEFAULT_ASTROLOGY_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        birth: {
          date: birth.date,
          time: birth.time ?? null,
          latitude: birth.latitude,
          longitude: birth.longitude,
          ...(birth.timezone ? { timezone: birth.timezone } : {}),
        },
      }),
    });

    if (!providerResponse.ok) {
      return json({ error: 'The astrology calculation service is unavailable.' }, 502);
    }

    const providerChart = await providerResponse.json();
    const planets = Array.isArray(providerChart.planets) ? providerChart.planets : [];
    const aspects = Array.isArray(providerChart.aspects) ? providerChart.aspects : [];
    const warnings = Array.isArray(providerChart.warnings) ? providerChart.warnings.map(String) : [];

    return json({
      providerId: 'natalchart-ai',
      calculatedAt: Date.now(),
      precision: birth.time ? (birth.timezone ? 'date-time-timezone' : 'date-and-time') : 'date-only',
      placements: planets.map((planet) => ({
        body: String(planet.name ?? ''),
        sign: String(planet.sign ?? ''),
        ...(Number.isFinite(planet.longitude) ? { longitude: planet.longitude } : {}),
        ...(Number.isFinite(planet.house) ? { house: planet.house } : {}),
        ...(typeof planet.retrograde === 'boolean' ? { retrograde: planet.retrograde } : {}),
      })).filter((placement) => placement.body && placement.sign),
      aspects: aspects.map((aspect) => ({
        type: String(aspect.aspect ?? aspect.type ?? ''),
        fromBody: String(aspect.planet1 ?? aspect.fromBody ?? ''),
        toBody: String(aspect.planet2 ?? aspect.toBody ?? ''),
        ...(Number.isFinite(aspect.orb) ? { orbDegrees: aspect.orb } : {}),
      })).filter((aspect) => aspect.type && aspect.fromBody && aspect.toBody),
      uncertaintyNotes: birth.time ? warnings : ['Birth time was not provided; time-dependent placements are omitted or approximate.'],
      reflectiveDisclosure: 'For personal reflection and entertainment only; this chart is not factual, predictive, medical, legal, or financial advice.',
    });
  } catch {
    return json({ error: 'Could not calculate the astrology chart.' }, 500);
  }
}
