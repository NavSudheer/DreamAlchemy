export interface Dream {
  id: string;
  content: string;
  timestamp: Date;
  analysis?: DreamAnalysis;
}

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