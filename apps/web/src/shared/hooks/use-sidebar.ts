import { useContext } from 'react';

import { SidebarContext } from '@/shared/contexts';

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('use-sidebar must be used within a SidebarProvider');
  }

  return context;
}
