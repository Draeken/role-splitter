import { Button, ButtonEmphaze } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { goldenNumber } from '../layout/base-layout';
import { AppContext } from '../root';
import { mergeProps } from '../utils/utils';

interface ChunkAddProps {}

const baseHeight = 100;

const ChunkAddRootClass = {
  className: css`
    width: ${baseHeight * goldenNumber}px;
    height: ${baseHeight}px;
  `,
};

const idGenerator = idGeneratorFn();

export const ChunkAdd: React.FunctionComponent<
  ChunkAddProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { ...defaultHostProps } = props;
  const hostProps = mergeProps(ChunkAddRootClass, defaultHostProps);
  const { appDispatch } = React.useContext(AppContext);
  const onClick = React.useCallback(() => {
    appDispatch({
      type: 'add',
      chunk: {
        start: 0,
        end: 1,
        role: 'Undefined',
        id: idGenerator.next().value,
      },
    });
  }, []);
  return <Button emphaze={ButtonEmphaze.Medium} label={'add'} {...hostProps} onClick={onClick} />;
};

function* idGeneratorFn() {
  let id = 0;
  while (true) {
    yield `temp-${id++}`;
  }
}
