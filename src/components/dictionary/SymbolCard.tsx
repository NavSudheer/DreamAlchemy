import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { DreamSymbol } from '../../types/dictionary';
import { useTheme } from '../../providers/ThemeProvider';
import { BorderRadius, Colors, spacing } from '../../utils/theme';
import Text from '../ui/Text';
import * as Haptics from 'expo-haptics';

interface SymbolCardProps {
  symbol: DreamSymbol;
  onPress: (symbol: DreamSymbol) => void;
  compact?: boolean;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ 
  symbol, 
  onPress,
  compact = false 
}) => {
  const { isDark } = useTheme();
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(symbol);
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        compact ? styles.compactContainer : styles.fullContainer,
        { 
          backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[50],
          borderColor: isDark ? Colors.neutral[700] : Colors.neutral[200]
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text 
        variant="h5" 
        color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
        style={styles.title}
      >
        {symbol.name}
      </Text>
      
      {!compact && (
        <Text 
          variant="body2"
          color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          style={styles.description}
          numberOfLines={2}
        >
          {symbol.description}
        </Text>
      )}
      
      <View style={styles.categoryTag}>
        <Text 
          variant="caption"
          color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
        >
          {symbol.category.charAt(0).toUpperCase() + symbol.category.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    padding: spacing[3],
    marginBottom: spacing[3],
    position: 'relative',
  },
  fullContainer: {
    width: '100%',
  },
  compactContainer: {
    width: 150,
    height: 100,
    marginRight: spacing[3],
  },
  title: {
    marginBottom: spacing[1],
  },
  description: {
    marginBottom: spacing[2],
  },
  categoryTag: {
    position: 'absolute',
    top: spacing[2],
    right: spacing[2],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1] / 2,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(0,0,0,0.05)',
  }
});

export default SymbolCard; 