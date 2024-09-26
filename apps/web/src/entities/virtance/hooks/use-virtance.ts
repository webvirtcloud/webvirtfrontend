import { type QueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import { type Event } from '@/entities/event';
import { type Virtance, getVirtance, virtanceQueries } from '@/entities/virtance';
import { REFRESH_INTERVAL } from '@/shared/constants';

export function useVirtance(id: number, options?: QueryOptions<Virtance>) {
  const queryClient = useQueryClient();
  const event = useRef<Event | null>(null);

  return useQuery({
    queryKey: virtanceQueries.one(id),
    queryFn: () => getVirtance(id).then((response) => response.virtance),
    refetchInterval(query) {
      if (query.state.data?.event === null || query.state.error) {
        // invalidate snapshots if 'snapshot' task is completed
        if (event.current?.name === 'snapshot') {
          queryClient.invalidateQueries({
            queryKey: virtanceQueries.snapshots(id),
          });
        }

        event.current = null;

        return false;
      }

      event.current = query.state.data ? query.state.data.event : null;

      return REFRESH_INTERVAL;
    },
    ...options,
  });
}
