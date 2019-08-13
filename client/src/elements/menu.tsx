import { Modal, TextInput } from '@autoschedule/react-elements';
import * as React from 'react';
import { CardProps } from '../layout/card';
import { mergeProps } from '../utils/utils';

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
  const inputProps = mergeProps(
    {
      onNewVal: () => {},
      onClick: () => setDisplayDropdown(!displayDropdown),
    },
    defaultHostProps
  );
  const menuProps = mergeProps({
    position: { x: 100, y: 100 },
    items: values.map(obj => (
      <p onClick={() => onNewVal(obj.key)}>
        {obj.key} - {obj.value}
      </p>
    )),
  });
  return (
    <React.Fragment>
      <TextInput {...inputProps} />
      {displayDropdown && <Menu {...menuProps} />}
    </React.Fragment>
  );
};

export interface MenuProps {
  position: { x: number; y: number };
  items: any[];
}

export const Menu: React.FunctionComponent<
  MenuProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { position, items, ...defaultHostProps } = props;
  const hostProps = mergeProps(CardProps, defaultHostProps);
  return (
    <Modal>
      <div {...hostProps}>{items}</div>
    </Modal>
  );
};
