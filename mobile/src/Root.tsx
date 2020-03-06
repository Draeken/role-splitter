import React from 'react';
import { useAsyncReducer } from './lib/use-async-reducer.hook';
import { useLocationListener } from './lib/use-location-listener.hook';
import { appReducer, AppStateContext } from './states/app-state';
import { RouterActionURLChanged } from './states/router-actions';
import { routerReducer, RouterStateContext } from './states/router-state';
import { themeReducer, ThemeStateContext } from './states/theme-state';

const Root = () => {
  const appContextValue = useAsyncReducer(appReducer, {});
  const routerContextValue = useAsyncReducer(routerReducer, {});
  const themeContextValue = useAsyncReducer(themeReducer, {});

  useLocationListener(path => routerContextValue.dispatch(new RouterActionURLChanged(path)));

  return (
    <AppStateContext.Provider value={appContextValue}>
      <RouterStateContext.Provider value={routerContextValue}>
        <ThemeStateContext.Provider value={themeContextValue}></ThemeStateContext.Provider>
      </RouterStateContext.Provider>
    </AppStateContext.Provider>
  );
};

export default Root;
