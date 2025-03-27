import { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

declare const EmptyState: FC<EmptyStateProps>;
export default EmptyState; 