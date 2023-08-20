import request from '@/shared/api/request';
import type { VirtanceHistory } from '../types';

export function getVirtanceHistory(id: number): Promise<{ virtance: VirtanceHistory[] }> {
  return request.get(`virtances/${id}/history`).json();
}
