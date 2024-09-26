import { skipToken, useQuery } from '@tanstack/react-query';

import { getLoadbalancer, loadbalancerQueries } from '@/entities/loadbalancer';
import { REFRESH_INTERVAL } from '@/shared/constants';

export function useLoadbalancer(id?: string) {
  return useQuery({
    queryKey: loadbalancerQueries.loadbalancer(id),
    queryFn: id
      ? () => getLoadbalancer(id).then((response) => response.load_balancer)
      : skipToken,
    refetchInterval(query) {
      if (query.state.data?.event === null || query.state.error) {
        return false;
      }

      return REFRESH_INTERVAL;
    },
  });
}
