import { createContext, Dispatch } from 'react';
import { Action, ActionURLChanged } from './actions';

export interface AppState {}

export const AppStateContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({
  state: {},
  dispatch: () => {},
});

export const appReducer = (
  state: AppState,
  action: Action,
  dispatch: (action: Action) => void
): AppState => {
  if (action instanceof ActionURLChanged) {
    return state;
  }
  return state;
};
