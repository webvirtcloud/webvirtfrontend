import { skipToken, useQuery } from '@tanstack/react-query';

import { getLoadbalancersVirtances, loadbalancerQueries } from '@/entities/loadbalancer';

export function useLoadbalancerVirtances(id?: string) {
  return useQuery({
    queryKey: loadbalancerQueries.virtances(id),
    queryFn: id
      ? () => getLoadbalancersVirtances(id).then((response) => response.virtances)
      : skipToken,
  });
}
