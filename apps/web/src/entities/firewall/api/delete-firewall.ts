import request from '@/shared/api/request';

export const deleteFirewall = (id: number): Promise<void> => {
  return request.delete(`firewalls/${id}`).json();
};
