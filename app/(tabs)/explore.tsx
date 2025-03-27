import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Card from '../../src/components/ui/Card';
import Header from '../../src/components/ui/Header';
import { Ionicons } from '@expo/vector-icons';
import PatternsScreen from '../../src/components/DreamPatterns';
import { DreamTechniques } from '../components/dream-techniques/DreamTechniques';

export default function ExploreScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [activeScreen, setActiveScreen] = useState<'explore' | 'patterns' | 'techniques'>('explore');

  if (activeScreen === 'patterns') {
    return <PatternsScreen onBack={() => setActiveScreen('explore')} />;
  }

  if (activeScreen === 'techniques') {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
      ]}>
        <Header 
          title="Dream Techniques" 
          leftIcon="arrow-back"
          onLeftPress={() => setActiveScreen('explore')}
        />
        <DreamTechniques />
      </View>
    );
  }

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <Header title="Explore Dreams" showMoon={true} />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        <Text 
          variant="h3" 
          color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          style={styles.subtitle}
        >
          Discover the meaning behind your dreams
        </Text>
        
        <Card
          variant="gradient"
          gradientColors={isDark ? 
            ['#1A365D', '#2A4365'] : 
            ['#EBF8FF', '#BEE3F8']}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Ionicons 
              name="book-outline" 
              size={28} 
              color={isDark ? Colors.neutral[100] : Colors.primary[700]} 
            />
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.cardTitle}
            >
              Dream Dictionary
            </Text>
          </View>
          <Text variant="body1" style={styles.cardDescription}>
            Explore common dream symbols and their meanings
          </Text>
          <TouchableOpacity 
            style={[
              styles.cardButton,
              { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)' }
            ]}
            activeOpacity={0.7}
            onPress={() => router.push('/(tabs)/dictionary')}
          >
            <Text 
              variant="button"
              color={isDark ? Colors.neutral[200] : Colors.primary[700]}
            >
              Open Dictionary
            </Text>
            <Ionicons 
              name="chevron-forward" 
              size={18} 
              color={isDark ? Colors.neutral[200] : Colors.primary[700]} 
              style={styles.cardButtonIcon}
            />
          </TouchableOpacity>
        </Card>

        <Card
          variant="gradient"
          gradientColors={isDark ? 
            ['#234E52', '#1D4044'] : 
            ['#E6FFFA', '#B2F5EA']}
          style={styles.card}
          onPress={() => setActiveScreen('patterns')}
        >
          <View style={styles.cardHeader}>
            <Ionicons 
              name="stats-chart-outline" 
              size={28} 
              color={isDark ? Colors.neutral[100] : Colors.accent[700]} 
            />
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.cardTitle}
            >
              Dream Patterns
            </Text>
          </View>
          <Text variant="body1" style={styles.cardDescription}>
            Analyze patterns and recurring themes in your dreams
          </Text>
        </Card>

        <Card
          variant="gradient"
          gradientColors={isDark ? 
            ['#744210', '#975A16'] : 
            ['#FFFBEB', '#FEF3C7']}
          style={styles.card}
          onPress={() => setActiveScreen('techniques')}
        >
          <View style={styles.cardHeader}>
            <Ionicons 
              name="color-palette-outline" 
              size={28} 
              color={isDark ? Colors.neutral[100] : Colors.secondary[700]} 
            />
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.cardTitle}
            >
              Dream Techniques
            </Text>
          </View>
          <Text variant="body1" style={styles.cardDescription}>
            Learn techniques for lucid dreaming and dream recall
          </Text>
        </Card>

        <Card
          variant="gradient"
          gradientColors={isDark ? 
            ['#322659', '#44337A'] : 
            ['#FAF5FF', '#E9D8FD']}
          style={styles.card}
          onPress={() => router.push('/(tabs)/explore/psychology')}
        >
          <View style={styles.cardHeader}>
            <Ionicons 
              name="school-outline" 
              size={28} 
              color={isDark ? Colors.neutral[100] : Colors.primary[700]} 
            />
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.cardTitle}
            >
              Dream Psychology
            </Text>
          </View>
          <Text variant="body1" style={styles.cardDescription}>
            Understand the science and psychology behind dreams
          </Text>
        </Card>
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
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing[4],
    paddingBottom: 60 + spacing[6], // Add extra padding for the tab bar
  },
  subtitle: {
    marginBottom: spacing[6],
    textAlign: 'center',
  },
  card: {
    marginBottom: spacing[6],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  cardTitle: {
    marginLeft: spacing[3],
  },
  cardDescription: {
    marginTop: spacing[1],
    marginLeft: spacing[6],
    opacity: 0.9,
  },
  cardButton: {
    marginTop: spacing[3],
    marginLeft: spacing[6],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  cardButtonIcon: {
    marginLeft: spacing[1],
  }
});
