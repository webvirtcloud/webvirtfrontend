import { useQuery } from '@tanstack/react-query';

import { getKeypairs, keypairQueries } from '@/entities/keypair';

export function useKeypairs() {
  return useQuery({
    queryKey: keypairQueries.list(),
    queryFn: () => getKeypairs().then((response) => response.keypairs),
  });
}
