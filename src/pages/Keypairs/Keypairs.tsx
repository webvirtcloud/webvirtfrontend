import { useState } from 'react';
import useSWR from 'swr';
import tw from 'twin.macro';

import { type Keypair, deleteKeypair, getKeypairs } from '@/api/keypairs';
import { Button } from '@/shared/ui/Button';
import { CreateKeypairDialog } from '@/shared/ui/Dialogs/CreateKeypair';
import { useToastContext } from '@/shared/ui/Toast';

import { KeypairsTable } from './KeypairsTable';

export default function Keypairs() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const createToast = useToastContext();

  const { data, mutate, error } = useSWR('/keypairs/', getKeypairs);

  const onCreate = async (keypair: Keypair) => {
    await mutate({ keypairs: data ? [keypair, ...data.keypairs] : [] });
    createToast({ type: 'success', message: 'Keypair was updated.' });
  };

  const onUpdate = async (keypair: Keypair) => {
    await mutate({
      keypairs: data
        ? data.keypairs.map((key) => (key.id === keypair.id ? keypair : key))
        : [],
    });
    createToast({ type: 'success', message: 'Keypair was updated.' });
  };

  const onDelete = async (id: number) => {
    await deleteKeypair(id);
    await mutate({
      keypairs: data ? data.keypairs.filter((key) => key.id !== id) : [],
    });
    createToast({ type: 'success', message: 'Keypair was deleted.' });
  };

  return (
    <div>
      <div css={tw`flex items-center justify-between mb-8`}>
        <h2 css={tw`text-xl font-bold`}>Keypairs</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create Keypair</Button>
        <CreateKeypairDialog
          isOpen={isCreateDialogOpen}
          onToggle={setIsCreateDialogOpen}
          onCreate={onCreate}
        />
      </div>

      <KeypairsTable data={data} error={error} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}
