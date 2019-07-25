import { PaddingProps, ThemeContext, Typography } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { ChunkManager } from './chunks-manager/chunks-manager';
import { mergeProps } from './utils/utils';

const themeToTitleStyles = (theme: any) => {
  return {
    className: css`
      color: ${theme.palette.surface.on};
      margin-top: 16px;
    `,
  };
};

const containerStyles = {
  className: css`
    display: flex;
  `,
};

const childStyles = {
  className: css`
    flex-grow: 1;
    flex-basis: 0;
  `,
};

export const TrackNMonitor: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = props => {
  const { ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const titleProps = mergeProps(PaddingProps(theme), themeToTitleStyles(theme));
  return (
    <div {...defaultHostProps}>
      <div {...containerStyles}>
        <div {...childStyles}>
          <Typography {...titleProps} scale={'H3'}>
            Track
          </Typography>
          <ChunkManager />
        </div>
        <div {...childStyles}>
          <Typography {...titleProps} scale={'H3'}>
            Monitor
          </Typography>
        </div>
      </div>
    </div>
  );
};
