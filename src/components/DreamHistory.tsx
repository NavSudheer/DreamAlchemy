import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  AccessibilityInfo,
  ViewStyle,
  TextStyle,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { 
  FadeIn, 
  FadeOut, 
  Layout,
  withSpring,
  WithSpringConfig
} from 'react-native-reanimated';
import { Dream } from '../types';
import { formatDate, truncateText } from '../utils/helpers';
import { useTheme } from '../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, typography, Shadows } from '../utils/theme';
import Text from './ui/Text';
import Button from './ui/Button';
import Card from './ui/Card';
import { EmptyState } from './ui/EmptyState';
import AlertDialog from './ui/AlertDialog';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = spacing[4];
const CARD_WIDTH = SCREEN_WIDTH - (CARD_MARGIN * 2);

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 1,
  stiffness: 200
};

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
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [clearAllAlertVisible, setClearAllAlertVisible] = useState(false);
  const [selectedDreamId, setSelectedDreamId] = useState<string | null>(null);
  const { isDark } = useTheme();
  const router = useRouter();

  const handleSelectDream = (dream: Dream) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectDream(dream);
    AccessibilityInfo.announceForAccessibility('Opening dream analysis');
  };

  const handleDeleteDream = (dreamId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedDreamId(dreamId);
    setDeleteAlertVisible(true);
    console.log('Delete alert should be visible now');
  };

  const confirmDeleteDream = () => {
    if (selectedDreamId) {
      onDeleteDream(selectedDreamId);
      AccessibilityInfo.announceForAccessibility('Dream deleted');
    }
    setDeleteAlertVisible(false);
  };

  const cancelDeleteDream = () => {
    setDeleteAlertVisible(false);
  };

  const handleClearAllDreams = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setClearAllAlertVisible(true);
    console.log('Clear all alert should be visible now');
  };

  const confirmClearAllDreams = () => {
    onClearAllDreams();
    AccessibilityInfo.announceForAccessibility('All dreams cleared');
    setClearAllAlertVisible(false);
  };

  const cancelClearAllDreams = () => {
    setClearAllAlertVisible(false);
  };

  const toggleExpandDream = (dreamId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpandedDreamId(expandedDreamId === dreamId ? null : dreamId);
    AccessibilityInfo.announceForAccessibility(
      expandedDreamId === dreamId ? 'Dream collapsed' : 'Dream expanded'
    );
  };

  const renderDreamItem = ({ item, index }: { item: Dream; index: number }) => {
    const isExpanded = expandedDreamId === item.id;
    
    return (
      <Animated.View
        entering={FadeIn.delay(index * 100)}
        layout={Layout.springify().mass(1).damping(15).stiffness(200)}
        style={styles.dreamItemContainer}
      >
        <Card 
          variant={isExpanded ? "elevated" : "outlined"} 
          style={styles.dreamItem}
          backgroundColor={isDark ? Colors.neutral[800] : Colors.neutral[50]}
        >
          <TouchableOpacity
            style={styles.dreamHeader}
            onPress={() => toggleExpandDream(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Dream from ${formatDate(new Date(item.timestamp))}`}
            accessibilityHint="Double tap to expand or collapse dream details"
          >
            <View style={styles.dreamHeaderContent}>
              <Text 
                variant="subtitle2" 
                color={isDark ? Colors.primary[300] : Colors.primary[600]}
                style={styles.dateText}
              >
                {formatDate(new Date(item.timestamp))}
              </Text>
              <Text 
                variant="body1" 
                color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
                style={styles.previewText}
              >
                {truncateText(item.content, isExpanded ? 120 : 60)}
              </Text>
            </View>
            <Animated.View>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={isDark ? Colors.primary[400] : Colors.primary[500]}
              />
            </Animated.View>
          </TouchableOpacity>
          
          {isExpanded && (
            <Animated.View 
              entering={FadeIn.springify()}
              exiting={FadeOut.springify()}
              style={styles.dreamExpandedContent}
            >
              <Text 
                variant="body2" 
                color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                style={styles.fullContent}
              >
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
                    style={styles.analysisPreviewText}
                  >
                    {truncateText(item.analysis.interpretation, 120)}
                  </Text>
                </Card>
              )}
              
              <View style={styles.actionButtons}>
                <Button
                  variant="primary"
                  size="md"
                  onPress={() => handleSelectDream(item)}
                  style={styles.viewButton}
                  hapticFeedback
                >
                  View Full Analysis
                </Button>
                
                <Button
                  variant="outline"
                  size="md"
                  onPress={() => handleDeleteDream(item.id)}
                  style={styles.deleteButton}
                  hapticFeedback
                >
                  Delete
                </Button>
              </View>
            </Animated.View>
          )}
        </Card>
      </Animated.View>
    );
  };

  if (dreams.length === 0) {
    return (
      <ScrollView 
        contentContainerStyle={[
          styles.emptyStateScrollContent,
          { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
        ]}
        showsVerticalScrollIndicator={true}
      >
        <EmptyState
          icon="moon-outline"
          title="Begin Your Dream Journey"
          description="Transform your dreams into meaningful insights with our guided dream journaling experience."
          steps={[
            "Record your dreams as soon as you wake up for best recall",
            "Add emotions, symbols, and themes to enrich your entries",
            "Get AI-powered analysis to uncover patterns and meanings",
            "Track your dream patterns over time for deeper insights"
          ]}
          actionLabel="Record Your First Dream"
          onAction={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            AccessibilityInfo.announceForAccessibility('Navigating to record your first dream');
            router.push('/');
          }}
        />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dreams}
        renderItem={renderDreamItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={
          dreams.length > 0 ? (
            <View style={styles.header}>
              <Text 
                variant="h2" 
                color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
                style={styles.headerTitle}
              >
                Dream History
              </Text>
              <Button
                variant="outline"
                size="sm"
                onPress={handleClearAllDreams}
                style={styles.clearButton}
                hapticFeedback
              >
                Clear All
              </Button>
            </View>
          ) : null
        }
      />

      <AlertDialog
        visible={deleteAlertVisible}
        title="Delete Dream"
        message="Are you sure you want to delete this dream? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteDream}
        onCancel={cancelDeleteDream}
        destructive={true}
      />

      <AlertDialog
        visible={clearAllAlertVisible}
        title="Clear All Dreams"
        message="Are you sure you want to delete all dreams? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        onConfirm={confirmClearAllDreams}
        onCancel={cancelClearAllDreams}
        destructive={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    marginBottom: spacing[2],
  } as ViewStyle,
  headerTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
  } as TextStyle,
  clearButton: {
    minWidth: 100,
  } as ViewStyle,
  listContent: {
    paddingBottom: spacing[20],
  } as ViewStyle,
  dreamItemContainer: {
    width: CARD_WIDTH,
    alignSelf: 'center',
    marginBottom: spacing[4],
  } as ViewStyle,
  dreamItem: {
    width: '100%',
  } as ViewStyle,
  dreamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    minHeight: 80,
  } as ViewStyle,
  dreamHeaderContent: {
    flex: 1,
    marginRight: spacing[4],
  } as ViewStyle,
  dateText: {
    marginBottom: spacing[1],
  } as TextStyle,
  previewText: {
    lineHeight: 20,
  } as TextStyle,
  dreamExpandedContent: {
    padding: spacing[4],
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  } as ViewStyle,
  fullContent: {
    marginBottom: spacing[4],
    lineHeight: 24,
  } as TextStyle,
  analysisPreview: {
    padding: spacing[4],
    marginBottom: spacing[4],
    borderRadius: BorderRadius.md,
  } as ViewStyle,
  analysisPreviewTitle: {
    marginBottom: spacing[1],
  } as TextStyle,
  analysisPreviewText: {
    lineHeight: 20,
  } as TextStyle,
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing[2],
  } as ViewStyle,
  viewButton: {
    flex: 1,
  } as ViewStyle,
  deleteButton: {
    flex: 1,
  } as ViewStyle,
  emptyStateScrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Extra padding to ensure content isn't hidden by tab bar
  } as ViewStyle,
});

export default DreamHistory; 