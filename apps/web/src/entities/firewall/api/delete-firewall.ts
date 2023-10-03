import request from '@/shared/api/request';

export const deleteFirewall = (uuid: string): Promise<void> => {
  return request.delete(`firewalls/${uuid}`).json();
};
