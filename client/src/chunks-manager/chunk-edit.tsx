import { Button, ButtonEmphaze, ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { goldenNumber } from '../layout/base-layout';
import { CardProps } from '../layout/card';
import { AppContext } from '../root';
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
  return (
    <div {...hostProps}>
      {chunk.role} | {chunk.start} - {chunk.end}
      <Button emphaze={ButtonEmphaze.Low} label={'delete'} onClick={deleteChunk} />
    </div>
  );
};
