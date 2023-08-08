import request from '@/shared/api/request';
import { Virtance } from '../types';

interface Params {
  has_backups?: boolean;
}

export function getVirtances(params?: Params): Promise<{ virtances: Virtance[] }> {
  return request
    .get('virtances', {
      searchParams: { ...params },
    })
    .json();
}
