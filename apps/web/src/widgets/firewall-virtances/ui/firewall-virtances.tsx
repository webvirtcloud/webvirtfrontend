import {
  FirewallDetachAlertDialog,
  FirewallAttachVirtanceForm,
  attachFirewallVirtance,
  detachFirewallVirtance,
  useFirewallVirtances,
} from '@/entities/firewall';
import { useVirtances, type Virtance } from '@/entities/virtance';
import { State } from '@/shared/ui/state';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button } from 'ui/components/button';
import { Table } from 'ui/components/table';
import { useToast } from 'ui/components/toast';
import { Spin } from 'ui/components/spin';

export function FirewallVirtances({ uuid }: { uuid: string }) {
  const { virtances: VirtancesWithoutFirewall, mutate: mutateVirtancesWithoutFirewall } =
    useVirtances({
      has_firewall: false,
    });
  const [selectedVirtance, setSelectedVirtance] = useState<Virtance>();
  const [isDetachDialogOpen, setIsDetachDialogOpen] = useState(false);
  const {
    virtances: virtancesWithFirewall,
    mutate: mutateVirtancesWithFirewall,
    error,
  } = useFirewallVirtances(uuid);
  const { toast } = useToast();

  useEffect(() => {
    if (virtancesWithFirewall?.every((virtance) => !virtance.event)) {
      mutateVirtancesWithoutFirewall();
    }
  }, [virtancesWithFirewall]);

  async function onAttach(payload: number[]) {
    try {
      await attachFirewallVirtance(uuid, {
        virtance_ids: payload,
      });

      mutateVirtancesWithFirewall();
    } catch (e) {
      const { message } = await e.response.json();
      toast({ title: 'Bad request', variant: 'destructive', description: message });
      throw e;
    }
  }

  async function onDetach() {
    selectedVirtance &&
      (await detachFirewallVirtance(uuid, { virtance_ids: [selectedVirtance.id] }));

    mutateVirtancesWithFirewall();
    mutateVirtancesWithoutFirewall();
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
          mutate={mutateVirtancesWithoutFirewall}
          onSubmit={onAttach}
        />
      </div>

      <hr className="my-6 dark:border-neutral-800" />

      <h2 className="mb-1 text-lg font-medium">Virtances</h2>
      <p className="mb-8 text-neutral-500">A list of attached virtances.</p>

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
