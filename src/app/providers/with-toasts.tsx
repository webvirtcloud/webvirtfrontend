import { ComponentType } from 'react';

import { ToastContextProvider } from '@/shared/ui/Toast/Provider';

export const withToasts = (Component: ComponentType) => () =>
  (
    <ToastContextProvider>
      <Component />
    </ToastContextProvider>
  );
