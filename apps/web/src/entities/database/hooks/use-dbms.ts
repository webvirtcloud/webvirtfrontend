import { useQuery } from '@tanstack/react-query';

import { getDbms } from '../api/get-dbms';
import { databaseQueries } from '../queries';

export function useDbms() {
  return useQuery({
    queryKey: databaseQueries.dbms(),
    queryFn: () => getDbms().then((response) => response.dbms),
  });
}
