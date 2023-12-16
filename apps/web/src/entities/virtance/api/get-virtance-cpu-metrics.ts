import { type VirtanceCPUMetrics } from '@/entities/virtance';
import request from '@/shared/api/request';

export function getVirtanceCPUMetrics(
  id: number,
): Promise<{ metrics: VirtanceCPUMetrics }> {
  return request.get(`virtances/${id}/metrics/cpu`).json();
}
