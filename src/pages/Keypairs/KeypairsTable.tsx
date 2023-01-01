import { format } from 'date-fns';
import tw from 'twin.macro';

import { Keypair } from '@/api/keypairs';

import KeypairsTableActions from './KeypairsTableActions';

type Props = {
  data: { keypairs: Keypair[] } | undefined;
  error: any;
  onDelete: (id: number) => Promise<void>;
};

export const KeypairsTable = ({ data, error, onDelete }: Props) => {
  return (
    <div css={tw`border divide-y rounded-md bg-base`}>
      {data && data.keypairs.length > 0 ? (
        data.keypairs.map((key) => (
          <div key={key.id} css={tw`flex flex-wrap items-center gap-24 p-4 text-alt2`}>
            <div css={tw`font-bold text-body`}>{key.name}</div>
            <div>{key.fingerprint}</div>
            <div>Added on {format(new Date(key.created_at), 'MMM dd, yyyy')}</div>
            <KeypairsTableActions id={key.id} onDelete={onDelete} />
          </div>
        ))
      ) : (
        <p css={tw`p-8 text-center`}>No keypairs found!</p>
      )}
      {error && (
        <p css={tw`p-4 font-bold text-center`}>Something goes wrong...Try again later.</p>
      )}
    </div>
  );
};
