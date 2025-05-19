import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { SelectNative } from 'ui/components/select-native';
import { z } from 'zod';

import {
  loadbalancerQueries,
  updateLoadbalancer,
  useLoadbalancer,
} from '@/entities/loadbalancer';

const schema = z.object({
  health_check: z
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
});

type Form = z.infer<typeof schema>;

export function LoadbalancerHealthCheck() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { uuid } = useParams({ from: '/_authenticated/loadbalancers/$uuid' });
  const { data: loadbalancer } = useLoadbalancer(uuid);
  const {
    reset,
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const protocol = watch('health_check.protocol');

  useEffect(() => {
    if (loadbalancer) {
      reset({ health_check: loadbalancer.health_check });
    }
  }, [loadbalancer]);

  const submit = handleSubmit(async (data) => {
    try {
      await updateLoadbalancer(uuid, data);
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
          <h2 className="text-xl font-semibold tracking-tight">Health checks</h2>
          <p className="text-muted-foreground">
            Set how often the Load Balancer checks if Virtances are responding. It will
            automatically stop sending traffic to unresponsive Virtances.
          </p>
        </div>
        <Button variant="outline" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Minimize' : 'Edit'}
        </Button>
      </div>
      {expanded && (
        <form onSubmit={submit} className="space-y-4">
          <div className="mb-4 grid gap-4 md:max-w-prose md:grid-cols-4">
            <div className="space-y-1">
              <Label htmlFor="health-check-protocol">Protocol</Label>
              <Controller
                control={control}
                name="health_check.protocol"
                render={({ field }) => (
                  <SelectNative
                    id="health-check-protocol"
                    {...field}
                    className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
                  >
                    <option disabled>Protocol</option>
                    <option value="tcp">TCP</option>
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                  </SelectNative>
                )}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="health-check-port">Port</Label>
              <Input
                id="health-check-port"
                {...register('health_check.port')}
                className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
              />
              {errors?.health_check?.port && (
                <p className="text-sm font-medium text-red-500">
                  {errors?.health_check?.port?.message}
                </p>
              )}
            </div>
            {protocol !== 'tcp' && (
              <div className="space-y-1">
                <Label htmlFor="health-check-path">Path</Label>
                <Input
                  id="health-check-path"
                  {...register('health_check.path')}
                  className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
                />
                {errors?.health_check?.path && (
                  <p className="text-sm font-medium text-red-500">
                    {errors?.health_check?.path?.message}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="grid gap-4 md:max-w-prose md:grid-cols-4">
            <div className="space-y-1">
              <Label htmlFor="health_check-interval">Check interval (in s)</Label>
              <Input
                id="health_check-interval"
                {...register('health_check.check_interval_seconds')}
                className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
              />
              {errors?.health_check?.path && (
                <p className="text-sm font-medium text-red-500">
                  {errors?.health_check?.path?.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="health_check-timeout">Response timeout (in s)</Label>
              <Input
                id="health_check-timeout"
                {...register('health_check.response_timeout_seconds')}
                className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
              />
              {errors?.health_check?.response_timeout_seconds && (
                <p className="text-sm font-medium text-red-500">
                  {errors?.health_check?.response_timeout_seconds?.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="health_check-unhealthy">Unhealthy threshold</Label>
              <Input
                id="health_check-unhealthy"
                {...register('health_check.unhealthy_threshold')}
                className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
              />
              {errors?.health_check?.unhealthy_threshold && (
                <p className="text-sm font-medium text-red-500">
                  {errors?.health_check?.unhealthy_threshold?.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="health_check-unhealthy">Healthy threshold</Label>
              <Input
                id="health_check-healthy"
                {...register('health_check.healthy_threshold')}
                className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
              />
              {errors?.health_check?.healthy_threshold && (
                <p className="text-sm font-medium text-red-500">
                  {errors?.health_check?.healthy_threshold?.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" disabled={!!loadbalancer?.event}>
            Update
          </Button>
        </form>
      )}
    </div>
  );
}
