import { type VirtanceDiskMetrics } from '@/entities/virtance';
import request from '@/shared/api/request';

export function getVirtanceDiskMetrics(
  id: number,
): Promise<{ metrics: [VirtanceDiskMetrics] }> {
  return request.get(`virtances/${id}/metrics/disk`).json();
}
