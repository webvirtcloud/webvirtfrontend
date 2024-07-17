import type { Loadbalancer } from '@/entities/loadbalancer';
import request from '@/shared/api/request';

export const getLoadbalancer = (id: string): Promise<{ load_balancer: Loadbalancer }> => {
  return request.get(`load_balancers/${id}`).json();
};
