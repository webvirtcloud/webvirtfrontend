import useSWR from 'swr';
import { getVirtances } from '../api';

export function useVirtances() {
  const {
    data: virtances,
    mutate,
    error,
  } = useSWR('virtances', () => getVirtances().then((response) => response.virtances));

  return {
    virtances,
    mutate,
    error,
  };
}
