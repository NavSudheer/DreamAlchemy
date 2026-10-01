import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors, spacing } from '@/utils/theme';
import { isItemSaved, SavedItemType, toggleSavedItem } from '@/services/savedItems';

interface SaveItemButtonProps {
  itemId: string;
  type: SavedItemType;
}

export default function SaveItemButton({ itemId, type }: SaveItemButtonProps) {
  const { isDark } = useTheme();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;

    isItemSaved(type, itemId).then(value => {
      if (active) {
        setSaved(value);
      }
    });

    return () => {
      active = false;
    };
  }, [itemId, type]);

  const handlePress = async () => {
    const updatedItems = await toggleSavedItem(type, itemId);
    setSaved(updatedItems.some(item => item.type === type && item.itemId === itemId));
  };

  return (
    <Pressable
      accessibilityLabel={saved ? 'Remove from saved items' : 'Save item'}
      accessibilityRole="button"
      onPress={handlePress}
      style={[
        styles.button,
        { backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[100] },
      ]}
    >
      <Ionicons
        color={saved ? Colors.dreamAmber : isDark ? Colors.neutral[200] : Colors.neutral[600]}
        name={saved ? 'bookmark' : 'bookmark-outline'}
        size={20}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
