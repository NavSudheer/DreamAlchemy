import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import { getSymbolById } from '@/data/dreamSymbols';
import { TECHNIQUE_DATA } from '@/components/dream-techniques/techniques';
import { getSavedItems, SavedItem, SavedItemType } from '@/services/savedItems';
import { useTheme } from '@/providers/ThemeProvider';
import { BorderRadius, Colors, spacing } from '@/utils/theme';

const psychologyTitles: Record<string, string> = {
  scientific: 'Scientific Perspectives',
  theories: 'Psychological Theories',
  types: 'Dream Types',
  cultural: 'Cultural Perspectives',
};

const typeLabels: Record<SavedItemType, string> = {
  dictionary: 'Dictionary',
  technique: 'Technique',
  psychology: 'Psychology',
};

const resolveSavedItem = (item: SavedItem) => {
  if (item.type === 'dictionary') {
    const symbol = getSymbolById(item.itemId);
    return symbol ? { title: symbol.name, description: symbol.description } : null;
  }

  if (item.type === 'technique') {
    const technique = TECHNIQUE_DATA[item.itemId];
    return technique ? { title: technique.title, description: technique.description } : null;
  }

  const title = psychologyTitles[item.itemId];
  return title ? { title, description: 'Explore this perspective on dreaming.' } : null;
};

export default function SavedItemsScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const loadSavedItems = useCallback(async () => {
    setSavedItems(await getSavedItems());
  }, []);

  useFocusEffect(useCallback(() => {
    loadSavedItems();
  }, [loadSavedItems]));

  const openSavedItem = (item: SavedItem) => {
    if (item.type === 'dictionary') {
      router.push({ pathname: '/symbol/[id]', params: { id: item.itemId } });
      return;
    }

    if (item.type === 'technique') {
      router.push({ pathname: '/(tabs)/technique/[id]', params: { id: item.itemId } });
      return;
    }

    router.push(`/(tabs)/explore/psychology/${item.itemId}` as never);
  };

  const visibleItems = savedItems
    .map(item => ({ item, content: resolveSavedItem(item) }))
    .filter((entry): entry is { item: SavedItem; content: { title: string; description: string } } => entry.content !== null);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }]}>
      <Header title="Saved" leftIcon="arrow-back" onLeftPress={() => router.navigate('/(tabs)/explore')} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="body1" color={isDark ? Colors.neutral[300] : Colors.neutral[600]} style={styles.subtitle}>
          Keep the dream ideas and practices you want to revisit.
        </Text>
        {visibleItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons color={isDark ? Colors.neutral[500] : Colors.neutral[400]} name="bookmark-outline" size={36} />
            <Text variant="h4" color={isDark ? Colors.neutral[100] : Colors.neutral[800]} style={styles.emptyTitle}>Nothing saved yet</Text>
            <Text variant="body2" color={isDark ? Colors.neutral[400] : Colors.neutral[600]} style={styles.emptyCopy}>Use the bookmark on any symbol, technique, or Psychology page to collect it here.</Text>
          </View>
        ) : visibleItems.map(({ item, content }) => (
          <TouchableOpacity key={item.id} activeOpacity={0.8} onPress={() => openSavedItem(item)} style={[styles.item, { backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[100] }]}>
            <View style={styles.itemHeader}>
              <Text variant="caption" color={isDark ? Colors.primary[300] : Colors.primary[600]}>{typeLabels[item.type]}</Text>
              <Ionicons color={isDark ? Colors.neutral[400] : Colors.neutral[500]} name="chevron-forward" size={18} />
            </View>
            <Text variant="h4" color={isDark ? Colors.neutral[100] : Colors.neutral[800]}>{content.title}</Text>
            <Text variant="body2" color={isDark ? Colors.neutral[400] : Colors.neutral[600]} style={styles.description}>{content.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing[4], paddingBottom: 120 },
  subtitle: { marginBottom: spacing[5], textAlign: 'center' },
  emptyCopy: { lineHeight: 20, textAlign: 'center' },
  emptyState: { alignItems: 'center', gap: spacing[2], paddingHorizontal: spacing[6], paddingTop: spacing[8] },
  emptyTitle: { marginTop: spacing[2] },
  item: { borderRadius: BorderRadius.lg, marginBottom: spacing[3], padding: spacing[4] },
  itemHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing[2] },
  description: { lineHeight: 20, marginTop: spacing[2] },
});
