import { OpenAI } from 'openai';

export const ANALYZE_DREAM_MAX_REQUEST_BYTES = 16_000;
export const ANALYZE_DREAM_MAX_TEXT_CHARACTERS = 12_000;

class RequestValidationError extends Error {
  constructor(message, code, status) {
    super(message);
    this.name = 'RequestValidationError';
    this.code = code;
    this.status = status;
  }
}

const json = (body, status = 200) => new Response(status === 204 ? null : JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

const readBoundedJson = async (request) => {
  const contentType = request.headers?.get?.('content-type');
  if (contentType && !contentType.toLowerCase().includes('application/json')) {
    throw new RequestValidationError('Content-Type must be application/json.', 'invalid_content_type', 415);
  }

  const declaredLength = Number(request.headers?.get?.('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > ANALYZE_DREAM_MAX_REQUEST_BYTES) {
    throw new RequestValidationError('Request body is too large.', 'payload_too_large', 413);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    throw new RequestValidationError('Request body must be valid JSON.', 'invalid_json', 400);
  }

  if (new TextEncoder().encode(JSON.stringify(body)).length > ANALYZE_DREAM_MAX_REQUEST_BYTES) {
    throw new RequestValidationError('Request body is too large.', 'payload_too_large', 413);
  }
  return body;
};

// Edge runtime allows us to run at the edge
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method === 'OPTIONS') return json({}, 204);

  // Only allow POST requests
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed', code: 'method_not_allowed' }, 405);
  }

  try {
    // Parse request body
    const body = await readBoundedJson(request);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new RequestValidationError('Request body must be a JSON object.', 'invalid_request', 400);
    }
    const unexpectedField = Object.keys(body).find(field => field !== 'dreamText');
    if (unexpectedField) {
      throw new RequestValidationError('Request contains an unsupported field.', 'unexpected_field', 400);
    }
    const dreamText = typeof body.dreamText === 'string' ? body.dreamText.trim() : '';
    
    if (!dreamText) {
      throw new RequestValidationError('Dream text is required.', 'dream_text_required', 400);
    }
    if (dreamText.length > ANALYZE_DREAM_MAX_TEXT_CHARACTERS) {
      throw new RequestValidationError('Dream text is too long.', 'dream_text_too_long', 413);
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Create the theme options list for the prompt
    const themeOptions = [
      "Emotional", "Emotional: Fear", "Emotional: Joy", "Emotional: Grief",
      "Adventure", "Adventure: Exploration", "Adventure: Journey",
      "Personal Growth", "Personal Growth: Transformation", 
      "Relationship", "Relationship: Family", "Relationship: Romance",
      "Symbolic", "Spiritual", "Situational", "Environmental", 
      "Psychological", "Abstract"
    ].join('\n        - ');
    
    // Prepare the prompt for Jungian dream analysis
    const prompt = `
      Analyze the following dream using Jungian psychology principles:
      
      Dream: "${dreamText}"
      
      Please provide a detailed analysis that includes:
      1. Identification of key symbols in the dream and their Jungian interpretations
      2. Identification of archetypes present in the dream
      3. A comprehensive interpretation of the dream based on Jungian psychology
      4. Categorize the dream with a theme from this list:
        - ${themeOptions}
      5. Format the response as a JSON object with the following structure:
      {
        "symbols": [
          { "name": "symbol name", "meaning": "symbol meaning", "frequency": number of occurrences }
        ],
        "archetypes": [
          { "type": "archetype name", "description": "brief description", "significance": "significance in the dream" }
        ],
        "interpretation": "comprehensive interpretation text",
        "theme": "selected theme from the list"
      }
    `;

    // Create a non-streaming response
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You are a Jungian psychologist specializing in dream analysis. Provide insightful interpretations based on Carl Jung's theories of the collective unconscious, archetypes, and dream symbolism. Always respond with valid JSON." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });
    
    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response content from OpenAI');
    }

    const content = completion.choices[0].message.content;
    
    // Try to parse the JSON response
    try {
      // The response might be wrapped in markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                       content.match(/```\n([\s\S]*?)\n```/) || 
                       content.match(/({[\s\S]*})/);
      
      let analysis;
      
      if (jsonMatch) {
        const jsonString = jsonMatch[1];
        analysis = JSON.parse(jsonString);
      } else {
        // Try to parse the entire content as JSON
        analysis = JSON.parse(content);
      }
      
      // Add timestamp
      analysis.timestamp = new Date().toISOString();
      
      // Return the analysis
      return json(analysis);
      
    } catch (e) {
      console.error('Dream analysis response could not be parsed.');
      throw new Error('Failed to parse OpenAI response');
    }
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return json({ error: error.message, code: error.code }, error.status);
    }

    // Never log the provider error object: SDK errors may retain request details.
    console.error('Dream analysis request failed.');
    
    // Keep provider and implementation details out of the client response.
    return json({
        error: 'The dream analysis service is temporarily unavailable.',
        code: 'analysis_unavailable',
        symbols: [],
        archetypes: [],
        interpretation: 'Sorry, the dream analysis could not be completed. Please try again later.',
        timestamp: new Date().toISOString()
      }, 500);
  }
}
