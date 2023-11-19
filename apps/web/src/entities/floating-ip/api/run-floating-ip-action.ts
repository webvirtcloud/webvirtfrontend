import request from '@/shared/api/request';

import type { ActionType, FloatingIP } from '../types';

export const runFloatingIPAction = ({
  ip,
  ...payload
}: ActionType): Promise<{ floating_ip: FloatingIP }> => {
  return request.post(`floating_ips/${ip}/action`, { json: { ...payload } }).json();
};
