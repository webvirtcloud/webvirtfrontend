import { useQuery } from '@tanstack/react-query';

import { getFirewalls } from '@/entities/firewall';

import { virtanceQueries } from '../queries';

export function useVirtanceFirewall(id: number) {
  return useQuery({
    queryKey: virtanceQueries.firewall(id),
    queryFn: () =>
      getFirewalls({ virtance_id: id }).then((response) => response.firewalls),
  });
}
