import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, spacing } from '../../../utils/theme';
import Text from '../Text';
import Button from '../Button';
import { useTheme } from '../../../providers/ThemeProvider';
import { EmptyStateProps } from '../../../types';

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  const { isDark } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons 
        name={icon} 
        size={64} 
        color={isDark ? Colors.neutral[600] : Colors.neutral[300]} 
      />
      <Text 
        variant="h2" 
        color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
        style={styles.title}
      >
        {title}
      </Text>
      <Text 
        variant="body1" 
        color={isDark ? Colors.neutral[500] : Colors.neutral[600]}
        style={styles.description}
      >
        {description}
      </Text>
      {action && (
        <Button
          variant="primary"
          size="lg"
          onPress={action.onPress}
          style={styles.actionButton}
        >
          {action.label}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[8],
  },
  title: {
    marginTop: spacing[6],
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing[8],
  },
  actionButton: {
    minWidth: 200,
  }
});

export default EmptyState; 