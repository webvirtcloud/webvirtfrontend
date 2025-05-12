import request from '@/shared/api/request';

export function deleteDatabase(id: number): Promise<unknown> {
  return request.delete(`databases/${id}`).json();
}
