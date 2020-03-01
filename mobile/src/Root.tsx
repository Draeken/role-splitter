import React from 'react';
import { useAsyncReducer } from '../lib/use-async-reducer.hook';
import { AppStateContext, appReducer } from './app-state/app-state';

const Root = () => {
  const appContextValue = useAsyncReducer(appReducer, {});
  return <AppStateContext.Provider value={appContextValue}></AppStateContext.Provider>;
};

export default Root;
