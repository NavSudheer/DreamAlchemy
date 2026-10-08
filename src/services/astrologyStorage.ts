import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalAstrologyBundle, LocalBirthProfileStore } from '../types/astrology';

const PROFILE_KEY = 'dreamalchemy.astrology.profile.v1';
const BUNDLE_KEY = 'dreamalchemy.astrology.bundle.v1';

export const localBirthProfileStore: LocalBirthProfileStore = {
  async read() {
    const stored = await AsyncStorage.getItem(PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  },
  async write(profile) {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },
  async delete() {
    await AsyncStorage.multiRemove([PROFILE_KEY, BUNDLE_KEY]);
  },
};

export const readLocalAstrologyBundle = async (): Promise<LocalAstrologyBundle | null> => {
  const stored = await AsyncStorage.getItem(BUNDLE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const writeLocalAstrologyBundle = async (bundle: LocalAstrologyBundle): Promise<void> => {
  await AsyncStorage.multiSet([
    [PROFILE_KEY, JSON.stringify(bundle.profile)],
    [BUNDLE_KEY, JSON.stringify(bundle)],
  ]);
};

export const deleteLocalAstrologyData = async (): Promise<void> => {
  await AsyncStorage.multiRemove([PROFILE_KEY, BUNDLE_KEY]);
};
