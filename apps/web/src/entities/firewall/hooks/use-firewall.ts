import { type QueryOptions, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { type Event } from '@/entities/event';
import { type Firewall, firewallQueries, getFirewall } from '@/entities/firewall';
import { REFRESH_INTERVAL } from '@/shared/constants';

export function useFirewall(uuid: string, options?: QueryOptions<Firewall>) {
  const event = useRef<Event | null>(null);

  return useQuery({
    queryKey: firewallQueries.one(uuid),
    queryFn: () => getFirewall(uuid).then((response) => response.firewall),
    refetchInterval(query) {
      if (query.state.data?.event === null) {
        event.current = null;

        return false;
      }

      event.current = query.state.data ? query.state.data.event : null;

      return REFRESH_INTERVAL;
    },
    ...options,
  });
}
