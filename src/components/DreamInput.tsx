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
  Dimensions,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import VoiceRecognitionService, { 
  initialState, 
  VoiceRecognitionState 
} from '../services/voiceRecognition';
import { useTheme } from '../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows } from '../utils/theme';
import Text from './ui/Text';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import AlertDialog from './ui/AlertDialog';

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
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
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
            setAlertTitle('Voice Recognition Error');
            setAlertMessage(e.error?.message || 'An error occurred during voice recognition');
            setAlertVisible(true);
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
      setAlertTitle('Dream Too Short');
      setAlertMessage('Please provide more details about your dream for a better analysis.');
      setAlertVisible(true);
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
      setAlertTitle('Voice Recognition Unavailable');
      setAlertMessage('Voice recognition is not available on your device.');
      setAlertVisible(true);
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
          setAlertTitle('Permission Denied');
          setAlertMessage('Microphone permission is required for voice recording.');
          setAlertVisible(true);
        }
      }
    } catch (error) {
      console.error('Error toggling voice recording:', error);
      setIsRecording(false);
      
      setAlertTitle('Voice Recording Error');
      setAlertMessage('An error occurred while trying to record. Please try again.');
      setAlertVisible(true);
    }
  };

  // Use a function to create styles that can access isDark
  const getStyles = () => StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: spacing[4],
      paddingTop: spacing[2],
      paddingBottom: spacing[20],
    },
    title: {
      marginBottom: spacing[4],
      paddingHorizontal: spacing[2],
    },
    card: {
      flex: 1,
      borderRadius: BorderRadius.lg,
    },
    inputContainer: {
      flex: 1,
      position: 'relative',
    },
    dreamInput: {
      minHeight: 200,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[4],
      paddingBottom: spacing[6],
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.3,
      fontFamily: 'Georgia',
      color: isDark ? Colors.neutral[200] : Colors.neutral[800],
      backgroundColor: isDark ? 'rgba(26, 32, 44, 0.5)' : 'rgba(247, 250, 252, 0.8)',
      borderWidth: 1,
      borderColor: isDark ? Colors.neutral[700] : Colors.neutral[300],
    },
    inputActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing[2],
      marginBottom: spacing[4],
    },
    voiceButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(26, 32, 44, 0.5)' : Colors.neutral[100],
      borderWidth: 1,
      borderColor: isDark ? Colors.neutral[700] : Colors.neutral[300],
      ...Shadows.sm,
    },
    voiceButtonRecording: {
      backgroundColor: Colors.secondary[500],
      borderColor: Colors.secondary[400],
      ...Shadows.md,
    },
    clearButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    analyzeButton: {
      marginTop: spacing[2],
    },
    stepsContainer: {
      marginBottom: spacing[6],
      marginTop: spacing[2],
    },
    stepContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: spacing[4],
    },
    stepNumber: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDark ? 'rgba(26, 32, 44, 0.6)' : 'rgba(226, 232, 240, 0.8)',
      marginRight: spacing[3],
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadows.sm,
    },
    stepText: {
      flex: 1,
      paddingTop: 4,
    },
    introText: {
      marginBottom: spacing[6],
      paddingHorizontal: spacing[2],
      lineHeight: 22,
    },
  });

  // Get the styles
  const styles = getStyles();

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={true}
      >
        <Text 
          variant="h2" 
          color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
          style={styles.title}
        >
          Begin Your Dream Journey
        </Text>
        
        <Text 
          variant="body1" 
          color={isDark ? Colors.neutral[400] : Colors.neutral[600]}
          style={styles.introText}
        >
          Transform your dreams into meaningful insights with our guided dream journaling experience.
        </Text>
        
        <View style={styles.stepsContainer}>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text variant="body2" color={isDark ? Colors.primary[400] : Colors.primary[600]}>1</Text>
            </View>
            <Text 
              variant="body1" 
              color={isDark ? Colors.neutral[300] : Colors.neutral[700]}
              style={styles.stepText}
            >
              Record your dreams as soon as you wake up for best recall
            </Text>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text variant="body2" color={isDark ? Colors.primary[400] : Colors.primary[600]}>2</Text>
            </View>
            <Text 
              variant="body1" 
              color={isDark ? Colors.neutral[300] : Colors.neutral[700]}
              style={styles.stepText}
            >
              Add emotions, symbols, and themes to enrich your entries
            </Text>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text variant="body2" color={isDark ? Colors.primary[400] : Colors.primary[600]}>3</Text>
            </View>
            <Text 
              variant="body1" 
              color={isDark ? Colors.neutral[300] : Colors.neutral[700]}
              style={styles.stepText}
            >
              Get AI-powered analysis to uncover patterns and meanings
            </Text>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text variant="body2" color={isDark ? Colors.primary[400] : Colors.primary[600]}>4</Text>
            </View>
            <Text 
              variant="body1" 
              color={isDark ? Colors.neutral[300] : Colors.neutral[700]}
              style={styles.stepText}
            >
              Track your dream patterns over time for deeper insights
            </Text>
          </View>
        </View>
        
        <Card 
          variant="elevated" 
          style={styles.card}
          backgroundColor={isDark ? Colors.neutral[800] : Colors.neutral[50]}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.dreamInput}
              placeholder="Describe your dream..."
              placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]}
              multiline
              value={dreamText}
              onChangeText={setDreamText}
              numberOfLines={6}
              textAlignVertical="top"
              selectionColor={isDark ? Colors.primary[400] : Colors.primary[500]}
              autoCorrect={true}
              spellCheck={true}
            />
            
            <View style={styles.inputActions}>
              {showVoiceFeature && (
                <TouchableOpacity
                  onPress={toggleRecording}
                  style={[
                    styles.voiceButton,
                    isRecording && styles.voiceButtonRecording
                  ]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isRecording ? "mic" : "mic-outline"}
                    size={24}
                    color={isRecording ? Colors.neutral[50] : (isDark ? Colors.neutral[300] : Colors.primary[600])}
                  />
                </TouchableOpacity>
              )}

              {dreamText.length > 0 && (
                <TouchableOpacity
                  onPress={handleClear}
                  style={styles.clearButton}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name="close-circle" 
                    size={22} 
                    color={isDark ? Colors.neutral[500] : Colors.neutral[400]} 
                  />
                </TouchableOpacity>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              disabled={dreamText.trim().length < 10 || isLoading}
              style={styles.analyzeButton}
              variant="primary"
              size="lg"
              isLoading={isLoading}
              isRounded={true}
              fullWidth={true}
              leftIcon="analytics-outline"
            >
              Analyze Dream
            </Button>
          </View>
        </Card>
      </ScrollView>
      
      <AlertDialog
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        confirmText="OK"
        cancelText=""
        onConfirm={closeAlert}
        onCancel={closeAlert}
        destructive={false}
      />
    </KeyboardAvoidingView>
  );
};

export default DreamInput; 