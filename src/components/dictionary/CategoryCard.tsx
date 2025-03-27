import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryInfo } from '../../types/dictionary';
import { useTheme } from '../../providers/ThemeProvider';
import { BorderRadius, Colors, spacing } from '../../utils/theme';
import Text from '../ui/Text';
import * as Haptics from 'expo-haptics';

interface CategoryCardProps {
  category: CategoryInfo;
  onPress: (category: CategoryInfo) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const { isDark } = useTheme();
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(category);
  };
  
  // Get background color based on category
  const getCategoryColor = (categoryId: string) => {
    const colors = {
      animals: { light: '#E9FAF1', dark: '#234E52' },
      people: { light: '#EBF8FF', dark: '#1A365D' },
      places: { light: '#FAF5FF', dark: '#44337A' },
      objects: { light: '#FEF3C7', dark: '#744210' },
      actions: { light: '#FEE2E2', dark: '#7F1D1D' },
      nature: { light: '#ECFCCB', dark: '#3F6212' },
      emotions: { light: '#FCE7F3', dark: '#831843' }
    };
    
    const defaultColor = { light: Colors.neutral[100], dark: Colors.neutral[700] };
    // @ts-ignore
    return colors[categoryId] || defaultColor;
  };

  const categoryColor = getCategoryColor(category.id);
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isDark ? categoryColor.dark : categoryColor.light }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={category.iconName as any}
          size={38}
          color={isDark ? Colors.neutral[100] : Colors.neutral[700]}
        />
      </View>
      
      <Text
        variant="h5"
        color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
        style={styles.title}
      >
        {category.name}
      </Text>
      
      <Text
        variant="body2"
        color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
        style={styles.description}
        numberOfLines={2}
      >
        {category.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    padding: spacing[4],
    width: '48%',
    height: 160,
    marginBottom: spacing[3],
  },
  iconContainer: {
    marginBottom: spacing[2],
  },
  title: {
    marginBottom: spacing[1],
  },
  description: {
    opacity: 0.7,
  }
});

export default CategoryCard; 