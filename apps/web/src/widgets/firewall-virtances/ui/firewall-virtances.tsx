import { useQueries, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Spin } from 'ui/components/spin';
import { Table } from 'ui/components/table';

import { type Event } from '@/entities/event';
import {
  attachFirewallVirtance,
  detachFirewallVirtance,
  FirewallAttachVirtanceForm,
  FirewallDetachAlertDialog,
  firewallQueries,
  useFirewallVirtances,
} from '@/entities/firewall';
import { type Virtance, getVirtance, useVirtances } from '@/entities/virtance';
import { REFRESH_INTERVAL } from '@/shared/constants';
import { State } from '@/shared/ui/state';

export function FirewallVirtances({ uuid }: { uuid: string }) {
  const queryClient = useQueryClient();
  const { data: VirtancesWithoutFirewall, refetch: refetchVirtancesWithoutFirewall } =
    useVirtances({
      has_firewall: false,
    });
  const [selectedVirtance, setSelectedVirtance] = useState<Virtance>();
  const [isDetachDialogOpen, setIsDetachDialogOpen] = useState(false);
  const {
    data: virtancesWithFirewall,
    refetch: refetchVirtancesWithFirewall,
    error,
  } = useFirewallVirtances(uuid);

  const events = useMemo(() => {
    const uniqueIds = new Set<number>();
    const uniqueEvents: { id: number; event: Event }[] = [];

    if (virtancesWithFirewall === undefined) return uniqueEvents;

    virtancesWithFirewall.forEach((virtance) => {
      if (virtance.event !== null && !uniqueIds.has(virtance.id)) {
        uniqueIds.add(virtance.id);
        uniqueEvents.push({ id: virtance.id, event: virtance.event });
      }
    });

    return uniqueEvents;
  }, [virtancesWithFirewall]);

  useQueries({
    queries: events.map((event) => ({
      queryKey: firewallQueries.virtanceEvent(event.id),
      queryFn: () => getVirtance(event.id),
      refetchInterval: (query) => {
        if (query.state.data && query.state.data.virtance.event === null) {
          queryClient.setQueryData<Virtance[]>(
            firewallQueries.virtances(uuid),
            (previousData) => {
              if (previousData) {
                return previousData.map((virtance: Virtance) =>
                  virtance.id === event.id ? query.state.data?.virtance : virtance,
                );
              }
            },
          );

          refetchVirtancesWithFirewall();

          toast.success(`The has been completed.`);

          queryClient.removeQueries({
            queryKey: firewallQueries.virtanceEvent(event.id),
          });

          return false;
        }
        return REFRESH_INTERVAL;
      },
    })),
  });

  useEffect(() => {
    if (virtancesWithFirewall?.every((virtance) => !virtance.event)) {
      refetchVirtancesWithoutFirewall();
    }
  }, [virtancesWithFirewall]);

  async function onAttach(payload: number[]) {
    try {
      await attachFirewallVirtance(uuid, {
        virtance_ids: payload,
      });

      refetchVirtancesWithFirewall();
    } catch (e) {
      const { message } = await e.response.json();
      toast.error('Bad request', { description: message });
      throw e;
    }
  }

  async function onDetach() {
    selectedVirtance &&
      (await detachFirewallVirtance(uuid, { virtance_ids: [selectedVirtance.id] }));

    refetchVirtancesWithFirewall();
    refetchVirtancesWithoutFirewall();
  }

  function onDialogOpen(virtance: Virtance, type: 'detach') {
    setSelectedVirtance(virtance);

    switch (type) {
      case 'detach':
        setIsDetachDialogOpen(true);
        break;
    }
  }

  const Actions = ({ value: virtance }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        <Button
          size="sm"
          variant="destructive"
          disabled={!!virtance.event}
          onClick={() => onDialogOpen(virtance, 'detach')}
        >
          {virtance.event ? <Spin size="sm" /> : 'Detach'}
        </Button>
      </div>
    </div>
  );

  const columns = [
    {
      field: 'name',
      name: 'Name',
    },
    {
      field: 'ip_address',
      name: 'IP Address',
      component: ({ value }) => {
        return (
          <div>
            {value.networks.v4.find((network) => network.type === 'public')?.address}
          </div>
        );
      },
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
        description="We cannot display any keypairs at this time for some reason."
      />
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-medium">Attach virtance</h2>

      <div className="mb-8">
        <FirewallAttachVirtanceForm
          virtances={VirtancesWithoutFirewall}
          refetch={refetchVirtancesWithoutFirewall}
          onSubmit={onAttach}
        />
      </div>

      <hr className="my-6 dark:border-neutral-800" />

      <h2 className="mb-1 text-lg font-medium">Virtances</h2>
      <p className="text-muted-foreground mb-8">A list of attached virtances.</p>

      {virtancesWithFirewall ? (
        <>
          <Table data={virtancesWithFirewall} columns={columns} />
          {virtancesWithFirewall.length === 0 ? (
            <State
              title="No virtances"
              description="Attach virtances using form above."
            />
          ) : null}
        </>
      ) : null}

      {selectedVirtance && (
        <FirewallDetachAlertDialog
          open={isDetachDialogOpen}
          onOpenChange={setIsDetachDialogOpen}
          onDetach={onDetach}
        />
      )}
    </div>
  );
}
