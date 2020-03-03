import { useEffect } from 'react';

export const useLocationListener = (CB: (pathname: string[]) => void) => {
  useEffect(() => {
    CB(window.location.pathname.split('/'));
  }, [window.location.href]);
};
