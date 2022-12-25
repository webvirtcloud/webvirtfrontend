import { format } from 'date-fns';
import tw from 'twin.macro';

import { Keypair } from '@/api/keypairs';
import { Button } from '@/components/Button';

type Props = {
  data: { keypairs: Keypair[] } | undefined;
  error: any;
};

export const KeypairsTable = ({ data, error }: Props) => {
  return (
    <div css={tw`border divide-y rounded-md bg-base`}>
      {data &&
        data.keypairs.map((key) => (
          <div key={key.id} css={tw`flex flex-wrap items-center gap-24 p-4 text-alt2`}>
            <div css={tw`font-bold text-body`}>{key.name}</div>
            <div>{key.fingerprint}</div>
            <div>Added on {format(new Date(key.created_at), 'MMM dd, yyyy')}</div>
            <div css={tw`ml-auto space-x-2`}>
              <Button size="md">Edit</Button>
              <Button variant="danger" size="md">
                Delete
              </Button>
            </div>
          </div>
        ))}
      {error && (
        <p css={tw`p-4 font-bold text-center`}>Something goes wrong...Try again later.</p>
      )}
    </div>
  );
};
