import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Href, useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows } from '@/utils/theme';
import Text from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import Header from '@/components/ui/Header';
import { Ionicons } from '@expo/vector-icons';
import PatternsScreen from '@/components/DreamPatterns';
import { DreamTechniques } from '@/components/dream-techniques/DreamTechniques';
import { MeditationTimer } from '@/components/dream-techniques/MeditationTimer';
import { searchExploreContent } from '@/data/exploreSearch';

export default function ExploreScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const { section } = useLocalSearchParams<{ section?: string }>();
  const [activeScreen, setActiveScreen] = useState<'explore' | 'patterns' | 'techniques' | 'meditation'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = searchExploreContent(searchQuery);
  useEffect(() => {
    if (section === 'techniques') setActiveScreen('techniques');
  }, [section]);

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
          onLeftPress={() => {
            setActiveScreen('explore');
            router.setParams({ section: '' });
          }}
        />
        <DreamTechniques />
      </View>
    );
  }

  if (activeScreen === 'meditation') {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
      ]}>
        <Header
          title="Meditation & Visualization"
          leftIcon="arrow-back"
          onLeftPress={() => setActiveScreen('explore')}
        />
        <MeditationTimer />
      </View>
    );
  }

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <Header title="Explore Dreams" rightIcon="bookmark-outline" onRightPress={() => router.push('/(tabs)/saved')} />
      
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
        <View style={[styles.searchBox, { backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[100] }]}>
          <Ionicons name="search" size={18} color={isDark ? Colors.neutral[400] : Colors.neutral[500]} />
          <TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Search symbols, techniques, psychology…" placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]} style={[styles.searchInput, { color: isDark ? Colors.neutral[100] : Colors.neutral[800] }]} />
        </View>
        {searchQuery.trim().length > 0 && (
          <View style={styles.results}>
            {searchResults.map(result => <TouchableOpacity key={result.id} style={[styles.result, { backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[50] }]} onPress={() => result.kind === 'dictionary' ? router.push({ pathname: '/symbol/[id]', params: { id: result.target } }) : result.kind === 'technique' ? router.push({ pathname: '/(tabs)/technique/[id]', params: { id: result.target } }) : router.push(result.target as any)}><Text variant="subtitle2" color={isDark ? Colors.neutral[100] : Colors.neutral[800]}>{result.title}</Text><Text variant="caption" color={isDark ? Colors.neutral[400] : Colors.neutral[600]}>{result.description}</Text></TouchableOpacity>)}
          </View>
        )}
        
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
            ['#1A365D', '#2A4365'] :
            ['#EBF8FF', '#BEE3F8']}
          style={styles.card}
          onPress={() => router.push('/(tabs)/dictionary')}
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
            ['#3C276E', '#24173F'] :
            ['#F3E8FF', '#E9D5FF']}
          style={styles.card}
          onPress={() => setActiveScreen('meditation')}
        >
          <View style={styles.cardHeader}>
            <Ionicons
              name="headset-outline"
              size={28}
              color={isDark ? Colors.neutral[100] : Colors.primary[700]}
            />
            <Text
              variant="h4"
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.cardTitle}
            >
              Meditation & Visualization
            </Text>
          </View>
          <Text variant="body1" style={styles.cardDescription}>
            Wind down with a guided timer and optional theta-style audio
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

        <Card
          variant="gradient"
          gradientColors={isDark ? ['#42324F', '#2D2438'] : ['#F7EFFA', '#E9D9F0']}
          style={styles.card}
          onPress={() => router.push('/astrology' as Href)}
        >
          <View style={styles.cardHeader}>
            <Ionicons name="planet-outline" size={28} color={isDark ? Colors.neutral[100] : Colors.primary[700]} />
            <Text variant="h4" color={isDark ? Colors.neutral[100] : Colors.neutral[800]} style={styles.cardTitle}>Optional Astrology</Text>
          </View>
          <Text variant="body1" style={styles.cardDescription}>Create a private, non-predictive chart reflection kept separate from dream analysis</Text>
        </Card>

        <Card
          variant="gradient"
          gradientColors={isDark ? ['#243447', '#1B2838'] : ['#EFF6FF', '#DBEAFE']}
          style={styles.card}
          onPress={() => router.push('/dream-image' as Href)}
        >
          <View style={styles.cardHeader}>
            <Ionicons name="images-outline" size={28} color={isDark ? Colors.neutral[100] : Colors.primary[700]} />
            <Text variant="h4" color={isDark ? Colors.neutral[100] : Colors.neutral[800]} style={styles.cardTitle}>Dream Image Studio</Text>
          </View>
          <Text variant="body1" style={styles.cardDescription}>Preview curated visual scenes and styles without sharing your journal text</Text>
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
  searchBox: { alignItems: 'center', borderRadius: BorderRadius.lg, flexDirection: 'row', marginBottom: spacing[4], paddingHorizontal: spacing[3] },
  searchInput: { flex: 1, fontSize: 15, paddingHorizontal: spacing[2], paddingVertical: spacing[3] },
  results: { gap: spacing[2], marginBottom: spacing[4] },
  result: { borderRadius: BorderRadius.md, padding: spacing[3] },
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
