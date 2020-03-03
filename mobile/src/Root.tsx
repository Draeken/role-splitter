import React from 'react';
import { useAsyncReducer } from './lib/use-async-reducer.hook';
import { AppStateContext, appReducer } from './app-state/app-state';
import { useLocationListener } from './lib/use-location-listener.hook';
import { ActionURLChanged } from './app-state/actions';

const Root = () => {
  const appContextValue = useAsyncReducer(appReducer, {});
  useLocationListener(path => appContextValue.dispatch(new ActionURLChanged(path)));

  return <AppStateContext.Provider value={appContextValue}></AppStateContext.Provider>;
};

export default Root;
