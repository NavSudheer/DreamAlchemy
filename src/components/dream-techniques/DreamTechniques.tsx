import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TechniqueList, Technique } from './TechniqueList';
import { useRouter } from 'expo-router';
import { useTheme } from '../../providers/ThemeProvider';
import { createNavigation } from '../../navigation/routes';
import { TECHNIQUE_DATA } from './techniques';

const techniques: Technique[] = Object.entries(TECHNIQUE_DATA).map(([id, technique]) => ({ id, ...technique }));

const DreamTechniques: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TechniqueList techniques={techniques} onTechniquePress={(technique) =>
        router.push(createNavigation('/(tabs)/technique/[id]', { id: technique.id }))
      } />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
export { DreamTechniques };
export default DreamTechniques;
