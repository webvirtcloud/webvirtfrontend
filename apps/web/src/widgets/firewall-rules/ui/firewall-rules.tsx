import {
  type FirewallInboundRule,
  type FirewallOutboundRule,
  useFirewall,
  createFirewallRule,
  deleteFirewallRule,
} from '@/entities/firewall';
import { FirewallRule } from './firewall-rule';
import { updateFirewallRules, FirewallRuleDeleteAlertDialog } from '@/entities/firewall';
import { useState } from 'react';
import { CreateFirewallRuleForm } from './create-firewall-rule-form';
import { useToast } from 'ui/components/toast';

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
  const { firewall, mutate } = useFirewall(uuid);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<FirewallInboundRule>();
  const { toast } = useToast();

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

      await mutate();
    } catch (e) {
      const { message } = await e.response.json();
      toast({ title: 'Bad request', variant: 'destructive', description: message });
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
      await mutate();
    } catch (e) {
      const { message } = await e.response.json();
      toast({ title: 'Bad request', variant: 'destructive', description: message });
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
      await mutate();
    } catch (e) {
      const { message } = await e.response.json();
      toast({ title: 'Bad request', variant: 'destructive', description: message });
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
        <p className="mb-8 text-neutral-500">
          Set the Firewall rules for incoming traffic. Only the specified ports will
          accept inbound connections. All other traffic will be blocked.
        </p>
        <table className="w-full">
          <thead>
            <tr>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 first:rounded-tl-md dark:bg-zinc-800">
                Type
              </th>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                Protocol
              </th>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                Port range
              </th>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                Sources
              </th>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 last:rounded-tr-md dark:bg-zinc-800"></th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-neutral-700">
            {firewall?.inbound_rules.map((rule, i) => (
              <FirewallRule
                rule={rule}
                onUpdateRule={onUpdateRule}
                key={'inbound' + rule.ports + rule.protocol}
                onDeleteRule={onDeleteRule}
              />
            ))}
            <CreateFirewallRuleForm
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
        <p className="mb-8 text-neutral-500">
          Set the Firewall rules for outbound traffic. Outbound traffic will only be
          allowed to the specified ports. All other traffic will be blocked.
        </p>
        <table className="w-full">
          <thead>
            <tr>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 first:rounded-tl-md dark:bg-zinc-800">
                Type
              </th>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                Protocol
              </th>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                Port range
              </th>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 dark:bg-zinc-800">
                Destinations
              </th>
              <th className="whitespace-nowrap bg-zinc-100 px-4 py-2.5 text-left text-xs text-neutral-500 last:rounded-tr-md dark:bg-zinc-800"></th>
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
            <CreateFirewallRuleForm
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
