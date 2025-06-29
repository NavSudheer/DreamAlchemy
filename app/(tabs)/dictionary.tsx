import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  FlatList,
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';
import { BorderRadius, Colors, spacing } from '@/utils/theme';
import Text from '@/components/ui/Text';
import Header from '@/components/ui/Header';
import SearchBar from '@/components/dictionary/SearchBar';
import SymbolCard from '@/components/dictionary/SymbolCard';
import CategoryCard from '@/components/dictionary/CategoryCard';
import { 
  CATEGORIES, 
  CategoryInfo, 
  DreamSymbol 
} from '../../src/types/dictionary';
import { 
  DREAM_SYMBOLS, 
  getRecentlyViewedSymbols, 
  searchSymbols 
} from '../../src/data/dreamSymbols';

export default function DictionaryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DreamSymbol[]>([]);
  const { isDark } = useTheme();
  const router = useRouter();
  
  const recentlyViewed = getRecentlyViewedSymbols();
  
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    
    const results = searchSymbols(query);
    setSearchResults(results);
  }, []);
  
  const handleSelectSymbol = (symbol: DreamSymbol) => {
    // Navigate to symbol detail screen using the href pattern
    router.navigate({
      pathname: "../symbol/[id]",
      params: { id: symbol.id }
    });
  };
  
  const handleSelectCategory = (category: CategoryInfo) => {
    // Navigate to category screen using the href pattern
    router.navigate({
      pathname: "../category/[id]",
      params: { id: category.id }
    });
  };
  
  const renderCategoryItem = ({ item }: { item: CategoryInfo }) => (
    <CategoryCard 
      category={item} 
      onPress={handleSelectCategory} 
    />
  );
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <Header 
        title="Dream Dictionary" 
        leftIcon="arrow-back"
        onLeftPress={() => router.navigate("/(tabs)/explore")}
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Text 
          variant="h3" 
          color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          style={styles.subtitle}
        >
          Discover the meaning behind dream symbols
        </Text>
        
        <SearchBar onSearch={handleSearch} />
        
        {searchQuery.length > 0 ? (
          <View>
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.sectionTitle}
            >
              Search Results
            </Text>
            
            {searchResults.length > 0 ? (
              searchResults.map(symbol => (
                <SymbolCard
                  key={symbol.id}
                  symbol={symbol}
                  onPress={handleSelectSymbol}
                />
              ))
            ) : (
              <Text 
                variant="body1" 
                color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                style={styles.emptyText}
              >
                No symbols found for "{searchQuery}"
              </Text>
            )}
          </View>
        ) : (
          <>
            {recentlyViewed.length > 0 && (
              <View style={styles.recentSection}>
                <Text 
                  variant="h4" 
                  color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
                  style={styles.sectionTitle}
                >
                  Recently Viewed
                </Text>
                
                <ScrollView 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.recentScrollView}
                >
                  {recentlyViewed.map(symbol => (
                    <SymbolCard
                      key={symbol.id}
                      symbol={symbol}
                      onPress={handleSelectSymbol}
                      compact
                    />
                  ))}
                </ScrollView>
              </View>
            )}
            
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.sectionTitle}
            >
              Browse Categories
            </Text>
            
            <View style={styles.categoriesContainer}>
              {CATEGORIES.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onPress={handleSelectCategory}
                />
              ))}
            </View>
            
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.sectionTitle}
            >
              Popular Symbols
            </Text>
            
            {DREAM_SYMBOLS.slice(0, 5).map(symbol => (
              <SymbolCard
                key={symbol.id}
                symbol={symbol}
                onPress={handleSelectSymbol}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing[4],
    paddingBottom: 60 + spacing[6], // Add extra padding for the tab bar
  },
  subtitle: {
    marginBottom: spacing[6],
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: spacing[3],
  },
  recentSection: {
    marginBottom: spacing[6],
  },
  recentScrollView: {
    flexGrow: 0,
    marginLeft: -spacing[1],
    paddingLeft: spacing[1],
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: spacing[6],
    fontStyle: 'italic',
  }
}); 