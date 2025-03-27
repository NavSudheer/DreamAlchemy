import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

const DreamTypes = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const dreamTypes = [
    {
      name: 'Lucid Dreams',
      description: 'Dreams in which the dreamer is aware they are dreaming and may have some control over the dream narrative.',
      characteristics: ['Self-awareness', 'Potential control', 'Vivid experience'],
      significance: 'Can be used for personal growth, problem-solving, and overcoming fears.',
      frequency: 'Varies by individual, can be trained',
      icon: '✨',
    },
    {
      name: 'Recurring Dreams',
      description: 'Dreams that repeat the same or similar content over time.',
      characteristics: ['Repetitive patterns', 'Symbolic meaning', 'Emotional impact'],
      significance: 'Often indicate unresolved issues or ongoing life challenges.',
      frequency: 'Regular until underlying issue is resolved',
      icon: '🔄',
    },
    {
      name: 'Nightmares',
      description: 'Disturbing dreams that cause fear, anxiety, or distress.',
      characteristics: ['Intense emotions', 'Fight-or-flight response', 'Vivid recall'],
      significance: 'May process trauma, stress, or deep-seated fears.',
      frequency: 'Occasional to frequent, depending on stress levels',
      icon: '😱',
    },
    {
      name: 'Prophetic Dreams',
      description: 'Dreams that seem to predict future events or provide insight.',
      characteristics: ['Precognitive elements', 'Strong intuition', 'Symbolic guidance'],
      significance: 'May reflect unconscious pattern recognition or heightened intuition.',
      frequency: 'Rare',
      icon: '🔮',
    },
    {
      name: 'Processing Dreams',
      description: 'Dreams that help process daily experiences and emotions.',
      characteristics: ['Daily life elements', 'Emotional processing', 'Memory integration'],
      significance: 'Essential for emotional regulation and memory consolidation.',
      frequency: 'Very common, almost nightly',
      icon: '🧩',
    },
  ];

  const cardBackgroundColor = isDark ? '#1E1E1E' : colors.surface;
  const textColor = isDark ? '#FFFFFF' : colors.onSurface;
  const subtitleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
  const chipBackgroundColor = isDark ? 'rgba(255, 255, 255, 0.15)' : colors.surfaceVariant;
  const chipTextColor = isDark ? '#FFFFFF' : colors.onSurfaceVariant;

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
            Dream Types
          </Text>
          <Text variant="bodyLarge" style={[styles.subtitle, { color: subtitleColor }]}>
            Understanding different categories of dreams
          </Text>
        </View>

        {dreamTypes.map((type, index) => (
          <Card key={index} style={[styles.section, { backgroundColor: cardBackgroundColor }]}>
            <Card.Content>
              <View style={styles.typeHeader}>
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text variant="titleLarge" style={[styles.typeTitle, { color: textColor }]}>
                  {type.name}
                </Text>
              </View>

              <Text variant="bodyMedium" style={[styles.description, { color: subtitleColor }]}>
                {type.description}
              </Text>

              <View style={styles.characteristicsContainer}>
                {type.characteristics.map((char, idx) => (
                  <Chip
                    key={idx}
                    style={[styles.chip, { backgroundColor: chipBackgroundColor }]}
                    textStyle={[styles.chipText, { color: chipTextColor }]}
                  >
                    {char}
                  </Chip>
                ))}
              </View>

              <View style={styles.infoSection}>
                <Text variant="titleMedium" style={[styles.infoTitle, { color: textColor }]}>
                  Psychological Significance
                </Text>
                <Text variant="bodyMedium" style={[styles.infoText, { color: subtitleColor }]}>
                  {type.significance}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text variant="titleMedium" style={[styles.infoTitle, { color: textColor }]}>
                  Frequency
                </Text>
                <Text variant="bodyMedium" style={[styles.infoText, { color: subtitleColor }]}>
                  {type.frequency}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
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
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  typeTitle: {
    flex: 1,
  },
  description: {
    marginBottom: 16,
  },
  characteristicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    marginBottom: 4,
  },
  chipText: {
    fontSize: 12,
  },
  infoSection: {
    marginBottom: 12,
  },
  infoTitle: {
    marginBottom: 4,
  },
  infoText: {
    marginBottom: 4,
  },
});

export default DreamTypes; 