import { type FirewallInboundRule, type FirewallOutboundRule } from '@/entities/firewall';
import request from '@/shared/api/request';

export const updateFirewallRules = (
  uuid: string,
  payload: {
    name: string;
    inbound_rules?: FirewallInboundRule[];
    outbound_rules?: FirewallOutboundRule[];
  },
): Promise<unknown> => {
  return request.put(`firewalls/${uuid}`, { json: { ...payload } }).json();
};
