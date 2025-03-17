import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/providers/ThemeProvider';
import { Colors, BorderRadius, Shadows } from '../../src/utils/theme';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? Colors.primary[400] : Colors.primary[600],
        tabBarInactiveTintColor: isDark ? Colors.neutral[400] : Colors.neutral[500],
        tabBarStyle: {
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.85)' : 'rgba(249, 250, 251, 0.85)',
          borderTopColor: isDark ? Colors.neutral[700] : Colors.neutral[200],
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          borderRadius: 25,
          ...Shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView 
              tint={isDark ? 'dark' : 'light'}
              intensity={30} 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                borderRadius: 25,
              }}
            />
          ) : (
            <View style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              borderRadius: 25,
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(249, 250, 251, 0.9)',
            }} />
          )
        ),
        headerStyle: {
          backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[50],
        },
        headerTintColor: isDark ? Colors.neutral[50] : Colors.neutral[900],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'New Dream',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size + 2} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Dream History',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
