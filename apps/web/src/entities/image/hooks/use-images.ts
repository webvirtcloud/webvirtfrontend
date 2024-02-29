import { type UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  type ImagesResponse,
  type ImageType,
  getImages,
  imageQueries,
} from '@/entities/image';

export function useImages(
  type: 'distribution',
  options?: Omit<UseQueryOptions<ImagesResponse<'distribution'>>, 'queryKey' | 'queryFn'>,
): UseQueryResult<ImagesResponse<'distribution'>>;
export function useImages(
  type: 'snapshot',
  options?: Omit<UseQueryOptions<ImagesResponse<'snapshot'>>, 'queryKey' | 'queryFn'>,
): UseQueryResult<ImagesResponse<'snapshot'>>;
export function useImages(
  type: 'backup',
  options?: Omit<UseQueryOptions<ImagesResponse<'backup'>>, 'queryKey' | 'queryFn'>,
): UseQueryResult<ImagesResponse<'backup'>>;
export function useImages(
  type: ImageType,
  options?: Omit<UseQueryOptions<ImagesResponse<ImageType>>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: imageQueries.list(type),
    queryFn: () => getImages(type),
    staleTime: Infinity,
    ...options,
  });
}
