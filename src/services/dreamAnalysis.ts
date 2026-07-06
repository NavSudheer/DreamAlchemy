import { DreamAnalysis } from '../types';

const ANALYSIS_ENDPOINT =
  'https://dream-analysis-navneethsudheer-gmailcoms-projects.vercel.app/api/analyze-dream';

const REQUEST_TIMEOUT_MS = 60_000;

export class DreamAnalysisError extends Error {
  constructor(message: string, public readonly recoverable: boolean = true) {
    super(message);
    this.name = 'DreamAnalysisError';
  }
}

/**
 * Analyzes a dream using the Vercel Edge Function.
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
  const initialAnalysis: DreamAnalysis = {
    symbols: [],
    archetypes: [],
    interpretation: '',
    timestamp: new Date(),
  };

  if (onUpdate) {
    onUpdate(initialAnalysis);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(ANALYSIS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dreamText }),
      signal: controller.signal,
    });
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') {
      throw new DreamAnalysisError(
        'The analysis is taking longer than expected. Please try again.'
      );
    }
    throw new DreamAnalysisError(
      'Could not reach the dream analysis service. Check your connection and try again.'
    );
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

  let analysisData: DreamAnalysis;
  try {
    analysisData = await response.json();
  } catch {
    throw new DreamAnalysisError('Received an unreadable response. Please try again.');
  }

  if (!analysisData || typeof analysisData.interpretation !== 'string' || !analysisData.interpretation.trim()) {
    throw new DreamAnalysisError('The analysis came back empty. Please try again.');
  }

  // Normalize fields the UI relies on
  analysisData.symbols = Array.isArray(analysisData.symbols) ? analysisData.symbols : [];
  analysisData.archetypes = Array.isArray(analysisData.archetypes) ? analysisData.archetypes : [];
  if (typeof analysisData.timestamp === 'string') {
    analysisData.timestamp = new Date(analysisData.timestamp);
  } else if (!analysisData.timestamp) {
    analysisData.timestamp = initialAnalysis.timestamp;
  }

  if (onUpdate) {
    onUpdate(analysisData);
  }

  return analysisData;
};
