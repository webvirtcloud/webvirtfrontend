import useSWR from 'swr';

import { getFloatingIPs } from '@/entities/floating-ip';

export function useFloatingIPs() {
  const {
    data: floatingIps,
    mutate,
    error,
  } = useSWR(
    '/floatng_ips/',
    () => getFloatingIPs().then((response) => response.floating_ips),
    {
      refreshInterval(latestData) {
        return latestData?.some((floatingIP) => !!floatingIP.event) ? 1000 : 0;
      },
    },
  );

  return {
    floatingIps,
    mutate,
    error,
  };
}
