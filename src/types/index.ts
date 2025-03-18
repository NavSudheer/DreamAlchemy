import { Ionicons } from '@expo/vector-icons';

export interface Dream {
  id: string;
  content: string;
  timestamp: number;
  analysis?: {
    interpretation: string;
    symbols: Array<{
      symbol: string;
      meaning: string;
    }>;
    mood: string;
    theme: string;
  };
}

export interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export interface DreamAnalysis {
  symbols: Symbol[];
  archetypes: Archetype[];
  interpretation: string;
  timestamp: Date | string;
}

export interface Symbol {
  name: string;
  meaning: string;
  frequency: number;
}

export interface Archetype {
  type: string;
  description: string;
  significance: string;
} 