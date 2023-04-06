import request from '@/shared/api/request';

export function deleteVirtance(id: number): Promise<unknown> {
  return request.delete(`virtances/${id}`).json();
}
