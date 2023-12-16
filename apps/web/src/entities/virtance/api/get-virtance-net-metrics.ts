import { type VirtanceNetMetrics } from '@/entities/virtance';
import request from '@/shared/api/request';

export function getVirtanceNetMetrics(
  id: number,
): Promise<{ metrics: VirtanceNetMetrics[] }> {
  return request.get(`virtances/${id}/metrics/net`).json();
}
