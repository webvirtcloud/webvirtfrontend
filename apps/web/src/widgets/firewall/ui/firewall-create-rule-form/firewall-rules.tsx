import { useState } from 'react';
import { toast } from 'sonner';

import {
  type FirewallInboundRule,
  type FirewallOutboundRule,
  createFirewallRule,
  deleteFirewallRule,
  useFirewall,
} from '@/entities/firewall';
import { FirewallRuleDeleteAlertDialog, updateFirewallRules } from '@/entities/firewall';

import { FirewallCreateRuleForm } from './firewall-create-rule-form';
import { FirewallRule } from './firewall-rule';

function isDuplicate(
  arr: (FirewallInboundRule | FirewallOutboundRule)[],
  obj: FirewallInboundRule | FirewallOutboundRule,
) {
  return arr.some((item) => item.ports === obj.ports && item.protocol === obj.protocol);
}

function transformRulesBeforeSubmit(
  rules: FirewallInboundRule[] | FirewallOutboundRule[],
) {
  return rules.map((rule) => ({
    ...rule,
    ports: rule.ports === '' ? '0' : rule.ports,
  }));
}

export function FirewallRules({ uuid }: { uuid: string }) {
  const { data: firewall, refetch } = useFirewall(uuid);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<FirewallInboundRule>();

  async function onUpdateRule(payload: {
    inbound_rules?: FirewallInboundRule[];
    outbound_rules?: FirewallOutboundRule[];
  }) {
    try {
      firewall &&
        (await updateFirewallRules(firewall.uuid, {
          name: firewall.name,
          ...(payload.inbound_rules
            ? {
                inbound_rules: [
                  ...firewall.inbound_rules.filter(
                    (item) => !isDuplicate(payload.inbound_rules!, item),
                  ),
                  ...payload.inbound_rules,
                ],
              }
            : {}),
          ...(payload.outbound_rules
            ? {
                outbound_rules: [
                  ...firewall.outbound_rules.filter(
                    (item) => !isDuplicate(payload.outbound_rules!, item),
                  ),
                  ...payload.outbound_rules,
                ],
              }
            : {}),
        }));

      await refetch();
    } catch (e) {
      const { message } = await e.response.json();
      toast.error('Bad request', { description: message });
      throw e;
    }
  }

  async function onCreateRule(payload: {
    inbound_rules?: FirewallInboundRule[];
    outbound_rules?: FirewallOutboundRule[];
  }) {
    try {
      firewall &&
        (await createFirewallRule(firewall.uuid, {
          ...(payload.inbound_rules
            ? { inbound_rules: transformRulesBeforeSubmit(payload.inbound_rules) }
            : {}),
          ...(payload.outbound_rules
            ? { outbound_rules: transformRulesBeforeSubmit(payload.outbound_rules) }
            : {}),
        }));
      await refetch();
    } catch (e) {
      const { message } = await e.response.json();
      toast.error('Bad request', { description: message });
      throw e;
    }
  }

  async function onDeleteRule(payload) {
    setSelectedRule(payload);
    setIsDeleteDialogOpen(true);
  }

  async function deleteRule(payload) {
    try {
      firewall && (await deleteFirewallRule(firewall.uuid, payload));
      await refetch();
    } catch (e) {
      const { message } = await e.response.json();
      toast.error('Bad request', { description: message });
    }
  }

  function onDialogClose(type: 'delete') {
    switch (type) {
      case 'delete':
        setIsDeleteDialogOpen(false);
        break;
    }
    setSelectedRule(undefined);
  }

  return (
    <div className="space-y-16">
      <div>
        <h2 className="mb-1 text-lg font-medium">Inbound rules</h2>
        <p className="text-muted-foreground mb-8">
          Set the Firewall rules for incoming traffic. Only the specified ports will
          accept inbound connections. All other traffic will be blocked.
        </p>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs first:rounded-tl-md">
                Type
              </th>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                Protocol
              </th>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                Port range
              </th>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                Sources
              </th>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs last:rounded-tr-md"></th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-neutral-700">
            {firewall?.inbound_rules.map((rule) => (
              <FirewallRule
                rule={rule}
                onUpdateRule={onUpdateRule}
                key={'inbound' + rule.ports + rule.protocol}
                onDeleteRule={onDeleteRule}
              />
            ))}
            <FirewallCreateRuleForm
              defaultRule={{
                protocol: 'tcp',
                ports: '22',
                sources: { addresses: ['0.0.0.0/0'] },
              }}
              onSubmit={onCreateRule}
            />
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="mb-1 text-lg font-medium">Outbound rules</h2>
        <p className="text-muted-foreground mb-8">
          Set the Firewall rules for outbound traffic. Outbound traffic will only be
          allowed to the specified ports. All other traffic will be blocked.
        </p>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs first:rounded-tl-md">
                Type
              </th>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                Protocol
              </th>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                Port range
              </th>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs">
                Destinations
              </th>
              <th className="text-muted-foreground bg-muted whitespace-nowrap px-4 py-2.5 text-left text-xs last:rounded-tr-md"></th>
            </tr>
          </thead>
          <tbody>
            {firewall?.outbound_rules.map((rule, i) => (
              <FirewallRule
                rule={rule}
                onUpdateRule={onUpdateRule}
                key={'outbound' + rule.ports + rule.protocol}
                onDeleteRule={onDeleteRule}
              />
            ))}
            <FirewallCreateRuleForm
              defaultRule={{
                protocol: 'tcp',
                ports: '0',
                destinations: { addresses: ['0.0.0.0/0'] },
              }}
              onSubmit={onCreateRule}
            />
          </tbody>
        </table>
      </div>

      {firewall && selectedRule && (
        <FirewallRuleDeleteAlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={() => onDialogClose('delete')}
          onDelete={() => deleteRule(selectedRule)}
        />
      )}
    </div>
  );
}
