import type { Virtance } from '@/entities/virtance';
import request from '@/shared/api/request';

export const getLoadbalancersVirtances = (
  id: string,
): Promise<{ virtances: Virtance[] }> => {
  return request.get(`load_balancers/${id}/virtances`).json();
};
