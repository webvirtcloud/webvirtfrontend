import request from '@/shared/api/request';

export function detachVirtanceFromLoadbalancer(uuid: string, payload: number[]) {
  return request.delete(`load_balancers/${uuid}/virtances`, {
    json: { virtance_ids: payload },
  });
}
