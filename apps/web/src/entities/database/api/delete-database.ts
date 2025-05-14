import request from '@/shared/api/request';

export function deleteDatabase(id: string): Promise<unknown> {
  return request.delete(`databases/${id}`).json();
}
