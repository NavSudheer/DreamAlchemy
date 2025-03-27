import { Route } from 'expo-router/build/types';

// Define our route params (what information we need for each route)
export type AppRouteParams = {
  // Tab routes
  '/(tabs)': undefined;
  '/(tabs)/index': undefined;
  '/(tabs)/history': undefined;
  '/(tabs)/explore': undefined;
  '/(tabs)/dictionary': undefined;

  // Non-tab routes
  '/(tabs)/technique/[id]': { id: string };
};

// Create strongly typed route names
export type AppRoutes = keyof AppRouteParams;

// Helper type for route params
export type RouteParams<T extends AppRoutes> = AppRouteParams[T];

// Helper function to create type-safe navigation params
export function createNavigation<T extends AppRoutes>(
  route: T,
  params?: RouteParams<T>
): { pathname: T; params: RouteParams<T> } | T {
  if (params) {
    return {
      pathname: route,
      params
    };
  }
  return route;
} 