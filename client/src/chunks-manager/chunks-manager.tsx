import { css } from 'emotion';
import * as React from 'react';
import { AppContext } from '../root';
import { mergeProps } from '../utils/utils';
import { ChunkCard } from './chunk-card';

const rootClass = {
  className: css``,
};

export interface Chunk {
  start: number;
  end: number;
  role: string;
  id: string;
}

export const ChunkManager: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { ...defaultHostProps } = props;
  const hostProps = mergeProps(rootClass, defaultHostProps);
  const { appState } = React.useContext(AppContext);

  return (
    <div {...hostProps}>
      {appState.chunks.map(chunk => (
        <ChunkCard chunk={chunk} key={chunk.start} />
      ))}
    </div>
  );
};
