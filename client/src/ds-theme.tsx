import { breakpoints, BreakpointsEnum, ResponsiveTheme } from '@autoschedule/react-elements';
import { merge } from './utils/utils';

export const theme = {
  layout: {
    gutter: '24px',
    margin: '24px',
  },
  chunksManager: {
    daysDisplay: 5,
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
      chunksManager: { daysDisplay: 1 },
      layout: { gutter: '16px', margin: '16px' },
      dialog: { fullscreen: true },
    };
  }
  const greaterThanSmall2 = {
    chunksManager: { daysDisplay: 5 },
    dialog: { fullscreen: false },
  };
  if (keys['' + BreakpointsEnum.medium1]) {
    return { ...greaterThanSmall2 };
  }
  return {
    layout: { gutter: '24px', margin: '24px' },
    ...greaterThanSmall2,
  };
};

export const handleRules = (theme: any, keys: { [key: string]: boolean }) => {
  return merge(theme, breakKeyToNewTheme(theme, keys));
};

export const rules = [
  {
    key: '' + BreakpointsEnum.small2,
    query: `(max-width: ${breakpoints[BreakpointsEnum.small2]}px)`,
  },
  {
    key: '' + BreakpointsEnum.medium1,
    query: `(max-width: ${breakpoints[BreakpointsEnum.medium1]}px)`,
  },
];