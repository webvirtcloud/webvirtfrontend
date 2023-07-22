import { useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

export function TakeSnapshotForm({
  onSubmit,
}: {
  onSubmit: ({ name }: { name: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormContext<{ name: string }>();

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="snapshot-name">Virtance name</Label>
        <div className="flex items-center gap-2">
          <Input
            {...register('name', { required: 'Name is required.' })}
            id="snapshot-name"
            placeholder="Enter snapshot name"
            className="max-w-sm"
            error={!!errors.name}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Taking snapshot...' : 'Take snapshot'}
          </Button>
        </div>
        {errors.name && <Error>{errors.name?.message}</Error>}
      </div>
    </form>
  );
}
