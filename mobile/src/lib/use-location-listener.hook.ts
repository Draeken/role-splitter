import { useEffect } from 'react';

/**
 * Is triggererd only after an URL update (which would cause the whole app to re-render)
 *
 * @param CB is called with current location pathname.
 */
export const useLocationListener = (CB: (pathname: string[]) => void) => {
  useEffect(() => {
    CB(window.location.pathname.split('/'));
  }, [CB]);
};
