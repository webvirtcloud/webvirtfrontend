import { useVirtance } from '@/entities/virtance';
import { VirtanceSnapshotsTable } from '@/widgets/virtance-snapshots-table';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

export default function VirtanceSnapshots() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<{ name: string }>();
  const { id } = useParams();
  const { virtance, runAction } = useVirtance(Number(id));

  function onSubmit(data: { name: string }) {
    runAction({ action: 'snapshot', id: Number(id), name: data.name });
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-lg font-medium">Snapshots</h2>

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
      </div>

      <VirtanceSnapshotsTable id={Number(id)} />
    </div>
  );
}
