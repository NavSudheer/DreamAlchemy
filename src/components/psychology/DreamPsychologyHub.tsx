import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import Card from '../ui/Card';
import Text from '../ui/Text';
import { useRouter } from 'expo-router';

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

  const onNavigate = (route: string) => {
    router.push(route as any);
  };

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
          <Text variant="body1" style={[styles.subtitle, { color: subtitleColor }]}>
            Understand the science and psychology behind your dreams
          </Text>
        </View>

        <View style={styles.sectionsGrid}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onNavigate(section.route)}
              activeOpacity={0.7}
            >
              <Card
                variant="elevated"
                style={StyleSheet.flatten([styles.sectionCard, { backgroundColor: cardBackgroundColor }])}
              >
                <View style={styles.content}>
                  <Text variant="h4" style={{ color: textColor, marginBottom: 8, fontWeight: '600' }}>
                    {section.icon} {section.title}
                  </Text>
                  <Text variant="body2" style={{ color: subtitleColor }}>
                    {section.description}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
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
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
});

export default DreamPsychologyHub; 