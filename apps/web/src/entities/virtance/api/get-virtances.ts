import { type GetVirtancesParams, type Virtance } from '@/entities/virtance';
import request from '@/shared/api/request';

export function getVirtances(
  params?: GetVirtancesParams,
): Promise<{ virtances: Virtance[] }> {
  return request
    .get('virtances', {
      searchParams: { ...params },
    })
    .json();
}
