import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { z } from 'zod';

import {
  loadbalancerQueries,
  updateLoadbalancerRules,
  useLoadbalancer,
} from '@/entities/loadbalancer';
import { LoadbalancerForwardingRules } from '@/features/loadbalancer';

const schema = z.object({
  forwarding_rules: z
    .array(
      z.object({
        entry_port: z.coerce
          .number({ invalid_type_error: 'Only digits' })
          .min(1, 'Must be 1 or more'),
        entry_protocol: z.string().min(1, 'Entry protocol is required'),
        target_port: z.coerce
          .number({ invalid_type_error: 'Only digits' })
          .min(1, 'Must be 1 or more'),
        target_protocol: z.string().min(1, 'Target protocol is required'),
      }),
    )
    .superRefine((items, context) => {
      const lastOccurrenceMap = new Map();

      // Track the last occurrence of each entry_port
      items.forEach((item, i) => {
        if (lastOccurrenceMap.has(item.entry_port)) {
          lastOccurrenceMap.set(item.entry_port, i);
        } else {
          lastOccurrenceMap.set(item.entry_port, i);
        }
      });

      // Add issues to the last occurrence of each duplicate entry_port
      items.forEach((item, i) => {
        const lastIndex = lastOccurrenceMap.get(item.entry_port);
        if (lastIndex !== i && lastIndex !== undefined) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Duplicate port',
            path: [lastIndex, 'entry_port'],
          });
        }
      });
    }),
});

type Form = z.infer<typeof schema>;

export function LoadbalancerRules() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { uuid } = useParams({ from: '/_authenticated/loadbalancers/$uuid' });
  const { data: loadbalancer } = useLoadbalancer(uuid);
  const form = useForm<Form>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (loadbalancer) {
      form.reset({ forwarding_rules: loadbalancer.forwarding_rules });
    }
  }, [loadbalancer]);

  const submit = form.handleSubmit(async (data) => {
    try {
      await updateLoadbalancerRules(uuid, data);
      await queryClient.invalidateQueries({
        queryKey: loadbalancerQueries.loadbalancer(uuid),
      });
    } catch (e) {
      const { errors, message, status_code } = await e.response.json();

      if ((status_code === 500 || status_code === 400) && message) {
        return toast.error('Bad request', { description: message });
      }

      if (status_code === 400 && errors) {
        return errors.forEach((error) => {
          const keys = Object.keys(error);

          keys.forEach((key) => {
            toast.error('Bad request', { description: error[key] });
          });
        });
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Forwarding Rules</h2>
          <p className="text-muted-foreground">
            Set how traffic will be routed from the Load Balancer to your Virtances. At
            least one rule is required.
          </p>
        </div>
        <Button variant="outline" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Minimize' : 'Edit'}
        </Button>
      </div>
      {expanded && (
        <FormProvider {...form}>
          <form onSubmit={submit} className="space-y-4">
            <LoadbalancerForwardingRules />
            <Button type="submit" disabled={!!loadbalancer?.event}>
              Update
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
