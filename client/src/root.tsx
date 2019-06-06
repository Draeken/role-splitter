import * as React from 'react';
import { BaseLayoutProps } from './layout/base-layout';
import { mergeProps } from './utils/utils';

export const Root = (props) => {
  const { ...defaultHostProps } = props;
  const hostProps = mergeProps(BaseLayoutProps(), defaultHostProps);
  return <div {...hostProps}>Test</div>
};
