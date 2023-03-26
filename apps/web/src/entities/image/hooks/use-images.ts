import useSWR from 'swr';
import { getImages } from '../api';

export function useImages(type: 'distribution') {
  const {
    data: images,
    mutate,
    error,
  } = useSWR(['images', { type }], () =>
    getImages('distribution').then((response) => response.images),
  );

  return {
    images,
    mutate,
    error,
  };
}
