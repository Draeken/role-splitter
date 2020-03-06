import { createContext, Dispatch } from 'react';
import { AppAction } from './app-actions';

export interface AppState {}

export const AppStateContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: {},
  dispatch: () => {},
});

export const appReducer = (
  state: AppState,
  action: AppAction,
  _dispatch: (action: AppAction) => void
): AppState => {
  if (action) {
    return state;
  }
  return state;
};
