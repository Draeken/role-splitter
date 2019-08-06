import { Button, ButtonEmphaze, ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { DateStep, Pagination } from '../elements/pagination';
import { AppContext } from '../root';
import { deleteFromList, mergeProps, partitionList } from '../utils/utils';
import { ChunkAdd } from './chunk-add';
import { ChunkEdit } from './chunk-edit';
import { ChunkView } from './chunk-view';

const rootClass = (theme: any) => ({
  className: css`
    background-color: ${theme.palette.surface.main};
    border-radius: 8px;
  `,
});

export interface BaseChunk {
  start: number;
  end: number;
  role: string;
  label?: string;
}

export interface Chunk extends BaseChunk {
  id: string;
}

export interface VirtualChunk extends BaseChunk {
  id: undefined;
}

const displayedPages = 3;

const contentClass = css`
  display: flex;
  justify-content: space-evenly;
`;

const chunkPattern = [
  { start: 0.1, end: 0.3, label: 'Morning - early' },
  { start: 0.4, end: 0.5, label: 'Before Lunch' },
  { start: 0.7, end: 0.9, label: 'Afternoon' },
];

const shiftActiveToLast = (page: number) => page - displayedPages + 1;

export const ChunkManager: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { ...defaultHostProps } = props;
  const hostProps = mergeProps(rootClass(React.useContext(ThemeContext)), defaultHostProps);
  const { appState } = React.useContext(AppContext);
  const [editMode, setEditMode] = React.useState(false);
  const toggleEditMode = React.useCallback(() => setEditMode(!editMode), [editMode]);

  const [activePage, setActivePage] = React.useState(0);
  const stepClickCB = React.useCallback((i: number) => setActivePage(i), []);
  const stepCB = React.useCallback(
    (i: number) => (
      <DateStep offset={shiftActiveToLast(i)} onClick={() => stepClickCB(shiftActiveToLast(i))} />
    ),
    []
  );
  const displayedChunks = getDisplayedChunks(appState.chunks, activePage);

  return (
    <div {...hostProps}>
      <Pagination activePage={activePage} pageDisplayed={displayedPages} stepComponent={stepCB} />
      <div className={contentClass}>
        {editMode ? editChunks(activePage, displayedChunks) : viewChunks(displayedChunks)}
      </div>
      <Button emphaze={ButtonEmphaze.Medium} label={'edit'} onClick={toggleEditMode} />
    </div>
  );
};

const offsetToStart = (offset: number): number => {
  const today = new Date();
  const date = today.getDate() + shiftActiveToLast(offset);
  today.setDate(date);
  return today.setHours(0, 0, 0, 0);
};

const filterForGivenDay = (offset: number) => (chunk: Chunk) => {
  const start = offsetToStart(offset);
  const end = start + 3600000 * 24;
  return start <= chunk.start && chunk.start < end;
};

const createVirtualChunks = (offset: number): VirtualChunk[] => {
  const start = offsetToStart(offset);
  const length = 3600000 * 24;
  return chunkPattern.map(pattern => ({
    id: undefined,
    end: pattern.end * length + start,
    start: pattern.start * length + start,
    role: 'Unassigned',
    label: pattern.label,
  }));
};

const getDisplayedChunks = (
  chunksArg: ReadonlyArray<Chunk>,
  activePage: number
): Array<Array<Chunk | VirtualChunk>> => {
  let chunks = [...chunksArg];
  return Array(displayedPages)
    .fill(undefined)
    .map((_, i) => {
      const [chunksForPage, filteredChunks] = partitionList(filterForGivenDay(activePage + i))(
        chunks
      );
      chunks = filteredChunks;
      if (chunksForPage.length) {
        return chunksForPage;
      }
      return createVirtualChunks(activePage + i);
    });
};

const viewChunks = (chunksDays: Array<Array<Chunk | VirtualChunk>>) =>
  chunksDays.map(chunks => (
    <div>
      {chunks.map(chunk => (
        <ChunkView chunk={chunk} />
      ))}
    </div>
  ));

const computeSiblings = (
  chunk: Chunk | VirtualChunk,
  chunks: Array<Chunk | VirtualChunk>
): VirtualChunk[] => {
  if (chunk.id !== undefined) {
    return [];
  }
  return deleteFromList(c => c === chunk)(chunks) as VirtualChunk[];
};

const editChunks = (offset: number, chunksDays: Array<Array<Chunk | VirtualChunk>>) =>
  chunksDays.map((chunks, i) => (
    <div>
      {chunks.map(chunk => {
        const sibling = computeSiblings(chunk, chunks);
        return <ChunkEdit chunk={chunk} siblingChunks={sibling} />;
      })}
      <ChunkAdd startOffset={offsetToStart(offset + i)} siblingChunks={chunks} />
    </div>
  ));
