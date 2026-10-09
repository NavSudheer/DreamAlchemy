import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import { DREAM_IMAGE_PROMPT_TEMPLATES, getDefaultPromptTemplate } from '@/data/dreamImagePromptTemplates';
import { DREAM_IMAGE_STYLE_LIST } from '@/data/dreamImageStyleMetadata';
import { DREAM_IMAGE_CONSENT_COPY, DREAM_IMAGE_UNAVAILABLE_COPY } from '@/data/dreamImageConsentCopy';
import { DREAM_IMAGE_SAFETY_CHECKLIST } from '@/data/dreamImageSafetyGuidelines';
import { getAltTextForTemplate } from '@/data/dreamImageAltTextTemplates';
import { getDreamImageFailureCopy, resolveDreamImageFailure } from '@/data/dreamImageFailureCopy';
import { DREAM_IMAGE_GENERATED_DISCLOSURE_BUNDLE } from '@/data/dreamImageGeneratedDisclosureCopy';
import { DreamImageError, generateDreamImage, getDreamImageAvailability } from '@/services/dreamImage';
import {
  canStartDreamImageGeneration,
  INITIAL_DREAM_IMAGE_GENERATION_STATE,
  reduceDreamImageGeneration,
} from '@/services/dreamImageGenerationState';
import { DreamImageProgress } from '@/components/dream-image/DreamImageProgress';
import { DreamImageResultActions } from '@/components/dream-image/DreamImageResultActions';
import { getDreams } from '@/utils/storage';
import { DreamImageStyle } from '@/types/dreamImage';
import { BorderRadius, Colors, spacing } from '@/utils/theme';

export default function DreamImageScreen() {
  const router = useRouter();
  const { dreamId } = useLocalSearchParams<{ dreamId?: string }>();
  const { isDark } = useTheme();
  const defaultTemplate = getDefaultPromptTemplate();
  const [templateId, setTemplateId] = useState(defaultTemplate.id);
  const [style, setStyle] = useState<DreamImageStyle>(defaultTemplate.recommendedStyle);
  const [validatedDreamId, setValidatedDreamId] = useState<string>();
  const [associationChecking, setAssociationChecking] = useState(false);
  const [generation, dispatchGeneration] = useReducer(
    reduceDreamImageGeneration,
    INITIAL_DREAM_IMAGE_GENERATION_STATE,
  );
  const availability = getDreamImageAvailability();
  const unavailableCopy = getDreamImageFailureCopy('provider-unavailable');
  const resultDisclosure = DREAM_IMAGE_GENERATED_DISCLOSURE_BUNDLE;
  const template = useMemo(
    () => DREAM_IMAGE_PROMPT_TEMPLATES.find(item => item.id === templateId) ?? defaultTemplate,
    [defaultTemplate, templateId],
  );

  useEffect(() => {
    let mounted = true;
    if (!dreamId) {
      setValidatedDreamId(undefined);
      setAssociationChecking(false);
      return () => { mounted = false; };
    }
    setAssociationChecking(true);
    void getDreams()
      .then(dreams => {
        if (!mounted) return;
        const exists = dreams.some(dream => dream.id === dreamId && !!dream.analysis);
        setValidatedDreamId(exists ? dreamId : undefined);
      })
      .catch(() => {
        if (mounted) setValidatedDreamId(undefined);
      })
      .finally(() => {
        if (mounted) setAssociationChecking(false);
      });
    return () => { mounted = false; };
  }, [dreamId]);

  useEffect(() => {
    dispatchGeneration({
      type: 'prepare',
      request: {
        dreamId: validatedDreamId ?? '',
        visualReflectionPrompt: template.promptText,
        style,
      },
    });
  }, [style, template.promptText, validatedDreamId]);

  const surface = isDark ? Colors.neutral[800] : Colors.neutral[50];
  const selectedSurface = isDark ? Colors.primary[900] : Colors.primary[50];
  const textColor = isDark ? Colors.neutral[100] : Colors.neutral[800];
  const muted = isDark ? Colors.neutral[300] : Colors.neutral[600];

  const chooseTemplate = (id: string, recommendedStyle: DreamImageStyle) => {
    setTemplateId(id);
    setStyle(recommendedStyle);
  };

  const activeProgress = ['queued', 'moderating', 'rendering', 'finalizing'].includes(generation.phase);

  const createImage = async () => {
    if (!availability.available || !generation.request || !canStartDreamImageGeneration(generation)) return;
    dispatchGeneration({ type: 'start' });
    dispatchGeneration({ type: 'progress', phase: 'rendering' });
    try {
      const result = await generateDreamImage(generation.request, generation.consented);
      dispatchGeneration({ type: 'progress', phase: 'finalizing' });
      dispatchGeneration({ type: 'succeed', result });
    } catch (error) {
      dispatchGeneration({
        type: 'fail',
        message: error instanceof Error ? error.message : 'Image generation failed.',
        code: error instanceof DreamImageError ? error.code : undefined,
      });
    }
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
            <Text variant="subtitle1" color={textColor} style={styles.noticeText}>{unavailableCopy.title}</Text>
            <Text variant="body2" color={muted} style={styles.noticeText}>
              {unavailableCopy.message}
            </Text>
            <Text variant="body2" color={muted} style={styles.noticeText}>{unavailableCopy.recoveryAction}</Text>
            <Text variant="caption" color={muted} style={styles.noticeText}>{unavailableCopy.privacyReassurance}</Text>
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
        <View accessibilityRole="radiogroup">
          {DREAM_IMAGE_PROMPT_TEMPLATES.map(item => {
            const selected = item.id === template.id;
            return (
              <TouchableOpacity
                key={item.id}
                accessibilityRole="radio"
                accessibilityState={{ selected, checked: selected }}
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
        </View>

        <Text variant="h4" color={textColor} style={styles.heading}>Choose an art style</Text>
        <View accessibilityRole="radiogroup" style={styles.styleGrid}>
          {DREAM_IMAGE_STYLE_LIST.map(item => {
            const selected = item.style === style;
            return (
              <TouchableOpacity
                key={item.style}
                accessibilityRole="radio"
                accessibilityState={{ selected, checked: selected }}
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
          <Text variant="subtitle2" color={textColor}>Accessible scene description</Text>
          <Text variant="caption" color={muted} style={styles.optionText}>{getAltTextForTemplate(template.id, style)}</Text>
          <Text variant="caption" color={muted}>
            {DREAM_IMAGE_CONSENT_COPY.consentCheckboxLabel}
          </Text>
          <Text variant="caption" color={muted} style={styles.disclaimer}>{DREAM_IMAGE_CONSENT_COPY.nonInterpretiveDisclaimer}</Text>
        </Card>

        <Card style={styles.generation} backgroundColor={surface}>
          <Text variant="h4" color={textColor}>Optional generation</Text>
          <View style={styles.consentRow}>
            <Switch
              value={generation.consented}
              onValueChange={consented => dispatchGeneration({ type: 'set-consent', consented })}
              accessibilityLabel="Consent to process curated Dream Image scene"
              accessibilityHint="Allows only the selected catalog scene and art style to be sent when generation is available"
            />
            <Text variant="body2" color={muted} style={styles.consentText}>
              {DREAM_IMAGE_CONSENT_COPY.consentCheckboxLabel}
            </Text>
          </View>
          <Text variant="caption" color={muted} style={styles.noticeText}>
            {associationChecking
              ? 'Checking the saved-dream association on this device.'
              : validatedDreamId
              ? 'The saved-dream association stays on this device and is excluded from the provider payload.'
              : 'Generation is available only when this studio is opened from an existing saved dream analysis. Explore and invalid-link modes remain private preparation previews.'}
          </Text>
          <Button
            fullWidth
            isLoading={activeProgress}
            isDisabled={!availability.available || !canStartDreamImageGeneration(generation)}
            accessibilityLabel={availability.available ? DREAM_IMAGE_CONSENT_COPY.confirmButtonLabel : 'Image service unavailable'}
            accessibilityHint="Sends only the selected curated scene and art style when the image service is configured"
            onPress={() => { void createImage(); }}
            style={styles.generateButton}
          >
            {availability.available ? DREAM_IMAGE_CONSENT_COPY.confirmButtonLabel : 'Image Service Unavailable'}
          </Button>
        </Card>

        {activeProgress && <DreamImageProgress state={generation.phase as 'queued' | 'moderating' | 'rendering' | 'finalizing'} />}

        {generation.phase === 'failed' && (() => {
          const failure = resolveDreamImageFailure({
            message: generation.errorMessage,
            code: generation.errorCode,
          });
          return (
            <Card style={styles.generation} backgroundColor={surface}>
              <Text variant="subtitle1" color={textColor}>{failure.title}</Text>
              <Text variant="body2" color={muted} style={styles.noticeText} accessibilityLiveRegion="polite">{failure.message}</Text>
              <Text variant="body2" color={muted} style={styles.noticeText}>{failure.recoveryAction}</Text>
              {failure.retryable && availability.available && canStartDreamImageGeneration(generation) && (
                <Button
                  fullWidth
                  variant="outline"
                  onPress={() => { void createImage(); }}
                  style={styles.generateButton}
                >
                  {failure.actionButtonLabel}
                </Button>
              )}
            </Card>
          );
        })()}

        {generation.phase === 'succeeded' && generation.result && (
          <Card style={styles.generation} backgroundColor={surface}>
            <Text variant="caption" color={muted} accessibilityLabel={resultDisclosure.sections['ai-art-labeling'].accessibilityLabel}>
              {resultDisclosure.artBadgeLabel}
            </Text>
            <Text variant="h4" color={textColor} style={styles.noticeText}>Visual reflection ready</Text>
            <Image
              source={{ uri: generation.result.imageUrl }}
              accessibilityLabel={generation.result.altText}
              style={styles.resultImage}
            />
            <Text variant="caption" color={muted} style={styles.noticeText}>{generation.result.altText}</Text>
            <Text variant="body2" color={textColor} style={styles.disclosureText}>
              {resultDisclosure.conciseNotice}
            </Text>
            <Text variant="caption" color={muted} style={styles.noticeText}>
              {resultDisclosure.privacyGuarantee}
            </Text>
            <Text variant="caption" color={muted} style={styles.noticeText}>
              {resultDisclosure.sections['local-copy-scope'].summary}
            </Text>
            <Text variant="caption" color={muted} style={styles.noticeText}>
              {resultDisclosure.sections['provider-retention-limitations'].summary}
            </Text>
            <DreamImageResultActions
              handlers={{
                regenerate: () => { void createImage(); },
                delete: () => dispatchGeneration({ type: 'clear-result' }),
              }}
            />
          </Card>
        )}
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
  generation: { marginTop: spacing[4], padding: spacing[4] },
  consentRow: { alignItems: 'center', flexDirection: 'row', marginTop: spacing[3] },
  consentText: { flex: 1, lineHeight: 20, marginLeft: spacing[3] },
  generateButton: { marginTop: spacing[3] },
  resultImage: { borderRadius: BorderRadius.lg, height: 280, marginTop: spacing[3], width: '100%' },
  previewLabel: { marginTop: spacing[3], textTransform: 'capitalize' },
  prompt: { lineHeight: 21, marginVertical: spacing[3] },
  disclaimer: { fontStyle: 'italic', marginTop: spacing[2] },
  disclosureText: { lineHeight: 20, marginTop: spacing[3] },
});
