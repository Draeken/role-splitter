import { useState } from 'react';

export const useAsyncReducer = <T, A>(
  reducer: (state: T, action: A, dispatch: (action: A) => void) => T,
  initialState: T
) => {
  const [state, setState] = useState(initialState);

  const dispatch = (action: A) => {
    const nextState = reducer(state, action, dispatch);
    setState(nextState);
  };

  return { state, dispatch };
};
