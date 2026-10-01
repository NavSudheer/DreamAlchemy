import { DREAM_SYMBOLS } from './dreamSymbols';
import { TECHNIQUE_DATA } from '@/components/dream-techniques/techniques';
import { matchSymbolsByQuery } from './dictionarySearchKeywords';

export type ExploreSearchResult = {
  id: string;
  title: string;
  description: string;
  kind: 'dictionary' | 'technique' | 'psychology';
  target: string;
};

const psychologyResults: ExploreSearchResult[] = [
  { id: 'psychology-scientific', title: 'Scientific Perspectives', description: 'Dreaming, sleep stages, and the brain.', kind: 'psychology', target: '/(tabs)/explore/psychology/scientific' },
  { id: 'psychology-theories', title: 'Psychological Theories', description: 'Different approaches to understanding dreams.', kind: 'psychology', target: '/(tabs)/explore/psychology/theories' },
  { id: 'psychology-types', title: 'Dream Types', description: 'Lucid dreams, nightmares, recurring dreams, and more.', kind: 'psychology', target: '/(tabs)/explore/psychology/types' },
  { id: 'psychology-cultural', title: 'Cultural Perspectives', description: 'How dream traditions vary across cultures.', kind: 'psychology', target: '/(tabs)/explore/psychology/cultural' },
];

export const searchExploreContent = (query: string): ExploreSearchResult[] => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const keywordSymbolIds = new Set(matchSymbolsByQuery(normalizedQuery).map(entry => entry.symbolId));
  const dictionaryResults = DREAM_SYMBOLS.map(symbol => ({
    id: `dictionary-${symbol.id}`,
    title: symbol.name,
    description: symbol.description,
    kind: 'dictionary' as const,
    target: symbol.id,
    searchable: `${symbol.name} ${symbol.description} ${symbol.meanings.join(' ')}`.toLowerCase(),
  })).filter(result => result.searchable.includes(normalizedQuery) || keywordSymbolIds.has(result.target));

  const techniqueResults = Object.entries(TECHNIQUE_DATA).map(([id, technique]) => ({
    id: `technique-${id}`,
    title: technique.title,
    description: technique.description,
    kind: 'technique' as const,
    target: id,
    searchable: `${technique.title} ${technique.description} ${technique.tips.join(' ')}`.toLowerCase(),
  })).filter(result => result.searchable.includes(normalizedQuery));

  const results = [...dictionaryResults, ...techniqueResults, ...psychologyResults.filter(result => `${result.title} ${result.description}`.toLowerCase().includes(normalizedQuery))]
    .map(result => ({
      id: result.id,
      title: result.title,
      description: result.description,
      kind: result.kind,
      target: result.target,
    }));

  const seenIds = new Set<string>();
  return results.filter(result => {
    if (!result.id || !result.target || seenIds.has(result.id)) return false;
    seenIds.add(result.id);
    return true;
  }).slice(0, 12);
};
