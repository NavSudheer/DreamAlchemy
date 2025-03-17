import OpenAI from 'openai';
import { DreamAnalysis } from '../types';

// Initialize OpenAI client with error handling
const getOpenAIClient = () => {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add EXPO_PUBLIC_OPENAI_API_KEY to your .env.local file');
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Required for Expo/React Native
  });
};

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
    
    // Get OpenAI client
    const openai = getOpenAIClient();
    
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

    // Create a non-streaming response for React Native
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
      stream: false, // Disable streaming for React Native
    });
    
    console.log("OpenAI response received");
    
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
      
      if (jsonMatch) {
        const jsonString = jsonMatch[1];
        const analysis = JSON.parse(jsonString);
        
        // Send the final update
        if (onUpdate) {
          onUpdate(analysis);
        }
        
        // Return the complete analysis
        return {
          ...analysis,
          timestamp: initialAnalysis.timestamp
        };
      } else {
        // Try to parse the entire content as JSON
        const analysis = JSON.parse(content);
        
        // Send the final update
        if (onUpdate) {
          onUpdate(analysis);
        }
        
        // Return the complete analysis
        return {
          ...analysis,
          timestamp: initialAnalysis.timestamp
        };
      }
    } catch (e) {
      console.error("Error parsing JSON response:", e);
      throw new Error('Failed to parse OpenAI response');
    }
  } catch (error) {
    console.error("Error in analyzeDream:", error);
    
    // Return a fallback analysis with an error message
    return {
      symbols: [],
      archetypes: [],
      interpretation: `Sorry, we encountered an error analyzing your dream: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
      timestamp: new Date()
    };
  }
}; 