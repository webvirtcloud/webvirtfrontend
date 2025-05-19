import { Query, useQueries, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { Skeleton } from 'ui/components/skeleton';

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

          toast.success(
            `The task ${event.event?.description.toLowerCase()} of virtance has been completed.`,
          );

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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Virtances</h2>
      </div>

      {virtances ? (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {virtances.map((virtance) => (
            <li key={virtance.id}>
              {
                <VirtanceCard
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
