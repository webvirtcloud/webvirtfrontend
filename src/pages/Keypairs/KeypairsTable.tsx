import { format } from 'date-fns';
import { useState } from 'react';
import tw from 'twin.macro';

import { Keypair } from '@/api/keypairs';
import { Button } from '@/shared/ui/Button';
import ConfirmDialog from '@/shared/ui/Dialogs/ConfirmDialog';
import EditKeypairDialog from '@/shared/ui/Dialogs/EditKeypair';
import Table from '@/shared/ui/Table';

type Props = {
  data: { keypairs: Keypair[] } | undefined;
  error: any;
  onUpdate: (keypair: Keypair) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export const KeypairsTable = ({ data, error, onUpdate, onDelete }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedKeypair, setSelectedKeypair] = useState<Keypair>();

  const onConfirmDelete = (id: number) => {
    setIsDeleting(true);
    return onDelete(id).then(() => setIsDeleteDialogOpen(false));
  };

  const handleClickOnEditAction = (key: Keypair) => {
    setSelectedKeypair(key);
    setIsEditDialogOpen(true);
  };

  const handleClickOnDeleteAction = (key: Keypair) => {
    setSelectedKeypair(key);
    setIsDeleteDialogOpen(true);
  };

  const Actions = ({ value: key }) => (
    <div css={tw`space-x-2`}>
      <div css={tw`flex justify-end space-x-2`}>
        <Button variant="secondary" onClick={() => handleClickOnEditAction(key)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleClickOnDeleteAction(key)}>
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

  return (
    <div css={tw`space-y-4`}>
      {data ? <Table data={data.keypairs} columns={columns} /> : null}
      <ConfirmDialog
        title="Delete key pair?"
        isOpen={isDeleteDialogOpen}
        isConfirmButtonLoading={isDeleting}
        onToggle={setIsDeleteDialogOpen}
        onConfirm={() => selectedKeypair && onConfirmDelete(selectedKeypair.id)}
      />
      <EditKeypairDialog
        isOpen={isEditDialogOpen}
        keypair={selectedKeypair}
        onToggle={setIsEditDialogOpen}
        onUpdate={onUpdate}
      />
    </div>
  );
};
