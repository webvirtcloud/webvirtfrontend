import { useQuery } from '@tanstack/react-query';

import { getSizes, sizeQueries } from '@/entities/size';

export function useSizes() {
  return useQuery({
    queryKey: sizeQueries.list(),
    queryFn: () => getSizes().then((response) => response.sizes),
  });
}
