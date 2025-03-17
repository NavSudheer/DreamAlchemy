import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dream } from '../types';

const DREAMS_STORAGE_KEY = 'dreams';

/**
 * Save a dream to AsyncStorage
 */
export const saveDream = async (dream: Dream): Promise<void> => {
  try {
    // Get existing dreams
    const dreams = await getDreams();
    
    // Add new dream to the beginning of the array
    const updatedDreams = [dream, ...dreams];
    
    // Save to AsyncStorage
    await AsyncStorage.setItem(DREAMS_STORAGE_KEY, JSON.stringify(updatedDreams));
  } catch (error) {
    console.error('Error saving dream:', error);
  }
};

/**
 * Get all dreams from AsyncStorage
 */
export const getDreams = async (): Promise<Dream[]> => {
  try {
    const dreamsJson = await AsyncStorage.getItem(DREAMS_STORAGE_KEY);
    
    if (!dreamsJson) {
      return [];
    }
    
    const dreams = JSON.parse(dreamsJson) as Dream[];
    
    // Convert string timestamps back to Date objects
    return dreams.map(dream => ({
      ...dream,
      timestamp: new Date(dream.timestamp),
      analysis: dream.analysis ? {
        ...dream.analysis,
        timestamp: new Date(dream.analysis.timestamp)
      } : undefined
    }));
  } catch (error) {
    console.error('Error getting dreams:', error);
    return [];
  }
};

/**
 * Delete a dream from AsyncStorage
 */
export const deleteDream = async (dreamId: string): Promise<void> => {
  try {
    const dreams = await getDreams();
    const updatedDreams = dreams.filter(dream => dream.id !== dreamId);
    await AsyncStorage.setItem(DREAMS_STORAGE_KEY, JSON.stringify(updatedDreams));
  } catch (error) {
    console.error('Error deleting dream:', error);
  }
};

/**
 * Clear all dreams from AsyncStorage
 */
export const clearDreams = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(DREAMS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing dreams:', error);
  }
}; 