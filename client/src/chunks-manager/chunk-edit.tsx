import { Button, ButtonEmphaze, TextInputFocus, ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { goldenNumber } from '../layout/base-layout';
import { CardProps } from '../layout/card';
import { actionType, AppContext } from '../root';
import { mergeProps } from '../utils/utils';
import { Chunk } from './chunks-manager';

interface ChunkEditProps {
  chunk: Chunk;
}

const baseHeight = 100;

const ChunkEditRootClass = {
  className: css`
    width: ${baseHeight * goldenNumber}px;
    height: ${baseHeight}px;
  `,
};

export const ChunkEdit: React.FunctionComponent<
  ChunkEditProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { chunk, ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const { appDispatch } = React.useContext(AppContext);
  const deleteChunk = React.useCallback(() => appDispatch({ type: 'delete', chunkId: chunk.id }), [
    chunk.id,
  ]);
  const hostProps = mergeProps(
    CardProps({ customTheme: theme }),
    ChunkEditRootClass,
    defaultHostProps
  );
  const updateStart = React.useCallback(callbackBuilder(appDispatch, chunk, 'start'), [chunk]);
  const updateEnd = React.useCallback(callbackBuilder(appDispatch, chunk, 'end'), [chunk]);
  return (
    <div {...hostProps}>
      {chunk.role} |
      <TextInputFocus label={'start'} value={'' + chunk.start} onNewVal={updateStart} />
      -
      <TextInputFocus label={'end'} value={'' + chunk.end} onNewVal={updateEnd} />
      <Button emphaze={ButtonEmphaze.Low} label={'delete'} onClick={deleteChunk} />
    </div>
  );
};

const callbackBuilder = (
  appDispatch: React.Dispatch<actionType>,
  chunk: Chunk,
  prop: keyof Chunk
) => (val: string) => {
  if (chunk[prop] === +val) {
    return;
  }
  appDispatch({ type: 'edit', chunk: { ...chunk, [prop]: +val } });
};
