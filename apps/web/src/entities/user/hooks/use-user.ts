import useSWR from 'swr';
import { getUser } from '../api';

export function useUser() {
  const { data, error, isValidating, mutate } = useSWR('user', () =>
    getUser().then((response) => response.profile),
  );

  return {
    data,
    error,
    isValidating,
    mutate,
  };
}
