import { type Firewall } from '@/entities/firewall';
import request from '@/shared/api/request';

export const getFirewalls = (): Promise<{ firewalls: Firewall[] }> => {
  return request.get('firewalls').json();
};
