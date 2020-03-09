import React, { useContext } from 'react';
import { RouterStateContext } from '../states/router-state';

const AppCanvas = () => {
  const { state } = useContext(RouterStateContext);
  return (
    <main>Main content here.</main>
  );
};

export default AppCanvas;
