import request from '@/shared/api/request';

export function attachVirtanceToLoadbalancer(uuid: string, payload: number[]) {
  return request.post(`load_balancers/${uuid}/virtances`, {
    json: { virtance_ids: payload },
  });
}
