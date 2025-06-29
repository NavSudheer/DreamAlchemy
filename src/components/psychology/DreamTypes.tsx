import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import Text from '../ui/Text';
import Card from '../ui/Card';

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
            Dream Types
          </Text>
          <Text variant="body1" style={[styles.subtitle, { color: subtitleColor }]}>
            Understanding different categories of dreams
          </Text>
        </View>

        {dreamTypes.map((type, index) => (
          <Card key={index} style={StyleSheet.flatten([styles.section, { backgroundColor: cardBackgroundColor }])}>
            <View style={styles.content}>
              <View style={styles.typeHeader}>
                <Text variant="h2" style={styles.typeIcon}>{type.icon}</Text>
                <View style={styles.typeTitleContainer}>
                  <Text variant="h3" style={[styles.typeTitle, { color: textColor }]}>
                    {type.name}
                  </Text>
                  <Text variant="body2" style={[styles.frequency, { color: subtitleColor }]}>
                    {type.frequency}
                  </Text>
                </View>
              </View>

              <Text variant="body1" style={[styles.description, { color: subtitleColor }]}>
                {type.description}
              </Text>

              <Text variant="h4" style={[styles.sectionTitle, { color: textColor }]}>
                Characteristics
              </Text>
              {type.characteristics.map((characteristic, idx) => (
                <Text key={idx} variant="body2" style={[styles.characteristic, { color: textColor }]}>
                  • {characteristic}
                </Text>
              ))}

              <Text variant="h4" style={[styles.sectionTitle, styles.significanceTitle, { color: textColor }]}>
                Psychological Significance
              </Text>
              <Text variant="body2" style={[styles.significance, { color: subtitleColor }]}>
                {type.significance}
              </Text>
            </View>
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
  content: {
    padding: 16,
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  typeTitleContainer: {
    flex: 1,
  },
  typeTitle: {
    marginBottom: 4,
  },
  frequency: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  characteristic: {
    marginLeft: 16,
    marginBottom: 4,
  },
  significanceTitle: {
    marginTop: 16,
  },
  significance: {
    marginBottom: 8,
  },
});

export default DreamTypes; 