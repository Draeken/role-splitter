import { ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { merge, mergeProps, pipe } from '../utils/utils';

interface BaseLayoutTheme {
  layout: {
    backgroundColor: string;
    color: string;
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        palette: {
          surface: {
            background: '#FFF',
            on: '#000',
          },
        },
      },
      theme
    ),
  (theme: any) =>
    merge(
      {
        layout: {
          backgroundColor: theme.palette.surface.background,
          color: theme.palette.surface.on,
        },
      } as BaseLayoutTheme,
      theme
    )
);

const themeToClassname = (theme: BaseLayoutTheme) => ({
  className: css`
    background-color: ${theme.layout.backgroundColor};
    color: ${theme.layout.color};
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  `,
});

export const goldenNumber = 1.618;

export const BaseLayoutProps = () => {
  const theme = defaultTheme(React.useContext(ThemeContext));
  return mergeProps(themeToClassname(theme));
};
