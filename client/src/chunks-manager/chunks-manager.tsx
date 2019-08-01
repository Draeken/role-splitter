import { Button, ButtonEmphaze, ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { DateStep, Pagination } from '../elements/pagination';
import { AppContext } from '../root';
import { mergeProps, partitionList } from '../utils/utils';
import { ChunkAdd } from './chunk-add';
import { ChunkEdit } from './chunk-edit';
import { ChunkView } from './chunk-view';

const rootClass = (theme: any) => ({
  className: css`
    background-color: ${theme.palette.surface.main};
    border-radius: 8px;
  `,
});

export interface Chunk {
  start: number;
  end: number;
  role: string;
  id: string;
}

const displayedPages = 3;

const contentClass = css`
  display: flex;
  justify-content: space-evenly;
`;

const chunkPattern = [{ start: 0.1, end: 0.3 }, { start: 0.4, end: 0.5 }, { start: 0.7, end: 0.9 }];

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
        {editMode ? editChunks(displayedChunks[0]) : viewChunks(displayedChunks)}
      </div>
      <Button emphaze={ButtonEmphaze.Medium} label={'edit'} onClick={toggleEditMode} />
    </div>
  );
};

const filterForGivenDay = (offset: number) => (chunk: Chunk) => {
  const today = new Date();
  today.setDate(shiftActiveToLast(offset));
  const start = today.setHours(0, 0, 0, 0);
  const end = start + 3600000 * 24;
  return start < chunk.start && chunk.start < end;
};

const createVirtualChunks = (offset: number): Chunk[] => {
  const today = new Date();
  today.setDate(shiftActiveToLast(offset));
  const start = today.setHours(0, 0, 0, 0);
  const length = 3600000 * 24;
  return chunkPattern.map(pattern => ({
    id: 'undefined',
    end: pattern.end * length + start,
    start: pattern.start * length + start,
    role: 'Unassigned',
  }));
};

const getDisplayedChunks = (chunksArg: ReadonlyArray<Chunk>, activePage: number): Chunk[][] => {
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

const viewChunks = (chunksDays: Chunk[][]) =>
  chunksDays.map(chunks => (
    <div>
      {chunks.map(chunk => (
        <ChunkView chunk={chunk} key={chunk.start} />
      ))}
    </div>
  ));

const editChunks = (chunks: ReadonlyArray<Chunk>) => (
  <React.Fragment>
    {chunks.map(chunk => (
      <ChunkEdit chunk={chunk} key={chunk.start} />
    ))}
    <ChunkAdd />
  </React.Fragment>
);

/**
 * TODO:
 *
 * - [x] Display virtual chunks based on a pattern with following attributes:
 *  list of chunks for a day, start/end relative to day instead of absolute timestamp. Refactor chunks to include a "date" and start/end relative to this date ?
 * - [x] if user assign a virtual chunk, display other virtual chunks for this day. If user edit a chunk, display other and adjust to avoid any overlaps.
 *
 * Does virtual chunk has an ID? Editing a chunk in one day could de-virtualize all chunks of the day
 * When editing chunks, one could arrange order by drag-n-dropping in a GKeep fashion
 *
 */
