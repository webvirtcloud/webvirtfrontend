import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useVirtanceAction, useVirtanceSnapshots } from '@/entities/virtance';
import { VirtanceTakeSnapshotForm } from '@/features/virtance';
import { VirtanceSnapshotsTable } from '@/widgets/virtance';

export const Route = createFileRoute('/_authenticated/virtances/$id/snapshots')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
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
          <VirtanceTakeSnapshotForm onSubmit={onSubmit} />
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
