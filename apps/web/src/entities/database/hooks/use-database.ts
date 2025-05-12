import { useQuery } from '@tanstack/react-query';

import { getDatabase } from '../api/get-database';
import { databaseQueries } from '../queries';

export function useDatabase(id: string) {
  return useQuery({
    queryKey: databaseQueries.database(id),
    queryFn: () => getDatabase(id).then((response) => response.database),
  });
}
