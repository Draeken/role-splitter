import { Button, ButtonEmphaze } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { AppContext } from '../root';
import { mergeProps } from '../utils/utils';
import { ChunkEdit } from './chunk-edit';
import { ChunkView } from './chunk-view';

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
  const [editMode, setEditMode] = React.useState(false);
  const toggleEditMode = React.useCallback(() => setEditMode(!editMode), [editMode]);

  return (
    <div {...hostProps}>
      {editMode ? editChunks(appState.chunks) : viewChunks(appState.chunks)}
      <Button emphaze={ButtonEmphaze.Medium} label={'edit'} onClick={toggleEditMode} />
    </div>
  );
};

const viewChunks = (chunks: ReadonlyArray<Chunk>) =>
  chunks.map(chunk => <ChunkView chunk={chunk} key={chunk.start} />);
const editChunks = (chunks: ReadonlyArray<Chunk>) =>
  chunks.map(chunk => <ChunkEdit chunk={chunk} key={chunk.start} />);
