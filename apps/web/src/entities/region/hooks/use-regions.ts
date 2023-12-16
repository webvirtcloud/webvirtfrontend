import { useQuery } from '@tanstack/react-query';

import { getRegions, regionQueries } from '@/entities/region';

export function useRegions() {
  return useQuery({
    queryKey: regionQueries.list(),
    queryFn: () => getRegions().then((response) => response.regions),
  });
}
