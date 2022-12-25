import { useState } from 'react';
import useSWR from 'swr';
import tw from 'twin.macro';

import { getKeypairs } from '@/api/keypairs';
import { Button } from '@/components/Button';
import { CreateKeypairDialog } from '@/components/Dialogs/CreateKeypair';

import { KeypairsTable } from './KeypairsTable';

export default function Keypairs() {
  const [shownCreateDialog, setShownCreateDialog] = useState(false);

  const { data, error } = useSWR('/keypairs/', getKeypairs);

  return (
    <div>
      <div css={tw`flex items-center justify-between mb-8`}>
        <h2 css={tw`text-xl font-bold`}>Keypairs</h2>
        <Button variant="primary" size="lg" onClick={() => setShownCreateDialog(true)}>
          Create Keypair
        </Button>
        <CreateKeypairDialog isOpen={shownCreateDialog} onToggle={setShownCreateDialog} />
      </div>

      <KeypairsTable data={data} error={error} />
    </div>
  );
}
