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
  const pos = inputRef.current === null
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

export interface MenuWithCreate extends DropdownMenuProps {
  onCreateVal: (val: string) => void;
  labelForCreation: (input: string) => string;
}

export const DropdownMenuWithCreate: React.FunctionComponent<
  MenuWithCreate & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { onNewVal, values, value, onCreateVal, labelForCreation, ...defaultHostProps } = props;
  const [displayDropdown, setDisplayDropdown] = React.useState(false);
  const [displayedValues, setDisplayedValues] = React.useState(values);
  const label = getLabelFromValues(values, value);
  const [userInputVal, setUserInputVal] = React.useState(label);
  const [bluredElements, setBluredElements] = React.useState({ input: true, menu: true });
  React.useEffect(() => {
    if (userInputVal === label) {
      setDisplayedValues(values.filter(vals => vals.key !== value));
    }
    setDisplayedValues(values.filter(vals => vals.key !== value && vals.label.startsWith(userInputVal)));
  }, [values, userInputVal]);
  React.useEffect(() => {
    setUserInputVal(label);
  }, [label]);

  const checkFocus = () => {
    console.log('bluredElems - afterTimeout', bluredElements);
    if (bluredElements.input && bluredElements.menu && displayDropdown) {
      setDisplayDropdown(false);
      setUserInputVal(label);
    }
  }
  React.useEffect(() => {
    console.log('bluredElems - beforeTimeout', bluredElements);
    setTimeout(() => checkFocus(), 1000);
  }, [bluredElements]);
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
      onFocus: () => {
        setBluredElements({...bluredElements, input: false })
        if (!displayDropdown) {
          setDisplayDropdown(true);
          setUserInputVal('');
        }
      },
      onBlur: () => {
        setBluredElements({...bluredElements, input: true })
      },
      value: userInputVal,
    },
    defaultHostProps
  );
  const pos =
    inputRef.current === null
      ? { x: 100, y: 100 }
      : { x: (inputRef.current as any).offsetLeft, y: (inputRef.current as any).offsetTop + 60 };
  const roleItems = React.useMemo(() => displayedValues.map(obj => <p onClick={() => onNewVal(obj.key)}>{obj.label}</p>), [displayedValues]);
  const newRoleItems = React.useMemo(() =>
    userInputVal.length === 0 || values.find(val => val.label === userInputVal)
      ? []
      : [<p onClick={() => onCreateVal(userInputVal)}>{labelForCreation(userInputVal)}</p>]
    , [userInputVal, values]);
  const menuProps = mergeProps({
    position: pos,
    items: [...roleItems, ...newRoleItems],
    onFocus: () => setBluredElements({...bluredElements, menu: false }),
    onBlur: () => setBluredElements({...bluredElements, menu: true }),
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
  return findVal ? findVal.label : '' +key;
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
      <div tabIndex={0} {...hostProps}>{items}</div>
    </Modal>
  );
};
