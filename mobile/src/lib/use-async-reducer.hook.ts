import { useState, useMemo } from 'react';

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


export interface ComponentInfo {
  name: string;
  type: 'PRIMARY' | 'SECONDARY';
  element: JSX.Element;
  primary: ComponentInfo[];
  secondary: ComponentInfo[];
}

export interface ComponentLibrary {
  [key: string]: ComponentInfo;
}

export const useFocusResolution = <T>(componentGraph: T, focus: string) => {
  const graph = useMemo(() => {

  }, [componentGraph, focus]);

  return graph;
};
