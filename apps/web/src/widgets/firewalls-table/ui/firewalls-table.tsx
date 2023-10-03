import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from 'ui/components/button';
import { Table } from 'ui/components/table';
import { useToast } from 'ui/components/toast';
import { FirewallCreateDialog } from '@/features/firewall-create-dialog';
import { State } from '@/shared/ui/state';
import {
  type Firewall,
  FirewallDeleteAlertDialog,
  useFirewalls,
  deleteFirewall,
} from '@/entities/firewall';

export const FirewallsTable = () => {
  const { data: firewalls, mutate, error } = useFirewalls();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFirewall, setSelectedFirewall] = useState<Firewall>();
  const { toast } = useToast();

  const onCreate = async (firewall: Firewall) => {
    await mutate(firewalls ? [firewall, ...firewalls] : []);
    toast({
      title: 'Keypair was created',
    });
  };

  const onDelete = async (uuid: string) => {
    try {
      await deleteFirewall(uuid);
      await mutate(
        firewalls ? firewalls.filter((firewall) => firewall.uuid !== uuid) : [],
      );
      toast({
        title: 'Firewall was delete',
      });
    } catch (error) {}
  };

  async function onUpdate(firewall: Firewall) {
    selectedFirewall &&
      (await mutate(
        firewalls
          ? firewalls.map((item) => (item.id === firewall.id ? firewall : item))
          : [],
      ));
    setIsEditDialogOpen(false);
    toast({
      title: 'Keypair was updated',
    });
  }

  function onDialogOpen(firewall: Firewall, type: 'edit' | 'delete') {
    setSelectedFirewall(firewall);

    switch (type) {
      case 'edit':
        setIsEditDialogOpen(true);
        break;
      case 'delete':
        setIsDeleteDialogOpen(true);
        break;
    }
  }

  function onDialogClose(type: 'edit' | 'delete') {
    switch (type) {
      case 'edit':
        setIsEditDialogOpen(false);
        break;
      case 'delete':
        setIsDeleteDialogOpen(false);
        break;
    }
    setSelectedFirewall(undefined);
  }

  const Actions = ({ value: key }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        {/* <Button size="sm" variant="secondary" onClick={() => onDialogOpen(key, 'edit')}>
          Edit
        </Button> */}
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDialogOpen(key, 'delete')}
        >
          Delete
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
        description="We cannot display any Firewalls at this time for some reason."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg font-medium">Firewalls</h2>

        <FirewallCreateDialog onCreate={onCreate}>
          <Button>Add Firewall</Button>
        </FirewallCreateDialog>
      </div>

      {firewalls ? (
        <>
          <Table data={firewalls} columns={columns} />
          {firewalls.length === 0 ? (
            <State
              title="No firewalls"
              description="Add new firewalls to start use them."
            />
          ) : null}
        </>
      ) : null}

      {selectedFirewall ? (
        <>
          {/* <FirewallUpdateAlertDialog
            open={isEditDialogOpen}
            onUpdate={onUpdate}
            keypair={selectedFirewall}
            onOpenChange={() => onDialogClose('edit')}
          /> */}
          <FirewallDeleteAlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={() => onDialogClose('delete')}
            onDelete={() => onDelete(selectedFirewall.uuid)}
          />
        </>
      ) : null}
    </div>
  );
};
