import { css } from 'emotion';
import { isOverlappingSimple } from 'intervals-fn';
import * as React from 'react';
import { ChunkContext } from '../root';
import { mergeProps } from '../utils/utils';

interface DayChunkProps {
  date: number;
}

const rootClass = {
  className: css``,
};

export const DayChunk: React.FunctionComponent<
  DayChunkProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { date, ...defaultHostProps } = props;
  const dateInt = { start: date, end: date + 3600000 * 24 };
  const hostProps = mergeProps(rootClass, defaultHostProps);
  const { chunks, update } = React.useContext(ChunkContext);
  return (
    <div>
      {chunks
        .filter(chunk => isOverlappingSimple(chunk, dateInt))
        .map(chunk => (
          <div key={chunk.start}>{chunk.role}</div>
        ))}
    </div>
  );
};
