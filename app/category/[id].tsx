import React, { useMemo } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, spacing, BorderRadius } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Header from '../../src/components/ui/Header';
import SymbolCard from '../../src/components/dictionary/SymbolCard';
import { CATEGORIES, CategoryInfo, DreamSymbol } from '../../src/types/dictionary';
import { getSymbolsByCategory } from '../../src/data/dreamSymbols';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isDark } = useTheme();
  
  const category = useMemo(() => {
    return CATEGORIES.find(cat => cat.id === id) || null;
  }, [id]);
  
  const symbols = useMemo(() => {
    if (!category) return [];
    return getSymbolsByCategory(category.id);
  }, [category]);
  
  // If category not found, redirect to dictionary
  if (!category) {
    router.replace('../(tabs)/dictionary');
    return null;
  }
  
  const handleSymbolPress = (symbol: DreamSymbol) => {
    router.navigate({
      pathname: '../symbol/[id]',
      params: { id: symbol.id }
    });
  };
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <Header 
        title={category.name}
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />
      
      <View style={[
        styles.categoryHeader,
        { borderBottomColor: isDark ? Colors.neutral[800] : Colors.neutral[200] }
      ]}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: isDark ? Colors.primary[800] : Colors.primary[100] }
        ]}>
          <Ionicons 
            name={category.iconName as any} 
            size={32} 
            color={isDark ? Colors.primary[300] : Colors.primary[600]} 
          />
        </View>
        
        <Text 
          variant="h3" 
          color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
          style={styles.title}
        >
          {category.name}
        </Text>
        
        <Text 
          variant="body1" 
          color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          style={styles.description}
        >
          {category.description}
        </Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {symbols.length > 0 ? (
          symbols.map(symbol => (
            <SymbolCard
              key={symbol.id}
              symbol={symbol}
              onPress={handleSymbolPress}
            />
          ))
        ) : (
          <Text 
            variant="body1" 
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
            style={styles.emptyText}
          >
            No symbols found in this category
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryHeader: {
    padding: spacing[4],
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  title: {
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing[8],
    fontStyle: 'italic',
  },
}); 