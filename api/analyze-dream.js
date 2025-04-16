import { OpenAI } from 'openai';
import { ALL_DREAM_THEMES } from '../constants/dreamThemes';

// Edge runtime allows us to run at the edge
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    // Parse request body
    const { dreamText } = await request.json();
    
    if (!dreamText) {
      return new Response(
        JSON.stringify({ error: 'Dream text is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
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
      return new Response(
        JSON.stringify(analysis),
        {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
      
    } catch (e) {
      console.error("Error parsing JSON response:", e);
      throw new Error('Failed to parse OpenAI response');
    }
  } catch (error) {
    console.error("Error in analyzeDream:", error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred',
        symbols: [],
        archetypes: [],
        interpretation: `Sorry, we encountered an error analyzing your dream: ${error.message || 'Unknown error'}. Please try again later.`,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

