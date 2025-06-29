import { Platform } from 'react-native';

// Define types for the voice recognition service
export interface VoiceRecognitionState {
  recognized: boolean;
  pitch: string;
  error: string;
  end: boolean;
  started: boolean;
  results: string[];
  partialResults: string[];
  isRecording: boolean;
}

// Initial state for voice recognition
export const initialState: VoiceRecognitionState = {
  recognized: false,
  pitch: '',
  error: '',
  end: false,
  started: false,
  results: [],
  partialResults: [],
  isRecording: false,
};

// Mock event types for when the real module is not available
export interface SpeechRecognizedEvent {
  isFinal?: boolean;
}

export interface SpeechResultsEvent {
  value?: string[];
}

export interface SpeechErrorEvent {
  error?: {
    message?: string;
    code?: string;
  };
}

// Try to import the Voice module safely
let Voice: any = null;
let isVoiceAvailable = false;

try {
  // This will throw an error in Expo Go but work in development builds
  const VoiceModule = require('@react-native-voice/voice');
  Voice = VoiceModule.default;
  isVoiceAvailable = true;
} catch (error) {
  // Silently fail - this is expected in Expo Go
  isVoiceAvailable = false;
}

// Voice recognition service class
class VoiceRecognitionService {
  private onSpeechStart?: () => void;
  private onSpeechRecognized?: (e: SpeechRecognizedEvent) => void;
  private onSpeechEnd?: () => void;
  private onSpeechError?: (e: SpeechErrorEvent) => void;
  private onSpeechResults?: (e: SpeechResultsEvent) => void;
  private onSpeechPartialResults?: (e: SpeechResultsEvent) => void;

  constructor() {
    // Only set up event handlers if the module is available and properly loaded
    if (isVoiceAvailable && Voice) {
      try {
        Voice.onSpeechStart = () => {
          this.onSpeechStart?.();
        };
        Voice.onSpeechRecognized = (e: SpeechRecognizedEvent) => {
          this.onSpeechRecognized?.(e);
        };
        Voice.onSpeechEnd = () => {
          this.onSpeechEnd?.();
        };
        Voice.onSpeechError = (e: SpeechErrorEvent) => {
          this.onSpeechError?.(e);
        };
        Voice.onSpeechResults = (e: SpeechResultsEvent) => {
          this.onSpeechResults?.(e);
        };
        Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
          this.onSpeechPartialResults?.(e);
        };
      } catch (error) {
        // Voice recognition not available in this environment
        isVoiceAvailable = false;
      }
    }
  }

  // Set up event handlers
  public setupEventHandlers({
    onSpeechStart,
    onSpeechRecognized,
    onSpeechEnd,
    onSpeechError,
    onSpeechResults,
    onSpeechPartialResults,
  }: {
    onSpeechStart?: () => void;
    onSpeechRecognized?: (e: SpeechRecognizedEvent) => void;
    onSpeechEnd?: () => void;
    onSpeechError?: (e: SpeechErrorEvent) => void;
    onSpeechResults?: (e: SpeechResultsEvent) => void;
    onSpeechPartialResults?: (e: SpeechResultsEvent) => void;
  }) {
    this.onSpeechStart = onSpeechStart;
    this.onSpeechRecognized = onSpeechRecognized;
    this.onSpeechEnd = onSpeechEnd;
    this.onSpeechError = onSpeechError;
    this.onSpeechResults = onSpeechResults;
    this.onSpeechPartialResults = onSpeechPartialResults;
  }

  // Start voice recognition
  public async startRecognizing(locale?: string): Promise<void> {
    if (!isVoiceAvailable || !Voice) {
      this.handleModuleNotAvailable();
      return;
    }
    
    try {
      await Voice.start(locale || this.getDefaultLocale());
    } catch (e) {
      console.error('Error starting voice recognition:', e);
      this.onSpeechError?.({ error: { message: 'Failed to start voice recognition', code: 'start_error' } });
    }
  }

  // Stop voice recognition
  public async stopRecognizing(): Promise<void> {
    if (!isVoiceAvailable || !Voice) {
      this.handleModuleNotAvailable();
      return;
    }
    
    try {
      await Voice.stop();
    } catch (e) {
      console.error('Error stopping voice recognition:', e);
    }
  }

  // Cancel voice recognition
  public async cancelRecognizing(): Promise<void> {
    if (!isVoiceAvailable || !Voice) {
      return;
    }
    
    try {
      await Voice.cancel();
    } catch (e) {
      console.error('Error canceling voice recognition:', e);
    }
  }

  // Destroy voice recognition instance
  public async destroyRecognizer(): Promise<void> {
    if (!isVoiceAvailable || !Voice) {
      return;
    }
    
    try {
      await Voice.destroy();
    } catch (e) {
      console.error('Error destroying voice recognition:', e);
    }
  }

  // Get available speech recognition services
  public async getSpeechRecognitionServices(): Promise<string[]> {
    if (!isVoiceAvailable || !Voice) {
      return [];
    }
    
    try {
      const services = await Voice.getSpeechRecognitionServices();
      return services || [];
    } catch (e) {
      console.error('Error getting speech recognition services:', e);
      return [];
    }
  }

  // Get default locale based on platform
  private getDefaultLocale(): string {
    return Platform.OS === 'ios' ? 'en-US' : 'en';
  }

  // Check if voice recognition is available
  public async isAvailable(): Promise<boolean> {
    if (!isVoiceAvailable || !Voice) {
      return false;
    }
    
    try {
      const services = await this.getSpeechRecognitionServices();
      return services.length > 0;
    } catch (e) {
      console.error('Error checking voice recognition availability:', e);
      return false;
    }
  }

  // Handle the case when the module is not available
  private handleModuleNotAvailable() {
    // Voice recognition service unavailable
    this.onSpeechError?.({ 
      error: { 
        message: 'Voice recognition requires a development build. Please use EAS Build to create a development build.', 
        code: 'module_not_available' 
      } 
    });
  }
}

// Export a singleton instance
export default new VoiceRecognitionService(); 