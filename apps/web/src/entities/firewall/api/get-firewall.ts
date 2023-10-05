import { type Firewall } from '@/entities/firewall';
import request from '@/shared/api/request';

export const getFirewall = (uuid: string): Promise<{ firewall: Firewall }> => {
  return request.get(`firewalls/${uuid}`).json();
};
