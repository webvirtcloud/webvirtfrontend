import type { Snapshot } from '@/entities/image';
import request from '@/shared/api/request';

export function getSnapshots(): Promise<{ snapshots: Snapshot[] }> {
  return request.get(`images/snapshots`).json();
}
