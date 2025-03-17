import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Colors, BorderRadius, Shadows } from '../../utils/theme';

export type CardVariant = 'filled' | 'outlined' | 'elevated';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  borderColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  style,
  contentStyle,
  borderColor,
  backgroundColor,
  onPress,
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: backgroundColor || Colors.neutral[50],
          borderWidth: 0,
          ...Shadows.none,
        };
      case 'outlined':
        return {
          backgroundColor: backgroundColor || 'transparent',
          borderWidth: 1,
          borderColor: borderColor || Colors.neutral[200],
          ...Shadows.none,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: backgroundColor || Colors.neutral[50],
          borderWidth: 0,
          ...Shadows.md,
        };
    }
  };

  const cardStyle = [
    styles.card,
    getVariantStyle(),
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
});

export default Card; 