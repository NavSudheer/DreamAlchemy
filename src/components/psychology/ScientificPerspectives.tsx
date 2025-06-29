import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import Text from '../ui/Text';
import Card from '../ui/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ScientificPerspectives = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const brainRegions = [
    {
      name: 'Frontal Cortex',
      role: 'Executive function and emotional processing in dreams',
      description: 'Involved in organizing dream narratives and emotional responses',
    },
    {
      name: 'Amygdala',
      role: 'Emotional processing and memory',
      description: 'Processes emotional content of dreams and links to memories',
    },
    {
      name: 'Hippocampus',
      role: 'Memory consolidation',
      description: 'Integrates daily experiences into dream content',
    },
  ];

  const sleepStages = [
    {
      stage: 'REM Sleep',
      description: 'Most vivid dreams occur during Rapid Eye Movement sleep',
      characteristics: ['Brain highly active', 'Muscle paralysis', 'Rapid eye movements'],
    },
    {
      stage: 'Non-REM Sleep',
      description: 'Less vivid dreams may occur during lighter sleep stages',
      characteristics: ['Slower brain activity', 'Body can move', 'Memory consolidation'],
    },
  ];

  const cardBackgroundColor = isDark ? '#1E1E1E' : colors.surface;
  const textColor = isDark ? '#FFFFFF' : colors.onSurface;
  const subtitleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: 80 + insets.bottom } // Add padding for tab bar
        ]}
      >
        <View style={styles.header}>
          <Text variant="h2" style={[styles.title, { color: textColor }]}>
            Scientific Perspectives
          </Text>
          <Text variant="body1" style={[styles.subtitle, { color: subtitleColor }]}>
            Understanding the neuroscience of dreaming
          </Text>
        </View>

        <Card style={StyleSheet.flatten([styles.section, { backgroundColor: cardBackgroundColor }])}>
          <View style={styles.content}>
            <Text variant="h3" style={[styles.sectionTitle, { color: textColor }]}>
              🧠 Neurological Basis of Dreams
            </Text>
            <Text variant="body1" style={[styles.description, { color: subtitleColor }]}>
              Dreams primarily occur during REM (Rapid Eye Movement) sleep, when brain activity is high and resembles waking patterns.
            </Text>

            <Text variant="h4" style={[styles.subsectionTitle, { color: textColor }]}>
              Key Brain Structures
            </Text>
            {brainRegions.map((region, index) => (
              <View key={index} style={styles.listItem}>
                <Text variant="body2" style={[styles.listTitle, { color: textColor }]}>
                  {region.name}:
                </Text>
                <Text variant="body2" style={[styles.listDescription, { color: subtitleColor }]}>
                  {region.description}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Card style={StyleSheet.flatten([styles.section, { backgroundColor: cardBackgroundColor }])}>
          <View style={styles.content}>
            <Text variant="h3" style={[styles.sectionTitle, { color: textColor }]}>
              🔬 Sleep Stages and Dream Formation
            </Text>
            <Text variant="body1" style={[styles.description, { color: subtitleColor }]}>
              Understanding how dreams form across different sleep stages provides insight into their psychological significance.
            </Text>

            <Text variant="h4" style={[styles.subsectionTitle, { color: textColor }]}>
              Sleep Stages
            </Text>
            {sleepStages.map((stage, index) => (
              <View key={index} style={styles.listItem}>
                <Text variant="body2" style={[styles.listTitle, { color: textColor }]}>
                  {stage.stage}:
                </Text>
                <Text variant="body2" style={[styles.listDescription, { color: subtitleColor }]}>
                  {stage.description}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  description: {
    marginBottom: 16,
  },
  subsectionTitle: {
    marginBottom: 8,
    marginTop: 8,
  },
  listItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  listTitle: {
    fontWeight: '600',
  },
  listDescription: {
    marginTop: 2,
  },
});

export default ScientificPerspectives; 