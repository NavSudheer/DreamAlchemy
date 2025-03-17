import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Dream } from '../types';
import { formatDate, truncateText } from '../utils/helpers';
import { useTheme } from '../providers/ThemeProvider';
import { Colors, Spacing, BorderRadius, Shadows } from '../utils/theme';
import Text from './ui/Text';
import Button from './ui/Button';
import Card from './ui/Card';

interface DreamHistoryProps {
  dreams: Dream[];
  onSelectDream: (dream: Dream) => void;
  onDeleteDream: (dreamId: string) => void;
  onClearAllDreams: () => void;
}

const DreamHistory: React.FC<DreamHistoryProps> = ({
  dreams,
  onSelectDream,
  onDeleteDream,
  onClearAllDreams
}) => {
  const [expandedDreamId, setExpandedDreamId] = useState<string | null>(null);
  const { isDark } = useTheme();

  const handleSelectDream = (dream: Dream) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectDream(dream);
  };

  const handleDeleteDream = (dreamId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      'Delete Dream',
      'Are you sure you want to delete this dream?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => onDeleteDream(dreamId),
          style: 'destructive'
        }
      ]
    );
  };

  const handleClearAllDreams = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    Alert.alert(
      'Clear All Dreams',
      'Are you sure you want to delete all dreams? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          onPress: onClearAllDreams,
          style: 'destructive'
        }
      ]
    );
  };

  const toggleExpandDream = (dreamId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpandedDreamId(expandedDreamId === dreamId ? null : dreamId);
  };

  const renderDreamItem = ({ item }: { item: Dream }) => {
    const isExpanded = expandedDreamId === item.id;
    
    return (
      <Card 
        variant={isExpanded ? "elevated" : "outlined"} 
        style={styles.dreamItem}
        backgroundColor={isDark ? Colors.neutral[800] : Colors.neutral[50]}
      >
        <TouchableOpacity
          style={styles.dreamHeader}
          onPress={() => toggleExpandDream(item.id)}
        >
          <View style={styles.dreamHeaderContent}>
            <Text variant="caption" color={isDark ? Colors.neutral[400] : Colors.neutral[500]}>
              {formatDate(item.timestamp)}
            </Text>
            <Text variant="body1" color={isDark ? Colors.neutral[200] : Colors.neutral[700]}>
              {truncateText(item.content, 60)}
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.dreamExpandedContent}>
            <Text variant="body2" color={isDark ? Colors.neutral[300] : Colors.neutral[600]}>
              {item.content}
            </Text>
            
            {item.analysis && (
              <Card 
                variant="filled" 
                style={styles.analysisPreview}
                backgroundColor={isDark ? Colors.primary[900] : Colors.primary[50]}
              >
                <Text 
                  variant="subtitle2" 
                  color={isDark ? Colors.primary[300] : Colors.primary[700]}
                  style={styles.analysisPreviewTitle}
                >
                  Analysis Preview
                </Text>
                <Text 
                  variant="body2" 
                  color={isDark ? Colors.neutral[300] : Colors.neutral[700]}
                >
                  {truncateText(item.analysis.interpretation, 120)}
                </Text>
              </Card>
            )}
            
            <View style={styles.actionButtons}>
              <Button
                variant="primary"
                size="sm"
                onPress={() => handleSelectDream(item)}
                style={styles.viewButton}
                hapticFeedback
              >
                View Full Analysis
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onPress={() => handleDeleteDream(item.id)}
                style={styles.deleteButton}
                hapticFeedback
              >
                Delete
              </Button>
            </View>
          </View>
        )}
      </Card>
    );
  };

  if (dreams.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons 
          name="moon-outline" 
          size={48} 
          color={isDark ? Colors.neutral[600] : Colors.neutral[300]} 
        />
        <Text 
          variant="h3" 
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          style={styles.emptyTitle}
        >
          No Dreams Saved
        </Text>
        <Text 
          variant="body1" 
          color={isDark ? Colors.neutral[500] : Colors.neutral[600]}
          style={styles.emptyText}
        >
          Your saved dreams and their analyses will appear here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.clearButtonContainer}>
        {dreams.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onPress={handleClearAllDreams}
            style={styles.clearButton}
            hapticFeedback
          >
            Clear All Dreams
          </Button>
        )}
      </View>
      
      <FlatList
        data={dreams}
        renderItem={renderDreamItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clearButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.md,
  },
  clearButton: {
    alignSelf: 'flex-end',
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  dreamItem: {
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  dreamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  dreamHeaderContent: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  dreamExpandedContent: {
    padding: Spacing.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  analysisPreview: {
    padding: Spacing.sm,
    marginVertical: Spacing.md,
  },
  analysisPreviewTitle: {
    marginBottom: Spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  viewButton: {
    flex: 2,
    marginRight: Spacing.sm,
  },
  deleteButton: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default DreamHistory; 