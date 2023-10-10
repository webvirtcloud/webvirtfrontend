import { type FirewallInboundRule, type FirewallOutboundRule } from '@/entities/firewall';
import request from '@/shared/api/request';

export const createFirewallRule = (
  uuid: string,
  payload: {
    inbound_rules?: FirewallInboundRule[];
    outbound_rules?: FirewallOutboundRule[];
  },
): Promise<unknown> => {
  return request.post(`firewalls/${uuid}/rules`, { json: { ...payload } }).json();
};
