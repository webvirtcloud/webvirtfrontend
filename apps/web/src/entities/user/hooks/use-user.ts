import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import { type User, getUser, userQueries } from '@/entities/user';

export function useUser(options?: Pick<UseQueryOptions<User>, 'refetchOnMount'>) {
  return useQuery({
    queryKey: userQueries.user(),
    queryFn: () => getUser().then((response) => response.profile),
    ...options,
  });
}
