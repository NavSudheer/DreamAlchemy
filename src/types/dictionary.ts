export interface DreamSymbol {
  id: string;
  name: string;
  description: string;
  category: string;
  meanings: string[];
  relatedSymbols?: string[];
  examples?: string[];
  history?: string;
  popularity?: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'animals',
    name: 'Animals',
    description: 'Creatures that appear in dreams',
    iconName: 'paw',
  },
  {
    id: 'people',
    name: 'People',
    description: 'Characters and human figures',
    iconName: 'people',
  },
  {
    id: 'places',
    name: 'Places',
    description: 'Locations and environments',
    iconName: 'location',
  },
  {
    id: 'objects',
    name: 'Objects',
    description: 'Items and artifacts',
    iconName: 'cube',
  },
  {
    id: 'actions',
    name: 'Actions',
    description: 'Activities and movements',
    iconName: 'walk',
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Elements and natural phenomena',
    iconName: 'leaf',
  },
  {
    id: 'emotions',
    name: 'Emotions',
    description: 'Feelings and emotional states',
    iconName: 'heart',
  },
]; 