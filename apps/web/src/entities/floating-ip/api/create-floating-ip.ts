import request from '@/shared/api/request';

import type { FloatingIP } from '../types';

export const createFloatingIP = (
  virtanceId: number,
): Promise<{ floating_ip: FloatingIP }> => {
  return request.post('floating_ips', { json: { virtance_id: virtanceId } }).json();
};
