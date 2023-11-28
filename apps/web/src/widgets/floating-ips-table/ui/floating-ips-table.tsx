import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { Spin } from 'ui/components/spin';
import { Table } from 'ui/components/table';
import { useToast } from 'ui/components/toast';

import {
  type FloatingIP,
  deleteFloatingIP,
  FloatingIPDeleteAlertDialog,
  FloatingIPUnassignAlertDialog,
  runFloatingIPAction,
  useFloatingIPs,
} from '@/entities/floating-ip';
import { useVirtances } from '@/entities/virtance';
import { CreateFloatingIPForm } from '@/features/create-floating-ip-form';
import { FloatingIPAssignDialog } from '@/features/floating-ip-assign-dialog';
import { State } from '@/shared/ui/state';

export function FloatingIpsTable() {
  const {
    floatingIps,
    error: floatingIPsError,
    mutate: mutateFloatingIPs,
  } = useFloatingIPs();
  const { virtances, mutate: mutateVirtances } = useVirtances({ has_floating_ip: false });
  const [selectedFloatingIP, setSelectedFloatingIP] = useState<FloatingIP>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUnassignDialogOpen, setIsUnassignDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const { toast } = useToast();

  const onCreate = () => {
    mutateFloatingIPs();
    mutateVirtances();
    setIsAssignDialogOpen(false);
  };

  const onDelete = async (ip: string) => {
    try {
      await deleteFloatingIP(ip);
      await mutateVirtances();
      await mutateFloatingIPs();
      toast({
        title: 'The task to delete a Floating IP has been started.',
        variant: 'destructive',
      });
    } catch (error) {}
  };

  const onUnassgin = async (ip: string) => {
    try {
      await runFloatingIPAction({ action: 'unassign', ip });
      await mutateVirtances();
      await mutateFloatingIPs();
      toast({
        title: 'The task to unassgin a Floating IP has been started.',
        variant: 'destructive',
      });
    } catch (error) {}
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
        {floatingIP.virtance ? (
          <Button
            size="sm"
            variant="secondary"
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
            variant="secondary"
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
      <div className="rounded-md border dark:border-neutral-700">
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
          <p className="text-neutral-500">
            You can assign a Floating IP to any virtances.
          </p>
        </div>
        <CreateFloatingIPForm virtances={virtances} onCreate={onCreate} />
      </div>

      <hr className="dark:border-neutral-800" />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Floating IPs</h2>
          <p className="text-neutral-500">
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
