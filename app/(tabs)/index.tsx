import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, StatusBar, Image, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DreamInput from '@/components/DreamInput';
import DreamAnalysis from '@/components/DreamAnalysis';
import { analyzeDream } from '@/services/dreamAnalysis';
import { saveDream } from '@/utils/storage';
import { generateId } from '@/utils/helpers';
import { Dream, DreamAnalysis as DreamAnalysisType, Symbol, Archetype } from '@/types';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows } from '@/utils/theme';
import Text from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import Header from '@/components/ui/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trialTrackingService, TrialStatus } from '@/services/trialTracking';
import SubscriptionPaywall from '@/components/ui/SubscriptionPaywall';

const { width } = Dimensions.get('window');

function Index() {
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<DreamAnalysisType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState<'input' | 'analysis'>('input');
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Initialize trial tracking on component mount
  useEffect(() => {
    initializeTrialStatus();
  }, []);

  const initializeTrialStatus = async () => {
    try {
      await trialTrackingService.initialize();
      const status = await trialTrackingService.getTrialStatus();
      setTrialStatus(status);
    } catch (error) {
      console.error('Failed to initialize trial status:', error);
    }
  };

  const handleDreamSubmit = async (text: string) => {
    // Check if user can perform analysis
    const canAnalyze = await trialTrackingService.canPerformAnalysis();
    
    if (!canAnalyze) {
      setShowPaywall(true);
      return;
    }

    setDreamText(text);
    setIsAnalyzing(true);
    setActiveView('analysis');
    
    // Starting dream analysis process
    
    try {
      // Record the analysis attempt
      const newTrialStatus = await trialTrackingService.recordAnalysis();
      setTrialStatus(newTrialStatus);
      // Create a partial analysis object to display while streaming
      const initialAnalysis: DreamAnalysisType = {
        symbols: [],
        archetypes: [],
        interpretation: '',
        timestamp: new Date().toISOString(),
      };
      
      setAnalysis(initialAnalysis);
      
      // Call analyzeDream with a callback for streaming updates
      const dreamAnalysis = await analyzeDream(text, (updatedAnalysis) => {
        // Processing streaming analysis update
        setAnalysis(curr => ({
          ...curr!,
          ...updatedAnalysis
        }));
      });
      
      // Dream analysis completed successfully
      setIsAnalyzing(false);
      
      // Set final analysis
      setAnalysis(dreamAnalysis);
      
    } catch (error) {
      console.error("Error analyzing dream:", error);
      setIsAnalyzing(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (!analysis) return;
    
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
          mood: 'neutral',
          theme: analysis.theme?.primary || 'general',
          secondaryThemes: analysis.theme?.secondary || [],
          themeConfidence: analysis.theme?.confidence || 0
        },
      };
      
      await saveDream(dream);
      router.push('/history');
      
    } catch (error) {
      console.error("Error saving dream:", error);
    }
  };

  const handleNewDream = () => {
    setDreamText('');
    setAnalysis(null);
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
      return '✨ Premium Active';
    }
    
    if (trialStatus.hasTrialExpired) {
      return '⏰ Trial Expired';
    }
    
    if (trialStatus.analysesLeft === 0) {
      return '⏰ No analyses left';
    }
    
    return '🔮 ' + trialStatus.analysesLeft + ' analyses left';
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Header 
        showMoon={true} 
        title={activeView === 'input' ? "New Dream" : "Dream Analysis"}
        rightText={getTrialDisplayText()}
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        {activeView === 'input' ? (
          <DreamInput 
            onSubmit={handleDreamSubmit}
            isLoading={isAnalyzing}
          />
        ) : (
          <DreamAnalysis
            analysis={analysis}
            dreamText={dreamText}
            isAnalyzing={isAnalyzing}
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
    padding: spacing[4],
    paddingBottom: 60 + spacing[6], // Add extra padding for the tab bar
  },
});

export default Index;
