import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Table } from 'ui/components/table';

import {
  type Firewall,
  deleteFirewall,
  FirewallDeleteAlertDialog,
  useFirewalls,
} from '@/entities/firewall';
import { FirewallCreateDialog } from '@/features/firewall';
import { State } from '@/shared/ui/state';

export const FirewallsTable = () => {
  const { data: firewalls, refetch, error } = useFirewalls();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFirewall, setSelectedFirewall] = useState<Firewall>();

  const onCreate = async () => {
    await refetch();
    toast.success('Firewall has been created');
  };

  const onDelete = async (uuid: string) => {
    await deleteFirewall(uuid);
    await refetch();
    toast.success('Firewall has been deleted');
  };

  async function onUpdate(firewall: Firewall) {
    await refetch();
    setIsEditDialogOpen(false);
    toast.success('Firewall has been updated');
  }

  function onDialogOpen(firewall: Firewall, type: 'edit' | 'detach') {
    setSelectedFirewall(firewall);

    switch (type) {
      case 'edit':
        setIsEditDialogOpen(true);
        break;
      case 'detach':
        setIsDeleteDialogOpen(true);
        break;
    }
  }

  function onDialogClose(type: 'edit' | 'detach') {
    switch (type) {
      case 'edit':
        setIsEditDialogOpen(false);
        break;
      case 'detach':
        setIsDeleteDialogOpen(false);
        break;
    }
    setSelectedFirewall(undefined);
  }

  const Actions = ({ value: key }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        {/* <Button size="sm" variant="outline" onClick={() => onDialogOpen(key, 'edit')}>
          Edit
        </Button> */}
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDialogOpen(key, 'detach')}
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
      component: ({ value }) => {
        return (
          <Link className="font-medium" to={`/firewalls/${value.uuid}`}>
            {value.name}
          </Link>
        );
      },
    },
    {
      field: 'rules',
      name: 'Rules',
      component: ({ value }) => {
        return (
          <div>
            <span className="text-muted-foreground">
              {value.inbound_rules.length + value.outbound_rules.length} rules /{' '}
              {value.virtance_ids.length} virtances
            </span>
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
        description="We cannot display any Firewalls at this time for some reason."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Firewalls</h2>

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
            onOpenChange={() => onDialogClose('detach')}
            onDelete={() => onDelete(selectedFirewall.uuid)}
          />
        </>
      ) : null}
    </div>
  );
};
