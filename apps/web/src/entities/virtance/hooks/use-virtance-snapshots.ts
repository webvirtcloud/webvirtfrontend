import { useQuery } from '@tanstack/react-query';

import { getVirtancesSnapshots, virtanceQueries } from '@/entities/virtance';

export function useVirtanceSnapshots(id: number) {
  return useQuery({
    queryKey: virtanceQueries.snapshots(id),
    queryFn: () => getVirtancesSnapshots(id).then((response) => response.snapshots),
  });
}
