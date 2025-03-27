import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useTheme } from '../../hooks/useTheme';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DreamPsychologyHub = () => {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const sections = [
    {
      title: 'Scientific Perspectives',
      description: 'Explore the neurological and scientific basis of dreaming',
      icon: '🧠',
      route: '/(tabs)/explore/psychology/scientific',
    },
    {
      title: 'Psychological Theories',
      description: 'Discover different approaches to dream interpretation',
      icon: '🔍',
      route: '/(tabs)/explore/psychology/theories',
    },
    {
      title: 'Dream Types',
      description: 'Learn about different categories of dreams and their meanings',
      icon: '💭',
      route: '/(tabs)/explore/psychology/types',
    },
    {
      title: 'Cultural Perspectives',
      description: 'Understand how different cultures view and interpret dreams',
      icon: '🌍',
      route: '/(tabs)/explore/psychology/cultural',
    },
  ];

  const cardBackgroundColor = isDark ? '#1E1E1E' : colors.surface;
  const textColor = isDark ? '#FFFFFF' : colors.onSurface;
  const subtitleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: 80 + insets.bottom } // Add padding for tab bar
        ]}
      >
        <View style={styles.header}>
          <Text variant="bodyLarge" style={[styles.subtitle, { color: subtitleColor }]}>
            Understand the science and psychology behind your dreams
          </Text>
        </View>

        <View style={styles.sectionsGrid}>
          {sections.map((section, index) => (
            <Card
              key={index}
              style={[styles.sectionCard, { backgroundColor: cardBackgroundColor }]}
              onPress={() => router.push(section.route as any)}
            >
              <Card.Content>
                <Text style={styles.sectionIcon}>{section.icon}</Text>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: textColor }]}>
                  {section.title}
                </Text>
                <Text variant="bodyMedium" style={[styles.sectionDescription, { color: subtitleColor }]}>
                  {section.description}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
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
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionsGrid: {
    padding: 16,
    gap: 16,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  sectionDescription: {
    marginTop: 4,
  },
});

export default DreamPsychologyHub; 