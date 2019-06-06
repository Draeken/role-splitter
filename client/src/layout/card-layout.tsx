import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { CardProps } from '../card/card';
import { merge, mergeProps } from '../util/hoc.util';

interface CardLayoutTheme {
  cardLayout: {
    width: string;
  };
}

interface CardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

const defaultTheme = (theme: any = { layout: {} }): CardLayoutTheme =>
  merge(
    {
      cardLayout: {
        width: '80%',
      },
    } as CardLayoutTheme,
    theme
  );

const themeToClassname = (theme: CardLayoutTheme) => ({
  className: css`
    width: ${theme.cardLayout.width};
  `,
});

const hostClassname = {
  className: css`
    display: flex;
    justify-content: center;
  `,
};

class CardLayoutImpl extends React.PureComponent<CardLayoutProps> {
  render() {
    const { theme: incomingTheme, children, ...defaultHostProps } = this.props;
    const theme = defaultTheme(incomingTheme);
    const innerProps = mergeProps(
      defaultHostProps,
      themeToClassname(theme),
      CardProps({ customTheme: theme })
    );
    console.log('rended')
    return (
      <div {...hostClassname}>
        <div {...innerProps}>{children}</div>
      </div>
    );
  }
}

export const CardLayout = withTheme(CardLayoutImpl);
