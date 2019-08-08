import { Button, ButtonEmphaze } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { goldenNumber } from '../layout/base-layout';
import { AppContext } from '../root';
import { idGeneratorFn, mergeProps } from '../utils/utils';
import { BaseChunk, Chunk, VirtualChunk } from './chunks-manager';

interface ChunkAddProps {
  startOffset: number;
  siblingChunks: ReadonlyArray<Chunk | VirtualChunk>;
}

const baseHeight = 100;

const ChunkAddRootClass = {
  className: css`
    width: ${baseHeight * goldenNumber}px;
    height: ${baseHeight}px;
  `,
};

export const idGenerator = idGeneratorFn('temp');

export const virtualChunkToConcrete = (chunk: BaseChunk): Chunk => ({
  ...chunk,
  id: idGenerator.next().value,
});

const isVirtualDay = (chunks: ReadonlyArray<Chunk | VirtualChunk>): boolean =>
  chunks.every(c => c.id === undefined);

export const ChunkAdd: React.FunctionComponent<
  ChunkAddProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { startOffset, siblingChunks, ...defaultHostProps } = props;
  const hostProps = mergeProps(ChunkAddRootClass, defaultHostProps);
  const { appDispatch } = React.useContext(AppContext);
  const onClick = React.useCallback(() => {
    const siblings = isVirtualDay(siblingChunks) ? siblingChunks.map(virtualChunkToConcrete) : [];
    appDispatch({
      type: 'add',
      chunk: [
        ...siblings,
        {
          start: startOffset,
          end: startOffset + 3600000,
          role: 'Undefined',
          id: idGenerator.next().value,
        },
      ],
    });
  }, [startOffset, siblingChunks]);
  return <Button emphaze={ButtonEmphaze.Medium} label={'add'} {...hostProps} onClick={onClick} />;
};
