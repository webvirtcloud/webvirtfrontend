import request from '@/shared/api/request';

export function updateLoadbalancerRules(id: string, payload) {
  return request.put(`load_balancers/${id}/forwarding_rules`, {
    json: payload,
  });
}
