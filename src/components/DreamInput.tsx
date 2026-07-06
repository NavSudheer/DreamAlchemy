import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import VoiceRecognitionService, {
  initialState,
  VoiceRecognitionState
} from '../services/voiceRecognition';
import { useTheme } from '../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows } from '../utils/theme';
import { DREAM_MOODS, DreamMood } from '../types';
import Text from './ui/Text';
import Button from './ui/Button';
import Card from './ui/Card';
import AlertDialog from './ui/AlertDialog';

const MIN_DREAM_LENGTH = 10;

// Gentle nudges for when the page is blank
const DREAM_PROMPTS = [
  'Where were you?',
  'Who was with you?',
  'How did it feel?',
  'What stood out most?',
];

interface DreamInputProps {
  onSubmit: (text: string, mood: DreamMood) => void;
  isLoading: boolean;
}

const DreamInput: React.FC<DreamInputProps> = ({ onSubmit, isLoading }) => {
  const [dreamText, setDreamText] = useState('');
  const [mood, setMood] = useState<DreamMood>('neutral');
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
    if (dreamText.trim().length < MIN_DREAM_LENGTH) {
      setAlertTitle('Dream Too Short');
      setAlertMessage('Please provide more details about your dream for a better analysis.');
      setAlertVisible(true);
      return;
    }

    if (isLoading) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSubmit(dreamText, mood);
  };

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDreamText('');
  };

  const handleSelectMood = (selected: DreamMood) => {
    Haptics.selectionAsync();
    setMood(selected);
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

  const wordCount = dreamText.trim().length === 0
    ? 0
    : dreamText.trim().split(/\s+/).length;

  const styles = getStyles(isDark);

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Card
        variant="elevated"
        style={styles.card}
        backgroundColor={isDark ? Colors.neutral[800] : '#FFFFFF'}
      >
        <View style={styles.cardTitleRow}>
          <Ionicons
            name="sparkles"
            size={18}
            color={isDark ? Colors.accent[300] : Colors.accent[500]}
          />
          <Text
            variant="h5"
            color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
            style={styles.cardTitle}
          >
            What did you dream?
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.dreamInput}
            placeholder="Describe your dream while it's still fresh…"
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
            <View style={styles.inputActionsLeft}>
              {showVoiceFeature && (
                <TouchableOpacity
                  onPress={toggleRecording}
                  style={[
                    styles.voiceButton,
                    isRecording && styles.voiceButtonRecording
                  ]}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={isRecording ? 'Stop voice recording' : 'Record dream by voice'}
                >
                  <Ionicons
                    name={isRecording ? 'mic' : 'mic-outline'}
                    size={22}
                    color={isRecording ? Colors.neutral[50] : (isDark ? Colors.neutral[300] : Colors.primary[600])}
                  />
                </TouchableOpacity>
              )}

              {isRecording && (
                <Text variant="caption" color={isDark ? Colors.secondary[300] : Colors.secondary[600]}>
                  Listening…
                </Text>
              )}
            </View>

            <View style={styles.inputActionsRight}>
              {wordCount > 0 && (
                <Text variant="caption" color={isDark ? Colors.neutral[500] : Colors.neutral[400]}>
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </Text>
              )}
              {dreamText.length > 0 && (
                <TouchableOpacity
                  onPress={handleClear}
                  style={styles.clearButton}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Clear dream text"
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={isDark ? Colors.neutral[500] : Colors.neutral[400]}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {dreamText.trim().length === 0 && (
          <View style={styles.promptsRow}>
            {DREAM_PROMPTS.map(prompt => (
              <View key={prompt} style={styles.promptChip}>
                <Text variant="caption" color={isDark ? Colors.neutral[400] : Colors.neutral[500]}>
                  {prompt}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text
          variant="subtitle2"
          color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          style={styles.moodLabel}
        >
          How did it feel?
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moodRow}
        >
          {DREAM_MOODS.map(m => {
            const selected = mood === m.key;
            return (
              <TouchableOpacity
                key={m.key}
                onPress={() => handleSelectMood(m.key)}
                style={[styles.moodChip, selected && styles.moodChipSelected]}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`Mood: ${m.label}`}
              >
                <Text variant="body2" style={styles.moodEmoji}>{m.emoji}</Text>
                <Text
                  variant="caption"
                  color={
                    selected
                      ? (isDark ? Colors.primary[200] : Colors.primary[700])
                      : (isDark ? Colors.neutral[400] : Colors.neutral[500])
                  }
                >
                  {m.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Button
          onPress={handleSubmit}
          disabled={dreamText.trim().length < MIN_DREAM_LENGTH || isLoading}
          style={styles.analyzeButton}
          variant="primary"
          size="lg"
          isLoading={isLoading}
          isRounded={true}
          fullWidth={true}
          leftIcon="sparkles-outline"
        >
          Analyze Dream
        </Button>
      </Card>

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

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    borderRadius: BorderRadius.xl,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  cardTitle: {
    flex: 1,
  },
  inputContainer: {
    position: 'relative',
  },
  dreamInput: {
    minHeight: 160,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.3,
    fontFamily: 'Georgia',
    color: isDark ? Colors.neutral[200] : Colors.neutral[800],
    backgroundColor: isDark ? 'rgba(20, 18, 31, 0.5)' : Colors.neutral[50],
    borderWidth: 1,
    borderColor: isDark ? Colors.neutral[700] : Colors.neutral[200],
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing[2],
  },
  inputActionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  inputActionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? 'rgba(20, 18, 31, 0.5)' : Colors.neutral[100],
    borderWidth: 1,
    borderColor: isDark ? Colors.neutral[700] : Colors.neutral[200],
    ...Shadows.sm,
  },
  voiceButtonRecording: {
    backgroundColor: Colors.secondary[500],
    borderColor: Colors.secondary[400],
    ...Shadows.md,
  },
  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginTop: spacing[3],
  },
  promptChip: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: BorderRadius.pill,
    backgroundColor: isDark ? 'rgba(150, 131, 240, 0.08)' : Colors.primary[50],
    borderWidth: 1,
    borderColor: isDark ? Colors.neutral[700] : Colors.primary[100],
  },
  moodLabel: {
    marginTop: spacing[5],
    marginBottom: spacing[2],
  },
  moodRow: {
    gap: spacing[2],
    paddingVertical: spacing[1],
  },
  moodChip: {
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: BorderRadius.lg,
    backgroundColor: isDark ? 'rgba(20, 18, 31, 0.5)' : Colors.neutral[50],
    borderWidth: 1,
    borderColor: isDark ? Colors.neutral[700] : Colors.neutral[200],
    minWidth: 76,
  },
  moodChipSelected: {
    backgroundColor: isDark ? 'rgba(150, 131, 240, 0.16)' : Colors.primary[50],
    borderColor: isDark ? Colors.primary[400] : Colors.primary[500],
  },
  moodEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  analyzeButton: {
    marginTop: spacing[5],
  },
});

export default DreamInput;
