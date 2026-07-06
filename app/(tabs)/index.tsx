import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DreamInput from '@/components/DreamInput';
import DreamAnalysis from '@/components/DreamAnalysis';
import { analyzeDream, DreamAnalysisError } from '@/services/dreamAnalysis';
import { saveDream, getDreams } from '@/utils/storage';
import { generateId, getGreeting, computeStreak, countWithinDays } from '@/utils/helpers';
import { Dream, DreamAnalysis as DreamAnalysisType, DreamMood } from '@/types';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors, spacing, BorderRadius } from '@/utils/theme';
import Text from '@/components/ui/Text';
import Header from '@/components/ui/Header';
import { trialTrackingService, TrialStatus } from '@/services/trialTracking';
import SubscriptionPaywall from '@/components/ui/SubscriptionPaywall';

function Index() {
  const [dreamText, setDreamText] = useState('');
  const [dreamMood, setDreamMood] = useState<DreamMood>('neutral');
  const [analysis, setAnalysis] = useState<DreamAnalysisType | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState<'input' | 'analysis'>('input');
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [stats, setStats] = useState({ total: 0, streak: 0, thisWeek: 0 });
  const { isDark, themeType, setThemeType } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Initialize trial tracking on component mount
  useEffect(() => {
    initializeTrialStatus();
  }, []);

  // Refresh journal stats whenever the screen regains focus
  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const dreams = await getDreams();
        if (!active) return;
        const timestamps = dreams.map(d => d.timestamp);
        setStats({
          total: dreams.length,
          streak: computeStreak(timestamps),
          thisWeek: countWithinDays(timestamps, 7),
        });
      })();
      return () => { active = false; };
    }, [])
  );

  const initializeTrialStatus = async () => {
    try {
      await trialTrackingService.initialize();
      const status = await trialTrackingService.getTrialStatus();
      setTrialStatus(status);
    } catch (error) {
      console.error('Failed to initialize trial status:', error);
    }
  };

  const runAnalysis = async (text: string) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setActiveView('analysis');

    try {
      // Record the analysis attempt
      const newTrialStatus = await trialTrackingService.recordAnalysis();
      setTrialStatus(newTrialStatus);

      const initialAnalysis: DreamAnalysisType = {
        symbols: [],
        archetypes: [],
        interpretation: '',
        timestamp: new Date().toISOString(),
      };
      setAnalysis(initialAnalysis);

      const dreamAnalysis = await analyzeDream(text, (updatedAnalysis) => {
        setAnalysis(curr => ({ ...curr!, ...updatedAnalysis }));
      });

      setAnalysis(dreamAnalysis);
    } catch (error) {
      console.error("Error analyzing dream:", error);
      setAnalysis(null);
      setAnalysisError(
        error instanceof DreamAnalysisError
          ? error.message
          : 'Something went wrong while analyzing your dream. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDreamSubmit = async (text: string, mood: DreamMood) => {
    // Check if user can perform analysis
    const canAnalyze = await trialTrackingService.canPerformAnalysis();

    if (!canAnalyze) {
      setShowPaywall(true);
      return;
    }

    setDreamText(text);
    setDreamMood(mood);
    runAnalysis(text);
  };

  const handleRetry = () => {
    if (dreamText) runAnalysis(dreamText);
  };

  const handleSaveAnalysis = async () => {
    if (!analysis || !analysis.interpretation) return;

    try {
      const dream: Dream = {
        id: generateId(),
        content: dreamText,
        timestamp: Date.now(),
        analysis: {
          interpretation: analysis.interpretation,
          symbols: analysis.symbols.map(s => ({
            symbol: s.name,
            meaning: s.meaning
          })),
          archetypes: analysis.archetypes.map(a => ({
            type: a.type,
            description: a.description,
            significance: a.significance
          })),
          mood: dreamMood,
          theme: analysis.theme?.primary || 'general',
          secondaryThemes: analysis.theme?.secondary || [],
          themeConfidence: analysis.theme?.confidence || 0
        },
      };

      await saveDream(dream);
      handleNewDream();
      router.push('/history');
    } catch (error) {
      console.error("Error saving dream:", error);
    }
  };

  const handleNewDream = () => {
    setDreamText('');
    setDreamMood('neutral');
    setAnalysis(null);
    setAnalysisError(null);
    setActiveView('input');
  };

  const handleSubscriptionSuccess = () => {
    setShowPaywall(false);
    initializeTrialStatus(); // Refresh trial status
    Alert.alert(
      '🎉 Welcome to Premium!',
      'You now have unlimited access to dream analysis!',
      [{ text: 'Continue', style: 'default' }]
    );
  };

  const getTrialDisplayText = (): string => {
    if (!trialStatus) return '';

    if (trialStatus.isSubscriptionActive) {
      return '✨ Premium';
    }

    if (trialStatus.hasTrialExpired) {
      return '⏰ Trial Expired';
    }

    if (trialStatus.analysesLeft === 0) {
      return '⏰ No analyses left';
    }

    return '🔮 ' + trialStatus.analysesLeft + ' left';
  };

  const heroColors: [string, string] = isDark
    ? ['#271A57', '#14121F']
    : ['#654BC8', '#9683F0'];

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <StatusBar barStyle="light-content" />

      {activeView === 'analysis' && (
        <Header
          showMoon={true}
          title="Dream Analysis"
          rightText={getTrialDisplayText()}
        />
      )}

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {activeView === 'input' ? (
          <>
            <LinearGradient
              colors={heroColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.hero, { paddingTop: insets.top + spacing[4] }]}
            >
              <View style={styles.heroTopRow}>
                <View style={styles.heroGreeting}>
                  <Text variant="overline" color="rgba(255,255,255,0.7)">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric'
                    })}
                  </Text>
                  <Text variant="h2" color="#FFFFFF" style={styles.heroTitle}>
                    {getGreeting()}
                  </Text>
                  <Text variant="body2" color="rgba(255,255,255,0.75)">
                    What did the night bring you?
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.themeToggle}
                  onPress={() => setThemeType(isDark ? 'light' : 'dark')}
                  accessibilityRole="button"
                  accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  <Ionicons
                    name={isDark ? 'moon' : 'sunny'}
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>

              {!!getTrialDisplayText() && (
                <View style={styles.trialBadge}>
                  <Text variant="caption" color="#FFFFFF">{getTrialDisplayText()}</Text>
                </View>
              )}

              <View style={styles.statsRow}>
                <View style={styles.statChip}>
                  <Ionicons name="journal-outline" size={16} color={Colors.accent[300]} />
                  <Text variant="h5" color="#FFFFFF">{stats.total}</Text>
                  <Text variant="caption" color="rgba(255,255,255,0.7)">dreams</Text>
                </View>
                <View style={styles.statChip}>
                  <Ionicons name="flame-outline" size={16} color={Colors.accent[300]} />
                  <Text variant="h5" color="#FFFFFF">{stats.streak}</Text>
                  <Text variant="caption" color="rgba(255,255,255,0.7)">day streak</Text>
                </View>
                <View style={styles.statChip}>
                  <Ionicons name="moon-outline" size={16} color={Colors.accent[300]} />
                  <Text variant="h5" color="#FFFFFF">{stats.thisWeek}</Text>
                  <Text variant="caption" color="rgba(255,255,255,0.7)">this week</Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.inputSection}>
              <DreamInput
                onSubmit={handleDreamSubmit}
                isLoading={isAnalyzing}
              />
            </View>
          </>
        ) : (
          <DreamAnalysis
            analysis={analysis}
            dreamText={dreamText}
            mood={dreamMood}
            isAnalyzing={isAnalyzing}
            error={analysisError}
            onRetry={handleRetry}
            onSave={handleSaveAnalysis}
            onNewDream={handleNewDream}
          />
        )}
      </ScrollView>

      <SubscriptionPaywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSuccess={handleSubscriptionSuccess}
        trialStatus={trialStatus || undefined}
      />
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
    paddingBottom: 60 + spacing[8], // Extra padding for the tab bar
  },
  hero: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[6],
    borderBottomLeftRadius: BorderRadius['2xl'],
    borderBottomRightRadius: BorderRadius['2xl'],
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heroGreeting: {
    flex: 1,
  },
  heroTitle: {
    marginTop: spacing[1],
    marginBottom: spacing[1],
  },
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  trialBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing[3],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing[3],
    marginTop: spacing[5],
  },
  statChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderRadius: BorderRadius.lg,
    backgroundColor: 'rgba(255,255,255,0.1)',
    gap: 2,
  },
  inputSection: {
    paddingHorizontal: spacing[4],
    marginTop: spacing[5],
  },
});

export default Index;
