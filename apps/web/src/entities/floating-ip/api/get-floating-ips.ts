import request from '@/shared/api/request';

import type { FloatingIP } from '../types';

export const getFloatingIPs = (): Promise<{ floating_ips: FloatingIP[] }> => {
  return request.get('floating_ips').json();
};
