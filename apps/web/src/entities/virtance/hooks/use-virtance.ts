import useSWR from 'swr';
import { getVirtance } from '../api';

export function useVirtance(id: number) {
  const {
    data: virtance,
    mutate,
    error,
  } = useSWR(['virtance', id], () =>
    getVirtance(id).then((response) => response.virtance),
  );

  return {
    virtance,
    mutate,
    error,
  };
}
