import { useQuery } from '@tanstack/react-query';

import { floatingIPQueries, getFloatingIPs } from '@/entities/floating-ip';

export function useFloatingIPs() {
  return useQuery({
    queryKey: floatingIPQueries.list(),
    queryFn: () => getFloatingIPs().then((response) => response.floating_ips),
  });
}
