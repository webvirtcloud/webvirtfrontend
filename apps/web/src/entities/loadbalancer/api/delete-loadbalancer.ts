import request from '@/shared/api/request';

export function deleteLoadbalancer(id: string) {
  return request.delete(`load_balancers/${id}`);
}
