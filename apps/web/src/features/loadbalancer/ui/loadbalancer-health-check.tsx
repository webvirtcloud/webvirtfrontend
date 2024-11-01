import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

export function LoadbalancerHealthCheck() {
  const {
    register,
    unregister,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<{
    healthcheck: {
      protocol: 'tcp' | 'http' | 'https';
      port: number;
      path?: string;
      check_interval_seconds: number;
      response_timeout_seconds: number;
      healthy_threshold: number;
      unhealthy_threshold: number;
    };
  }>();

  const protocol = watch('healthcheck.protocol');

  useEffect(() => {
    if (protocol === 'tcp') {
      unregister('healthcheck.path');
    } else {
      register('healthcheck.path');
      setValue('healthcheck.path', '/');
    }
  }, [protocol, register, unregister]);

  return (
    <div>
      <div className="mb-4 space-y-2">
        <h2 className="text-lg font-semibold">Health check</h2>
        <p className="text-muted-foreground max-w-prose">
          Set how often the Load Balancer checks if Virtances are responding. It will
          automatically stop sending traffic to unresponsive Virtances.
        </p>
      </div>
      <div className="mb-4 grid gap-4 md:max-w-2xl md:grid-cols-4">
        <div className="space-y-1">
          <Label htmlFor="health-check-protocol">Protocol</Label>
          <select
            id="health-check-protocol"
            {...register('healthcheck.protocol')}
            className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
          >
            <option disabled>Protocol</option>
            <option value="tcp">TCP</option>
            <option value="http">HTTP</option>
            <option value="https">HTTPS</option>
          </select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="health-check-port">Port</Label>
          <Input
            id="health-check-port"
            {...register('healthcheck.port')}
            className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
          />
          {errors?.healthcheck?.port && (
            <p className="text-sm font-medium text-red-500">
              {errors?.healthcheck?.port?.message}
            </p>
          )}
        </div>
        {protocol !== 'tcp' && (
          <div className="space-y-1">
            <Label htmlFor="health-check-path">Path</Label>
            <Input
              id="health-check-path"
              {...register('healthcheck.path')}
              className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
            />
            {errors?.healthcheck?.path && (
              <p className="text-sm font-medium text-red-500">
                {errors?.healthcheck?.path?.message}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="grid gap-4 md:max-w-2xl md:grid-cols-4">
        <div className="space-y-1">
          <Label htmlFor="healthcheck-interval">Check interval (in s)</Label>
          <Input
            id="healthcheck-interval"
            {...register('healthcheck.check_interval_seconds')}
            className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
          />
          {errors?.healthcheck?.path && (
            <p className="text-sm font-medium text-red-500">
              {errors?.healthcheck?.path?.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="healthcheck-timeout">Response timeout (in s)</Label>
          <Input
            id="healthcheck-timeout"
            {...register('healthcheck.response_timeout_seconds')}
            className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
          />
          {errors?.healthcheck?.response_timeout_seconds && (
            <p className="text-sm font-medium text-red-500">
              {errors?.healthcheck?.response_timeout_seconds?.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="healthcheck-unhealthy">Unhealthy threshold</Label>
          <Input
            id="healthcheck-unhealthy"
            {...register('healthcheck.unhealthy_threshold')}
            className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
          />
          {errors?.healthcheck?.unhealthy_threshold && (
            <p className="text-sm font-medium text-red-500">
              {errors?.healthcheck?.unhealthy_threshold?.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="healthcheck-unhealthy">Healthy threshold</Label>
          <Input
            id="healthcheck-healthy"
            {...register('healthcheck.healthy_threshold')}
            className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
          />
          {errors?.healthcheck?.healthy_threshold && (
            <p className="text-sm font-medium text-red-500">
              {errors?.healthcheck?.healthy_threshold?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
