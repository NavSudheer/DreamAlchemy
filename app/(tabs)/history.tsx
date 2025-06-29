import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import DreamHistory from '@/components/DreamHistory';
import DreamAnalysis from '@/components/DreamAnalysis';
import { getDreams, deleteDream, clearDreams } from '@/utils/storage';
import { Dream } from '@/types';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors, spacing } from '@/utils/theme';
import Text from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import Header from '@/components/ui/Header';

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
      ) : selectedDream && selectedDream.analysis ? (
        <View style={styles.analysisContent}>
          <Header title="Dream Analysis" />
          
          <DreamAnalysis
            analysis={{
              interpretation: String(selectedDream.analysis.interpretation || ''),
              symbols: (selectedDream.analysis.symbols || []).map(s => ({
                name: String(s.symbol || 'Unknown Symbol'),
                meaning: String(s.meaning || 'No meaning available'),
                frequency: 1
              })).filter(s => s.name && s.meaning),
              archetypes: (selectedDream.analysis.archetypes || []).map(a => ({
                type: String(a.type || 'Unknown Type'),
                description: String(a.description || 'No description available'),
                significance: String(a.significance || 'No significance provided')
              })).filter(a => a.type && a.description && a.significance),
              timestamp: String(selectedDream.timestamp || Date.now()),
              theme: {
                primary: String(selectedDream.analysis.theme || 'General'),
                secondary: (selectedDream.analysis.secondaryThemes || []).map(t => String(t || '')).filter(Boolean),
                confidence: Number(selectedDream.analysis.themeConfidence || 0)
              }
            }}
            dreamText={String(selectedDream.content || '')}
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