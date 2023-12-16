import { useQuery } from '@tanstack/react-query';

import { getVirtanceHistory, virtanceQueries } from '@/entities/virtance';

export function useVirtanceHistory(id: number) {
  return useQuery({
    queryKey: virtanceQueries.history(id),
    queryFn: () => getVirtanceHistory(id).then((response) => response.history),
  });
}
