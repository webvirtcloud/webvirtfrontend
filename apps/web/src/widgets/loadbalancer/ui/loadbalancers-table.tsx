import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button, buttonVariants } from 'ui/components/button';
import { Table } from 'ui/components/table';

import {
  type Keypair,
  deleteKeypair,
  KeypairDeleteAlertDialog,
} from '@/entities/keypair';
import { useLoadbalancers } from '@/entities/loadbalancer';
import { KeypairEditDialog } from '@/features/keypair-edit-dialog';
import { State } from '@/shared/ui/state';

export function LoadbalancersTable() {
  const { data: loadbalancers, refetch, error } = useLoadbalancers();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedKeypair, setSelectedKeypair] = useState<Keypair>();

  async function onDelete(id: number) {
    await deleteKeypair(id);
    await refetch();
    toast.error('The load balancer has been deleted');
  }

  async function onUpdate() {
    await refetch();
    setIsEditDialogOpen(false);
    toast.success('The load balancer has been updated');
  }

  function onDialogOpen(key: Keypair, type: 'edit' | 'detach') {
    setSelectedKeypair(key);

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
    setSelectedKeypair(undefined);
  }

  const Actions = ({ value: key }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline" onClick={() => onDialogOpen(key, 'edit')}>
          Edit
        </Button>
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
        <h2 className="text-lg font-medium">Load Balancers</h2>

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

      {selectedKeypair ? (
        <>
          <KeypairEditDialog
            open={isEditDialogOpen}
            onUpdate={onUpdate}
            keypair={selectedKeypair}
            onOpenChange={() => onDialogClose('edit')}
          />
          <KeypairDeleteAlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={() => onDialogClose('detach')}
            onDelete={() => onDelete(selectedKeypair.id)}
          />
        </>
      ) : null}
    </div>
  );
}
