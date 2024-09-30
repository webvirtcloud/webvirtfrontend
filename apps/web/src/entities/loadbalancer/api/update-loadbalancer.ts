import request from '@/shared/api/request';

export function updateLoadbalancer(id: string, payload) {
  return request.put(`load_balancers/${id}`, {
    json: payload,
  });
}
