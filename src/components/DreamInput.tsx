import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import VoiceRecognitionService, { 
  initialState, 
  VoiceRecognitionState 
} from '../services/voiceRecognition';
import { useTheme } from '../providers/ThemeProvider';
import { Colors, Spacing, BorderRadius, Shadows } from '../utils/theme';
import Text from './ui/Text';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';

const { width } = Dimensions.get('window');

interface DreamInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const DreamInput: React.FC<DreamInputProps> = ({ onSubmit, isLoading }) => {
  const [dreamText, setDreamText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceRecognitionState>(initialState);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [showVoiceFeature, setShowVoiceFeature] = useState(false);
  const { isDark } = useTheme();

  // Check if voice recognition is available on component mount
  useEffect(() => {
    const checkVoiceAvailability = async () => {
      try {
        const available = await VoiceRecognitionService.isAvailable();
        setVoiceAvailable(available);
        setShowVoiceFeature(available);
      } catch (error) {
        console.error('Error checking voice availability:', error);
        setVoiceAvailable(false);
        setShowVoiceFeature(false);
      }
    };
    
    checkVoiceAvailability();
    
    // Set up voice recognition event handlers
    VoiceRecognitionService.setupEventHandlers({
      onSpeechStart: () => {
        setVoiceState(prev => ({ ...prev, started: true }));
      },
      onSpeechRecognized: () => {
        setVoiceState(prev => ({ ...prev, recognized: true }));
      },
      onSpeechEnd: () => {
        setVoiceState(prev => ({ ...prev, end: true, isRecording: false }));
        setIsRecording(false);
      },
      onSpeechError: (e) => {
        setVoiceState(prev => ({ 
          ...prev, 
          error: e.error?.message || 'Unknown error',
          isRecording: false 
        }));
        setIsRecording(false);
        
        // Show error message if not canceled by user and not a module unavailable error
        if (e.error?.code !== '7' && e.error?.code !== 'cancelled') {
          if (e.error?.code === 'module_unavailable') {
            // Hide voice feature if module is not available
            setShowVoiceFeature(false);
          } else {
            Alert.alert(
              'Voice Recognition Error',
              e.error?.message || 'An error occurred during voice recognition',
              [{ text: 'OK' }]
            );
          }
        }
      },
      onSpeechResults: (e) => {
        if (e.value && e.value.length > 0) {
          const transcribedText = e.value[0];
          
          // Append to existing text with a space if there's already text
          setDreamText(prev => {
            if (prev.trim().length > 0) {
              return prev + ' ' + transcribedText;
            }
            return transcribedText;
          });
          
          setVoiceState(prev => ({ 
            ...prev, 
            results: e.value || [] 
          }));
        }
      },
      onSpeechPartialResults: (e) => {
        if (e.value && e.value.length > 0) {
          setVoiceState(prev => ({ 
            ...prev, 
            partialResults: e.value || [] 
          }));
        }
      }
    });
    
    // Clean up voice recognition on component unmount
    return () => {
      VoiceRecognitionService.destroyRecognizer();
    };
  }, []);

  const handleSubmit = () => {
    if (dreamText.trim().length < 10) {
      Alert.alert(
        'Dream Too Short',
        'Please provide more details about your dream for a better analysis.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (isLoading) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSubmit(dreamText);
  };

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDreamText('');
  };

  // Request microphone permission on Android
  const requestMicrophonePermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true;
    }
    
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'Dream Alchemy needs access to your microphone to record your dream description.',
          buttonPositive: 'Allow',
          buttonNegative: 'Cancel',
        }
      );
      
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Error requesting microphone permission:', err);
      return false;
    }
  };

  // Toggle voice recording
  const toggleRecording = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (!voiceAvailable) {
      Alert.alert(
        'Voice Recognition Unavailable',
        'Voice recognition is not available on your device.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    try {
      if (isRecording) {
        // Stop recording
        await VoiceRecognitionService.stopRecognizing();
        setIsRecording(false);
        setVoiceState(prev => ({ ...prev, isRecording: false }));
      } else {
        // Start recording if permission granted
        const hasPermission = await requestMicrophonePermission();
        
        if (hasPermission) {
          // Reset voice state
          setVoiceState({
            ...initialState,
            isRecording: true
          });
          
          setIsRecording(true);
          await VoiceRecognitionService.startRecognizing();
        } else {
          Alert.alert(
            'Permission Denied',
            'Microphone permission is required for voice recording.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error toggling voice recording:', error);
      setIsRecording(false);
      
      Alert.alert(
        'Voice Recording Error',
        'An error occurred while trying to record. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Card 
          variant="elevated" 
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <Input
              multiline
              placeholder="Describe your dream..."
              value={dreamText}
              onChangeText={setDreamText}
              style={styles.input}
              textAlignVertical="top"
              numberOfLines={6}
            />

            <View style={styles.buttonContainer}>
              {showVoiceFeature && (
                <TouchableOpacity
                  onPress={toggleRecording}
                  style={[
                    styles.voiceButton,
                    isRecording && styles.voiceButtonRecording
                  ]}
                >
                  <Ionicons
                    name={isRecording ? "mic" : "mic-outline"}
                    size={24}
                    color={isRecording ? Colors.primary[50] : Colors.primary[600]}
                  />
                </TouchableOpacity>
              )}

              {dreamText.length > 0 && (
                <TouchableOpacity
                  onPress={handleClear}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={24} color={Colors.neutral[400]} />
                </TouchableOpacity>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              disabled={dreamText.trim().length < 10 || isLoading}
              style={styles.analyzeButton}
              isLoading={isLoading}
            >
              Analyze Dream
            </Button>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    padding: 20,
  },
  input: {
    minHeight: 120,
    backgroundColor: 'transparent',
    borderRadius: 15,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    color: Colors.neutral[700],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  clearButton: {
    marginLeft: 12,
    padding: 4,
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  voiceButtonRecording: {
    backgroundColor: Colors.primary[600],
  },
  analyzeButton: {
    borderRadius: 15,
    height: 50,
    backgroundColor: Colors.primary[600],
  },
});

export default DreamInput; 