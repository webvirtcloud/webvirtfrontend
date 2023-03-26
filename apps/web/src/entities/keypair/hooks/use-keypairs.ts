import useSWR from 'swr';
import { getKeypairs } from '../api/get-keypairs';

export function useKeypairs() {
  const {
    data: keypairs,
    mutate,
    error,
  } = useSWR('/keypairs/', () => getKeypairs().then((response) => response.keypairs));

  return {
    keypairs,
    mutate,
    error,
  };
}
