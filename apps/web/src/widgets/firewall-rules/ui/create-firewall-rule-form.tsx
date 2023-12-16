import { FirewallInboundRule, FirewallOutboundRule } from '@/entities/firewall';

import { FirewallRule } from './firewall-rule';

export function CreateFirewallRuleForm({
  defaultRule,
  onSubmit,
}: {
  defaultRule: FirewallInboundRule | FirewallOutboundRule;
  onSubmit: (payload) => Promise<void>;
}) {
  return <FirewallRule rule={defaultRule} onUpdateRule={onSubmit} alwaysEditor={true} />;
}
