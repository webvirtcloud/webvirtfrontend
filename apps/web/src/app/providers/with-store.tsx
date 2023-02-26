import { Provider as JotaiProvider } from 'jotai';
import { ComponentType } from 'react';

export const withStore = (Component: ComponentType) => () =>
  (
    <JotaiProvider>
      <Component />
    </JotaiProvider>
  );
