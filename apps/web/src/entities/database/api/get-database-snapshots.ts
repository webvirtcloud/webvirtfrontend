import type { Snapshot } from '@/entities/image';
import request from '@/shared/api/request';

export function getDatabaseSnapshots(uuid: string): Promise<{ snapshots: Snapshot[] }> {
  return request.get(`databases/${uuid}/snapshots`).json();
}
