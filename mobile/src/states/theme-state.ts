import { createContext, Dispatch } from 'react';
import { ThemeAction } from './theme-actions';

export interface ThemeState {}

export const ThemeStateContext = createContext<{
  state: ThemeState;
  dispatch: Dispatch<ThemeAction>;
}>({
  state: {},
  dispatch: () => {},
});

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
  _dispatch: (action: ThemeAction) => void
): ThemeState => {
  if (action) {
    return state;
  }
  return state;
};
