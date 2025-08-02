import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import Text from '../ui/Text';
import Card from '../ui/Card';

const PsychologicalTheories = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const theories = [
    {
      name: 'Freudian Theory',
      founder: 'Sigmund Freud',
      keyPrinciples: [
        'Dreams represent unconscious wishes',
        'Manifest content vs. latent content',
        'Dream symbols are personal and universal',
      ],
      mainConcepts: 'Dreams serve as the "royal road to the unconscious," revealing repressed desires and conflicts.',
      icon: '🧠',
    },
    {
      name: 'Jungian Analysis',
      founder: 'Carl Jung',
      keyPrinciples: [
        'Collective unconscious',
        'Universal archetypes',
        'Dream compensation theory',
      ],
      mainConcepts: 'Dreams reflect both personal and collective unconscious material, using universal symbolic language.',
      icon: '⭐',
    },
    {
      name: 'Cognitive Theory',
      founder: 'Modern Psychology',
      keyPrinciples: [
        'Memory consolidation',
        'Problem-solving function',
        'Emotional regulation',
      ],
      mainConcepts: 'Dreams help process daily experiences, solve problems, and regulate emotions through neural network activation.',
      icon: '🔄',
    },
    {
      name: 'Activation-Synthesis',
      founder: 'Hobson & McCarley',
      keyPrinciples: [
        'Random brain activation',
        'Meaning creation by consciousness',
        'Biological basis of dreams',
      ],
      mainConcepts: 'Dreams result from the brain attempting to make sense of random neural firing during sleep.',
      icon: '⚡',
    },
  ];

  const cardBackgroundColor = isDark ? '#1E1E1E' : colors.surface;
  const textColor = isDark ? '#FFFFFF' : colors.onSurface;
  const subtitleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
  const dividerColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';

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
            Psychological Theories
          </Text>
          <Text variant="body1" style={[styles.subtitle, { color: subtitleColor }]}>
            Different approaches to understanding dreams
          </Text>
        </View>

        {theories.map((theory, index) => (
          <Card key={index} style={StyleSheet.flatten([styles.section, { backgroundColor: cardBackgroundColor }])}>
            <View style={styles.content}>
              <View style={styles.theoryHeader}>
                <Text variant="h3" style={[styles.theoryTitle, { color: textColor }]}>
                    {theory.name}
                  </Text>
                <Text variant="body2" style={[styles.founder, { color: subtitleColor }]}>
                    Developed by {theory.founder}
                  </Text>
              </View>

              <Divider style={[styles.divider, { backgroundColor: dividerColor }]} />

              <Text variant="h4" style={[styles.sectionTitle, { color: textColor }]}>
                Key Principles
              </Text>
              {theory.keyPrinciples.map((principle, idx) => (
                <Text key={idx} variant="body2" style={[styles.principle, { color: textColor }]}>
                  • {principle}
                </Text>
              ))}

              <Text variant="h4" style={[styles.sectionTitle, styles.conceptsTitle, { color: textColor }]}>
                Main Concepts
              </Text>
              <Text variant="body2" style={[styles.concepts, { color: subtitleColor }]}>
                {theory.mainConcepts}
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
  theoryHeader: {
    marginBottom: 16,
  },
  theoryTitle: {
    marginBottom: 4,
  },
  founder: {
    marginBottom: 4,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  principle: {
    marginLeft: 16,
    marginBottom: 4,
  },
  conceptsTitle: {
    marginTop: 16,
  },
  concepts: {
    marginBottom: 8,
  },
});

export default PsychologicalTheories; 