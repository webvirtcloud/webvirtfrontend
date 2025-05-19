import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'ui/components/sonner';

import { routeTree } from '@/routeTree.gen';
import { SidebarProvider } from '@/shared/contexts';
import { queryClient } from '@/shared/query-client';
import { GlobalLoader } from '@/shared/ui/global-loader';
import { NotFound } from '@/shared/ui/not-found';

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: GlobalLoader,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
