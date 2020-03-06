import React from 'react';
import AppBar from './components/app-bar';
import AppCanvas from './components/app-canvas';
import AssistiveBar from './components/assistive-bar';

const AppComponent = () => {
  return (
    <>
      <AppBar />
      <AppCanvas />
      <AssistiveBar />
    </>
  );
};

export default AppComponent;
