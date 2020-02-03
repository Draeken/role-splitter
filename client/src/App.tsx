import { ResponsiveTheme } from '@autoschedule/react-elements';
import * as React from 'react';
import * as ds from './ds-theme';
import { css } from 'emotion';

const headerClass = css`
  display: flex;
`;

const navClass = css`
  flex-grow: 1;
`;

const App = () => {
  return (
    <ResponsiveTheme baseTheme={ds.theme} rules={ds.rules} handleBreakpoint={ds.handleRules}>
      <header className={headerClass}><nav className={navClass}>Home</nav></header>
    </ResponsiveTheme>
  );
};

export default App;
