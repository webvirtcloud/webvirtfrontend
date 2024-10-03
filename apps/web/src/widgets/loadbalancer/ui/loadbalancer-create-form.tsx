import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { z } from 'zod';

import { createLoadbalancer } from '@/entities/loadbalancer/api/create-loadbalancer';
import {
  LoadbalancerForwardingRules,
  LoadbalancerSSL,
  LoadbalancerStickySessions,
} from '@/features/loadbalancer';
import { LoadbalancerHealthCheck } from '@/features/loadbalancer/ui/loadbalancer-health-check';

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
  healthcheck: z
    .object({
      protocol: z.string().min(1, 'Protocol is required'),
      port: z.coerce
        .number({ invalid_type_error: 'Only digits' })
        .min(1, 'Must be 1 or more')
        .max(65535, 'Must be 65535 or less'),
      path: z.string().optional(),
      check_interval_seconds: z.coerce
        .number({ invalid_type_error: 'Only digits' })
        .min(3, 'Min 3s or more')
        .max(300, 'Max 300s'),
      response_timeout_seconds: z.coerce
        .number({ invalid_type_error: 'Only digits' })
        .min(3, 'Must be 3s or more')
        .max(300, 'Max 300s'),
      healthy_threshold: z.coerce
        .number({ invalid_type_error: 'Only digits' })
        .min(2, 'Must be 2s or more')
        .max(300, 'Max 10s'),
      unhealthy_threshold: z.coerce
        .number({ invalid_type_error: 'Only digits' })
        .min(2, 'Must be 2s or more')
        .max(300, 'Max 10s'),
    })
    .superRefine((path, context) => {
      if (path.protocol !== 'tcp' && !path.path) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Path is required',
          path: ['path'],
        });
      }
    }),
  sticky_session: z
    .object({
      cookie_ttl_seconds: z.coerce
        .number({ invalid_type_error: 'Only digits' })
        .min(1, 'Must be 1s or more')
        .max(3600, 'Max 34650s or less'),
      cookie_name: z.string().min(1, 'Cookie name is required'),
    })
    .optional(),
  redirect_http_to_https: z.boolean(),
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
      healthcheck: {
        protocol: 'http',
        port: 80,
        path: '/',
        check_interval_seconds: 10,
        response_timeout_seconds: 5,
        healthy_threshold: 5,
        unhealthy_threshold: 3,
      },
      sticky_session: undefined,
      redirect_http_to_https: false,
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
      <form onSubmit={submit} className="relative mx-auto max-w-5xl space-y-12 py-8">
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl font-semibold">Create Load Balancer</h1>
          <p className="text-muted-foreground">
            Load balancers distribute traffic between Virtances within the same region.
          </p>
        </div>
        <div>
          <div className="mb-4 space-y-2">
            <h2 className="text-lg font-semibold">Forwarding rules</h2>
            <p className="text-muted-foreground">
              Set how traffic will be routed from the Load Balancer to your Virtances. At
              least one rule is required.
            </p>
          </div>
          <LoadbalancerForwardingRules />
        </div>
        <LoadbalancerHealthCheck />
        <LoadbalancerStickySessions />
        <LoadbalancerSSL />
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-lg font-semibold">
            Name
          </Label>
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
