import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentType } from 'react';

export const withQuery = (Component: ComponentType) => () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
};
