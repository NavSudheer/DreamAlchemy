import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, BorderRadius, Shadows } from '../../src/utils/theme';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? Colors.secondary[400] : Colors.primary[600],
        tabBarInactiveTintColor: isDark ? Colors.neutral[400] : Colors.neutral[500],
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 8 : 8,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
          elevation: 0,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
            },
            android: {
              elevation: 4,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 0,
          marginBottom: 4,
          letterSpacing: 0.3,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView 
              tint={isDark ? "dark" : "light"}
              intensity={isDark ? 20 : 60} 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                borderRadius: 0,
                overflow: 'hidden',
                backgroundColor: isDark 
                  ? 'rgba(45, 55, 72, 0.75)' 
                  : 'rgba(247, 250, 252, 0.75)',
                borderTopWidth: isDark ? 1 : 0,
                borderTopColor: isDark ? Colors.neutral[600] : 'transparent',
                ...Shadows.md
              }}
            />
          ) : (
            <View style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              borderRadius: 0,
              backgroundColor: isDark 
                ? 'rgba(45, 55, 72, 0.9)' 
                : 'rgba(247, 250, 252, 0.9)',
              overflow: 'hidden',
              borderTopWidth: isDark ? 1 : 0,
              borderTopColor: isDark ? Colors.neutral[600] : 'transparent',
              ...Shadows.md
            }} />
          )
        ),
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'New Dream',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Dream History',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Dictionary',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="api-test"
        options={{
          title: 'API Test',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="code-working" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="technique"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="explore/psychology"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
