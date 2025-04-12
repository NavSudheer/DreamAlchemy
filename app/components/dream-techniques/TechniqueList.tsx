import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TechniqueCard } from './TechniqueCard';

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
          progress={item.progress}
          isCompleted={item.isCompleted}
          onPress={() => onTechniquePress(item)}
        />
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingBottom: 100, // Add extra padding at the bottom to ensure all content is visible
  },
}); 