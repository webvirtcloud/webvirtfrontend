import { getFirewalls } from '@/entities/firewall';
import useSWR from 'swr';

export function useFirewalls() {
  return useSWR(
    '/firewalls/',
    () => getFirewalls().then((response) => response.firewalls),
    {
      refreshInterval(latestData) {
        return latestData?.some((firewall) => firewall.event !== null) ? 1000 : 0;
      },
    },
  );
}
