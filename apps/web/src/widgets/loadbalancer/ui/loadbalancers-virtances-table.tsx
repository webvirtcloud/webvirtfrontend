import { useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { format } from 'date-fns';
import { EllipsisIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';
import { Table } from 'ui/components/table';

import {
  detachVirtanceFromLoadbalancer,
  loadbalancerQueries,
  useLoadbalancer,
  useLoadbalancerVirtances,
} from '@/entities/loadbalancer';
import { useIsLoadbalancerBusy } from '@/entities/loadbalancer/hooks/use-is-loadbalancer-busy';
import { LoadbalancerAttachVirtanceDialog } from '@/features/loadbalancer';
import { State } from '@/shared/ui/state';

export function LoadbalancersVirtancesTable() {
  const { uuid } = useParams({ from: '/_authenticated/loadbalancers/$uuid' });
  const queryClient = useQueryClient();
  const { data: loadbalancer } = useLoadbalancer(uuid);
  const isLoadbalancerBusy = useIsLoadbalancerBusy(loadbalancer);
  const { data: virtances, error } = useLoadbalancerVirtances(uuid);

  async function onDetach(virtanceId: number) {
    try {
      await detachVirtanceFromLoadbalancer(uuid, [virtanceId]);
      await queryClient.invalidateQueries({
        queryKey: loadbalancerQueries.loadbalancer(uuid),
      });
      await queryClient.invalidateQueries({
        queryKey: loadbalancerQueries.virtances(uuid),
      });
      toast.success('Virtance detached successfully.');
    } catch (e) {
      window.console.error(e);
    }
  }

  const Actions = ({ value }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLoadbalancerBusy}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDetach(value.id as number)}>
              Detach
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const columns = [
    {
      field: 'name',
      name: 'Name',
      component: ({ value }) => (
        <Link
          className="hover:text-ring inline-flex items-center gap-2 font-semibold"
          to="/virtances/$id"
          params={{ id: value.id }}
        >
          <img
            className="h-8 w-8"
            src={
              new URL(
                `/src/shared/assets/images/os/${value.image.distribution
                  .toLowerCase()
                  .replaceAll(' ', '-')}.svg`,
                import.meta.url,
              ).href
            }
            alt={`Logo of ${value.image.distribution}`}
          />
          {value.name}
        </Link>
      ),
    },
    {
      field: 'ip',
      name: 'IP Address',
      formatter: (item) =>
        item.networks?.v4?.find((n) => n.type === 'public')?.address ?? 'N/A',
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
  ];

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
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Virtances</h2>

        <LoadbalancerAttachVirtanceDialog
          name={loadbalancer?.name}
          region={loadbalancer?.region.slug}
          attachedVirtancesIds={loadbalancer?.virtance_ids}
        />
      </div>

      {virtances ? (
        <>
          <Table data={virtances} columns={columns} />
          {virtances.length === 0 ? (
            <State
              title="No Virtances"
              description="Add new virtance to start use them."
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
