import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TechniqueCard } from './TechniqueCard';
import Text from '../ui/Text';
import { useTheme } from '../../providers/ThemeProvider';

export interface Technique {
  id: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  duration: string;
  icon: string;
  progress?: number;
  isCompleted?: boolean;
}

interface TechniqueListProps {
  techniques: Technique[];
  onTechniquePress: (technique: Technique) => void;
}

export const TechniqueList: React.FC<TechniqueListProps> = ({
  techniques,
  onTechniquePress,
}) => {
  const { theme } = useTheme();
  return (
    <FlatList
      data={techniques}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TechniqueCard
          title={item.title}
          description={item.description}
          difficulty={item.difficulty}
          duration={item.duration}
          icon={item.icon as any} // We'll need to ensure icons match MaterialCommunityIcons
          onPress={() => onTechniquePress(item)}
        />
      )}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={{ padding: 20 }}>
          <Text color={theme.colors.text} variant="h3">Build a gentle dream practice</Text>
          <Text color={theme.colors.text}>Start with Dream Journaling or Reality Testing. Follow the steps at your own pace. Protect your sleep and stop any exercise that feels uncomfortable.</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 120,
  },
});

export default TechniqueList;
