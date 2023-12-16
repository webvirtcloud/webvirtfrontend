import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from 'ui/components/button';
import { Table } from 'ui/components/table';
import { useToast } from 'ui/components/toast';

import {
  type Keypair,
  deleteKeypair,
  KeypairDeleteAlertDialog,
  useKeypairs,
} from '@/entities/keypair';
import { KeypairCreateDialog } from '@/features/keypair-create-dialog';
import { KeypairEditDialog } from '@/features/keypair-edit-dialog';
import { State } from '@/shared/ui/state';

export function KeypairsTable() {
  const { data: keypairs, refetch, error } = useKeypairs();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedKeypair, setSelectedKeypair] = useState<Keypair>();
  const { toast } = useToast();

  async function onCreate() {
    await refetch();
    toast({
      title: 'The keypair has been created',
    });
  }

  async function onDelete(id: number) {
    await deleteKeypair(id);
    await refetch();
    toast({
      title: 'The keypair has been deleted',
    });
  }

  async function onUpdate() {
    await refetch();
    setIsEditDialogOpen(false);
    toast({
      title: 'The keypair has been updated',
    });
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
        <Button size="sm" variant="secondary" onClick={() => onDialogOpen(key, 'edit')}>
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
      field: 'fingerprint',
      name: 'Fingerprint',
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
    <div className="space-y-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg font-medium">Keypairs</h2>

        <KeypairCreateDialog onCreate={onCreate}>
          <Button>Add Keypair</Button>
        </KeypairCreateDialog>
      </div>

      {keypairs ? (
        <>
          <Table data={keypairs} columns={columns} />
          {keypairs.length === 0 ? (
            <State
              title="No keypairs"
              description="Add new keypairs to start use them."
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
