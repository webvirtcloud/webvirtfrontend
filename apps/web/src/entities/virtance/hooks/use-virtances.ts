import { useQuery } from '@tanstack/react-query';

import {
  type GetVirtancesParams,
  getVirtances,
  virtanceQueries,
} from '@/entities/virtance';

export function useVirtances(params?: GetVirtancesParams) {
  return useQuery({
    queryKey: virtanceQueries.list(params),
    queryFn: () => getVirtances(params).then((response) => response.virtances),
  });
}
