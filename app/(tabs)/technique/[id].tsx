import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors, spacing, Shadows, BorderRadius } from '@/utils/theme';
import Text from '@/components/ui/Text';
import Header from '@/components/ui/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TECHNIQUE_DATA } from '@/components/dream-techniques/techniques';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SaveItemButton from '@/components/ui/SaveItemButton';

export default function TechniqueDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [practiceStep, setPracticeStep] = useState<number | null>(null);
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const technique = TECHNIQUE_DATA[id as keyof typeof TECHNIQUE_DATA];

  // Enhanced theme colors
  const bgColor = isDark ? Colors.neutral[900] : Colors.neutral[50];
  const cardColor = isDark ? Colors.neutral[800] : Colors.neutral[100];
  const textColor = isDark ? Colors.neutral[100] : Colors.neutral[800];
  const accentColor = isDark ? Colors.dreamTeal : Colors.dreamBlue;
  const highlightColor = Colors.dreamAmber;
  const buttonGradient = isDark ? Colors.gradients.dark : Colors.gradients.primary;
  
  // Calculate bottom padding based on tab bar height and safe area
  const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;
  const bottomPadding = TAB_BAR_HEIGHT + insets.bottom + spacing[6];
  
  // Handle back button navigation
  const handleBackPress = () => {
    router.navigate({ pathname: '/(tabs)/explore', params: { section: 'techniques' } });
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
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
      >
        <View style={[styles.iconContainer, { backgroundColor: cardColor, ...Shadows.lg }]}>
          <MaterialCommunityIcons
            name={technique.icon as any}
            size={64}
            color={accentColor}
          />
        </View>

        <View style={styles.titleRow}>
          <Text variant="h3" style={[styles.title, {color: accentColor}]}>
            {technique.title}
          </Text>
          <SaveItemButton itemId={id} type="technique" />
        </View>

        <Text variant="body1" style={[styles.description, {color: textColor}]}>
          {technique.description}
        </Text>

        <View style={[styles.infoContainer, { backgroundColor: cardColor, ...Shadows.md }]}>
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
                  color={index < technique.difficulty ? highlightColor : isDark ? Colors.neutral[700] : Colors.neutral[200]}
                />
              ))}
            </View>
            <Text variant="body2" style={[styles.infoText, {color: textColor}]}>
              Difficulty
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: cardColor, ...Shadows.md }]}>
          <Text variant="h4" style={[styles.sectionTitle, {color: accentColor}]}>Steps</Text>
          {technique.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: isDark ? Colors.neutral[700] : Colors.neutral[200] }]}>
                <Text variant="body2" style={[styles.stepNumberText, {color: accentColor}]}>{index + 1}</Text>
              </View>
              <Text variant="body1" style={[styles.stepText, {color: textColor}]}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: cardColor, ...Shadows.md }]}>
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

        <View style={[styles.section, { backgroundColor: cardColor, ...Shadows.md }]}>
          <Text variant="h4" style={[styles.sectionTitle, {color: accentColor}]}>Expected Results</Text>
          <Text variant="body1" style={[styles.expectedResults, {color: textColor}]}>
            {technique.expectedResults}
          </Text>
        </View>

        {practiceStep !== null && (
          <View style={[styles.section, { backgroundColor: cardColor }]}>
            <Text variant="h4" accessibilityLiveRegion="polite" style={{ color: accentColor }}>
              {practiceStep < technique.steps.length ? `Step ${practiceStep + 1} of ${technique.steps.length}` : 'Practice complete'}
            </Text>
            <Text style={{ color: textColor, marginVertical: 16 }}>
              {practiceStep < technique.steps.length ? technique.steps[practiceStep] : 'Take a moment to reflect. Finishing the guide is enough; there is no dream outcome to achieve.'}
            </Text>
            {practiceStep > 0 && practiceStep < technique.steps.length && (
              <TouchableOpacity accessibilityRole="button" onPress={() => setPracticeStep(practiceStep - 1)} style={styles.startButton}>
                <Text color={accentColor}>Previous step</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <TouchableOpacity
          accessibilityRole="button"
          style={[styles.startButton, { backgroundColor: accentColor }]}
          onPress={() => setPracticeStep(practiceStep === null || practiceStep >= technique.steps.length ? 0 : practiceStep + 1)}
        >
          <Text style={styles.startButtonText}>
            {practiceStep === null ? 'Start guided practice' : practiceStep >= technique.steps.length ? 'Practice again' : practiceStep === technique.steps.length - 1 ? 'Finish practice' : 'Next step'}
          </Text>
        </TouchableOpacity>
        {practiceStep !== null && (
          <TouchableOpacity accessibilityRole="button" style={styles.startButton} onPress={() => setPracticeStep(null)}>
            <Text color={accentColor}>Close practice</Text>
          </TouchableOpacity>
        )}
        {id === '3' && (
          <TouchableOpacity accessibilityRole="button" style={styles.startButton} onPress={() => router.push('/(tabs)')}>
            <Text color={accentColor}>Open your dream journal</Text>
          </TouchableOpacity>
        )}
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
    paddingHorizontal: spacing[4],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing[6],
    alignSelf: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing[3],
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing[6],
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: BorderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[6],
  },
  infoItem: {
    alignItems: 'center',
  },
  infoText: {
    marginTop: spacing[2],
  },
  difficultyContainer: {
    flexDirection: 'row',
  },
  section: {
    borderRadius: BorderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[4],
  },
  sectionTitle: {
    marginBottom: spacing[4],
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  stepNumberText: {
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    lineHeight: 24,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  tipIcon: {
    marginRight: spacing[3],
    marginTop: spacing[1],
  },
  tipText: {
    flex: 1,
    lineHeight: 24,
  },
  expectedResults: {
    lineHeight: 24,
  },
  startButton: {
    marginTop: spacing[4],
    marginBottom: spacing[6],
    paddingVertical: spacing[4],
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  startButtonText: {
    color: Colors.neutral[50],
    fontSize: 18,
    fontWeight: 'bold',
  },
});
