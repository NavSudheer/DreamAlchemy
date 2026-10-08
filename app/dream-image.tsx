import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { DREAM_IMAGE_PROMPT_TEMPLATES, getDefaultPromptTemplate } from '@/data/dreamImagePromptTemplates';
import { DREAM_IMAGE_STYLE_LIST } from '@/data/dreamImageStyleMetadata';
import { DREAM_IMAGE_CONSENT_COPY, DREAM_IMAGE_UNAVAILABLE_COPY } from '@/data/dreamImageConsentCopy';
import { DREAM_IMAGE_SAFETY_CHECKLIST } from '@/data/dreamImageSafetyGuidelines';
import { getDreamImageAvailability } from '@/services/dreamImage';
import { DreamImageStyle } from '@/types/dreamImage';
import { BorderRadius, Colors, spacing } from '@/utils/theme';

export default function DreamImageScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const defaultTemplate = getDefaultPromptTemplate();
  const [templateId, setTemplateId] = useState(defaultTemplate.id);
  const [style, setStyle] = useState<DreamImageStyle>(defaultTemplate.recommendedStyle);
  const availability = getDreamImageAvailability();
  const template = useMemo(
    () => DREAM_IMAGE_PROMPT_TEMPLATES.find(item => item.id === templateId) ?? defaultTemplate,
    [defaultTemplate, templateId],
  );

  const surface = isDark ? Colors.neutral[800] : Colors.neutral[50];
  const selectedSurface = isDark ? Colors.primary[900] : Colors.primary[50];
  const textColor = isDark ? Colors.neutral[100] : Colors.neutral[800];
  const muted = isDark ? Colors.neutral[300] : Colors.neutral[600];

  const chooseTemplate = (id: string, recommendedStyle: DreamImageStyle) => {
    setTemplateId(id);
    setStyle(recommendedStyle);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }]}>
      <Header title="Dream Image Studio" leftIcon="arrow-back" onLeftPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="body1" color={muted} style={styles.intro}>
          Prepare an optional abstract visual reflection from curated scenes. Your raw dream text is never requested or included.
        </Text>

        {!availability.available && (
          <Card style={styles.notice} backgroundColor={surface}>
            <Text variant="caption" color={muted}>{DREAM_IMAGE_UNAVAILABLE_COPY.badgeLabel}</Text>
            <Text variant="subtitle1" color={textColor} style={styles.noticeText}>{DREAM_IMAGE_UNAVAILABLE_COPY.title}</Text>
            <Text variant="body2" color={muted} style={styles.noticeText}>
              {DREAM_IMAGE_UNAVAILABLE_COPY.description}
            </Text>
            <Text variant="caption" color={muted} style={styles.noticeText}>{DREAM_IMAGE_UNAVAILABLE_COPY.safeBrowsingNotice}</Text>
          </Card>
        )}

        <Card style={styles.notice} backgroundColor={surface}>
          <Text variant="subtitle1" color={textColor}>Privacy and safety boundaries</Text>
          {DREAM_IMAGE_SAFETY_CHECKLIST.map(item => (
            <View key={item.id} style={styles.checklistItem}>
              <Text variant="subtitle2" color={textColor}>✓ {item.label}</Text>
              <Text variant="caption" color={muted} style={styles.optionText}>{item.recommendedSummary}</Text>
            </View>
          ))}
        </Card>

        <Text variant="h4" color={textColor} style={styles.heading}>Choose a curated scene</Text>
        {DREAM_IMAGE_PROMPT_TEMPLATES.map(item => {
          const selected = item.id === template.id;
          return (
            <TouchableOpacity
              key={item.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={item.title}
              accessibilityHint={item.description}
              onPress={() => chooseTemplate(item.id, item.recommendedStyle)}
            >
              <Card style={selected ? { ...styles.option, ...styles.selected } : styles.option} backgroundColor={selected ? selectedSurface : surface}>
                <Text variant="subtitle1" color={textColor}>{item.title}</Text>
                <Text variant="body2" color={muted} style={styles.optionText}>{item.description}</Text>
                <Text variant="caption" color={muted}>{item.suggestedAtmosphere}</Text>
              </Card>
            </TouchableOpacity>
          );
        })}

        <Text variant="h4" color={textColor} style={styles.heading}>Choose an art style</Text>
        <View accessibilityRole="radiogroup" style={styles.styleGrid}>
          {DREAM_IMAGE_STYLE_LIST.map(item => {
            const selected = item.style === style;
            return (
              <TouchableOpacity
                key={item.style}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={item.accessibilityLabel}
                accessibilityHint={item.accessibilityHint}
                onPress={() => setStyle(item.style)}
                style={[styles.styleOption, { backgroundColor: selected ? selectedSurface : surface }, selected && styles.selected]}
              >
                <Text variant="subtitle2" color={textColor}>{item.label}</Text>
                <Text variant="caption" color={muted} style={styles.optionText}>{item.shortDescription}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Card style={styles.preview} backgroundColor={surface}>
          <Text variant="h4" color={textColor}>Prepared reflection</Text>
          <Text variant="subtitle2" color={textColor} style={styles.previewLabel}>{template.title} · {style}</Text>
          <Text variant="body2" color={muted} style={styles.prompt}>{template.promptText}</Text>
          <Text variant="caption" color={muted}>
            {DREAM_IMAGE_CONSENT_COPY.consentCheckboxLabel}
          </Text>
          <Text variant="caption" color={muted} style={styles.disclaimer}>{DREAM_IMAGE_CONSENT_COPY.nonInterpretiveDisclaimer}</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing[4], paddingBottom: spacing[8] },
  intro: { lineHeight: 22, marginBottom: spacing[4], textAlign: 'center' },
  notice: { marginBottom: spacing[5], padding: spacing[4] },
  noticeText: { lineHeight: 20, marginTop: spacing[2] },
  checklistItem: { marginTop: spacing[3] },
  heading: { marginBottom: spacing[3], marginTop: spacing[2] },
  option: { marginBottom: spacing[3], padding: spacing[4] },
  selected: { borderColor: Colors.primary[500], borderWidth: 2 },
  optionText: { lineHeight: 19, marginVertical: spacing[1] },
  styleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], marginBottom: spacing[5] },
  styleOption: { borderRadius: BorderRadius.lg, padding: spacing[3], width: '47%' },
  preview: { padding: spacing[4] },
  previewLabel: { marginTop: spacing[3], textTransform: 'capitalize' },
  prompt: { lineHeight: 21, marginVertical: spacing[3] },
  disclaimer: { fontStyle: 'italic', marginTop: spacing[2] },
});
