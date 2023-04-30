import request from '@/shared/api/request';
import type { VirtanceNetMetrics } from '../types';

export function getVirtanceNetMetrics(
  id: number,
): Promise<{ metrics: VirtanceNetMetrics[] }> {
  return request.get(`virtances/${id}/metrics/net`).json();
}
