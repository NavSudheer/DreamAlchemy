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
    archetypes: Array<{
      type: string;
      description: string;
      significance: string;
    }>;
    mood: string;
    theme: string;
    secondaryThemes?: string[];
    themeConfidence?: number;
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

export interface DreamTheme {
  primary: string;
  secondary?: string[];
  confidence?: number;
}

export interface DreamAnalysis {
  symbols: Symbol[];
  archetypes: Archetype[];
  interpretation: string;
  timestamp: Date | string;
  theme?: DreamTheme;
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

// Constants for available dream themes
export const DREAM_THEMES = {
  EMOTIONAL: {
    id: 'emotional',
    name: 'Emotional',
    subtypes: ['Fear', 'Joy', 'Grief', 'Love', 'Anger', 'Peace']
  },
  ADVENTURE: {
    id: 'adventure',
    name: 'Adventure',
    subtypes: ['Exploration', 'Chase', 'Journey', 'Escape', 'Discovery']
  },
  PERSONAL_GROWTH: {
    id: 'personal_growth',
    name: 'Personal Growth',
    subtypes: ['Transformation', 'Achievement', 'Challenge', 'Learning']
  },
  RELATIONSHIP: {
    id: 'relationship',
    name: 'Relationship',
    subtypes: ['Family', 'Friendship', 'Romance', 'Conflict']
  },
  SYMBOLIC: {
    id: 'symbolic',
    name: 'Symbolic',
    subtypes: ['Flying', 'Falling', 'Lost', 'Finding', 'Time']
  },
  SPIRITUAL: {
    id: 'spiritual',
    name: 'Spiritual',
    subtypes: ['Divine', 'Prophecy', 'Enlightenment', 'Mystical']
  },
  SITUATIONAL: {
    id: 'situational',
    name: 'Situational',
    subtypes: ['Work', 'School', 'Home', 'Travel']
  },
  ENVIRONMENTAL: {
    id: 'environmental',
    name: 'Environmental',
    subtypes: ['Nature', 'Urban', 'Water', 'Space']
  },
  PSYCHOLOGICAL: {
    id: 'psychological',
    name: 'Psychological',
    subtypes: ['Memory', 'Identity', 'Power', 'Shadow']
  },
  ABSTRACT: {
    id: 'abstract',
    name: 'Abstract',
    subtypes: ['Surreal', 'Recurring', 'Lucid', 'Prophetic']
  }
} as const; 