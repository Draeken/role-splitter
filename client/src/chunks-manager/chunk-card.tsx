import { ThemeContext } from '@autoschedule/react-elements';
import * as React from 'react';
import { CardProps } from '../layout/card';
import { mergeProps } from '../utils/utils';
import { Chunk } from './chunks-manager';

interface ChunkCardProps {
  chunk: Chunk;
}

export const ChunkCard: React.FunctionComponent<
  ChunkCardProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { chunk, ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const hostProps = mergeProps(CardProps({ customTheme: theme }), defaultHostProps);
  return <div {...hostProps}>{chunk.role}</div>;
};
