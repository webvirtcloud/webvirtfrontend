import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useVirtanceAction, useVirtanceSnapshots } from '@/entities/virtance';
import { TakeSnapshotForm } from '@/features/take-snapshot-form';
import { VirtanceSnapshotsTable } from '@/widgets/virtance-snapshots-table';

export default function VirtanceSnapshotsPage() {
  const params = useParams();
  const id = Number(params.id);
  const methods = useForm<{ name: string }>();
  const { runAction } = useVirtanceAction();

  const { data: snapshots, refetch, error } = useVirtanceSnapshots(id);

  async function onSubmit(data: { name: string }) {
    try {
      await runAction({ action: 'snapshot', id: id, name: data.name });
      await refetch();
      methods.reset();
    } catch (e) {
      methods.setError('root', { message: 'Internal server error' });
      const response = await e.response.json();

      if (response.errors) {
        return response.errors.forEach((error) => {
          const keys = Object.keys(error);

          keys.forEach((key) => {
            toast.error('Bad request', { description: error[key] });
          });
        });
      }

      if (response.message) {
        toast.error('Bad request', { description: response.message });
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-lg font-medium">Snapshots</h2>

        <FormProvider {...methods}>
          <TakeSnapshotForm onSubmit={onSubmit} />
        </FormProvider>
      </div>

      <VirtanceSnapshotsTable
        virtanceId={Number(id)}
        snapshots={snapshots}
        error={error}
        runAction={runAction}
      />
    </div>
  );
}
