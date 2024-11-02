import { useForm } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

import { useIsVirtanceBusy, useVirtance, useVirtanceAction } from '@/entities/virtance';

interface FormState {
  name: string;
}

export function General({ id }: { id: number }) {
  const { data: virtance } = useVirtance(id);
  const { runAction } = useVirtanceAction();
  const isBusy = useIsVirtanceBusy(virtance);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormState>();

  async function onSubmit(data: FormState) {
    await runAction({ action: 'rename', id: Number(id), name: data.name });
  }

  return virtance ? (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">General</h2>
        <p className="text-muted-foreground">
          Settings and options for the{' '}
          <span className="text-foreground font-semibold">{virtance.name}</span> virtance.
        </p>
      </div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="virtance-name">Virtance name</Label>
          <div className="flex items-center gap-2">
            <Input
              {...register('name', { required: 'Name is required.' })}
              defaultValue={virtance.name}
              id="virtance-name"
              placeholder="Enter virtance name"
              className="max-w-sm"
              disabled={isBusy}
              error={!!errors.name}
            />
            <Button type="submit" disabled={isSubmitting || isBusy}>
              {isSubmitting ? 'Renaming...' : 'Rename'}
            </Button>
          </div>
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
      </form>
    </div>
  ) : null;
}
