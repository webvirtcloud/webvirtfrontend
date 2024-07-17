import { skipToken, useQuery } from '@tanstack/react-query';

import { getLoadbalancer, loadbalancerQueries } from '@/entities/loadbalancer';

export function useLoadbalancer(id?: string) {
  return useQuery({
    queryKey: loadbalancerQueries.loadbalancer(id),
    queryFn: id
      ? () => getLoadbalancer(id).then((response) => response.load_balancer)
      : skipToken,
  });
}
