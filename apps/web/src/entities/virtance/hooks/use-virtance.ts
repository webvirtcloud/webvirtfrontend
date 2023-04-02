import useSWR from 'swr';
import { getVirtance, runVirtanceAction } from '../api';
import type { ActionType } from '../types';

export function useVirtance(id: number) {
  const {
    data: virtance,
    mutate,
    error,
  } = useSWR(
    ['virtance', id],
    () => getVirtance(id).then((response) => response.virtance),
    {
      refreshInterval(latestData) {
        return latestData?.status === 'pending' ? 1000 : 0;
      },
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
