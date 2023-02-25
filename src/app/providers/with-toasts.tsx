import { ComponentType } from 'react';

import { ToastContextProvider } from '@/components/Toast/Provider';

export const withToasts = (Component: ComponentType) => () =>
  (
    <ToastContextProvider>
      <Component />
    </ToastContextProvider>
  );
