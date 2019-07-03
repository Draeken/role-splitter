import { breakpoints, BreakpointsEnum, ResponsiveTheme } from '@autoschedule/react-elements';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './root';
import { merge } from './utils/utils';

const emotionTheme = {
  layout: {
    gutter: '24px',
    margin: '24px',
  },
  dialog: {
    fullscreen: false,
  },
  appBar: {
    backgroundColor: '#232321',
    elevation: 0,
    totalHeight: '150px',
  },
  effectRiple: {
    color: '#613154',
  },
  palette: {
    primary: {
      main: '#1a2873',
      lightVariant: '#757DE8',
      darkVariant: '#002984',
      on: '#613154',
    },
    secondary: {
      // Copy of primary
      main: '#1a2873',
      lightVariant: '#B6FFFF',
      darkVariant: '#4BA3C7',
      on: '#FFFFFF',
    },
    surface: {
      main: '#424242',
      background: '#232321',
      on: '#1a2873',
      highEmphase: 'DD',
      mediumEmphase: '99',
      disabled: '61',
    },
  },
};

const breakKeyToNewTheme = (_: any, keys: { [key: string]: boolean }): any => {
  if (keys['' + BreakpointsEnum.small2]) {
    return {
      layout: { gutter: '16px', margin: '16px' },
      dialog: { fullscreen: true },
    };
  }
  if (keys['' + BreakpointsEnum.medium1]) {
    return {
      dialog: { fullscreen: false },
    };
  }
  return {
    layout: { gutter: '24px', margin: '24px' },
    dialog: { fullscreen: false },
  };
};

const handleBreakpoints = (theme: any, keys: { [key: string]: boolean }) => {
  return merge(theme, breakKeyToNewTheme(theme, keys));
};

const rules = [
  {
    key: '' + BreakpointsEnum.small2,
    query: `(max-width: ${breakpoints[BreakpointsEnum.small2]}px)`,
  },
  {
    key: '' + BreakpointsEnum.medium1,
    query: `(max-width: ${breakpoints[BreakpointsEnum.medium1]}px)`,
  },
];

const app = (
  <ResponsiveTheme baseTheme={emotionTheme} rules={rules} handleBreakpoint={handleBreakpoints}>
    <Root />
  </ResponsiveTheme>
);

ReactDOM.render(app, document.getElementById('app'));
