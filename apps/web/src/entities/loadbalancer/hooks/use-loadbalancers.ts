import { useQuery } from '@tanstack/react-query';

import { getLoadbalancers, loadbalancerQueries } from '@/entities/loadbalancer';

export function useLoadbalancers() {
  return useQuery({
    queryKey: loadbalancerQueries.list(),
    queryFn: () => getLoadbalancers().then((response) => response.load_balancers),
  });
}
