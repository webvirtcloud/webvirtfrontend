import { type QueryOptions, useQuery } from '@tanstack/react-query';

import { type Firewall, firewallQueries, getFirewalls } from '@/entities/firewall';

interface UseFirewalls {
  options?: QueryOptions<Firewall[]>;
}

export function useFirewalls(payload?: UseFirewalls) {
  return useQuery({
    queryKey: firewallQueries.list(),
    queryFn: () => getFirewalls().then((response) => response.firewalls),
    ...payload?.options,
  });
}
