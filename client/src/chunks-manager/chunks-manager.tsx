import { Button, ButtonEmphaze, ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { DateStep, Pagination } from '../elements/pagination';
import { AppContext } from '../root';
import { mergeProps } from '../utils/utils';
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
    (i: number) => <DateStep offset={shiftActiveToLast(i)} onClick={() => stepClickCB(shiftActiveToLast(i))} />,
    []
  );

  return (
    <div {...hostProps}>
      <Pagination activePage={activePage} pageDisplayed={displayedPages} stepComponent={stepCB} />
      <div className={contentClass}>
        {editMode ? editChunks(appState.chunks) : viewChunks(appState.chunks, activePage)}
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
}

const viewChunks = (chunks: ReadonlyArray<Chunk>, activePage: number) =>
  Array(displayedPages)
    .fill(undefined)
    .map((_, i) => chunks.filter(filterForGivenDay(activePage + i)).map(chunk => <ChunkView chunk={chunk} key={chunk.start} />));

const editChunks = (chunks: ReadonlyArray<Chunk>) => (
  <React.Fragment>
    {chunks.map(chunk => (
      <ChunkEdit chunk={chunk} key={chunk.start} />
    ))}
    <ChunkAdd />
  </React.Fragment>
);
