import request from '@/shared/api/request';
import type { VirtanceMetrics } from '../types';

export function getVirtanceCPUData(id: number): Promise<{ metrics: VirtanceMetrics }> {
  return request.get(`virtances/${id}/metrics/cpu`).json();
}
