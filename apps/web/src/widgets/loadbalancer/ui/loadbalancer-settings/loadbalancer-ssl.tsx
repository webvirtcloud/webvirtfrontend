import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Checkbox } from 'ui/components/checkbox';
import { Label } from 'ui/components/label';
import { cx } from 'ui/lib';
import { z } from 'zod';

import { loadbalancerQueries, updateLoadbalancer } from '@/entities/loadbalancer';

const schema = z.object({
  redirect_http_to_https: z.boolean(),
});

type Form = z.infer<typeof schema>;

export function LoadbalancerSSL() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { register, control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });

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
          <h2 className="text-xl font-semibold tracking-tight">SSL</h2>
          <p className="text-muted-foreground">
            Setting this option will force all HTTP traffic to be redirected to HTTPS.
            This will only work if there&apos;s is atleast one HTTP and one HTTPS rule.
          </p>
        </div>
        <Button variant="outline" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Minimize' : 'Edit'}
        </Button>
      </div>
      {expanded && (
        <form onSubmit={submit} className="mt-4 space-y-4">
          <Controller
            name="redirect_http_to_https"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <div className="flex gap-2">
                <Label htmlFor="backups" className={cx(['flex items-center gap-3'])}>
                  <Checkbox
                    {...field}
                    value={undefined}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="backups"
                    {...register('redirect_http_to_https')}
                  />

                  <p>Redirect HTTP to HTTPS</p>
                </Label>
              </div>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      )}
    </div>
  );
}
