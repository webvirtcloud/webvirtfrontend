import { type VirtanceMemoryMetrics } from '@/entities/virtance';
import request from '@/shared/api/request';

export function getVirtanceMemoryMetrics(
  id: number,
): Promise<{ metrics: VirtanceMemoryMetrics }> {
  return request.get(`virtances/${id}/metrics/mem`).json();
}
