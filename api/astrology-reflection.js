import { OpenAI } from 'openai';

export const config = { runtime: 'edge' };

const MAX_SUMMARY_CHARS = 6000;
const MAX_OUTPUT_TOKENS = 350;

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

export default async function handler(request) {
  if (request.method === 'OPTIONS') return json({}, 204);
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (process.env.ASTROLOGY_FEATURE_ENABLED !== 'true') {
    return json({ error: 'Astrology is not enabled.' }, 503);
  }
  if (!process.env.OPENAI_API_KEY) return json({ error: 'Reflection service is not configured.' }, 503);

  try {
    const body = await request.json();
    if (body?.consent?.reflectiveUseAcknowledged !== true || body?.consent?.externalProcessingAllowed !== true) {
      return json({ error: 'Explicit astrology processing consent is required.' }, 400);
    }
    if (['dreamText', 'dream', 'profile', 'birth'].some((field) => field in (body ?? {}))) {
      return json({ error: 'Raw dream or birth-profile data is not accepted by this endpoint.' }, 400);
    }

    const chart = body?.chart;
    const compactChart = {
      precision: chart?.precision,
      placements: Array.isArray(chart?.placements) ? chart.placements.slice(0, 12).map((item) => ({
        body: item.body,
        sign: item.sign,
        house: item.house,
        retrograde: item.retrograde,
      })) : [],
      aspects: Array.isArray(chart?.aspects) ? chart.aspects.slice(0, 10).map((item) => ({
        type: item.type,
        fromBody: item.fromBody,
        toBody: item.toBody,
      })) : [],
      uncertaintyNotes: Array.isArray(chart?.uncertaintyNotes) ? chart.uncertaintyNotes.slice(0, 4) : [],
    };
    const serializedChart = JSON.stringify(compactChart);
    if (!compactChart.placements.length || serializedChart.length > MAX_SUMMARY_CHARS) {
      return json({ error: 'A compact calculated chart is required.' }, 400);
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: process.env.ASTROLOGY_REFLECTION_MODEL || 'gpt-4o-mini',
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: 'Write a concise astrology reflection for entertainment and self-inquiry. Never predict events, diagnose, prescribe, claim certainty, or mention dream content. Treat symbols as optional metaphors. Return plain text in 2-3 short paragraphs, under 220 words.',
        },
        {
          role: 'user',
          content: `Offer a balanced, non-predictive reflection on this calculated chart summary:\n${serializedChart}`,
        },
      ],
    });

    const reflection = completion.choices[0]?.message?.content?.trim();
    if (!reflection) return json({ error: 'The reflection response was empty.' }, 502);

    return json({
      reflection,
      generatedAt: new Date().toISOString(),
      disclosure: 'AI-generated reflection for entertainment and self-inquiry only; not factual or predictive advice.',
    });
  } catch {
    return json({ error: 'Could not generate the astrology reflection.' }, 500);
  }
}
