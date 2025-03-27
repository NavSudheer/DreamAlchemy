import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../../src/providers/ThemeProvider';
import { Colors, spacing, Shadows, BorderRadius } from '../../../src/utils/theme';
import Text from '../../../src/components/ui/Text';
import Header from '../../../src/components/ui/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNavigation } from '../../../src/navigation/routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample technique data - In a real app, this would come from an API or database
const TECHNIQUE_DATA = {
  '1': {
    title: 'Reality Testing',
    description: 'Train your mind to recognize dream states by questioning reality throughout the day.',
    difficulty: 1,
    duration: '5-10 min',
    icon: 'hand-pointing-up',
    steps: [
      'Set regular reminders throughout the day',
      'When reminded, ask yourself "Am I dreaming?"',
      'Look for dream signs or inconsistencies',
      'Try to push your hand through a solid surface',
      'Check text or numbers, look away, and check again',
    ],
    tips: [
      'Be consistent with your reality checks',
      'Combine multiple reality checks for better results',
      'Practice with genuine curiosity',
      'Don\'t rush through the checks',
    ],
    expectedResults: 'With regular practice, you should start performing reality checks in your dreams, leading to lucid dream experiences.',
  },
  '2': {
    title: 'Wake Back to Bed (WBTB)',
    description: 'Wake up during REM sleep and return to bed to increase lucid dream probability.',
    difficulty: 2,
    duration: '30 min',
    icon: 'alarm',
    steps: [
      'Set an alarm for 5-6 hours after bedtime',
      'When alarm sounds, get out of bed',
      'Stay awake for 15-30 minutes',
      'Return to bed with lucid dream intention',
      'Use visualization while falling asleep',
    ],
    tips: [
      'Don\'t use bright lights during wake period',
      'Keep a dream journal by your bed',
      'Focus on lucid dreaming during wake period',
      'Maintain a regular sleep schedule',
    ],
    expectedResults: 'This technique can significantly increase your chances of having a lucid dream as you re-enter REM sleep with heightened awareness.',
  },
  '3': {
    title: 'Dream Journaling',
    description: 'Maintain a detailed record of your dreams to improve dream recall and identify dream signs.',
    difficulty: 1,
    duration: '10-15 min',
    icon: 'book-open-page-variant',
    steps: [
      'Keep a journal and pen by your bed',
      'Write down dreams immediately upon waking',
      'Record as many details as possible',
      'Note emotions and sensations',
      'Review your journal regularly to identify patterns'
    ],
    tips: [
      'Use voice recording if writing is difficult',
      'Draw sketches to capture visual elements',
      'Tag recurring themes and symbols',
      'Write in present tense for better recall'
    ],
    expectedResults: 'Regular dream journaling will significantly improve your dream recall, help identify dream signs, and increase your chances of achieving lucidity.',
  },
  '4': {
    title: 'MILD (Mnemonic Induction of Lucid Dreams)',
    description: 'Program your mind to recognize dream states by setting a strong intention before sleep.',
    difficulty: 2,
    duration: '15-20 min',
    icon: 'brain',
    steps: [
      'Recall a recent dream in detail',
      'Identify a dream sign from that dream',
      'Visualize yourself becoming lucid',
      'Set a clear intention to recognize dreams',
      'Repeat intention while falling asleep'
    ],
    tips: [
      'Practice during your natural wake periods',
      'Combine with WBTB for better results',
      'Keep your intention clear and simple',
      'Maintain a consistent sleep schedule'
    ],
    expectedResults: 'With consistent practice, MILD can help you develop a habit of recognizing dream signs and achieving lucidity multiple times per week.',
  },
  '5': {
    title: 'WILD (Wake-Initiated Lucid Dreams)',
    description: 'Enter a dream state directly from wakefulness while maintaining consciousness.',
    difficulty: 3,
    duration: '20-30 min',
    icon: 'meditation',
    steps: [
      'Lie still in a comfortable position',
      'Relax your body completely',
      'Maintain gentle awareness as you drift off',
      'Observe hypnagogic imagery',
      'Allow dream scenes to form around you'
    ],
    tips: [
      'Practice during natural periods of sleepiness',
      'Stay relaxed but mentally alert',
      'Don\'t force the process',
      'Be patient with sleep paralysis sensations'
    ],
    expectedResults: 'While challenging to master, WILD allows you to enter lucid dreams consciously and can result in extremely vivid and controlled dream experiences.',
  }
};

export default function TechniqueDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const technique = TECHNIQUE_DATA[id as keyof typeof TECHNIQUE_DATA];

  // New enhanced colors for better readability
  const bgColor = isDark ? '#151934' : '#F5F8FF';
  const textColor = isDark ? '#E1E6FF' : '#2A3060';
  const cardColor = isDark ? '#1E2249' : '#FFFFFF';
  const accentColor = isDark ? '#9AA5FF' : '#4A56A6';
  const highlightColor = '#FFD700'; // Gold for both themes
  const buttonColor = '#4A56A6'; // Primary indigo color
  
  // Calculate bottom padding based on tab bar height and safe area
  const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;
  const bottomPadding = TAB_BAR_HEIGHT + insets.bottom + spacing[6];
  
  // Handle back button navigation
  const handleBackPress = () => {
    // Navigate directly to the explore tab instead of using router.back()
    router.push('/(tabs)/explore');
  };
  
  if (!technique) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Header
          title="Technique Not Found"
          leftIcon="arrow-back"
          onLeftPress={handleBackPress}
        />
        <View style={styles.content}>
          <Text variant="body1" style={{color: textColor}}>This technique could not be found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Header
        title={technique.title}
        leftIcon="arrow-back"
        onLeftPress={handleBackPress}
      />
      
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        showsVerticalScrollIndicator={true}
        alwaysBounceVertical={true}
      >
        <View style={[styles.iconContainer, { backgroundColor: cardColor, ...Shadows.md }]}>
          <MaterialCommunityIcons
            name={technique.icon as any}
            size={64}
            color={accentColor}
          />
        </View>

        <Text variant="body1" style={[styles.description, {color: textColor}]}>
          {technique.description}
        </Text>

        <View style={[styles.infoContainer, { backgroundColor: cardColor, ...Shadows.sm }]}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={accentColor}
            />
            <Text variant="body2" style={[styles.infoText, {color: textColor}]}>
              {technique.duration}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.difficultyContainer}>
              {[...Array(3)].map((_, index) => (
                <MaterialCommunityIcons
                  key={index}
                  name="star"
                  size={24}
                  color={index < technique.difficulty ? highlightColor : isDark ? '#364073' : '#D9DFF9'}
                />
              ))}
            </View>
            <Text variant="body2" style={[styles.infoText, {color: textColor}]}>
              Difficulty
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: cardColor, ...Shadows.sm }]}>
          <Text variant="h4" style={[styles.sectionTitle, {color: accentColor}]}>Steps</Text>
          {technique.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text variant="body1" style={[styles.stepNumber, {color: accentColor}]}>{index + 1}.</Text>
              <Text variant="body1" style={[styles.stepText, {color: textColor}]}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: cardColor, ...Shadows.sm }]}>
          <Text variant="h4" style={[styles.sectionTitle, {color: accentColor}]}>Tips</Text>
          {technique.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={20}
                color={highlightColor}
                style={styles.tipIcon}
              />
              <Text variant="body1" style={[styles.tipText, {color: textColor}]}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: cardColor, ...Shadows.sm }]}>
          <Text variant="h4" style={[styles.sectionTitle, {color: accentColor}]}>Expected Results</Text>
          <Text variant="body1" style={[styles.expectedResults, {color: textColor}]}>
            {technique.expectedResults}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.startButton,
            { backgroundColor: buttonColor }
          ]}
          activeOpacity={0.7}
          onPress={() => console.log(`Starting practice: ${technique.title}`)}
        >
          <MaterialCommunityIcons
            name="play-circle-outline"
            size={24}
            color="#FFFFFF"
            style={{ marginRight: spacing[2] }}
          />
          <Text variant="button" color="#FFFFFF">
            Start Practice
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing[4],
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: spacing[6],
    padding: spacing[4],
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing[6],
    lineHeight: 24,
    fontSize: 16,
    paddingHorizontal: spacing[2],
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing[6],
    borderRadius: BorderRadius.lg,
    padding: spacing[4],
  },
  infoItem: {
    alignItems: 'center',
  },
  infoText: {
    marginTop: spacing[1],
    fontWeight: '500',
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  section: {
    marginBottom: spacing[6],
    borderRadius: BorderRadius.lg,
    padding: spacing[4],
    paddingBottom: spacing[5],
  },
  sectionTitle: {
    marginBottom: spacing[4],
    fontWeight: '600',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing[3],
  },
  stepNumber: {
    width: 24,
    marginRight: spacing[2],
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: spacing[3],
    alignItems: 'flex-start',
  },
  tipIcon: {
    marginRight: spacing[2],
    marginTop: 2,
  },
  tipText: {
    flex: 1,
  },
  expectedResults: {
    lineHeight: 24,
  },
  startButton: {
    flexDirection: 'row',
    padding: spacing[4],
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[4],
    marginBottom: spacing[4],
    ...Shadows.md,
  },
}); 