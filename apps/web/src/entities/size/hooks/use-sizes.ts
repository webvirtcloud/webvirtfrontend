import useSWR from 'swr';
import { getSizes } from '../api';

export function useSizes() {
  const {
    data: sizes,
    mutate,
    error,
  } = useSWR(['sizes'], () => getSizes().then((response) => response.sizes));

  return { sizes, mutate, error };
}
