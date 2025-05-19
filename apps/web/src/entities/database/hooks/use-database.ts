import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { Event } from '@/entities/event';
import { REFRESH_INTERVAL } from '@/shared/constants';
import { queryClient } from '@/shared/query-client';

import { getDatabase } from '../api/get-database';
import { databaseQueries } from '../queries';

export function useDatabase(id: string) {
  const event = useRef<Event | null>(null);

  return useQuery({
    queryKey: databaseQueries.database(id),
    queryFn: () => getDatabase(id).then((response) => response.database),
    refetchInterval(query) {
      if (query.state.data?.event === null || query.state.error) {
        // invalidate snapshots if 'snapshot' task is completed
        if (event.current?.name === 'snapshot') {
          queryClient.invalidateQueries({
            queryKey: databaseQueries.snapshots(id),
          });
        }

        event.current = null;

        return false;
      }

      event.current = query.state.data ? query.state.data.event : null;

      return REFRESH_INTERVAL;
    },
  });
}
