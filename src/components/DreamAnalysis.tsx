import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { DreamAnalysis as DreamAnalysisType, Symbol, Archetype } from '../types';
import { formatDate } from '../utils/helpers';

interface DreamAnalysisProps {
  analysis: DreamAnalysisType | null;
  dreamText: string;
  isAnalyzing: boolean;
  onSave: () => void;
  onNewDream: () => void;
}

const DreamAnalysis: React.FC<DreamAnalysisProps> = ({
  analysis,
  dreamText,
  isAnalyzing,
  onSave,
  onNewDream
}) => {
  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSave();
  };

  const handleNewDream = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onNewDream();
  };

  if (isAnalyzing && (!analysis || !analysis.interpretation)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text style={styles.loadingText}>Analyzing your dream...</Text>
        <Text style={styles.loadingSubtext}>
          Our AI is interpreting your dream using Jungian psychology principles.
        </Text>
      </View>
    );
  }

  if (!analysis) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No analysis available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timestamp}>
          {formatDate(analysis.timestamp)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Ionicons name="bookmark-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.newButton]}
            onPress={handleNewDream}
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text style={styles.buttonText}>New Dream</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dreamTextContainer}>
        <Text style={styles.sectionTitle}>Your Dream</Text>
        <Text style={styles.dreamText}>{dreamText}</Text>
      </View>

      <View style={styles.interpretationContainer}>
        <Text style={styles.sectionTitle}>Interpretation</Text>
        <Text style={styles.interpretationText}>
          {analysis.interpretation || 'Generating interpretation...'}
        </Text>
      </View>

      <View style={styles.symbolsContainer}>
        <Text style={styles.sectionTitle}>Symbols</Text>
        {analysis.symbols.length > 0 ? (
          analysis.symbols.map((symbol: Symbol, index: number) => (
            <View key={index} style={styles.symbolItem}>
              <View style={styles.symbolHeader}>
                <Text style={styles.symbolName}>{symbol.name}</Text>
                <View style={styles.frequencyBadge}>
                  <Text style={styles.frequencyText}>
                    {symbol.frequency}×
                  </Text>
                </View>
              </View>
              <Text style={styles.symbolMeaning}>{symbol.meaning}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyListText}>
            {isAnalyzing ? 'Identifying symbols...' : 'No symbols identified'}
          </Text>
        )}
      </View>

      <View style={styles.archetypesContainer}>
        <Text style={styles.sectionTitle}>Archetypes</Text>
        {analysis.archetypes.length > 0 ? (
          analysis.archetypes.map((archetype: Archetype, index: number) => (
            <View key={index} style={styles.archetypeItem}>
              <Text style={styles.archetypeName}>{archetype.type}</Text>
              <Text style={styles.archetypeDescription}>
                {archetype.description}
              </Text>
              <Text style={styles.archetypeSignificance}>
                <Text style={styles.significanceLabel}>Significance: </Text>
                {archetype.significance}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyListText}>
            {isAnalyzing ? 'Identifying archetypes...' : 'No archetypes identified'}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    color: '#4b5563'
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: '80%'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280'
  },
  header: {
    marginBottom: 20
  },
  timestamp: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41
  },
  saveButton: {
    backgroundColor: '#8b5cf6',
    flex: 1,
    marginRight: 8
  },
  newButton: {
    backgroundColor: '#6366f1',
    flex: 1
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8
  },
  dreamTextContainer: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#4b5563'
  },
  dreamText: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24
  },
  interpretationContainer: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#60a5fa'
  },
  interpretationText: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24
  },
  symbolsContainer: {
    marginBottom: 20
  },
  symbolItem: {
    backgroundColor: '#faf5ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#c084fc'
  },
  symbolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  symbolName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4b5563'
  },
  frequencyBadge: {
    backgroundColor: '#c084fc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  frequencyText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12
  },
  symbolMeaning: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20
  },
  archetypesContainer: {
    marginBottom: 20
  },
  archetypeItem: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#34d399'
  },
  archetypeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4b5563',
    marginBottom: 8
  },
  archetypeDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 8
  },
  archetypeSignificance: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20
  },
  significanceLabel: {
    fontWeight: '600'
  },
  emptyListText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16
  }
});

export default DreamAnalysis; 