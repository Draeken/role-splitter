import { createContext, Dispatch } from 'react';
import { RouterAction, RouterActionURLChanged } from './router-actions';

export interface RouterState {
  focus: string;
}

export const RouterStateContext = createContext<{
  state: RouterState;
  dispatch: Dispatch<RouterAction>;
}>({
  state: { focus: 'root' },
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
