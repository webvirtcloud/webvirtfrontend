import { type Firewall } from '@/entities/firewall';
import request from '@/shared/api/request';

export const getFirewalls = (params?: {
  virtance_id?: number;
}): Promise<{ firewalls: Firewall[] }> => {
  return request.get('firewalls', { searchParams: params }).json();
};
