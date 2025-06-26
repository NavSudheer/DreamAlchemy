import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { TechniqueList, Technique } from './TechniqueList';
import { useRouter } from 'expo-router';
import { useTheme } from '../../providers/ThemeProvider';
import { createNavigation } from '../../navigation/routes';
import { LinearGradient } from 'expo-linear-gradient';

// Sample data - In a real app, this would come from an API or database
const SAMPLE_TECHNIQUES: Technique[] = [
  {
    id: '1',
    title: 'Reality Testing',
    description: 'Train your mind to recognize dream states by questioning reality throughout the day.',
    difficulty: 1,
    duration: '5-10 min',
    icon: 'hand-pointing-up',
    progress: 30,
  },
  {
    id: '2',
    title: 'Wake Back to Bed (WBTB)',
    description: 'Wake up during REM sleep and return to bed to increase lucid dream probability.',
    difficulty: 2,
    duration: '30 min',
    icon: 'alarm',
  },
  {
    id: '3',
    title: 'Dream Journaling',
    description: 'Record your dreams immediately upon waking to improve dream recall.',
    difficulty: 1,
    duration: '10-15 min',
    icon: 'book-open-variant',
    progress: 75,
  },
  {
    id: '4',
    title: 'Mnemonic Induction (MILD)',
    description: "Set your intention to remember you're dreaming while falling asleep.",
    difficulty: 2,
    duration: '15 min',
    icon: 'brain',
  },
  {
    id: '5',
    title: 'Wake Initiated (WILD)',
    description: 'Maintain consciousness while your body falls asleep.',
    difficulty: 3,
    duration: '20-30 min',
    icon: 'meditation',
  },
];

const DreamTechniques: React.FC = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const [techniques] = useState<Technique[]>(SAMPLE_TECHNIQUES);

  // New colors for better readability
  const gradientTop = '#151934';    // Darker indigo for background gradient
  const gradientBottom = '#2A305F'; // Lighter indigo for background gradient

  const handleTechniquePress = (technique: Technique) => {
    router.push(
      createNavigation('/(tabs)/technique/[id]', { id: technique.id })
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[gradientTop, gradientBottom]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TechniqueList
          techniques={techniques}
          onTechniquePress={handleTechniquePress}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 20,
  },
});

export { DreamTechniques };
export default DreamTechniques; 