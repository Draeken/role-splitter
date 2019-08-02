import { ThemeContext, Typography } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { goldenNumber } from '../layout/base-layout';
import { CardProps } from '../layout/card';
import { mergeProps } from '../utils/utils';
import { Chunk } from './chunks-manager';

interface ChunkViewProps {
  chunk: Chunk;
}

const baseHeight = 100;

const ChunkViewRootClass = {
  className: css`
    width: ${baseHeight * goldenNumber}px;
    height: ${baseHeight}px;
  `,
};

const timestampToTime = (timestamp: number) => {
  const d = new Date(timestamp);
  return `${d
    .getHours()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${d
    .getMinutes()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
};

export const ChunkView: React.FunctionComponent<
  ChunkViewProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { chunk, ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const start = React.useMemo(() => timestampToTime(chunk.start), [chunk.start]);
  const end = React.useMemo(() => timestampToTime(chunk.end), [chunk.end]);
  const hostProps = mergeProps(
    CardProps({ customTheme: theme }),
    ChunkViewRootClass,
    defaultHostProps
  );
  return (
    <div {...hostProps}>
      <Typography scale={'H6'}>{chunk.role}</Typography>
      <Typography baselineTop={16} scale={'Overline'}>[{start} - {end}]</Typography>
      <Typography scale={'Caption'}>{chunk.label}</Typography>
    </div>
  );
};
