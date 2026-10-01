import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_ITEMS_STORAGE_KEY = 'saved-items';

export type SavedItemType = 'dictionary' | 'technique' | 'psychology';

export interface SavedItem {
  id: string;
  itemId: string;
  type: SavedItemType;
  savedAt: number;
}

const createSavedItemId = (type: SavedItemType, itemId: string) => `${type}:${itemId}`;

export const getSavedItems = async (): Promise<SavedItem[]> => {
  try {
    const savedItemsJson = await AsyncStorage.getItem(SAVED_ITEMS_STORAGE_KEY);
    return savedItemsJson ? JSON.parse(savedItemsJson) as SavedItem[] : [];
  } catch (error) {
    console.error('Error getting saved items:', error);
    return [];
  }
};

export const isItemSaved = async (type: SavedItemType, itemId: string): Promise<boolean> => {
  const savedItems = await getSavedItems();
  return savedItems.some(item => item.id === createSavedItemId(type, itemId));
};

export const saveItem = async (type: SavedItemType, itemId: string): Promise<SavedItem[]> => {
  try {
    const savedItems = await getSavedItems();
    const id = createSavedItemId(type, itemId);

    if (savedItems.some(item => item.id === id)) {
      return savedItems;
    }

    const updatedItems = [{ id, itemId, type, savedAt: Date.now() }, ...savedItems];
    await AsyncStorage.setItem(SAVED_ITEMS_STORAGE_KEY, JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error('Error saving item:', error);
    return getSavedItems();
  }
};

export const removeSavedItem = async (type: SavedItemType, itemId: string): Promise<SavedItem[]> => {
  try {
    const savedItems = await getSavedItems();
    const updatedItems = savedItems.filter(item => item.id !== createSavedItemId(type, itemId));
    await AsyncStorage.setItem(SAVED_ITEMS_STORAGE_KEY, JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error('Error removing saved item:', error);
    return getSavedItems();
  }
};

export const toggleSavedItem = async (type: SavedItemType, itemId: string): Promise<SavedItem[]> => {
  return (await isItemSaved(type, itemId))
    ? removeSavedItem(type, itemId)
    : saveItem(type, itemId);
};
