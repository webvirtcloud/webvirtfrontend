import { type Firewall } from '@/entities/firewall';
import request from '@/shared/api/request';

export const createFirewall = (payload: {
  name: string;
}): Promise<{ firewall: Firewall }> => {
  return request.post('firewalls', { json: payload }).json();
};
