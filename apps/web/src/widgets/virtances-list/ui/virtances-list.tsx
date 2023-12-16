import { useQueries, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Skeleton } from 'ui/components/skeleton';
import { useToast } from 'ui/components/toast';

import { type Event } from '@/entities/event';
import {
  type Virtance,
  getVirtance,
  useVirtanceAction,
  useVirtances,
  VirtanceCard,
  virtanceQueries,
  VirtanceRebootButton,
} from '@/entities/virtance';
import { VirtanceToggleStateButton } from '@/entities/virtance';
import { REFRESH_INTERVAL } from '@/shared/constants';
import { State } from '@/shared/ui/state';

export function VirtancesList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: virtances, refetch, error } = useVirtances();
  const { runAction } = useVirtanceAction();

  async function onRunAction(payload) {
    await runAction(payload);
    await refetch();
  }

  const events = useMemo(() => {
    const uniqueIds = new Set<number>();
    const uniqueEvents: { id: number; event: Event }[] = [];

    if (virtances === undefined) return uniqueEvents;

    virtances.forEach((virtance) => {
      if (virtance.event !== null && !uniqueIds.has(virtance.id)) {
        uniqueIds.add(virtance.id);
        uniqueEvents.push({ id: virtance.id, event: virtance.event });
      }
    });

    return uniqueEvents;
  }, [virtances]);

  useQueries({
    queries: events.map((event) => ({
      queryKey: virtanceQueries.event(event.id),
      queryFn: () => getVirtance(event.id),
      refetchInterval: (query) => {
        if (query.state.data && query.state.data.virtance.event === null) {
          queryClient.setQueryData<Virtance[]>(virtanceQueries.list(), (previousData) => {
            if (previousData) {
              return previousData.map((virtance: Virtance) =>
                virtance.id === event.id ? query.state.data?.virtance : virtance,
              );
            }
          });

          toast({
            title: `The task ${event.event?.description.toLowerCase()} of virtance has been completed.`,
            variant: 'default',
          });

          queryClient.removeQueries({ queryKey: virtanceQueries.event(event.id) });

          return false;
        }
        return REFRESH_INTERVAL;
      },
    })),
  });

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display any virtance at this time for some reason."
      />
    );
  }
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input id="server-search" name="server-search" placeholder="Search..." />
        </div>
        <Button onClick={() => navigate('/virtances/create')}>New virtance</Button>
      </div>

      {virtances ? (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {virtances.map((virtance) => (
            <li key={virtance.id}>
              {
                <VirtanceCard
                  to={`/virtances/${virtance.id}`}
                  virtance={virtance}
                  actions={
                    <>
                      <VirtanceToggleStateButton
                        onToggle={onRunAction}
                        id={virtance.id}
                        status={virtance.status}
                      />
                      <VirtanceRebootButton
                        onToggle={onRunAction}
                        id={virtance.id}
                        status={virtance.status}
                      />
                    </>
                  }
                />
              }
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6).keys()].map((i) => (
            <li key={i}>
              <Skeleton className="h-40 w-full" />
            </li>
          ))}
        </ul>
      )}

      {virtances && virtances.length === 0 && <div>No created servers.</div>}
    </section>
  );
}
