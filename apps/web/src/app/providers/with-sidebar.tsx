import { ComponentType } from 'react';

import { SidebarProvider } from '@/shared/contexts';

export const withSidebar = (Component: ComponentType) => () =>
  (
    <SidebarProvider>
      <Component />
    </SidebarProvider>
  );
