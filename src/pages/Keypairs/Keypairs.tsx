import { useState } from 'react';
import useSWR from 'swr';
import tw from 'twin.macro';

import { type Keypair, deleteKeypair, getKeypairs } from '@/api/keypairs';
import { Button } from '@/components/Button';
import { CreateKeypairDialog } from '@/components/Dialogs/CreateKeypair';

import { KeypairsTable } from './KeypairsTable';

export default function Keypairs() {
  const [shownCreateDialog, setShownCreateDialog] = useState(false);

  const { data, mutate, error } = useSWR('/keypairs/', getKeypairs);

  const onCreateKeypair = (keypair: Keypair) => {
    mutate({ keypairs: data ? [keypair, ...data.keypairs] : [] });
  };


  return (
    <div>
      <div css={tw`flex items-center justify-between mb-8`}>
        <h2 css={tw`text-xl font-bold`}>Keypairs</h2>
        <Button variant="primary" size="lg" onClick={() => setShownCreateDialog(true)}>
          Create Keypair
        </Button>
        <CreateKeypairDialog
          isOpen={shownCreateDialog}
          onToggle={setShownCreateDialog}
          onCreate={onCreateKeypair}
        />
      </div>

      <KeypairsTable data={data} error={error} />
    </div>
  );
}
