import { ThemeContext, Typography } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { DropdownMenuWithCreate } from '../elements/menu';
import { goldenNumber } from '../layout/base-layout';
import { CardProps } from '../layout/card';
import { AppContext, Role, RoleKey } from '../root';
import { mergeProps } from '../utils/utils';
import { virtualChunkToConcrete } from './chunk-add';
import { Chunk, VirtualChunk } from './chunks-manager';

interface ChunkViewProps {
  chunk: Chunk | VirtualChunk;
  siblingChunks: ReadonlyArray<VirtualChunk>;
}

const baseHeight = 100;

const ChunkViewRootClass = {
  className: css`
    width: ${baseHeight * goldenNumber}px;
    height: ${baseHeight}px;
  `,
};

const timestampToTime = (timestamp: number) => {
  const d = new Date(timestamp);
  return `${d
    .getHours()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${d
    .getMinutes()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
};

export const ChunkView: React.FunctionComponent<
  ChunkViewProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { chunk, siblingChunks, ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const { appDispatch, appState } = React.useContext(AppContext);
  const start = React.useMemo(() => timestampToTime(chunk.start), [chunk.start]);
  const end = React.useMemo(() => timestampToTime(chunk.end), [chunk.end]);
  const hostProps = mergeProps(
    CardProps({ customTheme: theme }),
    ChunkViewRootClass,
    defaultHostProps
  );
  const dropdownProps = {
    label: 'Role',
    value: chunk.role,
    values: appState.roles,
    onNewVal: key => {
      if (chunk.id === undefined) {
        appDispatch({
          type: 'add',
          chunks: [
            ...siblingChunks.map(virtualChunkToConcrete),
            { ...virtualChunkToConcrete(chunk), role: key },
          ],
        });
        return;
      }
      appDispatch({ type: 'edit', chunk: { ...chunk, role: key } });
    },
  };
  const getLabel = getRoleLabel(appState.roles);
  return (
    <div {...hostProps}>
      <DropdownMenuWithCreate {...dropdownProps}>{getLabel(chunk.role)}</DropdownMenuWithCreate>
      <Typography baselineTop={16} scale={'Overline'}>
        [{start} - {end}]
      </Typography>
      <Typography scale={'Caption'}>{chunk.label}</Typography>
    </div>
  );
};

const getRoleLabel = (roles: ReadonlyArray<Role>) => (roleId: RoleKey) => {
  const res = roles.find(role => role.key === roleId);
  return res ? res.label : roleId;
};
