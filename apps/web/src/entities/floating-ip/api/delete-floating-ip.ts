import request from '@/shared/api/request';

export const deleteFloatingIP = (ip: string): Promise<void> => {
  return request.delete(`floating_ips/${ip}`).json();
};
