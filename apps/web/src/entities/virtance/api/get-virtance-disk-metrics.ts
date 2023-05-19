import request from '@/shared/api/request';
import type { VirtanceDiskMetrics } from '../types';

export function getVirtanceDiskMetrics(
  id: number,
): Promise<{ metrics: [VirtanceDiskMetrics] }> {
  return request.get(`virtances/${id}/metrics/disk`).json();
}
