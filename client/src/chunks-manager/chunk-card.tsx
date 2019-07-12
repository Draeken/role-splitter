import { ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { goldenNumber } from '../layout/base-layout';
import { CardProps } from '../layout/card';
import { mergeProps } from '../utils/utils';
import { Chunk } from './chunks-manager';

interface ChunkCardProps {
  chunk: Chunk;
}

const baseHeight = 100;

const ChunkCardRootClass = {
  className: css`
    width: ${baseHeight * goldenNumber}px;
    height: ${baseHeight}px;
  `,
};

export const ChunkCard: React.FunctionComponent<
  ChunkCardProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { chunk, ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const hostProps = mergeProps(
    CardProps({ customTheme: theme }),
    ChunkCardRootClass,
    defaultHostProps
  );
  return <div {...hostProps}>{chunk.role} | {chunk.start} - {chunk.end}</div>;
};
