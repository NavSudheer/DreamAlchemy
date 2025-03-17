import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import DreamHistory from '../../src/components/DreamHistory';
import DreamAnalysis from '../../src/components/DreamAnalysis';
import { getDreams, deleteDream, clearDreams } from '../../src/utils/storage';
import { Dream } from '../../src/types';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, Spacing } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Card from '../../src/components/ui/Card';

export default function HistoryScreen() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null);
  const [activeView, setActiveView] = useState<'history' | 'analysis'>('history');
  const { isDark } = useTheme();
  const router = useRouter();

  // Load saved dreams from AsyncStorage on component mount
  useEffect(() => {
    loadDreams();
  }, []);

  const loadDreams = async () => {
    const loadedDreams = await getDreams();
    setDreams(loadedDreams);
  };

  const handleSelectDream = (dream: Dream) => {
    setSelectedDream(dream);
    setActiveView('analysis');
  };

  const handleDeleteDream = async (dreamId: string) => {
    await deleteDream(dreamId);
    await loadDreams();
    
    // If the deleted dream is currently selected, go back to history view
    if (selectedDream && selectedDream.id === dreamId) {
      handleBackToHistory();
    }
  };

  const handleClearAllDreams = async () => {
    await clearDreams();
    setDreams([]);
    handleBackToHistory();
  };

  const handleBackToHistory = () => {
    setSelectedDream(null);
    setActiveView('history');
  };

  const handleNewDream = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {activeView === 'history' ? (
        <View style={styles.content}>
          <Card 
            variant="elevated" 
            style={styles.header}
            backgroundColor={isDark ? Colors.primary[800] : Colors.primary[50]}
          >
            <Text variant="h2" color={isDark ? Colors.neutral[50] : Colors.primary[800]}>
              Dream History
            </Text>
            <Text 
              variant="subtitle1" 
              color={isDark ? Colors.neutral[300] : Colors.primary[600]}
              style={styles.subtitle}
            >
              Your Recorded Dreams
            </Text>
          </Card>
          
          <DreamHistory
            dreams={dreams}
            onSelectDream={handleSelectDream}
            onDeleteDream={handleDeleteDream}
            onClearAllDreams={handleClearAllDreams}
          />
        </View>
      ) : (
        <DreamAnalysis
          analysis={selectedDream?.analysis || null}
          dreamText={selectedDream?.content || ''}
          isAnalyzing={false}
          onSave={() => handleBackToHistory()}
          onNewDream={handleNewDream}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: Spacing.xs,
  },
}); 