import useSWR, { SWRConfiguration } from 'swr';
import { getVirtance, runVirtanceAction } from '../api';
import type { ActionType, Virtance } from '../types';

export function useVirtance(id: number, options?: SWRConfiguration<Virtance>) {
  const {
    data: virtance,
    mutate,
    error,
  } = useSWR<Virtance>(
    ['virtance', id],
    () => getVirtance(id).then((response) => response.virtance),
    {
      refreshInterval(latestData) {
        return latestData?.status === 'pending' ? 1000 : 0;
      },
      ...options,
    },
  );

  async function runAction(payload: ActionType) {
    await runVirtanceAction(payload);
    virtance && mutate({ ...virtance, status: 'pending' });
  }

  return {
    virtance,
    mutate,
    runAction,
    error,
  };
}
