import { createContext, Dispatch } from 'react';
import { RouterAction, RouterActionURLChanged } from './router-actions';

export interface RouterState {}

export const RouterStateContext = createContext<{
  state: RouterState;
  dispatch: Dispatch<RouterAction>;
}>({
  state: {},
  dispatch: () => {},
});

export const routerReducer = (
  state: RouterState,
  action: RouterAction,
  _dispatch: (action: RouterAction) => void
): RouterState => {
  if (action instanceof RouterActionURLChanged) {
    return state;
  }
  return state;
};
