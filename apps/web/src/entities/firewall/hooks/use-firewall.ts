import useSWR, { SWRConfiguration, useSWRConfig } from 'swr';
import { getFirewall } from '../api';
import type { Firewall } from '../types';
import { useRef } from 'react';

export function useFirewall(uuid: string, options?: SWRConfiguration<Firewall>) {
  // const event = useRef<Virtance['event']>(null);
  const { mutate: globalMutate } = useSWRConfig();
  const {
    data: firewall,
    mutate,
    error,
  } = useSWR<Firewall>(
    ['firewall', uuid],
    () => getFirewall(uuid).then((response) => response.firewall),
    {
      // refreshInterval(latestData) {
      //   if (latestData?.event === null) {

      //   return 1000;
      // },
      ...options,
    },
  );

  const isBusy = firewall?.event !== null;

  return {
    firewall,
    mutate,
    error,
    isBusy,
  };
}
