import type { Loadbalancer } from '@/entities/loadbalancer';
import request from '@/shared/api/request';

export const getLoadbalancers = (): Promise<{ load_balancers: Loadbalancer[] }> => {
  return request.get('load_balancers').json();
};
