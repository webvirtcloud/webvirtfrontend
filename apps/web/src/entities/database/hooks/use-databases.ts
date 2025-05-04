import { useQuery } from '@tanstack/react-query';

import { getDatabases } from '../api/get-databases';
import { databaseQueries } from '../queries';

export function useDatabases() {
  return useQuery({
    queryKey: databaseQueries.list(),
    queryFn: () => getDatabases().then((response) => response.databases),
  });
}
