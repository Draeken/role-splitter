import * as React from 'react';
import { DayChunk } from './day-chunks/day-chunks';
import { BaseLayoutProps } from './layout/base-layout';
import { mergeProps } from './utils/utils';

export interface Chunk {
  start: number;
  end: number;
  role: string;
}

type ChunkContextType = { chunks: Chunk[]; update: (chunks: Chunk[]) => void };

export const ChunkContext = React.createContext<ChunkContextType>({ chunks: [], update: () => {} });
export const Root = props => {
  const { ...defaultHostProps } = props;
  const hostProps = mergeProps(BaseLayoutProps(), defaultHostProps);

  const currentDate = new Date().setHours(0, 0, 0, 0);
  const nextDate = currentDate + 3600000 * 24;

  const [state, updateState] = React.useState<ChunkContextType>({
    chunks: [{ start: currentDate, end: nextDate, role: 'undefined' }],
    update: (newChunks: Chunk[]) => {
      updateState({ ...state, chunks: newChunks });
    },
  });

  return (
    <ChunkContext.Provider value={state}>
      <div {...hostProps}>
        <DayChunk date={currentDate} />
      </div>
    </ChunkContext.Provider>
  );
};
