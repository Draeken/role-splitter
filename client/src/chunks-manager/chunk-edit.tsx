import { Button, ButtonEmphaze, ThemeContext, Typography } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { TimeInputFocus } from '../elements/time-input';
import { CardProps } from '../layout/card';
import { actionType, AppContext } from '../root';
import { mergeProps } from '../utils/utils';
import { virtualChunkToConcrete } from './chunk-add';
import { Chunk, VirtualChunk } from './chunks-manager';

interface ChunkEditProps {
  chunk: Chunk | VirtualChunk;
  siblingChunks: ReadonlyArray<VirtualChunk>;
}

const baseWidth = 161.8;

const ChunkEditRootClass = {
  className: css`
    width: ${baseWidth}px;
    height: ${100}px;
  `,
};

export const ChunkEdit: React.FunctionComponent<
  ChunkEditProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { chunk, siblingChunks, ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const { appDispatch } = React.useContext(AppContext);
  const deleteChunk = React.useCallback(deleteCallback(appDispatch, chunk, siblingChunks), [
    chunk.id,
  ]);
  const hostProps = mergeProps(
    CardProps({ customTheme: theme }),
    ChunkEditRootClass,
    defaultHostProps
  );
  const updateStart = React.useCallback(
    callbackBuilder(appDispatch, chunk, 'start', siblingChunks),
    [chunk]
  );
  const updateEnd = React.useCallback(callbackBuilder(appDispatch, chunk, 'end', siblingChunks), [
    chunk,
  ]);
  return (
    <div {...hostProps}>
      <Typography scale={'Caption'}>{chunk.role}</Typography>
      <TimeInputFocus label={'start'} value={chunk.start} onNewVal={updateStart} />
      <TimeInputFocus label={'end'} value={chunk.end} onNewVal={updateEnd} />
      <Button emphaze={ButtonEmphaze.Low} label={'delete'} onClick={deleteChunk} />
    </div>
  );
};

const deleteCallback = (
  appDispatch: React.Dispatch<actionType>,
  chunk: Chunk | VirtualChunk,
  siblingChunks: ReadonlyArray<VirtualChunk>
) => () => {
  if (chunk.id === undefined) {
    appDispatch({
      type: 'add',
      chunks: [...siblingChunks.map(virtualChunkToConcrete)],
    });
    return;
  }
  appDispatch({ type: 'delete', chunkId: chunk.id });
};

const callbackBuilder = (
  appDispatch: React.Dispatch<actionType>,
  chunk: Chunk | VirtualChunk,
  prop: keyof Chunk,
  siblingChunks: ReadonlyArray<VirtualChunk>
) => (val: number) => {
  if (chunk[prop] === +val) {
    return;
  }
  if (chunk.id === undefined) {
    appDispatch({
      type: 'add',
      chunks: [
        ...siblingChunks.map(virtualChunkToConcrete),
        { ...virtualChunkToConcrete(chunk), [prop]: val },
      ],
    });
    return;
  }
  appDispatch({ type: 'edit', chunk: { ...chunk, [prop]: val } });
};

/**
 * TOFIX:
 *
 *  - [x] Change the textInput by a time (hour/minute) input
 *  - [x] When deleting virtual chunk, it does nothing
 *  - [x] When editing virtual chunk, it deletes all next virtual chunks
 *
 */
