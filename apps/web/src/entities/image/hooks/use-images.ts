import { useQuery } from '@tanstack/react-query';

import { getImages, imageQueries } from '@/entities/image';

export function useImages(type: 'distribution' | 'snapshot' | 'backup') {
  return useQuery({
    queryKey: imageQueries.list(type),
    queryFn: () => getImages('distribution').then((response) => response.images),
  });
}
