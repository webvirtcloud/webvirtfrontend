import { type Loadbalancer } from '@/entities/loadbalancer';

export function useIsLoadbalancerBusy(loadbalancer?: Loadbalancer) {
  return loadbalancer?.event !== null;
}
