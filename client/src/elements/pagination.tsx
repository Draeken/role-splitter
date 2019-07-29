import { ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { merge, mergeProps } from '../utils/utils';

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  activePage: number;
  pageDisplayed: number;
  // beforeComponent: any;
  // afterComponent: any;
  stepComponent: (activePage: number) => JSX.Element
}

export interface PaginationTheme {
  pagination: {};
}

const defaultTheme = (theme: any): PaginationTheme => merge({}, theme);

const PaginationClass = (_theme: PaginationTheme) => ({
  className: css`
    display: flex;
    justify-content: space-evenly;
  `,
});

/**
 * Pagination:
 * "active": Current Day
 * number of displayed step (eg: `< 4 5 6` => 3)
 * step component
 * before component
 * after component
 */
export const Pagination: React.FunctionComponent<PaginationProps> = props => {
  const { activePage, pageDisplayed, stepComponent, ...defaultHostProps } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(PaginationClass(theme), defaultHostProps);
  return (
    <div {...hostProps}>
      {Array(pageDisplayed)
        .fill(undefined)
        .map((_, i) => stepComponent(activePage + i))}
    </div>
  );
};

const DateStepClassname = (_theme: any) => ({
  className: css`
    padding: 5 14;
  `
});

export const DateStep: React.FunctionComponent<{ offset: number } & React.HTMLAttributes<HTMLDivElement>> = props => {
  const { offset, ...defaultHostProps } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(DateStepClassname(theme), defaultHostProps);
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return <div {...hostProps}>{date.getDate()}</div>
}
