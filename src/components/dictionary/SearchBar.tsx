import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Platform, 
  Keyboard 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../providers/ThemeProvider';
import { BorderRadius, Colors, spacing } from '../../utils/theme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search for dream symbols...' 
}) => {
  const [searchText, setSearchText] = useState('');
  const { isDark } = useTheme();
  
  const handleChangeText = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };
  
  const handleClear = () => {
    setSearchText('');
    onSearch('');
    Keyboard.dismiss();
  };
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.searchBar,
        { 
          backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[100],
          borderColor: isDark ? Colors.neutral[700] : Colors.neutral[300]
        }
      ]}>
        <Ionicons
          name="search"
          size={20}
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          style={styles.searchIcon}
        />
        
        <TextInput
          style={[
            styles.input,
            { color: isDark ? Colors.neutral[100] : Colors.neutral[800] }
          ]}
          placeholder={placeholder}
          placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]}
          value={searchText}
          onChangeText={handleChangeText}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
        
        {searchText.length > 0 && Platform.OS === 'android' && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons
              name="close-circle"
              size={20}
              color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing[3],
    height: 50,
  },
  searchIcon: {
    marginRight: spacing[2],
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  clearButton: {
    padding: spacing[1],
  }
});

export default SearchBar; 