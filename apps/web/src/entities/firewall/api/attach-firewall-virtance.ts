import request from '@/shared/api/request';

export const attachFirewallVirtance = (
  uuid: string,
  payload: {
    virtance_ids: number[];
  },
): Promise<unknown> => {
  return request.post(`firewalls/${uuid}/virtances`, { json: { ...payload } }).json();
};
