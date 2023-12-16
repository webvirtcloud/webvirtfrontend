import request from '@/shared/api/request';

import type { FloatingIP } from '../types';

export const getFloatingIP = ({
  ip,
  options,
}: {
  ip: string;
  options: { signal: AbortSignal };
}): Promise<{ floating_ip: FloatingIP }> => {
  return request.get(`floating_ips/${ip}`, { signal: options.signal }).json();
};
