import { type VirtanceHistory } from '@/entities/virtance';
import request from '@/shared/api/request';

export function getVirtanceHistory(id: number): Promise<{ history: VirtanceHistory[] }> {
  return request.get(`virtances/${id}/history`).json();
}
