import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDreams } from '../../utils/storage';
import { getSavedItems } from '../savedItems';
import { localBirthProfileStore, readLocalAstrologyBundle } from '../astrologyStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
}));

const getItemMock = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;

describe('local persistence recovery', () => {
  beforeEach(() => {
    getItemMock.mockReset();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns empty collections for malformed or non-array journal data', async () => {
    getItemMock.mockResolvedValueOnce('{malformed');
    await expect(getDreams()).resolves.toEqual([]);

    getItemMock.mockResolvedValueOnce('{"unexpected":true}');
    await expect(getDreams()).resolves.toEqual([]);
  });

  it('returns an empty collection for non-array saved-item data', async () => {
    getItemMock.mockResolvedValueOnce('{"unexpected":true}');
    await expect(getSavedItems()).resolves.toEqual([]);
  });

  it('isolates malformed private Astrology records without throwing', async () => {
    getItemMock.mockResolvedValue('{malformed');

    await expect(localBirthProfileStore.read()).resolves.toBeNull();
    await expect(readLocalAstrologyBundle()).resolves.toBeNull();
  });
});
