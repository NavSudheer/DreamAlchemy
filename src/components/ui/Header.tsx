import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../providers/ThemeProvider';
import { Colors, spacing, Shadows, BorderRadius } from '../../utils/theme';
import Text from './Text';

interface HeaderProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  rightText?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showMoon?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  rightText,
  onLeftPress,
  onRightPress,
  showMoon = false
}) => {
  const { isDark, themeType, setThemeType } = useTheme();
  const insets = useSafeAreaInsets();
  
  const toggleTheme = () => {
    setThemeType(themeType === 'dark' ? 'light' : 'dark');
  };
  
  const renderMoonIcon = () => {
    if (!showMoon) return null;
    
    const backgroundColor = isDark ? 'rgba(45, 55, 72, 0.5)' : 'rgba(237, 242, 247, 0.8)';
    
    return (
      <View style={styles.moonContainer}>
        <TouchableOpacity 
          style={[styles.moonButton, { backgroundColor }]}
          onPress={toggleTheme}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Ionicons
            name={isDark ? "moon" : "sunny"}
            size={22}
            color={isDark ? Colors.primary[300] : Colors.accent[500]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={[
      styles.container,
      { paddingTop: insets.top > 0 ? insets.top : spacing[4] }
    ]}>
      <LinearGradient
        colors={isDark 
          ? ['rgba(26, 32, 44, 0.9)', 'rgba(26, 32, 44, 0.7)'] 
          : ['rgba(247, 250, 252, 0.9)', 'rgba(247, 250, 252, 0.7)']}
        style={styles.background}
      />
      
      <View style={styles.content}>
        {leftIcon ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onLeftPress}
            disabled={!onLeftPress}
            accessibilityRole="button"
          >
            <Ionicons
              name={leftIcon as any}
              size={24}
              color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        <Text 
          variant="h3" 
          color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
          style={styles.title}
        >
          {title}
        </Text>
        
        {rightIcon ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightPress}
            disabled={!onRightPress}
            accessibilityRole="button"
          >
            <Ionicons
              name={rightIcon as any}
              size={24}
              color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
            />
          </TouchableOpacity>
        ) : rightText ? (
          <View style={styles.rightTextContainer}>
            <Text 
              variant="caption" 
              style={[
                styles.rightText,
                { color: isDark ? Colors.primary[300] : Colors.primary[600] }
              ]}
            >
              {rightText}
            </Text>
          </View>
        ) : renderMoonIcon()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: spacing[2],
    position: 'relative',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  moonContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightTextContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header; 