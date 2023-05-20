import request from '@/shared/api/request';

export function getVirtancesSnapshots(id: number): Promise<{ snapshots: [] }> {
  return request.get(`virtances/${id}/snapshots`).json();
}
