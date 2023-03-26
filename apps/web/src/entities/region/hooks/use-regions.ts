import useSWR from 'swr';
import { getRegions } from '../api';

export function useRegions() {
  const {
    data: regions,
    mutate,
    error,
  } = useSWR(['regions'], () => getRegions().then((response) => response.regions));

  return { regions, mutate, error };
}
