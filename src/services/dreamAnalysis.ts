import OpenAI from 'openai';
import { DreamAnalysis } from '../types';

// Initialize OpenAI client - you'll need to set up API key securely
// For development, you can use environment variables
const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

/**
 * Analyzes a dream using OpenAI API
 * @param dreamText The text of the dream to analyze
 * @param onUpdate Optional callback for streaming updates
 * @returns Promise resolving to the dream analysis
 */
export const analyzeDream = async (
  dreamText: string,
  onUpdate?: (analysis: Partial<DreamAnalysis>) => void
): Promise<DreamAnalysis> => {
  try {
    console.log("Starting dream analysis...");
    
    // Prepare the prompt for Jungian dream analysis
    const prompt = `
      Analyze the following dream using Jungian psychology principles:
      
      Dream: "${dreamText}"
      
      Please provide a detailed analysis that includes:
      1. Identification of key symbols in the dream and their Jungian interpretations
      2. Identification of archetypes present in the dream
      3. A comprehensive interpretation of the dream based on Jungian psychology
      4. Format the response as a JSON object with the following structure:
      {
        "symbols": [
          { "name": "symbol name", "meaning": "symbol meaning", "frequency": number of occurrences }
        ],
        "archetypes": [
          { "type": "archetype name", "description": "brief description", "significance": "significance in the dream" }
        ],
        "interpretation": "comprehensive interpretation text"
      }
    `;

    // Create a streaming response
    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a Jungian psychologist specializing in dream analysis. Provide insightful interpretations based on Carl Jung's theories of the collective unconscious, archetypes, and dream symbolism. Always respond with valid JSON." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      stream: true,
    });
    
    console.log("OpenAI stream created successfully");
    
    // Initialize the analysis object
    const initialAnalysis: DreamAnalysis = {
      symbols: [],
      archetypes: [],
      interpretation: "",
      timestamp: new Date()
    };
    
    // If there's an update callback, send the initial state
    if (onUpdate) {
      onUpdate(initialAnalysis);
    }
    
    let accumulatedJson = "";
    let currentAnalysis = { ...initialAnalysis };
    
    // Process each chunk from OpenAI
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        // Accumulate the JSON string
        accumulatedJson += content;
        
        // Try to extract interpretation text as it comes in
        try {
          // Look for interpretation field in the accumulated JSON
          const interpretationMatch = accumulatedJson.match(/"interpretation"\s*:\s*"([^"]*)/);
          if (interpretationMatch && interpretationMatch[1]) {
            currentAnalysis.interpretation = interpretationMatch[1];
            
            // Send update if we have a callback
            if (onUpdate) {
              onUpdate({ interpretation: currentAnalysis.interpretation });
            }
          }
          
          // Try to parse complete JSON objects when possible
          if (accumulatedJson.includes('}')) {
            const jsonMatch = accumulatedJson.match(/({[\s\S]*})/);
            if (jsonMatch) {
              try {
                const parsedJson = JSON.parse(jsonMatch[1]);
                
                // Update the current analysis with any new data
                if (parsedJson.symbols) {
                  currentAnalysis.symbols = parsedJson.symbols;
                  if (onUpdate) onUpdate({ symbols: parsedJson.symbols });
                }
                if (parsedJson.archetypes) {
                  currentAnalysis.archetypes = parsedJson.archetypes;
                  if (onUpdate) onUpdate({ archetypes: parsedJson.archetypes });
                }
                if (parsedJson.interpretation) {
                  currentAnalysis.interpretation = parsedJson.interpretation;
                  if (onUpdate) onUpdate({ interpretation: parsedJson.interpretation });
                }
              } catch (e) {
                // Ignore parsing errors for incomplete JSON
              }
            }
          }
        } catch (e) {
          // Ignore parsing errors for partial data
        }
      }
    }
    
    // Try one final parse of the complete response
    try {
      // The response might be wrapped in markdown code blocks
      const jsonMatch = accumulatedJson.match(/```json\n([\s\S]*?)\n```/) || 
                       accumulatedJson.match(/```\n([\s\S]*?)\n```/) || 
                       accumulatedJson.match(/({[\s\S]*})/);
      
      if (jsonMatch) {
        const jsonString = jsonMatch[1];
        const finalAnalysis = JSON.parse(jsonString);
        
        // Return the final complete analysis
        return {
          ...finalAnalysis,
          timestamp: initialAnalysis.timestamp
        };
      }
    } catch (e) {
      console.error("Error parsing final JSON:", e);
    }
    
    // If we couldn't parse the final JSON, return what we have
    return currentAnalysis;
  } catch (error) {
    console.error("Error in analyzeDream:", error);
    
    // Return a fallback analysis with an error message
    return {
      symbols: [],
      archetypes: [],
      interpretation: "Sorry, we encountered an error analyzing your dream. Please try again later.",
      timestamp: new Date()
    };
  }
}; 