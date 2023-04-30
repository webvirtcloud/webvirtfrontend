import request from '@/shared/api/request';
import type { VirtanceCPUMetrics } from '../types';

export function getVirtanceCPUMetrics(
  id: number,
): Promise<{ metrics: VirtanceCPUMetrics }> {
  return request.get(`virtances/${id}/metrics/cpu`).json();
}
