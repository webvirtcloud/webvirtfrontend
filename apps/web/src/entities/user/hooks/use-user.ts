import { QueryOptions, useQuery } from '@tanstack/react-query';

import { type User, getUser, userQueries } from '@/entities/user';

export function useUser(options?: QueryOptions<User>) {
  return useQuery({
    queryKey: userQueries.user(),
    queryFn: () => getUser().then((response) => response.profile),
    ...options,
  });
}
