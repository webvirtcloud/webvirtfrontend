import { type ActionType, type Virtance } from '../types';
import { GetVirtancesParams, getVirtances, runVirtanceAction } from '../api';
import useSWR, { type SWRConfiguration } from 'swr';

export function useVirtances(
  params?: GetVirtancesParams,
  options?: SWRConfiguration<Virtance[]>,
) {
  const {
    data: virtances,
    mutate,
    error,
  } = useSWR<Virtance[]>(
    'virtances',
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
