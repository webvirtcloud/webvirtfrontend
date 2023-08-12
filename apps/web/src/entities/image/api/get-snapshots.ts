import request from '@/shared/api/request';
import type { Snapshot } from '../types';

export function getSnapshots(): Promise<{ snapshots: Snapshot[] }> {
  return request.get(`images/snapshots`).json();
}
