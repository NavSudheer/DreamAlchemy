import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors } from '@/utils/theme';
import { TouchableOpacity } from 'react-native';

export default function PsychologyLayout() {
  const { isDark } = useTheme();
  const router = useRouter();
  
  const handleBackPress = () => {
    // Navigate specifically to the explore tab
    router.push('/(tabs)/explore');
  };
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Dream Psychology',
          headerShown: true,
          headerStyle: {
            backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50],
          },
          headerTintColor: isDark ? Colors.neutral[100] : Colors.neutral[800],
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ padding: 8 }}
            >
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color={isDark ? Colors.neutral[100] : Colors.neutral[800]} 
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="scientific"
        options={{
          title: 'Scientific Perspectives',
          presentation: 'card',
          headerStyle: {
            backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50],
          },
          headerTintColor: isDark ? Colors.neutral[100] : Colors.neutral[800],
        }}
      />
      <Stack.Screen
        name="theories"
        options={{
          title: 'Psychological Theories',
          presentation: 'card',
          headerStyle: {
            backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50],
          },
          headerTintColor: isDark ? Colors.neutral[100] : Colors.neutral[800],
        }}
      />
      <Stack.Screen
        name="types"
        options={{
          title: 'Dream Types',
          presentation: 'card',
          headerStyle: {
            backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50],
          },
          headerTintColor: isDark ? Colors.neutral[100] : Colors.neutral[800],
        }}
      />
      <Stack.Screen
        name="cultural"
        options={{
          title: 'Cultural Perspectives',
          presentation: 'card',
          headerStyle: {
            backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50],
          },
          headerTintColor: isDark ? Colors.neutral[100] : Colors.neutral[800],
        }}
      />
    </Stack>
  );
} 