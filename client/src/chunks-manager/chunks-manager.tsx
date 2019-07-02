import { css } from 'emotion';
import * as React from 'react';
import { mergeProps } from '../utils/utils';

const rootClass = {
  className: css``,
};

export interface Chunk {
  start: number;
  end: number;
  role: string;
}

export const ChunkManager: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { ...defaultHostProps } = props;
  const hostProps = mergeProps(rootClass, defaultHostProps);
  const [chunks, updateChunks] = React.useState<Chunk[]>([]);

  React.useEffect(() => {
    const localStorageKey = 'chunks';
    const localChunksRaw = localStorage.getItem(localStorageKey);
    let localChunks = [];
    try {
      localChunks = JSON.parse(localChunksRaw || '[]');
    } catch (e) {
      localStorage.removeItem(localStorageKey);
      console.error('Local chunks corrupted', localChunksRaw, e);
    }
    updateChunks(localChunks);
    return () => {
      localStorage.setItem(localStorageKey, JSON.stringify(chunks));
    }
  }, []);

  return (
      <div {...hostProps}>
        {chunks.map(chunk => (
          <div key={chunk.start}>{chunk.role}</div>
        ))}
      </div>
  );
};
