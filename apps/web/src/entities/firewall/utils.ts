import { type FirewallInboundRule, type FirewallOutboundRule } from './types';

export function calculateType(rule: FirewallInboundRule | FirewallOutboundRule) {
  if (rule.ports === '80') {
    return 'HTTP';
  }
  if (rule.ports === '443') {
    return 'HTTPS';
  }
  if (rule.ports === '22') {
    return 'SSH';
  }
  if (rule.ports === '0' && rule.protocol === 'tcp') {
    return 'All TCP';
  }
  if (rule.ports === '0' && rule.protocol === 'udp') {
    return 'All UDP';
  }
  if (rule.ports === '0' && rule.protocol === 'icmp') {
    return 'All ICMP';
  }

  return 'Custom';
}
