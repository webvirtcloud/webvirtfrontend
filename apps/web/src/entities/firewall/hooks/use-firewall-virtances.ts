import { type Firewall, getFirewallVirtances } from '@/entities/firewall';
import { type Virtance } from '@/entities/virtance';
import useSWR, { SWRConfiguration } from 'swr';

export function useFirewallVirtances(
  uuid: string,
  options?: SWRConfiguration<Virtance[]>,
) {
  const {
    data: virtances,
    mutate,
    error,
  } = useSWR<Virtance[]>(
    ['firewall-virtances', uuid],
    () => getFirewallVirtances(uuid).then((response) => response.virtances),
    {
      refreshInterval(latestData) {
        return latestData?.some((virtance) => !!virtance.event) ? 1000 : 0;
      },
      ...options,
    },
  );

  return {
    virtances,
    mutate,
    error,
  };
}
