import useSWR, { SWRConfiguration, useSWRConfig } from 'swr';
import { getVirtance, runVirtanceAction } from '../api';
import type { ActionType, Virtance } from '../types';
import { useRef } from 'react';

export function useVirtance(id: number, options?: SWRConfiguration<Virtance>) {
  const event = useRef<Virtance['event']>(null);
  const { mutate: globalMutate } = useSWRConfig();
  const {
    data: virtance,
    mutate,
    error,
  } = useSWR<Virtance>(
    ['virtance', id],
    () => getVirtance(id).then((response) => response.virtance),
    {
      refreshInterval(latestData) {
        if (latestData?.event === null) {
          // refetch snapshots if 'snapshot' task is completed
          if (event.current?.name === 'snapshot') {
            globalMutate(`virtance-snapshots-${id}`);
          }

          event.current = null;
          return 0;
        }

        event.current = latestData ? latestData.event : null;

        return 1000;
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
