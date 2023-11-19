import request from '@/shared/api/request';

import { Virtance } from '../types';

export interface GetVirtancesParams {
  has_backups?: boolean;
  has_firewall?: boolean;
  has_floating_ip?: boolean;
}

export function getVirtances(
  params?: GetVirtancesParams,
): Promise<{ virtances: Virtance[] }> {
  return request
    .get('virtances', {
      searchParams: { ...params },
    })
    .json();
}
