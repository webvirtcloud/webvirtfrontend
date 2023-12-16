import { type QueryOptions, useQuery } from '@tanstack/react-query';

import { firewallQueries, getFirewallVirtances } from '@/entities/firewall';
import { type Virtance } from '@/entities/virtance';

export function useFirewallVirtances(uuid: string, options?: QueryOptions<Virtance[]>) {
  return useQuery({
    queryKey: firewallQueries.virtances(uuid),
    queryFn: () => getFirewallVirtances(uuid).then((response) => response.virtances),
    ...options,
  });
}
