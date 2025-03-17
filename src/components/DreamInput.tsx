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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card 
          variant="elevated" 
          style={styles.card}
        >
          <LinearGradient
            colors={[Colors.primary[50], Colors.neutral[50]]}
            style={styles.cardGradient}
          >
            <View style={styles.cardHeader}>
              <Ionicons 
                name="moon" 
                size={28} 
                color={Colors.primary[500]} 
                style={styles.headerIcon}
              />
              <Text variant="h3" color={Colors.primary[700]} style={styles.title}>
                Record Your Dream
              </Text>
            </View>
            
            <Text variant="body1" style={styles.subtitle}>
              Describe your dream in detail, including symbols, emotions, and significant events.
            </Text>
            
            <View style={styles.inputContainer}>
              <Input
                variant="filled"
                multiline
                numberOfLines={8}
                placeholder="Describe your dream in detail..."
                value={dreamText}
                onChangeText={setDreamText}
                fullWidth
                inputStyle={styles.textInput}
                rightIcon={
                  dreamText.length > 0 ? (
                    <TouchableOpacity onPress={handleClear} disabled={isLoading}>
                      <Ionicons name="close-circle" size={20} color={Colors.neutral[500]} />
                    </TouchableOpacity>
                  ) : undefined
                }
              />
              
              {isRecording && (
                <View style={styles.recordingIndicator}>
                  <ActivityIndicator size="small" color={Colors.error} style={styles.recordingIcon} />
                  <Text variant="caption" color={Colors.error}>Recording your dream...</Text>
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              {showVoiceFeature && (
                <Button
                  variant={isRecording ? "accent" : "outline"}
                  size="md"
                  onPress={toggleRecording}
                  isDisabled={isLoading}
                  hapticFeedback
                  style={styles.voiceButton}
                  leftIcon={isRecording ? "mic" : "mic-outline"}
                >
                  {isRecording ? "Stop Recording" : "Record Dream"}
                </Button>
              )}
              
              <Button
                variant="primary"
                size="md"
                onPress={handleSubmit}
                isLoading={isLoading}
                isDisabled={dreamText.trim().length < 10 || isLoading}
                hapticFeedback
                style={styles.analyzeButton}
                leftIcon={!isLoading ? "sparkles-outline" : undefined}
              >
                Analyze Dream
              </Button>
            </View>
          </LinearGradient>
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
  },
  card: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.lg,
  },
  cardGradient: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  headerIcon: {
    marginRight: Spacing.sm,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: Spacing.lg,
    textAlign: 'center',
    opacity: 0.8,
    color: Colors.neutral[700],
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  textInput: {
    minHeight: 150,
    textAlignVertical: 'top',
    paddingTop: Spacing.sm,
    fontSize: 16,
    backgroundColor: Colors.neutral[100],
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    backgroundColor: Colors.transparentRed,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  recordingIcon: {
    marginRight: Spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: Spacing.md,
  },
  voiceButton: {
    width: '100%',
    backgroundColor: Colors.accent[50],
    borderColor: Colors.accent[500],
    borderWidth: 1,
  },
  analyzeButton: {
    width: '100%',
    backgroundColor: Colors.primary[600],
    ...Shadows.md,
  },
});

export default DreamInput; 