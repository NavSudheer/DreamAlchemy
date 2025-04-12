import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DreamInput from '../../src/components/DreamInput';
import DreamAnalysis from '../../src/components/DreamAnalysis';
import { analyzeDream } from '../../src/services/dreamAnalysis';
import { saveDream } from '../../src/utils/storage';
import { generateId } from '../../src/utils/helpers';
import { Dream, DreamAnalysis as DreamAnalysisType, Symbol, Archetype } from '../../src/types';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Card from '../../src/components/ui/Card';
import Header from '../../src/components/ui/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

function Index() {
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<DreamAnalysisType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState<'input' | 'analysis'>('input');
  const { isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleDreamSubmit = async (text: string) => {
    setDreamText(text);
    setIsAnalyzing(true);
    setActiveView('analysis');
    
    console.log("Starting dream analysis...");
    
    try {
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
        console.log("Received streaming update");
        setAnalysis(curr => ({
          ...curr!,
          ...updatedAnalysis
        }));
      });
      
      console.log("Analysis complete");
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
          mood: 'neutral', // Default value
          theme: 'general', // Default value
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

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Header showMoon={true} title={activeView === 'input' ? "New Dream" : "Dream Analysis"} />
      
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
