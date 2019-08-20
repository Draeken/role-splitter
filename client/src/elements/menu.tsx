import { Modal, TextInput, ThemeContext } from '@autoschedule/react-elements';
import { css } from 'emotion';
import * as React from 'react';
import { CardProps } from '../layout/card';
import { mergeProps } from '../utils/utils';

export interface DropdownMenuProps {
  label: string;
  value: any;
  onNewVal: (v: number) => void;
  readonly values: ReadonlyArray<{ readonly key: any; readonly label: string }>;
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
  inputRef.current === null
    ? { x: 100, y: 100 }
    : { x: (inputRef.current as any).offsetLeft, y: (inputRef.current as any).offsetTop + 60 };
  const menuProps = mergeProps({
    position: pos,
    items: values.map(obj => (
      <p onClick={() => onNewVal(obj.key)}>
        {obj.key} - {obj.label}
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

export const DropdownMenuWithCreate: React.FunctionComponent<
  DropdownMenuProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { onNewVal, values, value, ...defaultHostProps } = props;
  const [displayDropdown, setDisplayDropdown] = React.useState(false);
  const [displayedValues, setDisplayedValues] = React.useState(values);
  const label = getLabelFromValues(values, value);
  const [userInputVal, setUserInputVal] = React.useState(label);
  React.useEffect(() => {
    if (userInputVal === label) {
      setDisplayedValues(values.filter(vals => vals.key !== value));
    }
    setDisplayedValues(values.filter(vals => vals.key !== value && vals.label.startsWith(userInputVal)));
  }, [values, userInputVal]);
  React.useEffect(() => {
    setUserInputVal(label);
  }, [label]);
  const inputRef = React.useRef(null);
  const inputProps = mergeProps(
    {
      onNewVal: e => {
        setUserInputVal(e);
      },
      onClick: () => {
        if (!displayDropdown) {
          setDisplayDropdown(true);
          setUserInputVal('');
        }
      },
      onUnfocus: () => {
        if (displayDropdown) {
          setDisplayDropdown(false);
          setUserInputVal(label);
        }
      },
      value: userInputVal,
    },
    defaultHostProps
  );
  const pos =
    inputRef.current === null
      ? { x: 100, y: 100 }
      : { x: (inputRef.current as any).offsetLeft, y: (inputRef.current as any).offsetTop + 60 };
  const menuProps = mergeProps({
    position: pos,
    items: displayedValues.map(obj => <p onClick={() => onNewVal(obj.key)}>{obj.label}</p>),
  });
  return (
    <React.Fragment>
      <TextInput {...inputProps} ref={inputRef} />
      {displayDropdown && <Menu {...menuProps} />}
    </React.Fragment>
  );
};

const getLabelFromValues = (values: ReadonlyArray<{ key: any; label: string }>, key: any) => {
  const findVal = values.find(val => val.key === key);
  return findVal ? findVal.label : key;
};

export interface MenuProps {
  position: { x: number; y: number };
  items: any[];
}

const menuClass = (position: { x: number; y: number }) => ({
  className: css`
    position: absolute;
    top: ${position.y}px;
    left: ${position.x}px;
  `,
});

export const Menu: React.FunctionComponent<
  MenuProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { position, items, ...defaultHostProps } = props;
  const theme = React.useContext(ThemeContext);
  const hostProps = mergeProps(
    CardProps({ customTheme: theme }),
    menuClass(position),
    defaultHostProps
  );
  return (
    <Modal>
      <div {...hostProps}>{items}</div>
    </Modal>
  );
};
