import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Dream, getMoodInfo } from '../types';
import { formatDate, truncateText, capitalize } from '../utils/helpers';
import { useTheme } from '../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows } from '../utils/theme';
import Text from './ui/Text';
import Button from './ui/Button';
import { EmptyState } from './ui/EmptyState';
import AlertDialog from './ui/AlertDialog';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [themeFilter, setThemeFilter] = useState<string | null>(null);
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [clearAllAlertVisible, setClearAllAlertVisible] = useState(false);
  const [selectedDreamId, setSelectedDreamId] = useState<string | null>(null);
  const { isDark } = useTheme();
  const router = useRouter();

  const styles = getStyles(isDark);

  // Unique themes across saved dreams, most frequent first
  const themes = useMemo(() => {
    const counts = new Map<string, number>();
    dreams.forEach(d => {
      const theme = d.analysis?.theme;
      if (theme) counts.set(theme, (counts.get(theme) || 0) + 1);
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([theme]) => theme);
  }, [dreams]);

  const filteredDreams = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return dreams.filter(dream => {
      if (themeFilter && dream.analysis?.theme !== themeFilter) return false;
      if (!query) return true;
      return (
        dream.content.toLowerCase().includes(query) ||
        dream.analysis?.interpretation?.toLowerCase().includes(query) ||
        dream.analysis?.symbols?.some(s => s.symbol.toLowerCase().includes(query))
      );
    });
  }, [dreams, searchQuery, themeFilter]);

  const handleSelectDream = (dream: Dream) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectDream(dream);
    AccessibilityInfo.announceForAccessibility('Opening dream analysis');
  };

  const handleDeleteDream = (dreamId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedDreamId(dreamId);
    setDeleteAlertVisible(true);
  };

  const confirmDeleteDream = () => {
    if (selectedDreamId) {
      onDeleteDream(selectedDreamId);
      AccessibilityInfo.announceForAccessibility('Dream deleted');
    }
    setDeleteAlertVisible(false);
  };

  const handleClearAllDreams = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setClearAllAlertVisible(true);
  };

  const confirmClearAllDreams = () => {
    onClearAllDreams();
    AccessibilityInfo.announceForAccessibility('All dreams cleared');
    setClearAllAlertVisible(false);
  };

  const renderDreamItem = ({ item, index }: { item: Dream; index: number }) => {
    const moodInfo = getMoodInfo(item.analysis?.mood);
    const theme = item.analysis?.theme;

    return (
      <Animated.View
        entering={FadeIn.delay(Math.min(index, 8) * 60)}
        layout={Layout.springify().mass(1).damping(15).stiffness(200)}
      >
        <TouchableOpacity
          style={styles.dreamCard}
          onPress={() => handleSelectDream(item)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={`Dream from ${formatDate(new Date(item.timestamp))}`}
          accessibilityHint="Opens the full dream analysis"
        >
          <View style={styles.dreamCardHeader}>
            <Text
              variant="caption"
              color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
            >
              {formatDate(new Date(item.timestamp))}
            </Text>
            <TouchableOpacity
              onPress={() => handleDeleteDream(item.id)}
              style={styles.deleteIconButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Delete dream"
            >
              <Ionicons
                name="trash-outline"
                size={16}
                color={isDark ? Colors.neutral[500] : Colors.neutral[400]}
              />
            </TouchableOpacity>
          </View>

          <Text
            variant="body1"
            color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
            style={styles.previewText}
            numberOfLines={2}
          >
            {item.content}
          </Text>

          {item.analysis?.interpretation ? (
            <Text
              variant="body2"
              color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
              style={styles.interpretationPreview}
              numberOfLines={2}
            >
              {truncateText(item.analysis.interpretation, 140)}
            </Text>
          ) : null}

          <View style={styles.badgesRow}>
            {moodInfo && (
              <View style={styles.badge}>
                <Text variant="caption">{moodInfo.emoji}</Text>
                <Text
                  variant="caption"
                  color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                >
                  {moodInfo.label}
                </Text>
              </View>
            )}
            {theme && (
              <View style={[styles.badge, styles.themeBadge]}>
                <Ionicons
                  name="pricetag-outline"
                  size={11}
                  color={isDark ? Colors.accent[300] : Colors.accent[600]}
                />
                <Text
                  variant="caption"
                  color={isDark ? Colors.accent[300] : Colors.accent[600]}
                >
                  {capitalize(theme)}
                </Text>
              </View>
            )}
            <View style={styles.badgeSpacer} />
            <Ionicons
              name="chevron-forward"
              size={16}
              color={isDark ? Colors.primary[400] : Colors.primary[500]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (dreams.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyStateScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <EmptyState
          icon="moon-outline"
          title="Begin Your Dream Journey"
          description="Your saved dreams and their interpretations will live here."
          steps={[
            "Record your dreams as soon as you wake up for best recall",
            "Tag the mood so patterns emerge over time",
            "Get AI-powered analysis to uncover symbols and meanings",
            "Revisit past dreams to track recurring themes"
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
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color={isDark ? Colors.neutral[500] : Colors.neutral[400]}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dreams, symbols, meanings…"
          placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          accessibilityLabel="Search dreams"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={isDark ? Colors.neutral[500] : Colors.neutral[400]}
            />
          </TouchableOpacity>
        )}
      </View>

      {themes.length > 0 && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            <TouchableOpacity
              style={[styles.filterChip, themeFilter === null && styles.filterChipActive]}
              onPress={() => {
                Haptics.selectionAsync();
                setThemeFilter(null);
              }}
              accessibilityRole="button"
              accessibilityState={{ selected: themeFilter === null }}
            >
              <Text
                variant="caption"
                color={
                  themeFilter === null
                    ? (isDark ? Colors.primary[200] : Colors.primary[700])
                    : (isDark ? Colors.neutral[400] : Colors.neutral[500])
                }
              >
                All ({dreams.length})
              </Text>
            </TouchableOpacity>
            {themes.map(theme => {
              const active = themeFilter === theme;
              return (
                <TouchableOpacity
                  key={theme}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setThemeFilter(active ? null : theme);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    variant="caption"
                    color={
                      active
                        ? (isDark ? Colors.primary[200] : Colors.primary[700])
                        : (isDark ? Colors.neutral[400] : Colors.neutral[500])
                    }
                  >
                    {capitalize(theme)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {filteredDreams.length === 0 ? (
        <View style={styles.noResults}>
          <Ionicons
            name="search-outline"
            size={40}
            color={isDark ? Colors.neutral[500] : Colors.neutral[400]}
          />
          <Text
            variant="body1"
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
            style={styles.noResultsText}
          >
            No dreams match your search
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredDreams}
          renderItem={renderDreamItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            dreams.length > 1 ? (
              <View style={styles.footer}>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon="trash-outline"
                  onPress={handleClearAllDreams}
                  hapticFeedback
                >
                  Clear All Dreams
                </Button>
              </View>
            ) : null
          }
        />
      )}

      <AlertDialog
        visible={deleteAlertVisible}
        title="Delete Dream"
        message="Are you sure you want to delete this dream? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteDream}
        onCancel={() => setDeleteAlertVisible(false)}
        destructive={true}
      />

      <AlertDialog
        visible={clearAllAlertVisible}
        title="Clear All Dreams"
        message="Are you sure you want to delete all dreams? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        onConfirm={confirmClearAllDreams}
        onCancel={() => setClearAllAlertVisible(false)}
        destructive={true}
      />
    </View>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing[4],
    marginTop: spacing[2],
    marginBottom: spacing[3],
    paddingHorizontal: spacing[3],
    borderRadius: BorderRadius.lg,
    backgroundColor: isDark ? Colors.neutral[800] : '#FFFFFF',
    borderWidth: 1,
    borderColor: isDark ? Colors.neutral[700] : Colors.neutral[200],
    ...Shadows.sm,
  },
  searchIcon: {
    marginRight: spacing[2],
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing[3],
    fontSize: 15,
    color: isDark ? Colors.neutral[200] : Colors.neutral[800],
  },
  filterRow: {
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
  },
  filterChip: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: BorderRadius.pill,
    backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[100],
    borderWidth: 1,
    borderColor: isDark ? Colors.neutral[700] : Colors.neutral[200],
  },
  filterChipActive: {
    backgroundColor: isDark ? 'rgba(150, 131, 240, 0.16)' : Colors.primary[50],
    borderColor: isDark ? Colors.primary[400] : Colors.primary[500],
  },
  listContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[24],
  },
  dreamCard: {
    backgroundColor: isDark ? Colors.neutral[800] : '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    borderWidth: 1,
    borderColor: isDark ? Colors.neutral[700] : Colors.neutral[200],
    ...Shadows.sm,
  },
  dreamCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  deleteIconButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    lineHeight: 22,
    marginBottom: spacing[2],
  },
  interpretationPreview: {
    lineHeight: 19,
    marginBottom: spacing[3],
    fontStyle: 'italic',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
    backgroundColor: isDark ? 'rgba(20, 18, 31, 0.6)' : Colors.neutral[100],
  },
  themeBadge: {
    backgroundColor: isDark ? 'rgba(247, 174, 36, 0.1)' : Colors.accent[50],
  },
  badgeSpacer: {
    flex: 1,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing[24],
  },
  noResultsText: {
    marginTop: spacing[3],
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
  emptyStateScrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Keep content clear of the tab bar
  },
});

export default DreamHistory;
