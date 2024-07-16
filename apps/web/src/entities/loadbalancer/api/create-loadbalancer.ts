import request from '@/shared/api/request';

export function createLoadbalancer(payload) {
  return request.post('load_balancers', {
    json: payload,
  });
}
