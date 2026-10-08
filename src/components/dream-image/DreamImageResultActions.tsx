import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Button, { ButtonVariant } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import {
  DREAM_IMAGE_RESULT_ACTIONS_BUNDLE,
  DreamImageResultActionKey,
  getResultActionCopy,
} from '@/data/dreamImageResultActionsCopy';
import { Colors, spacing } from '@/utils/theme';

export type DreamImageResultActionHandlers = Partial<Record<DreamImageResultActionKey, () => void>>;

interface DreamImageResultActionsProps {
  handlers: DreamImageResultActionHandlers;
  disabled?: boolean;
}

const ACTION_VARIANTS: Record<DreamImageResultActionKey, ButtonVariant> = {
  regenerate: 'secondary',
  saveLocally: 'primary',
  share: 'outline',
  delete: 'error',
};

export function DreamImageResultActions({ handlers, disabled = false }: DreamImageResultActionsProps) {
  const { isDark } = useTheme();
  const textColor = isDark ? Colors.neutral[100] : Colors.neutral[800];
  const muted = isDark ? Colors.neutral[300] : Colors.neutral[600];
  const availableActions = (Object.keys(handlers) as DreamImageResultActionKey[]).filter(key => handlers[key]);

  const perform = (key: DreamImageResultActionKey) => {
    const handler = handlers[key];
    if (!handler) return;
    const copy = getResultActionCopy(key);
    if (!copy.confirmation) return handler();

    Alert.alert(copy.confirmation.dialogTitle, copy.confirmation.dialogMessage, [
      { text: copy.confirmation.cancelLabel, style: 'cancel' },
      { text: copy.confirmation.confirmLabel, style: key === 'delete' ? 'destructive' : 'default', onPress: handler },
    ]);
  };

  if (!availableActions.length) return null;

  return (
    <Card style={styles.card}>
      <Text variant="h4" color={textColor}>{DREAM_IMAGE_RESULT_ACTIONS_BUNDLE.title}</Text>
      <Text variant="body2" color={muted} style={styles.subtitle}>{DREAM_IMAGE_RESULT_ACTIONS_BUNDLE.subtitle}</Text>
      <View style={styles.actions}>
        {availableActions.map(key => {
          const copy = getResultActionCopy(key);
          return (
            <Button
              key={key}
              variant={ACTION_VARIANTS[key]}
              fullWidth
              isDisabled={disabled}
              accessibilityLabel={copy.accessibilityLabel}
              accessibilityHint={copy.accessibilityHint}
              onPress={() => perform(key)}
            >
              {copy.label}
            </Button>
          );
        })}
      </View>
      <Text variant="caption" color={muted} style={styles.privacy}>{DREAM_IMAGE_RESULT_ACTIONS_BUNDLE.privacyGuarantee}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing[4] },
  subtitle: { marginTop: spacing[1] },
  actions: { gap: spacing[2], marginTop: spacing[4] },
  privacy: { lineHeight: 18, marginTop: spacing[3] },
});
