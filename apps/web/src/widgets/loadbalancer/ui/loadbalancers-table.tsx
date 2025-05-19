import { useQueries, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { EllipsisIcon } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { Button, buttonVariants } from 'ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';
import { Spin } from 'ui/components/spin';
import { Table } from 'ui/components/table';

import { type Event } from '@/entities/event';
import {
  getLoadbalancer,
  Loadbalancer,
  loadbalancerQueries,
  useLoadbalancers,
} from '@/entities/loadbalancer';
import { REFRESH_INTERVAL } from '@/shared/constants';
import { State } from '@/shared/ui/state';

export function LoadbalancersTable() {
  const queryClient = useQueryClient();
  const { data: loadbalancers, error } = useLoadbalancers();

  const Actions = ({ value }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        {value.event !== null ? (
          <Spin size="sm" className="mr-2.5" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/loadbalancers/$uuid/virtances" params={{ uuid: value.id }}>
                  Virtances
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/loadbalancers/$uuid/settings" params={{ uuid: value.id }}>
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );

  const columns = useMemo(
    () => [
      {
        field: 'name',
        name: 'Name',
        component: ({ value }) => (
          <Link
            className="hover:text-ring font-semibold"
            to="/loadbalancers/$uuid"
            params={{ uuid: value.id }}
          >
            {value.name}
          </Link>
        ),
      },
      {
        field: 'ip',
        name: 'IP Address',
        formatter: (item) => item.ip ?? 'N/A',
      },
      {
        field: 'region',
        name: 'Region',
        formatter: (item) => item.region.name,
      },
      {
        field: 'created_at',
        name: 'Added on',
        formatter: (item) => format(new Date(item.created_at), 'MMM dd, yyyy'),
      },
      {
        field: 'actions',
        name: '',
        component: Actions,
      },
    ],
    [loadbalancers],
  );

  const events = useMemo(() => {
    const uniqueIds = new Set<string>();
    const uniqueEvents: { id: string; event: Event }[] = [];

    if (loadbalancers === undefined) return uniqueEvents;

    loadbalancers.forEach((loadbalancer) => {
      if (loadbalancer.event !== null && !uniqueIds.has(loadbalancer.id)) {
        uniqueIds.add(loadbalancer.id);
        uniqueEvents.push({ id: loadbalancer.id, event: loadbalancer.event });
      }
    });

    return uniqueEvents;
  }, [loadbalancers]);

  useQueries({
    queries: events.map((event) => ({
      queryKey: loadbalancerQueries.event(event.id),
      queryFn: () => getLoadbalancer(event.id),
      refetchInterval: (query) => {
        if (query.state.error) {
          return false;
        }
        if (query.state.data && query.state.data.load_balancer.event === null) {
          queryClient.setQueryData<Loadbalancer[]>(
            loadbalancerQueries.list(),
            (previousData) => {
              if (previousData) {
                return previousData.map((loadbalancer: Loadbalancer) =>
                  loadbalancer.id === event.id
                    ? query.state.data?.load_balancer
                    : loadbalancer,
                );
              }
            },
          );

          toast.success(
            `The task ${event.event?.description.toLowerCase()} of virtance has been completed.`,
          );

          queryClient.removeQueries({ queryKey: loadbalancerQueries.event(event.id) });

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
        description="We cannot display any load balancer at this time for some reason."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Load Balancers</h2>

        <Link className={buttonVariants()} to="/loadbalancers/create">
          Add Load Balancer
        </Link>
      </div>

      {loadbalancers ? (
        <>
          <Table data={loadbalancers} columns={columns} />
          {loadbalancers.length === 0 ? (
            <State
              title="No Load balancers"
              description="Add new load balancer to start use them."
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
