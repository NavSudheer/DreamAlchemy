import { DreamAnalysis, DreamTheme } from '../types';

// Environment flag to switch between local and production API calls
const USE_LOCAL_API = process.env.EXPO_PUBLIC_USE_LOCAL_API === 'true';
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const REQUEST_TIMEOUT_MS = 60_000;

export class DreamAnalysisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DreamAnalysisError';
  }
}

/**
 * Normalizes theme from API response to DreamTheme object
 * Handles both string themes ("Emotional") and object themes ({ primary: "Emotional" })
 * Also handles themes with subtypes ("Emotional: Fear" -> primary: "Emotional", secondary: ["Fear"])
 */
function normalizeTheme(theme: string | DreamTheme | undefined): DreamTheme | undefined {
  if (!theme) {
    return undefined;
  }

  // If already a DreamTheme object, return as-is
  if (typeof theme === 'object' && 'primary' in theme) {
    return theme;
  }

  // If it's a string, convert to DreamTheme object
  if (typeof theme === 'string') {
    // Check if theme has a colon separator (e.g., "Emotional: Fear")
    const colonIndex = theme.indexOf(':');
    if (colonIndex > 0) {
      const primary = theme.substring(0, colonIndex).trim();
      const secondary = theme.substring(colonIndex + 1).trim();
      return {
        primary,
        secondary: [secondary]
      };
    }
    
    // Simple theme without subtype
    return {
      primary: theme
    };
  }

  return undefined;
}

/**
 * Analyzes a dream using either local OpenAI API or Vercel Edge Function.
 * Throws DreamAnalysisError on failure so callers can show a retry UI —
 * error text must never be mistaken for a real interpretation.
 *
 * @param dreamText The text of the dream to analyze
 * @param onUpdate Optional callback for streaming updates
 * @returns Promise resolving to the dream analysis
 */
export const analyzeDream = async (
  dreamText: string,
  onUpdate?: (analysis: Partial<DreamAnalysis>) => void
): Promise<DreamAnalysis> => {
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

  let analysisData;
  try {
    if (USE_LOCAL_API && OPENAI_API_KEY) {
      // Use local OpenAI API for development
      analysisData = await analyzeWithLocalAPI(dreamText);
    } else {
      // Use Vercel proxy for production (default)
      analysisData = await analyzeWithVercelProxy(dreamText);
    }
  } catch (error) {
    console.error("Error in analyzeDream:", error);
    if (error instanceof DreamAnalysisError) throw error;
    throw new DreamAnalysisError(
      error instanceof Error ? error.message : 'Failed to analyze dream. Please try again.'
    );
  }

  if (!analysisData || typeof analysisData.interpretation !== 'string' || !analysisData.interpretation.trim()) {
    throw new DreamAnalysisError('The analysis came back empty. Please try again.');
  }

  // Normalize fields the UI relies on
  analysisData.symbols = Array.isArray(analysisData.symbols) ? analysisData.symbols : [];
  analysisData.archetypes = Array.isArray(analysisData.archetypes) ? analysisData.archetypes : [];

  // Convert ISO timestamp string to Date object if needed
  if (typeof analysisData.timestamp === 'string') {
    analysisData.timestamp = new Date(analysisData.timestamp);
  } else if (!analysisData.timestamp) {
    analysisData.timestamp = initialAnalysis.timestamp;
  }

  // Normalize theme from string to DreamTheme object
  if (analysisData.theme) {
    analysisData.theme = normalizeTheme(analysisData.theme);
  }

  // Send the final update
  if (onUpdate) {
    onUpdate(analysisData);
  }

  return analysisData;
};

/**
 * Analyze dream using Vercel Edge Function (Production)
 */
async function analyzeWithVercelProxy(dreamText: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch('https://dream-analysis-navneethsudheer-gmailcoms-projects.vercel.app/api/analyze-dream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dreamText }),
      signal: controller.signal,
    });
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') {
      throw new DreamAnalysisError('The analysis is taking longer than expected. Please try again.');
    }
    throw new DreamAnalysisError('Could not reach the dream analysis service. Check your connection and try again.');
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    let message = 'The dream analysis service returned an error. Please try again later.';
    try {
      const errorData = await response.json();
      if (errorData?.error) message = errorData.error;
    } catch {
      // Non-JSON error body; keep the generic message
    }
    throw new DreamAnalysisError(message);
  }

  try {
    return await response.json();
  } catch {
    throw new DreamAnalysisError('Received an unreadable response. Please try again.');
  }
}

/**
 * Analyze dream using local OpenAI API (Development)
 */
async function analyzeWithLocalAPI(dreamText: string) {
  // Dynamic import to avoid issues when OpenAI package isn't needed
  const { default: OpenAI } = await import('openai');
  
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const prompt = `
    Analyze the following dream using Jungian psychology principles:
    
    Dream: "${dreamText}"
    
    Please provide a detailed analysis that includes:
    1. Identification of key symbols in the dream and their Jungian interpretations
    2. Identification of archetypes present in the dream
    3. A comprehensive interpretation of the dream based on Jungian psychology
    4. Categorize the dream with a theme from this list:
       - Emotional, Adventure, Personal Growth, Relationship, Symbolic, Spiritual, Situational, Environmental, Psychological, Abstract
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
  
  // Parse JSON response
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                   content.match(/```\n([\s\S]*?)\n```/) || 
                   content.match(/({[\s\S]*})/);
  
  if (jsonMatch) {
    const jsonString = jsonMatch[1];
    const analysis = JSON.parse(jsonString);
    analysis.timestamp = new Date().toISOString();
    return analysis;
  } else {
    const analysis = JSON.parse(content);
    analysis.timestamp = new Date().toISOString();
    return analysis;
  }
} 