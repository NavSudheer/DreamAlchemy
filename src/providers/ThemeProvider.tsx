import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { LightTheme, DarkTheme } from '../utils/theme';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: typeof LightTheme | typeof DarkTheme;
  themeType: ThemeType;
  isDark: boolean;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  themeType: 'system',
  isDark: false,
  setThemeType: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');

  const getTheme = () => {
    if (themeType === 'system') {
      return colorScheme === 'dark' ? DarkTheme : LightTheme;
    }
    return themeType === 'dark' ? DarkTheme : LightTheme;
  };

  const isDark = getTheme().dark;
  const theme = getTheme();

  const value = {
    theme,
    themeType,
    isDark,
    setThemeType,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 