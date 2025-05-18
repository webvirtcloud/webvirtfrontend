import { useQuery } from '@tanstack/react-query';

import { databaseQueries, getDatabaseBackups } from '@/entities/database';

export function useDatabaseBackups(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: databaseQueries.backups(id),
    queryFn: () => getDatabaseBackups(id).then((response) => response.backups),
    enabled: options?.enabled,
  });
}
