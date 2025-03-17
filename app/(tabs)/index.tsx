import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<DreamAnalysisType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState<'input' | 'analysis'>('input');
  const { isDark } = useTheme();
  const router = useRouter();

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
    <SafeAreaView style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <LinearGradient
        colors={[Colors.primary[700], Colors.primary[600]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text variant="h2" color={Colors.neutral[50]} style={styles.headerTitle}>
              Dream Alchemy
            </Text>
            <Text 
              variant="subtitle1" 
              color={Colors.neutral[100]}
              style={styles.subtitle}
            >
              Jungian Dream Analysis
            </Text>
          </View>
          
          <View style={styles.iconContainer}>
            <View style={styles.moonIcon}>
              <View style={styles.moonInner} />
            </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Shadows.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: Spacing.xs,
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  moonIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.neutral[100],
    shadowColor: Colors.neutral[100],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  moonInner: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[700],
    transform: [{ translateX: 5 }],
  },
  starsContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.neutral[100],
    shadowColor: Colors.neutral[100],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  star1: {
    top: 10,
    right: 10,
  },
  star2: {
    top: 25,
    right: 5,
  },
  star3: {
    top: 40,
    right: 15,
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
