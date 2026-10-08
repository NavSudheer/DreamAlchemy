import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import {
  DREAM_IMAGE_PROGRESS_BUNDLE,
  DreamImageProgressState,
  getDreamImageProgressCopy,
} from '@/data/dreamImageProgressCopy';
import { BorderRadius, Colors, spacing } from '@/utils/theme';

interface DreamImageProgressProps {
  state: DreamImageProgressState;
}

export function DreamImageProgress({ state }: DreamImageProgressProps) {
  const { isDark } = useTheme();
  const copy = getDreamImageProgressCopy(state);
  const textColor = isDark ? Colors.neutral[100] : Colors.neutral[800];
  const muted = isDark ? Colors.neutral[300] : Colors.neutral[600];
  const track = isDark ? Colors.neutral[700] : Colors.neutral[200];
  const progressPercent = `${Math.round((copy.stepNumber / copy.totalSteps) * 100)}%` as `${number}%`;

  return (
    <Card style={styles.card}>
      <View style={styles.headingRow}>
        <ActivityIndicator color={Colors.primary[500]} />
        <View style={styles.headingText}>
          <Text variant="h4" color={textColor}>{DREAM_IMAGE_PROGRESS_BUNDLE.title}</Text>
          <Text variant="caption" color={muted}>Step {copy.stepNumber} of {copy.totalSteps}</Text>
        </View>
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={copy.accessibilityLabel}
        accessibilityHint={copy.accessibilityHint}
        accessibilityValue={{ min: 1, max: copy.totalSteps, now: copy.stepNumber, text: copy.shortLabel }}
        style={[styles.track, { backgroundColor: track }]}
      >
        <View style={[styles.fill, { width: progressPercent }]} />
      </View>
      <Text variant="subtitle1" color={textColor} style={styles.label}>{copy.label}</Text>
      <Text variant="body2" color={muted} style={styles.description}>{copy.description}</Text>
      <Text variant="caption" color={muted} accessibilityLiveRegion="polite" style={styles.srStatus}>
        {copy.liveRegionAnnouncement}
      </Text>
      <Text variant="caption" color={muted} style={styles.privacy}>{copy.privacyReassurance}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing[4] },
  headingRow: { alignItems: 'center', flexDirection: 'row' },
  headingText: { flex: 1, marginLeft: spacing[3] },
  track: { borderRadius: BorderRadius.pill, height: 8, marginTop: spacing[4], overflow: 'hidden' },
  fill: { backgroundColor: Colors.primary[500], height: '100%' },
  label: { marginTop: spacing[3] },
  description: { lineHeight: 20, marginTop: spacing[1] },
  srStatus: { marginTop: spacing[2] },
  privacy: { fontStyle: 'italic', lineHeight: 18, marginTop: spacing[3] },
});
