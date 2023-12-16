import type { FloatingIP } from '@/entities/floating-ip';
import request from '@/shared/api/request';

export const getFloatingIPs = (): Promise<{ floating_ips: FloatingIP[] }> => {
  return request.get('floating_ips').json();
};
