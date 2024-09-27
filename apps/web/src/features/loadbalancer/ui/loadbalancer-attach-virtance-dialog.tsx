import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Checkbox } from 'ui/components/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/components/dialog';
import { Label } from 'ui/components/label';
import { cx } from 'ui/lib';
import { z } from 'zod';

import { loadbalancerQueries } from '@/entities/loadbalancer';
import { attachVirtanceToLoadbalancer } from '@/entities/loadbalancer/api/attach-virtances-to-loadbalancer';
import { useVirtances } from '@/entities/virtance';

const schema = z.object({
  ids: z.array(z.number()),
});

type Form = z.infer<typeof schema>;

export function LoadbalancerAttachVirtanceDialog({
  name,
  region,
  attachedVirtancesIds,
}: {
  name?: string;
  region?: string;
  attachedVirtancesIds?: number[];
}) {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: virtances, isFetching } = useVirtances(
    { region },
    { enabled: () => open },
  );

  const { setValue, getValues, reset, watch, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      ids: [],
    },
  });

  const ids = watch('ids');

  const submit = handleSubmit(async (values) => {
    try {
      if (!id) return;
      await attachVirtanceToLoadbalancer(id, values.ids);
      await queryClient.invalidateQueries({
        queryKey: loadbalancerQueries.loadbalancer(id),
      });
      await queryClient.invalidateQueries({
        queryKey: loadbalancerQueries.virtances(id),
      });
      setOpen(false);
      toast.success('Virtance(s) added to loadbalancer');
      reset();
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

  function onCheckedChange(checked: boolean, id: string) {
    const value = getValues();
    if (checked) {
      setValue('ids', [...value.ids, id]);
    } else {
      setValue(
        'ids',
        value.ids.filter((v) => v !== id),
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Choose virtance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add virtances to {name}</DialogTitle>
          <DialogDescription>
            Choose virtances by adding their name or a tag below. Virtances must be
            located within one region.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="-mx-2 h-72 overflow-y-auto">
            {virtances?.length ? (
              virtances?.map((virtance) => (
                <Label
                  key={virtance.id}
                  htmlFor={`virtance-add-${virtance.id}`}
                  className={cx(
                    'flex items-center justify-between rounded-lg p-2 pr-4 transition-colors',
                    attachedVirtancesIds?.includes(virtance.id)
                      ? 'text-muted-foreground bg-muted cursor-not-allowed'
                      : 'hover:bg-muted cursor-pointer',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img
                      className="h-10 w-10"
                      src={
                        new URL(
                          `/src/shared/assets/images/os/${virtance.image.distribution
                            .toLowerCase()
                            .replaceAll(' ', '-')}.svg`,
                          import.meta.url,
                        ).href
                      }
                      alt={`Logo of Ubuntu`}
                    />
                    <div>
                      <p className="text-lg font-medium">{virtance.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {virtance.networks?.v4?.find((n) => n.type === 'public')
                          ?.address ?? 'N/A'}
                      </p>
                    </div>
                  </div>
                  <Checkbox
                    id={`virtance-add-${virtance.id}`}
                    onCheckedChange={(checked) => onCheckedChange(checked, virtance.id)}
                    value={virtance.id}
                    checked={attachedVirtancesIds?.includes(virtance.id)}
                    disabled={attachedVirtancesIds?.includes(virtance.id)}
                    className="h-5 w-5"
                  />
                </Label>
              ))
            ) : (
              <p className="flex h-full flex-col items-center justify-center py-8 text-center text-lg font-semibold">
                There is no available virtances to attach.
              </p>
            )}
          </div>
          <Button className="w-full" size="lg" type="submit" disabled={ids.length === 0}>
            Add virtances
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
