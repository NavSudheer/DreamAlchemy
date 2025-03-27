import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, List } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
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
          <Text variant="headlineMedium" style={[styles.title, { color: textColor }]}>
            Scientific Perspectives
          </Text>
          <Text variant="bodyLarge" style={[styles.subtitle, { color: subtitleColor }]}>
            Understanding the neuroscience of dreaming
          </Text>
        </View>

        <Card style={[styles.section, { backgroundColor: cardBackgroundColor }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.sectionTitle, { color: textColor }]}>
              Brain Regions Involved in Dreaming
            </Text>
            {brainRegions.map((region, index) => (
              <List.Item
                key={index}
                title={() => (
                  <Text style={{ color: textColor }}>{region.name}</Text>
                )}
                description={() => (
                  <Text style={{ color: subtitleColor }}>{region.description}</Text>
                )}
                left={props => (
                  <MaterialCommunityIcons 
                    name="brain" 
                    size={24} 
                    color={isDark ? '#FFFFFF' : colors.primary} 
                    style={{ marginTop: 8 }}
                  />
                )}
              />
            ))}
          </Card.Content>
        </Card>

        <Card style={[styles.section, { backgroundColor: cardBackgroundColor }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.sectionTitle, { color: textColor }]}>
              Sleep Stages and Dreaming
            </Text>
            {sleepStages.map((stage, index) => (
              <View key={index} style={styles.stageContainer}>
                <Text variant="titleMedium" style={{ color: textColor }}>{stage.stage}</Text>
                <Text variant="bodyMedium" style={[styles.stageDescription, { color: subtitleColor }]}>
                  {stage.description}
                </Text>
                {stage.characteristics.map((char, charIndex) => (
                  <Text key={charIndex} style={[styles.characteristic, { color: textColor }]}>
                    • {char}
                  </Text>
                ))}
              </View>
            ))}
          </Card.Content>
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
  sectionTitle: {
    marginBottom: 16,
  },
  stageContainer: {
    marginBottom: 16,
  },
  stageDescription: {
    marginTop: 4,
    marginBottom: 8,
  },
  characteristic: {
    marginLeft: 16,
    marginTop: 4,
  },
});

export default ScientificPerspectives; 