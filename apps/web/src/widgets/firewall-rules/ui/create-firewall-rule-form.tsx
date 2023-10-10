import { FirewallRule } from './firewall-rule';
import { FirewallInboundRule, FirewallOutboundRule } from '@/entities/firewall';

export function CreateFirewallRuleForm({
  defaultRule,
  onSubmit,
}: {
  defaultRule: FirewallInboundRule | FirewallOutboundRule;
  onSubmit: (payload) => Promise<void>;
}) {
  return <FirewallRule rule={defaultRule} onUpdateRule={onSubmit} alwaysEditor={true} />;
}
