import { useQuery } from '@tanstack/react-query';

import { getVirtancesBackups, virtanceQueries } from '@/entities/virtance';

export function useVirtanceBackups(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: virtanceQueries.backups(id),
    queryFn: () => getVirtancesBackups(id).then((response) => response.backups),
    enabled: options?.enabled,
  });
}
