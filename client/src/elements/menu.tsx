import { Modal, TextInput, ThemeContext } from '@autoschedule/react-elements';
import * as React from 'react';
import { CardProps } from '../layout/card';
import { mergeProps } from '../utils/utils';
import { css } from 'emotion';

export interface DropdownMenuProps {
  label: string;
  value: any;
  onNewVal: (v: number) => void;
  values: Array<{ key: any; value: string }>;
}

export const DropdownMenu: React.FunctionComponent<
  DropdownMenuProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { onNewVal, values, ...defaultHostProps } = props;
  const [displayDropdown, setDisplayDropdown] = React.useState(false);
  const inputRef = React.useRef(null);
  const inputProps = mergeProps(
    {
      onNewVal: () => {},
      onClick: () => setDisplayDropdown(!displayDropdown),
    },
    defaultHostProps
  );
  const pos =
    inputRef.current === null
      ? { x: 100, y: 100 }
      : { x: (inputRef.current as any).offsetLeft, y: (inputRef.current as any).offsetTop + 60 };
  const menuProps = mergeProps({
    position: pos,
    items: values.map(obj => (
      <p onClick={() => onNewVal(obj.key)}>
        {obj.key} - {obj.value}
      </p>
    )),
  });
  return (
    <React.Fragment>
      <TextInput {...inputProps} ref={inputRef} />
      {displayDropdown && <Menu {...menuProps} />}
    </React.Fragment>
  );
};

export interface MenuProps {
  position: { x: number; y: number };
  items: any[];
}

const menuClass = (position: {x: number, y: number}) => ({
  className: css`
    position: absolute;
    top: ${position.y}px;
    left: ${position.x}px;
  `
});

export const Menu: React.FunctionComponent<
  MenuProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { position, items, ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const hostProps = mergeProps(CardProps({ customTheme: theme }), menuClass(position), defaultHostProps);
  return (
    <Modal>
      <div {...hostProps}>{items}</div>
    </Modal>
  );
};
