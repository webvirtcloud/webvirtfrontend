import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { z } from 'zod';

import { createLoadbalancer } from '@/entities/loadbalancer/api/create-loadbalancer';
import { LoadbalancerForwardingRules } from '@/features/loadbalancer';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  region: z.string().min(1, 'Region is required'),
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

export function LoadbalancerCreateForm() {
  const navigate = useNavigate();

  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: `loadbalancer-${Math.floor(Math.random() * 1000)}`,
      region: 'default',
      forwarding_rules: [
        {
          entry_protocol: 'http',
          entry_port: 80,
          target_protocol: 'http',
          target_port: 80,
        },
      ],
    },
  });

  const submit = form.handleSubmit(async (data) => {
    try {
      await createLoadbalancer(data);

      navigate('/loadbalancers');
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
    <FormProvider {...form}>
      <form onSubmit={submit} className="relative mx-auto max-w-5xl space-y-4 py-8">
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl font-semibold">Create Load Balancer</h1>
          <p className="text-muted-foreground">
            Load balancers distribute traffic between Virtances within the same region.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Forwarding rules</h2>
          <p className="text-muted-foreground mb-4">
            Set how traffic will be routed from the Load Balancer to your Virtances. At
            least one rule is required.
          </p>
          <LoadbalancerForwardingRules />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <div className="max-w-80">
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Enter load balancer name"
            />
          </div>
        </div>
        <Button type="submit">Create load balancer</Button>
      </form>
    </FormProvider>
  );
}
