import { useQuery } from '@tanstack/react-query';

import { consoleVirtance, virtanceQueries } from '@/entities/virtance';

export function useVirtanceConsole(id: number) {
  return useQuery({
    queryKey: virtanceQueries.console(id),
    queryFn: () => consoleVirtance(id).then((response) => response.console),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
