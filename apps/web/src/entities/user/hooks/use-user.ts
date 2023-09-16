import useSWR, { SWRConfiguration } from 'swr';
import { getUser } from '../api';
import { User } from '../types';

export function useUser(options?: SWRConfiguration<User>) {
  const { data, error, isValidating, mutate } = useSWR<User>(
    'user',
    () => getUser().then((response) => response.profile),
    options,
  );

  return {
    data,
    error,
    isValidating,
    mutate,
  };
}
