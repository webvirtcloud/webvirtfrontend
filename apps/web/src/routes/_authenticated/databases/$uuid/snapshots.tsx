import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useDatabaseAction, useDatabaseSnapshots } from '@/entities/database';
import { DatabaseTakeSnapshotForm } from '@/features/database';
import { DatabaseSnapshotsTable } from '@/widgets/database';

export const Route = createFileRoute('/_authenticated/databases/$uuid/snapshots')({
  component: RouteComponent,
});

function RouteComponent() {
  const { uuid } = Route.useParams();
  const methods = useForm<{ name: string }>();
  const { runAction } = useDatabaseAction();

  const { data: snapshots, refetch, error } = useDatabaseSnapshots(uuid);

  async function onSubmit(data: { name: string }) {
    try {
      await runAction({ action: 'snapshot', uuid, name: data.name });
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
          <DatabaseTakeSnapshotForm onSubmit={onSubmit} />
        </FormProvider>
      </div>

      <DatabaseSnapshotsTable
        databaseUUID={uuid}
        snapshots={snapshots}
        error={error}
        runAction={runAction}
      />
    </div>
  );
}
