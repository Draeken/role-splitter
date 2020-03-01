import { createContext, Dispatch } from 'react';

export interface AppState {}

type Action = ActionURLChanged;

export class ActionURLChanged {
  constructor(public newURL: string) {}
}

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
