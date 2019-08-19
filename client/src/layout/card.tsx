import { ElevationProps, PaletteTheme } from '@autoschedule/react-elements';
import { css } from 'emotion';
import { merge, mergeProps, pipe } from '../utils/utils';

export interface CardTheme {
  card: {
    elevation: number;
    color: string;
    backgroundColor: string;
    shape: string;
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge({ palette: { surface: { main: '#FFF', on: '#00000099', highEmphase: 'DD' } } } as PaletteTheme, theme),
  (theme: any) =>
    merge(
      {
        card: {
          elevation: 1,
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.on + theme.palette.surface.mediumEmphase,
          shape: css`
            border-radius: 4px;
          `,
        },
      } as CardTheme,
      theme
    )
);

const themeToClassname = (theme: CardTheme) => ({
  className: css`
    background-color: ${theme.card.backgroundColor};
    color: ${theme.card.color};
    ${theme.card.shape};
  `,
});

/**
 * Maybe this component is useless, hook in ElevationPropsHover depends on isClickable props, so it break a hook's rule.
 * component is too simple.
 */
export const CardProps = (options: { customTheme?: any }) => {
  const { customTheme } = options;
  const theme: CardTheme = defaultTheme(customTheme);
  const card = theme.card;
  const elevation = ElevationProps(card.elevation, theme);
  return mergeProps(elevation, themeToClassname(theme));
};
