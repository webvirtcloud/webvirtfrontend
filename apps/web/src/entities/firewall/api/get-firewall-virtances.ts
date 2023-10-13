import { type Virtance } from '@/entities/virtance';
import request from '@/shared/api/request';

export const getFirewallVirtances = (
  uuid: string,
): Promise<{ virtances: Virtance[] }> => {
  return request.get(`firewalls/${uuid}/virtances`).json();
};
