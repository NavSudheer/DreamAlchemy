import React from 'react';
import DreamPsychologyHub from '../../../components/psychology/DreamPsychologyHub';
import { View } from 'react-native';
import { useTheme } from '../../../../src/providers/ThemeProvider';
import { Colors } from '../../../../src/utils/theme';

export default function PsychologyIndex() {
  const { isDark } = useTheme();
  
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50]
    }}>
      <DreamPsychologyHub />
    </View>
  );
} 