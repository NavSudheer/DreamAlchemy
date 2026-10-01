import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import Text from '../ui/Text';
import Card from '../ui/Card';
import { getCheckpointsByCategory, PsychologyCategory as CheckpointCategory } from '../../data/psychologyCheckpoints';
import { getConnectionsByCategory, PsychologyCategory } from '../../data/psychologyArticleConnections';
import { getPromptsBySection, PsychologyPromptSection } from '../../data/psychologyReflectionPrompts';
import { getGlossaryTermsByCategory, PsychologyCategory as GlossaryCategory } from '../../data/psychologyGlossary';
import { getSymbolById } from '../../data/dreamSymbols';
import { TECHNIQUE_DATA } from '../dream-techniques/techniques';

type LearningCategory = PsychologyCategory;

const checkpointCategories: Record<LearningCategory, CheckpointCategory> = {
  scientific: 'science',
  theories: 'theories',
  types: 'dream-types',
  cultural: 'culture',
};

const promptSections: Record<LearningCategory, PsychologyPromptSection> = {
  scientific: 'scientific',
  theories: 'theories',
  types: 'types',
  cultural: 'cultural',
};

const glossaryCategories: Record<LearningCategory, GlossaryCategory> = {
  scientific: 'scientific',
  theories: 'theories',
  types: 'types',
  cultural: 'cultural',
};

interface PsychologyLearningPanelProps {
  category: LearningCategory;
}

export default function PsychologyLearningPanel({ category }: PsychologyLearningPanelProps) {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [answerId, setAnswerId] = useState<string | null>(null);
  const connections = getConnectionsByCategory(category);
  const prompts = getPromptsBySection(promptSections[category]);
  const glossaryTerms = getGlossaryTermsByCategory(glossaryCategories[category]);
  const checkpoint = useMemo(
    () => getCheckpointsByCategory(checkpointCategories[category])[0],
    [category],
  );

  if (!connections || !checkpoint || prompts.length === 0) return null;

  const selectedOption = checkpoint.options.find(option => option.id === answerId);
  const cardColor = isDark ? '#1E1E1E' : colors.surface;
  const textColor = isDark ? '#FFFFFF' : colors.onSurface;
  const mutedColor = isDark ? 'rgba(255, 255, 255, 0.72)' : 'rgba(0, 0, 0, 0.62)';
  const accentSurface = isDark ? '#173B42' : '#E5F6F7';
  const optionSurface = isDark ? '#2A2A2A' : '#F4F4F4';

  return (
    <Card style={StyleSheet.flatten([styles.card, { backgroundColor: cardColor }])}>
      <View style={styles.content}>
        <Text variant="h3" style={[styles.title, { color: textColor }]}>Learn and connect</Text>

        <View style={[styles.reflection, { backgroundColor: accentSurface }]}>
          <Text variant="h4" style={{ color: textColor }}>Reflection</Text>
          <Text variant="body1" style={[styles.question, { color: textColor }]}>{prompts[0].question}</Text>
          <Text variant="body2" style={{ color: mutedColor }}>{prompts[0].considerThis}</Text>
        </View>

        <Text variant="h4" style={[styles.sectionTitle, { color: textColor }]}>Quick check</Text>
        <Text variant="body2" style={[styles.question, { color: mutedColor }]}>{checkpoint.question}</Text>
        {checkpoint.options.map(option => {
          const selected = answerId === option.id;
          const correct = selected && option.id === checkpoint.correctOptionId;
          const incorrect = selected && !correct;
          return (
            <TouchableOpacity
              key={option.id}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setAnswerId(option.id)}
              style={[
                styles.option,
                { backgroundColor: optionSurface },
                correct && styles.correctOption,
                incorrect && styles.incorrectOption,
              ]}
            >
              <Text variant="body2" style={{ color: textColor }}>{option.text}</Text>
            </TouchableOpacity>
          );
        })}
        {selectedOption && (
          <Text variant="body2" style={[styles.feedback, { color: mutedColor }]}>
            {selectedOption.id === checkpoint.correctOptionId ? 'Correct. ' : 'Not quite. '}{checkpoint.explanation}
          </Text>
        )}

        {glossaryTerms.length > 0 && (
          <>
            <Text variant="h4" style={[styles.sectionTitle, { color: textColor }]}>Key terms</Text>
            {glossaryTerms.slice(0, 3).map(term => (
              <View key={term.id} style={[styles.term, { backgroundColor: optionSurface }]}>
                <Text variant="body2" style={[styles.termTitle, { color: textColor }]}>{term.term}</Text>
                <Text variant="body2" style={{ color: mutedColor }}>{term.definition}</Text>
              </View>
            ))}
          </>
        )}

        <Text variant="h4" style={[styles.sectionTitle, { color: textColor }]}>Explore related content</Text>
        <View style={styles.links}>
          {connections.relatedSymbolIds.map(symbolId => {
            const symbol = getSymbolById(symbolId);
            if (!symbol) return null;
            return (
              <TouchableOpacity key={symbolId} accessibilityRole="link" onPress={() => router.push({ pathname: '/symbol/[id]', params: { id: symbolId } })}>
                <Text variant="body2" style={[styles.link, { color: colors.primary }]}>{symbol.name} symbol</Text>
              </TouchableOpacity>
            );
          })}
          {connections.relatedTechniqueIds.map(techniqueId => {
            const technique = TECHNIQUE_DATA[techniqueId];
            if (!technique) return null;
            return (
              <TouchableOpacity key={techniqueId} accessibilityRole="link" onPress={() => router.push({ pathname: '/(tabs)/technique/[id]', params: { id: techniqueId } })}>
                <Text variant="body2" style={[styles.link, { color: colors.primary }]}>{technique.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { margin: 16, marginTop: 8, marginBottom: 8, elevation: 2 },
  content: { padding: 16 },
  title: { marginBottom: 16 },
  reflection: { borderRadius: 12, gap: 8, padding: 12 },
  sectionTitle: { marginTop: 20, marginBottom: 8 },
  question: { lineHeight: 21, marginBottom: 10 },
  option: { borderRadius: 10, marginBottom: 8, padding: 12 },
  correctOption: { backgroundColor: '#B7E4C7' },
  incorrectOption: { backgroundColor: '#FFD6D6' },
  feedback: { lineHeight: 20, marginTop: 2 },
  term: { borderRadius: 10, gap: 4, marginBottom: 8, padding: 12 },
  termTitle: { fontWeight: '700' },
  links: { gap: 10 },
  link: { textDecorationLine: 'underline' },
});
