import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Colors, BorderRadius, Shadows, spacing, Animation } from '../../utils/theme';
import { useTheme } from '../../providers/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';

export type CardVariant = 'filled' | 'outlined' | 'elevated' | 'gradient';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  borderColor?: string;
  backgroundColor?: string;
  gradientColors?: string[];
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  style,
  contentStyle,
  borderColor,
  backgroundColor,
  gradientColors,
  onPress,
}) => {
  const { isDark } = useTheme();
  
  // Scale animation for the touchable effect
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };
  
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };
  
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: backgroundColor || (isDark ? Colors.neutral[800] : Colors.neutral[100]),
          borderWidth: 0,
          ...Shadows.none,
        };
      case 'outlined':
        return {
          backgroundColor: backgroundColor || 'transparent',
          borderWidth: 1,
          borderColor: borderColor || (isDark ? Colors.neutral[700] : Colors.neutral[300]),
          ...Shadows.none,
        };
      case 'gradient':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          ...Shadows.md,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: backgroundColor || (isDark ? Colors.neutral[800] : Colors.neutral[50]),
          borderWidth: 0,
          borderColor: isDark ? Colors.neutral[700] : 'transparent',
          ...Shadows.md,
        };
    }
  };

  const cardStyle = [
    styles.card,
    getVariantStyle(),
    style,
  ];

  const renderCardContent = () => (
    <View style={[styles.content, contentStyle]}>
      {children}
    </View>
  );

  if (variant === 'gradient') {
    const defaultColors = isDark 
      ? ['#171923', '#1A202C'] 
      : ['#F7FAFC', '#EDF2F7'];
      
    const colorOne = gradientColors?.[0] || defaultColors[0];
    const colorTwo = gradientColors?.[1] || defaultColors[1];

    if (onPress) {
      return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[cardStyle]}
          >
            <LinearGradient
              colors={[colorOne, colorTwo]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, style]}
            >
              {renderCardContent()}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <LinearGradient
        colors={[colorOne, colorTwo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, style]}
      >
        {renderCardContent()}
      </LinearGradient>
    );
  }

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={cardStyle}
          activeOpacity={0.9}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          {renderCardContent()}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View style={cardStyle}>
      {renderCardContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing[4],
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    padding: spacing[4],
  },
});

export default Card; 