import { useQuery } from '@tanstack/react-query';

import { getDatabaseSnapshots } from '../api';
import { databaseQueries } from '../queries';

export function useDatabaseSnapshots(id: string) {
  return useQuery({
    queryKey: databaseQueries.snapshots(id),
    queryFn: () => getDatabaseSnapshots(id).then((response) => response.snapshots),
  });
}
