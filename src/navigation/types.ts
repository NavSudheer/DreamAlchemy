declare global {
  namespace ReactNavigation {
    interface RootParamList {
      // Tab Routes
      '/(tabs)': undefined;
      '/(tabs)/index': undefined;
      '/(tabs)/history': undefined;
      '/(tabs)/explore': undefined;
      '/(tabs)/dictionary': undefined;
      
      // Technique Routes (not tabs)
      '/(tabs)/technique/[id]': {
        id: string;
      };
    }
  }
}

// Keep this empty export to make the file a module
export {} 