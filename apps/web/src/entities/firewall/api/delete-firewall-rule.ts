import { type FirewallInboundRule, type FirewallOutboundRule } from '@/entities/firewall';
import request from '@/shared/api/request';

export const deleteFirewallRule = (
  uuid: string,
  payload: {
    inbound_rules?: FirewallInboundRule[];
    outbound_rules?: FirewallOutboundRule[];
  },
): Promise<unknown> => {
  return request.delete(`firewalls/${uuid}/rules`, { json: { ...payload } }).json();
};
