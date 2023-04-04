import { useVirtance } from '@/entities/virtance';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

interface FormState {
  name: string;
}

export default function VirtanceSettings() {
  const { id } = useParams();
  const { virtance, runAction } = useVirtance(Number(id));
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormState>();

  async function onSubmit(data: FormState) {
    runAction({ action: 'rename', id: Number(id), name: data.name });
  }

  return (
    <div className="space-y-8">
      {virtance ? (
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
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
      ) : null}
    </div>
  );
}
