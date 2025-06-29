import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { DreamAnalysis as DreamAnalysisType, Symbol, Archetype, DREAM_THEMES } from '../types';
import { formatDate } from '../utils/helpers';
import { useTheme } from '../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows, typography } from '../utils/theme';
import Text from './ui/Text';
import Card from './ui/Card';
import AlertDialog from './ui/AlertDialog';
import Button from './ui/Button';

interface DreamAnalysisProps {
  analysis: DreamAnalysisType | null;
  dreamText: string;
  isAnalyzing: boolean;
  onSave: () => void;
  onNewDream: () => void;
  isViewingSavedDream?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onBackToHistory?: () => void;
}

const DreamAnalysis: React.FC<DreamAnalysisProps> = ({
  analysis,
  dreamText,
  isAnalyzing,
  onSave,
  onNewDream,
  isViewingSavedDream = false,
  onEdit,
  onDelete,
  onBackToHistory
}) => {
  const { isDark } = useTheme();
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  
  // Define static styles
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing[4],
      paddingTop: spacing[2],
      paddingBottom: spacing[24], // Increased bottom padding for better scrolling with tab bar
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 250,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing[2],
      marginBottom: spacing[4],
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[3],
    },
    backText: {
      marginLeft: spacing[1],
    },
    dateText: {
      marginBottom: spacing[3],
      opacity: 0.8,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing[3],
      marginVertical: spacing[4],
    },
    actionButton: {
      flex: 1,
    },
    section: {
      marginBottom: spacing[6],
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[3],
    },
    sectionIcon: {
      marginRight: spacing[2],
    },
    dreamCardBase: {
      borderRadius: BorderRadius.lg,
      padding: spacing[4],
      marginBottom: spacing[4],
      borderLeftWidth: 4,
    },
    dreamText: {
      marginBottom: spacing[2],
      paddingLeft: spacing[2],
    },
    symbolItemBase: {
      borderRadius: BorderRadius.lg,
      padding: spacing[4],
      marginBottom: spacing[3],
      borderLeftWidth: 3,
      borderLeftColor: Colors.secondary[500],
    },
    symbolHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing[1],
    },
    symbolName: {
      fontWeight: 'bold',
      flex: 1,
    },
    frequencyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(56, 178, 172, 0.1)',
      borderRadius: BorderRadius.pill,
      paddingHorizontal: spacing[2],
      paddingVertical: 4,
    },
    frequencyText: {
      marginLeft: 4,
    },
    meaning: {
      lineHeight: 20,
    },
    emptyStateContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing[6],
    },
    emptyStateIcon: {
      marginBottom: spacing[4],
      opacity: 0.7,
    },
    emptyStateText: {
      textAlign: 'center',
      marginBottom: spacing[2],
    },
    symbolsContainer: {
      width: '100%',
    },
    archetypesContainer: {
      width: '100%',
    },
    archetypeItemBase: {
      padding: spacing[4],
      borderRadius: BorderRadius.lg,
      marginBottom: spacing[3],
      borderLeftWidth: 3,
    },
    archetypeName: {
      fontWeight: 'bold',
      marginBottom: spacing[1],
    },
    archetypeDescription: {
      marginBottom: spacing[2],
      lineHeight: 20,
    },
    archetypeSignificance: {
      lineHeight: 20,
    },
    significanceLabel: {
      fontWeight: 'bold',
    },
    emptyListText: {
      textAlign: 'center',
      paddingVertical: spacing[3],
    },
    interpretationContainerBase: {
      borderRadius: BorderRadius.lg,
      padding: spacing[4],
      marginBottom: spacing[6],
      borderLeftWidth: 3,
    },
    interpretationText: {
      lineHeight: 22,
    },
    themeContainerBase: {
      borderRadius: BorderRadius.lg,
      padding: spacing[4],
      marginBottom: spacing[6],
      borderLeftWidth: 3,
    },
    themeItem: {
      marginBottom: spacing[3],
    },
    themeName: {
      marginBottom: spacing[1],
    },
    themeValue: {
      paddingLeft: spacing[2],
    },
    confidenceContainer: {
      marginTop: spacing[2],
      alignItems: 'flex-end',
    },
  });

  // Dynamic styles based on theme
  const dreamCardStyle = [
    styles.dreamCardBase,
    {
      backgroundColor: isDark ? 'rgba(26, 32, 44, 0.5)' : 'rgba(247, 250, 252, 0.5)',
      borderLeftColor: isDark ? Colors.accent[400] : Colors.accent[500],
    }
  ];

  const symbolItemStyle = [
    styles.symbolItemBase,
    {
      backgroundColor: isDark ? 'rgba(45, 55, 72, 0.3)' : 'rgba(247, 250, 252, 0.5)',
    }
  ];

  const archetypeItemStyle = [
    styles.archetypeItemBase,
    {
      backgroundColor: isDark ? 'rgba(45, 55, 72, 0.3)' : 'rgba(247, 250, 252, 0.5)',
      borderLeftColor: isDark ? Colors.accent[500] : Colors.accent[500],
    }
  ];

  const interpretationContainerStyle = [
    styles.interpretationContainerBase,
    {
      backgroundColor: isDark ? 'rgba(45, 55, 72, 0.3)' : 'rgba(247, 250, 252, 0.5)',
      borderLeftColor: isDark ? Colors.primary[500] : Colors.primary[500],
    }
  ];

  const themeContainerStyle = [
    styles.themeContainerBase,
    {
      backgroundColor: isDark ? 'rgba(45, 55, 72, 0.3)' : 'rgba(247, 250, 252, 0.5)',
      borderLeftColor: isDark ? Colors.accent[500] : Colors.accent[500],
    }
  ];

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSave();
  };

  const handleNewDream = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onNewDream();
  };

  const handleEdit = () => {
    if (onEdit) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onEdit();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setDeleteAlertVisible(true);
      // Showing delete confirmation dialog
    }
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setDeleteAlertVisible(false);
  };

  const cancelDelete = () => {
    setDeleteAlertVisible(false);
  };

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (!analysis) return;
    
    try {
      const shareMessage = `Dream: ${dreamText}\n\nInterpretation: ${analysis.interpretation}`;
      await Share.share({
        message: shareMessage,
        title: 'My Dream Analysis'
      });
    } catch (error) {
      console.error('Error sharing dream:', error);
    }
  };

  const handleBackToHistory = () => {
    if (onBackToHistory) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onBackToHistory();
    }
  };

  if (isAnalyzing && (!analysis || !analysis.interpretation)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? Colors.primary[400] : Colors.primary[500]} />
        <Text variant="body1" color={isDark ? Colors.neutral[300] : Colors.neutral[600]} style={{ marginTop: spacing[4] }}>
          Analyzing your dream...
        </Text>
      </View>
    );
  }

  if (!analysis) {
    return (
      <View style={styles.emptyStateContainer}>
        <Ionicons
          name="moon-outline"
          size={64}
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          style={styles.emptyStateIcon}
        />
        <Text
          variant="h3"
          color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
          style={styles.emptyStateText}
        >
          No Analysis Yet
        </Text>
        <Text
          variant="body1"
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          style={styles.emptyStateText}
        >
          Enter your dream details to receive an analysis
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
      alwaysBounceVertical={true}
      bounces={true}
      overScrollMode="always"
    >
      <View style={styles.header}>
        {onBackToHistory && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToHistory}
            accessibilityRole="button"
            accessibilityLabel="Back to dream history"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
            />
            <Text
              variant="body1"
              color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
              style={styles.backText}
            >
              Back to Dream History
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {isAnalyzing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={isDark ? Colors.primary[400] : Colors.primary[500]} 
          />
          <Text
            variant="body1"
            color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
            style={{ marginTop: spacing[4] }}
          >
            Analyzing your dream...
          </Text>
        </View>
      ) : analysis ? (
        <>
          <Text
            variant="caption"
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
            style={styles.dateText}
          >
            {formatDate(new Date(analysis.timestamp))}
          </Text>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons 
                name="create-outline" 
                size={24} 
                color={isDark ? Colors.accent[400] : Colors.accent[500]} 
                style={styles.sectionIcon}
              />
              <Text 
                variant="h3" 
                color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
              >
                Your Dream
              </Text>
            </View>
            <View style={dreamCardStyle}>
              <Text 
                variant="dreamText" 
                color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                style={styles.dreamText}
              >
                {dreamText}
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons 
                name="bulb-outline" 
                size={24} 
                color={isDark ? Colors.primary[400] : Colors.primary[500]} 
                style={styles.sectionIcon}
              />
              <Text 
                variant="h3" 
                color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
              >
                Interpretation
              </Text>
            </View>
            <View style={interpretationContainerStyle}>
              <Text 
                variant="body1" 
                color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                style={styles.interpretationText}
              >
                {analysis.interpretation || 'No interpretation available'}
              </Text>
            </View>
          </View>
          
          {analysis.theme && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons 
                  name="pricetag-outline" 
                  size={24} 
                  color={isDark ? Colors.accent[400] : Colors.accent[500]} 
                  style={styles.sectionIcon}
                />
                <Text 
                  variant="h3" 
                  color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
                >
                  Dream Themes
                </Text>
              </View>
              <View style={themeContainerStyle}>
                <View style={styles.themeItem}>
                  <Text 
                    variant="subtitle1" 
                    color={isDark ? Colors.accent[300] : Colors.accent[600]}
                    style={styles.themeName}
                  >
                    Primary Theme:
                  </Text>
                  <Text 
                    variant="body1" 
                    color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                    style={styles.themeValue}
                  >
                    {analysis.theme.primary || 'General'}
                  </Text>
                </View>
                
                {analysis.theme.secondary && analysis.theme.secondary.length > 0 && (
                  <View style={styles.themeItem}>
                    <Text 
                      variant="subtitle1" 
                      color={isDark ? Colors.accent[300] : Colors.accent[600]}
                      style={styles.themeName}
                    >
                      Secondary Themes:
                    </Text>
                    {analysis.theme.secondary.map((theme, index) => (
                      <Text 
                        key={index}
                        variant="body1" 
                        color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                        style={styles.themeValue}
                      >
                        {theme || 'Theme'}
                      </Text>
                    ))}
                  </View>
                )}
                
                {(analysis.theme.confidence !== undefined && analysis.theme.confidence !== null) && (
                  <View style={styles.confidenceContainer}>
                    <Text 
                      variant="caption" 
                      color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                    >
                      Theme Confidence: {Math.round((analysis.theme.confidence || 0) * 100)}%
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons 
                name="key-outline" 
                size={24} 
                color={isDark ? Colors.secondary[400] : Colors.secondary[500]} 
                style={styles.sectionIcon}
              />
              <Text 
                variant="h3" 
                color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
              >
                Symbols
              </Text>
            </View>
            <View style={styles.symbolsContainer}>
              {analysis.symbols.length > 0 ? (
                analysis.symbols.map((symbol: Symbol, index: number) => (
                  <View key={index} style={symbolItemStyle}>
                    <View style={styles.symbolHeader}>
                      <Text 
                        variant="subtitle1" 
                        color={isDark ? Colors.secondary[300] : Colors.secondary[600]}
                        style={styles.symbolName}
                      >
                        {symbol.name}
                      </Text>
                      {symbol.frequency && symbol.frequency > 1 && (
                        <View style={styles.frequencyContainer}>
                          <Ionicons 
                            name="repeat" 
                            size={14} 
                            color={isDark ? Colors.secondary[300] : Colors.secondary[600]} 
                          />
                          <Text 
                            variant="caption"
                            color={isDark ? Colors.secondary[300] : Colors.secondary[600]}
                            style={styles.frequencyText}
                          >
                            {symbol.frequency || 1}x
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text 
                      variant="body2" 
                      color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                      style={styles.meaning}
                    >
                      {symbol.meaning}
                    </Text>
                  </View>
                ))
              ) : (
                <Text 
                  variant="body2" 
                  color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                  style={styles.emptyListText}
                >
                  No symbols identified in this dream.
                </Text>
              )}
            </View>
          </View>
          
          {analysis.archetypes && analysis.archetypes.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons 
                  name="people-outline" 
                  size={24} 
                  color={isDark ? Colors.accent[400] : Colors.accent[500]} 
                  style={styles.sectionIcon}
                />
                <Text 
                  variant="h3" 
                  color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
                >
                  Archetypes
                </Text>
              </View>
              <View style={styles.archetypesContainer}>
                {analysis.archetypes.map((archetype: Archetype, index: number) => (
                  <View key={index} style={archetypeItemStyle}>
                    <Text 
                      variant="subtitle1" 
                      color={isDark ? Colors.accent[300] : Colors.accent[600]}
                      style={styles.archetypeName}
                    >
                      {archetype.type}
                    </Text>
                    <Text 
                      variant="body2" 
                      color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                      style={styles.archetypeDescription}
                    >
                      {archetype.description}
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      <Text 
                        variant="body2" 
                        color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
                        style={styles.significanceLabel}
                      >
                        Significance: 
                      </Text>
                      <Text 
                        variant="body2" 
                        color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                        style={styles.archetypeSignificance}
                      >
                        {archetype.significance}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          <View style={styles.actions}>
            {isViewingSavedDream ? (
              <>
                <Button
                  variant="outline"
                  size="md"
                  leftIcon="share-outline"
                  onPress={handleShare}
                  style={styles.actionButton}
                  hapticFeedback
                >
                  Share
                </Button>
                
                <Button
                  variant="error"
                  size="md"
                  leftIcon="trash-outline"
                  onPress={handleDelete}
                  style={styles.actionButton}
                  hapticFeedback
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon="refresh-outline"
                  onPress={handleNewDream}
                  style={styles.actionButton}
                  hapticFeedback
                >
                  New Dream
                </Button>
                
                <Button
                  variant="primary" 
                  size="md"
                  leftIcon="save-outline"
                  onPress={handleSave}
                  style={styles.actionButton}
                  hapticFeedback
                >
                  Save Analysis
                </Button>
              </>
            )}
          </View>
        </>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Ionicons
            name="moon-outline"
            size={64}
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
            style={styles.emptyStateIcon}
          />
          <Text
            variant="h3"
            color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
            style={styles.emptyStateText}
          >
            No Analysis Yet
          </Text>
          <Text
            variant="body1"
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
            style={styles.emptyStateText}
          >
            Enter your dream details to receive an analysis
          </Text>
        </View>
      )}

      <AlertDialog
        visible={deleteAlertVisible}
        title="Delete Dream"
        message="Are you sure you want to delete this dream? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        destructive={true}
      />
    </ScrollView>
  );
};

export default DreamAnalysis; 