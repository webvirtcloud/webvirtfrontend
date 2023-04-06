import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { useForm } from 'react-hook-form';
import { useVirtance, type Virtance } from '@/entities/virtance';

interface FormState {
  name: string;
}

export function VirtanceSettingsRename({ id }: { id: number }) {
  const { virtance, runAction } = useVirtance(id);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormState>();

  async function onSubmit(data: FormState) {
    runAction({ action: 'rename', id: Number(id), name: data.name });
  }

  return virtance ? (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="virtance-name">Name</Label>
        <Input
          {...register('name', { required: 'Name is required.' })}
          defaultValue={virtance.name}
          id="virtance-name"
          placeholder="Enter virtance name"
          className="max-w-sm"
          error={!!errors.name}
        />
        {errors.name && <Error>{errors.name?.message}</Error>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update settings'}
      </Button>
    </form>
  ) : null;
}
