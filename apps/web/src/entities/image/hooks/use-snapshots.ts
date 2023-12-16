import { useQuery } from '@tanstack/react-query';

import { getSnapshots, imageQueries } from '@/entities/image';

export function useSnapshots() {
  return useQuery({
    queryKey: imageQueries.snapshots.list(),
    queryFn: () => getSnapshots().then((data) => data.snapshots),
  });
}
