import { useQueries, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Spin } from 'ui/components/spin';
import { Table } from 'ui/components/table';

import { type Event } from '@/entities/event';
import {
  type FloatingIP,
  deleteFloatingIP,
  FloatingIPDeleteAlertDialog,
  floatingIPQueries,
  FloatingIPUnassignAlertDialog,
  runFloatingIPAction,
  useFloatingIPs,
} from '@/entities/floating-ip';
import { getFloatingIP } from '@/entities/floating-ip/api/get-floating-ip';
import { useVirtances } from '@/entities/virtance';
import { CreateFloatingIPForm } from '@/features/create-floating-ip-form';
import { FloatingIPAssignDialog } from '@/features/floating-ip-assign-dialog';
import { REFRESH_INTERVAL } from '@/shared/constants';
import { State } from '@/shared/ui/state';

export function FloatingIpsTable() {
  const {
    data: floatingIps,
    error: floatingIPsError,
    refetch: refetchFloatingIPs,
  } = useFloatingIPs();
  const queryClient = useQueryClient();
  const { data: virtances, refetch: refetchVirtances } = useVirtances({
    has_floating_ip: false,
  });
  const [selectedFloatingIP, setSelectedFloatingIP] = useState<FloatingIP>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUnassignDialogOpen, setIsUnassignDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const events = useMemo(() => {
    const uniqueIPs = new Set<string>();
    const uniqueEvents: { ip: string; event: Event }[] = [];

    if (floatingIps === undefined) return uniqueEvents;

    floatingIps.forEach((floatingIP) => {
      if (floatingIP.event !== null && !uniqueIPs.has(floatingIP.ip)) {
        uniqueIPs.add(floatingIP.ip);
        uniqueEvents.push({ ip: floatingIP.ip, event: floatingIP.event });
      }
    });

    return uniqueEvents;
  }, [floatingIps]);

  useQueries({
    queries: events.map((event) => ({
      queryKey: floatingIPQueries.event(event.ip),
      queryFn: ({ signal }) => getFloatingIP({ ip: event.ip, options: { signal } }),
      refetchInterval: (query) => {
        if (query.state.data && query.state.data.floating_ip.event === null) {
          queryClient.setQueryData<FloatingIP[]>(
            floatingIPQueries.list(),
            (previousData) => {
              if (previousData) {
                return previousData.map((floatingIP: FloatingIP) =>
                  floatingIP.ip === event.ip ? query.state.data?.floating_ip : floatingIP,
                );
              }
            },
          );

          refetchVirtances();

          toast.success(
            `The task to ${event.event?.description.toLowerCase()} a Floating IP has been completed.`,
          );

          queryClient.removeQueries({ queryKey: floatingIPQueries.event(event.ip) });

          return false;
        }
        return REFRESH_INTERVAL;
      },
    })),
  });

  function onCreate() {
    refetchFloatingIPs();
    refetchVirtances();
    setIsAssignDialogOpen(false);
  }

  async function onDelete(ip: string) {
    await deleteFloatingIP(ip);
    refetchVirtances();
    refetchFloatingIPs();
  }

  const onUnassgin = async (ip: string) => {
    await runFloatingIPAction({ action: 'unassign', ip });
    refetchFloatingIPs();
  };

  function onDialogOpen(floatingIP: FloatingIP, type: 'assign' | 'unassign' | 'delete') {
    setSelectedFloatingIP(floatingIP);

    switch (type) {
      case 'assign':
        setIsAssignDialogOpen(true);
        break;
      case 'unassign':
        setIsUnassignDialogOpen(true);
        break;
      case 'delete':
        setIsDeleteDialogOpen(true);
        break;
    }
  }

  function onDialogClose(type: 'assign' | 'unassgin' | 'delete') {
    switch (type) {
      case 'assign':
        setIsAssignDialogOpen(false);
        break;
      case 'unassgin':
        setIsUnassignDialogOpen(false);
        break;
      case 'delete':
        setIsDeleteDialogOpen(false);
        break;
    }
    setSelectedFloatingIP(undefined);
  }

  const Actions = ({ value: floatingIP }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        {floatingIP.event ? (
          <Spin size="sm" />
        ) : (
          <>
            {floatingIP.virtance ? (
              <Button
                size="sm"
                variant="outline"
                disabled={!!floatingIP.event}
                onClick={() => onDialogOpen(floatingIP, 'unassign')}
              >
                {floatingIP.event && floatingIP.event.name === 'unassign' ? (
                  <>
                    <Spin size="sm" />
                    <span className="ml-2">{floatingIP.event.description}</span>
                  </>
                ) : (
                  'Unassign'
                )}
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                disabled={!!floatingIP.event}
                onClick={() => onDialogOpen(floatingIP, 'assign')}
              >
                {floatingIP.event && floatingIP.event.name === 'assign' ? (
                  <>
                    <Spin size="sm" />
                    <span className="ml-2">{floatingIP.event.description}</span>
                  </>
                ) : (
                  'Assign'
                )}
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              disabled={!!floatingIP.event}
              onClick={() => onDialogOpen(floatingIP, 'delete')}
            >
              {floatingIP.event && floatingIP.event.name === 'delete' ? (
                <>
                  <Spin size="sm" />
                  <span className="ml-2">{floatingIP.event.description}</span>
                </>
              ) : (
                'Destroy'
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const columns = [
    {
      field: 'name',
      name: 'Name',
      component: ({ value }) => {
        return <div className="font-medium">{value.ip}</div>;
      },
    },
    {
      field: 'virtance',
      name: 'Virtance',
      component: ({ value }) => {
        return value.virtance ? (
          <Link
            to={`/virtances/${value.virtance.id}`}
            className="font-medium text-sky-500"
          >
            {value.virtance.name}
          </Link>
        ) : (
          <span>None</span>
        );
      },
    },
    {
      field: 'region',
      name: 'Region',
      component: ({ value }) => {
        return <div>{value.region ? value.region.name : 'None'}</div>;
      },
    },
    {
      field: 'actions',
      name: '',
      component: Actions,
    },
  ];

  if (floatingIPsError) {
    return (
      <div className="rounded-md border">
        <State
          title="Oh no..."
          description="We cannot display any snapshots at this time for some reason."
        />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Assign</h2>
          <p className="text-muted-foreground">
            You can assign a Floating IP to any virtances.
          </p>
        </div>
        <CreateFloatingIPForm virtances={virtances} onCreate={onCreate} />
      </div>

      <hr className="" />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Floating IPs</h2>
          <p className="text-muted-foreground">
            A Floating IP allows you to redirect network traffic to any of your Virtances
            in the same datacenter.
          </p>
        </div>
        {floatingIps ? (
          <>
            <Table data={floatingIps} columns={columns} />
            {floatingIps.length === 0 ? (
              <State
                title="No Floating IPs"
                description="Add new Floating IPs to start use them."
              />
            ) : null}
          </>
        ) : null}
        {selectedFloatingIP ? (
          <>
            <FloatingIPAssignDialog
              open={isAssignDialogOpen}
              onOpenChange={() => onDialogClose('assign')}
              onCreate={() => onCreate()}
              virtances={virtances}
              ip={selectedFloatingIP.ip}
            />
            <FloatingIPUnassignAlertDialog
              open={isUnassignDialogOpen}
              onOpenChange={() => onDialogClose('unassgin')}
              onDelete={() => onUnassgin(selectedFloatingIP.ip)}
            />
            <FloatingIPDeleteAlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={() => onDialogClose('delete')}
              onDelete={() => onDelete(selectedFloatingIP.ip)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
