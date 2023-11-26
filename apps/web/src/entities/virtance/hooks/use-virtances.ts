import useSWR, { type SWRConfiguration } from 'swr';

import { getVirtances, GetVirtancesParams, runVirtanceAction } from '../api';
import { type ActionType, type Virtance } from '../types';

export function useVirtances(
  params?: GetVirtancesParams,
  options?: SWRConfiguration<Virtance[]>,
) {
  const {
    data: virtances,
    mutate,
    error,
  } = useSWR<Virtance[]>(
    ['virtances', params],
    () => getVirtances(params).then((response) => response.virtances),
    {
      refreshInterval(latestData) {
        return latestData?.some((virtance) => !!virtance.event) ? 1000 : 0;
      },
      ...options,
    },
  );

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
