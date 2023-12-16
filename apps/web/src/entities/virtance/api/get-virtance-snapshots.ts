import { type Snapshot } from '@/entities/image';
import request from '@/shared/api/request';

export function getVirtancesSnapshots(id: number): Promise<{ snapshots: Snapshot[] }> {
  return request.get(`virtances/${id}/snapshots`).json();
}
