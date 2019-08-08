import { css } from 'emotion';
import * as React from 'react';
import { idGeneratorFn, mergeProps } from '../utils/utils';

const idGen = idGeneratorFn('label');

export interface TimeInputFocusProps {
  label: string;
  value: number;
  onNewVal: (v: number) => void;
}

const hostClass = {
  className: css`
    display: flex;
    justify-content: space-between;
  `,
};

export const TimeInputFocus: React.FunctionComponent<
  TimeInputFocusProps & React.HTMLAttributes<HTMLInputElement>
> = props => {
  const { label, value, onNewVal, ...defaultHostProps } = props;
  const [inputVal, setInputVal] = React.useState(() => timestampToTime(value));
  const [labelId] = React.useState(() => idGen.next().value);
  React.useEffect(() => setInputVal(timestampToTime(value)), [value]);
  const inputOnNewVal = React.useCallback(e => setInputVal(e.target.value), []);
  const hostProps = mergeProps(hostClass, defaultHostProps);
  const blurCB = () => onNewVal(timeToTimestamp(value, inputVal));
  return (
    <div {...hostProps}>
      <label htmlFor={labelId}>{label}</label>
      <input name={labelId} type="time" onBlur={blurCB} value={inputVal} onChange={inputOnNewVal} />
    </div>
  );
};

const timeToTimestamp = (timestamp: number, time: string): number => {
  const d = new Date(timestamp);
  const [hours, minutes] = time.split(':');
  d.setHours(+hours, +minutes);
  return +d;
};

const timestampToTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date
    .getHours()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${date
    .getMinutes()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
};
