import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import DreamHistory from '../../src/components/DreamHistory';
import DreamAnalysis from '../../src/components/DreamAnalysis';
import { getDreams, deleteDream, clearDreams } from '../../src/utils/storage';
import { Dream } from '../../src/types';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, spacing } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Card from '../../src/components/ui/Card';
import Header from '../../src/components/ui/Header';

const HistoryScreen: React.FC = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null);
  const [activeView, setActiveView] = useState<'history' | 'analysis'>('history');
  const { isDark } = useTheme();
  const router = useRouter();

  // Load saved dreams whenever the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadDreams();
    }, [])
  );

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
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {activeView === 'history' ? (
        <View style={styles.content}>
          <Header title="Dream History" showMoon={true} />
          
          <DreamHistory
            dreams={dreams}
            onSelectDream={handleSelectDream}
            onDeleteDream={handleDeleteDream}
            onClearAllDreams={handleClearAllDreams}
          />
        </View>
      ) : selectedDream?.analysis ? (
        <View style={styles.analysisContent}>
          <Header title="Dream Analysis" />
          
          <DreamAnalysis
            analysis={{
              interpretation: selectedDream.analysis.interpretation,
              symbols: selectedDream.analysis.symbols.map(s => ({
                name: s.symbol,
                meaning: s.meaning,
                frequency: 1
              })),
              archetypes: selectedDream.analysis.archetypes?.map(a => ({
                type: a.type,
                description: a.description,
                significance: a.significance
              })) || [],
              timestamp: selectedDream.timestamp.toString(),
              theme: {
                primary: selectedDream.analysis.theme,
                secondary: selectedDream.analysis.secondaryThemes || [],
                confidence: selectedDream.analysis.themeConfidence || 0
              }
            }}
            dreamText={selectedDream.content}
            isAnalyzing={false}
            onSave={handleBackToHistory}
            onNewDream={handleNewDream}
            isViewingSavedDream={true}
            onBackToHistory={handleBackToHistory}
            onDelete={() => handleDeleteDream(selectedDream.id)}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Header title="Dream History" />
          <Text>No dream selected</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  analysisContent: {
    flex: 1,
  },
});

export default HistoryScreen; 