import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, spacing, BorderRadius } from '../../src/utils/theme';
import Text from '../../src/components/ui/Text';
import Header from '../../src/components/ui/Header';
import SymbolCard from '../../src/components/dictionary/SymbolCard';
import { getSymbolById, getRelatedSymbols } from '../../src/data/dreamSymbols';
import { DreamSymbol } from '../../src/types/dictionary';

export default function SymbolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isDark } = useTheme();
  
  const symbol = getSymbolById(id);
  const relatedSymbols = symbol ? getRelatedSymbols(symbol.id) : [];
  
  useEffect(() => {
    if (!symbol) {
      // If symbol not found, redirect back to dictionary
      router.replace('../(tabs)/dictionary');
    }
  }, [symbol, router]);
  
  if (!symbol) {
    return null;
  }
  
  const handleRelatedSymbolPress = (relatedSymbol: DreamSymbol) => {
    router.navigate({
      pathname: '../symbol/[id]',
      params: { id: relatedSymbol.id }
    });
  };
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <Header 
        title={symbol.name}
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={[
          styles.categoryBadge,
          { backgroundColor: isDark ? Colors.primary[800] : Colors.primary[100] }
        ]}>
          <Text 
            variant="caption" 
            color={isDark ? Colors.primary[200] : Colors.primary[700]}
          >
            {symbol.category.charAt(0).toUpperCase() + symbol.category.slice(1)}
          </Text>
        </View>
        
        <Text 
          variant="h3" 
          color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
          style={styles.name}
        >
          {symbol.name}
        </Text>
        
        <Text 
          variant="body1" 
          color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          style={styles.description}
        >
          {symbol.description}
        </Text>
        
        <View style={styles.section}>
          <Text 
            variant="h4" 
            color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
            style={styles.sectionTitle}
          >
            Meanings
          </Text>
          
          <View style={styles.meaningsList}>
            {symbol.meanings.map((meaning, index) => (
              <View 
                key={index} 
                style={[
                  styles.meaningItem, 
                  { 
                    backgroundColor: isDark 
                      ? Colors.neutral[800] 
                      : Colors.neutral[100]
                  }
                ]}
              >
                <Ionicons 
                  name="sparkles" 
                  size={16} 
                  color={isDark ? Colors.primary[300] : Colors.primary[500]} 
                  style={styles.meaningIcon}
                />
                <Text 
                  variant="body2" 
                  color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                >
                  {meaning}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        {symbol.examples && symbol.examples.length > 0 && (
          <View style={styles.section}>
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.sectionTitle}
            >
              Common Dream Examples
            </Text>
            
            <View style={styles.examplesList}>
              {symbol.examples.map((example, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.exampleItem, 
                    { 
                      backgroundColor: isDark 
                        ? Colors.neutral[800] 
                        : Colors.neutral[100]
                    }
                  ]}
                >
                  <Text 
                    variant="body2" 
                    color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                  >
                    {example}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {symbol.history && (
          <View style={styles.section}>
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.sectionTitle}
            >
              Historical Context
            </Text>
            
            <Text 
              variant="body2" 
              color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
            >
              {symbol.history}
            </Text>
          </View>
        )}
        
        {relatedSymbols.length > 0 && (
          <View style={styles.section}>
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.sectionTitle}
            >
              Related Symbols
            </Text>
            
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.relatedScrollView}
            >
              {relatedSymbols.map(relatedSymbol => (
                <SymbolCard
                  key={relatedSymbol.id}
                  symbol={relatedSymbol}
                  onPress={handleRelatedSymbolPress}
                  compact
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing[4],
    paddingBottom: spacing[8],
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: BorderRadius.pill,
    marginBottom: spacing[2],
  },
  name: {
    marginBottom: spacing[3],
  },
  description: {
    marginBottom: spacing[6],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    marginBottom: spacing[3],
  },
  meaningsList: {
    gap: spacing[2],
  },
  meaningItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    borderRadius: BorderRadius.md,
  },
  meaningIcon: {
    marginRight: spacing[2],
  },
  examplesList: {
    gap: spacing[2],
  },
  exampleItem: {
    padding: spacing[3],
    borderRadius: BorderRadius.md,
  },
  relatedScrollView: {
    marginLeft: -spacing[1],
    paddingLeft: spacing[1],
  },
}); 