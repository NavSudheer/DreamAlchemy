import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, spacing } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Header from '../../src/components/ui/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  // Add more techniques as needed
};

export default function TechniqueDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isDark } = useTheme();
  const technique = TECHNIQUE_DATA[id as keyof typeof TECHNIQUE_DATA];

  if (!technique) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }]}>
        <Header
          title="Technique Not Found"
          leftIcon="arrow-back"
          onLeftPress={() => router.back()}
        />
        <View style={styles.content}>
          <Text variant="body1">This technique could not be found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }]}>
      <Header
        title={technique.title}
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={technique.icon as any}
            size={64}
            color={isDark ? Colors.primary[300] : Colors.primary[600]}
          />
        </View>

        <Text variant="body1" style={styles.description}>
          {technique.description}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
            />
            <Text variant="body2" style={styles.infoText}>
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
                  color={index < technique.difficulty ? '#FFD700' : isDark ? Colors.neutral[700] : Colors.neutral[300]}
                />
              ))}
            </View>
            <Text variant="body2" style={styles.infoText}>
              Difficulty
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>Steps</Text>
          {technique.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text variant="body1" style={styles.stepNumber}>{index + 1}.</Text>
              <Text variant="body1" style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>Tips</Text>
          {technique.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={20}
                color={isDark ? Colors.primary[300] : Colors.primary[600]}
                style={styles.tipIcon}
              />
              <Text variant="body1" style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>Expected Results</Text>
          <Text variant="body1" style={styles.expectedResults}>
            {technique.expectedResults}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.startButton,
            { backgroundColor: isDark ? Colors.primary[600] : Colors.primary[500] }
          ]}
          activeOpacity={0.7}
        >
          <Text variant="button" color={Colors.neutral[50]}>
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
    marginBottom: spacing[4],
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing[6],
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing[6],
  },
  infoItem: {
    alignItems: 'center',
  },
  infoText: {
    marginTop: spacing[1],
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    marginBottom: spacing[3],
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing[3],
  },
  stepNumber: {
    width: 24,
    marginRight: spacing[2],
    color: Colors.primary[500],
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
    padding: spacing[4],
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing[6],
  },
}); 