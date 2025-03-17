import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DreamInput from '../../src/components/DreamInput';
import DreamAnalysis from '../../src/components/DreamAnalysis';
import { analyzeDream } from '../../src/services/dreamAnalysis';
import { saveDream } from '../../src/utils/storage';
import { generateId } from '../../src/utils/helpers';
import { Dream, DreamAnalysis as DreamAnalysisType } from '../../src/types';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, Spacing, BorderRadius, Shadows } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Card from '../../src/components/ui/Card';
import { Edge } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
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
        timestamp: new Date(),
      };
      
      setAnalysis(initialAnalysis);
      
      // Call analyzeDream with a callback for streaming updates
      const dreamAnalysis = await analyzeDream(text, (updatedAnalysis) => {
        console.log("Received streaming update");
        
        // Update the analysis state with each streaming update
        setAnalysis(prevAnalysis => {
          if (!prevAnalysis) return updatedAnalysis as DreamAnalysisType;
          
          const newAnalysis = {
            ...prevAnalysis,
            interpretation: updatedAnalysis.interpretation || prevAnalysis.interpretation,
            symbols: updatedAnalysis.symbols?.length ? updatedAnalysis.symbols : prevAnalysis.symbols,
            archetypes: updatedAnalysis.archetypes?.length ? updatedAnalysis.archetypes : prevAnalysis.archetypes,
            timestamp: prevAnalysis.timestamp,
          };
          
          return newAnalysis;
        });
      });
      
      // Update with the complete analysis
      console.log("Analysis complete, setting final result");
      setAnalysis(dreamAnalysis);
    } catch (error) {
      console.error('Error analyzing dream:', error);
    } finally {
      console.log("Setting isAnalyzing to false");
      setIsAnalyzing(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (dreamText && analysis) {
      const dream: Dream = {
        id: generateId(),
        content: dreamText,
        timestamp: new Date(),
        analysis: analysis,
      };
      
      await saveDream(dream);
      router.push('/(tabs)/history');
    }
  };

  const handleNewDream = () => {
    setDreamText('');
    setAnalysis(null);
    setActiveView('input');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary[600], Colors.primary[700]]}
        style={styles.header}
      >
        <View style={[styles.headerContent, { paddingTop: insets.top }]}>
          <View style={styles.headerIconContainer}>
            <Ionicons 
              name="moon" 
              size={32} 
              color="#fff" 
              style={styles.headerIcon}
            />
            <View style={styles.starsContainer}>
              <View style={[styles.star, styles.star1]} />
              <View style={[styles.star, styles.star2]} />
              <View style={[styles.star, styles.star3]} />
            </View>
          </View>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: Colors.neutral[900],
  },
  header: {
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 30,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerIcon: {
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  star1: {
    top: 8,
    right: 8,
  },
  star2: {
    top: 20,
    right: 4,
  },
  star3: {
    top: 32,
    right: 12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
});
