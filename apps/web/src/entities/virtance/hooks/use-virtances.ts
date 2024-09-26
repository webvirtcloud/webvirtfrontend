import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import {
  type GetVirtancesParams,
  type Virtance,
  getVirtances,
  virtanceQueries,
} from '@/entities/virtance';

export function useVirtances(
  params?: GetVirtancesParams,
  options?: Omit<UseQueryOptions<Virtance[]>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: virtanceQueries.list(params),
    queryFn: () => getVirtances(params).then((response) => response.virtances),
    ...options,
  });
}
