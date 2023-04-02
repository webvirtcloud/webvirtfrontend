import useSWR from 'swr';
import { getVirtances, runVirtanceAction } from '../api';
import { ActionType } from '../types';

export function useVirtances() {
  const {
    data: virtances,
    mutate,
    error,
  } = useSWR('virtances', () => getVirtances().then((response) => response.virtances), {
    refreshInterval(latestData) {
      return latestData?.some((virtance) => virtance.status === 'pending') ? 1000 : 0;
    },
  });

  async function runAction(payload: ActionType) {
    await runVirtanceAction(payload);
    virtances &&
      mutate(
        virtances.map((virtance) =>
          virtance.id === payload.id ? { ...virtance, status: 'pending' } : virtance,
        ),
      );
  }

  return {
    virtances,
    runAction,
    mutate,
    error,
  };
}
