import { useState } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import ConfirmDialog from '@/components/Dialogs/ConfirmDialog';

const KeypairsTableActions = ({ id, onDelete }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onConfirmDelete = (id: number) => {
    setIsDeleting(true);
    return onDelete(id).then(() => setIsDeleting(false));
  };

  return (
    <div css={tw`ml-auto space-x-2`}>
      <Button size="md">Edit</Button>
      <Button variant="danger" size="md" onClick={() => setIsDeleteDialogOpen(true)}>
        Delete
      </Button>
      <ConfirmDialog
        title="Delete key pair?"
        isOpen={isDeleteDialogOpen}
        isConfirmButtonLoading={isDeleting}
        onToggle={setIsDeleteDialogOpen}
        onConfirm={() => onConfirmDelete(id)} // <- always id of the last element
      />
    </div>
  );
};

export default KeypairsTableActions;
