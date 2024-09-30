import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { RadioGroup, RadioGroupItem } from 'ui/components/radio-group';
import { z } from 'zod';

import { loadbalancerQueries, updateLoadbalancer } from '@/entities/loadbalancer';

const schema = z.object({
  sticky_session: z
    .object({
      cookie_ttl_seconds: z.coerce
        .number({ invalid_type_error: 'Only digits' })
        .min(1, 'Must be 1s or more')
        .max(3600, 'Max 34650s or less'),
      cookie_name: z.string().min(1, 'Cookie name is required'),
    })
    .optional(),
});

type Form = z.infer<typeof schema>;

export function LoadbalancerStickySessions() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const {
    setValue,
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const session = watch('sticky_session');

  function handleValueChange(value: string) {
    if (value === 'cookie') {
      register('sticky_session');
      setValue('sticky_session.cookie_ttl_seconds', 300);
      setValue('sticky_session.cookie_name', 'WVC_LB');
    } else {
      unregister('sticky_session');
    }
  }

  const submit = handleSubmit(async (data) => {
    try {
      if (!id) return;
      await updateLoadbalancer(id, data);
      await queryClient.invalidateQueries({
        queryKey: loadbalancerQueries.loadbalancer(id),
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
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Sticky sessions</h2>
          <p className="text-muted-foreground">
            When enabled, the Load Balancer will use a cookie to route follow-up requests
            from the same client to a single Virtance.
          </p>
        </div>
        <Button variant="outline" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Minimize' : 'Edit'}
        </Button>
      </div>
      {expanded && (
        <form onSubmit={submit} className="mt-4 space-y-4">
          <RadioGroup
            defaultValue="none"
            className="flex gap-4"
            onValueChange={handleValueChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cookie" id="cookie" />
              <Label htmlFor="cookie">Cookie</Label>
            </div>
          </RadioGroup>
          {session && (
            <div className="grid gap-4 md:max-w-prose md:grid-cols-4">
              <div className="space-y-1">
                <Label htmlFor="health-check-port">Cookie name</Label>
                <Input
                  id="health-check-port"
                  {...register('sticky_session.cookie_name')}
                  className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
                />
                {errors?.sticky_session?.cookie_name && (
                  <p className="text-sm font-medium text-red-500">
                    {errors?.sticky_session?.cookie_name?.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="health-check-port">TTL (in s)</Label>
                <Input
                  id="health-check-port"
                  {...register('sticky_session.cookie_ttl_seconds')}
                  className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
                />
                {errors?.sticky_session?.cookie_ttl_seconds && (
                  <p className="text-sm font-medium text-red-500">
                    {errors?.sticky_session?.cookie_ttl_seconds?.message}
                  </p>
                )}
              </div>
            </div>
          )}
          <Button type="submit">Update</Button>
        </form>
      )}
    </div>
  );
}
