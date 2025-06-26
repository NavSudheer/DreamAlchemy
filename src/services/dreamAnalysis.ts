import { DreamAnalysis } from '../types';

/**
 * Analyzes a dream using Vercel Edge Function
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

    // Call the Vercel Edge Function with the correct URL
    const response = await fetch('https://dream-analysis-navneethsudheer-gmailcoms-projects.vercel.app/api/analyze-dream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dreamText })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze dream');
    }

    // Parse the response
    const analysisData = await response.json();
    
    // Convert ISO timestamp string to Date object if needed
    if (typeof analysisData.timestamp === 'string') {
      analysisData.timestamp = new Date(analysisData.timestamp);
    } else if (!analysisData.timestamp) {
      analysisData.timestamp = initialAnalysis.timestamp;
    }
    
    // Send the final update
    if (onUpdate) {
      onUpdate(analysisData);
    }
    
    return analysisData;
    
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