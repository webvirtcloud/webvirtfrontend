import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useDatabaseAction, useDatabaseSnapshots } from '@/entities/database';
import { DatabaseTakeSnapshotForm } from '@/features/database';
import { DatabaseSnapshotsTable } from '@/widgets/database';

export function DatabaseSnapshots() {
  const params = useParams();
  const { id } = params;
  const methods = useForm<{ name: string }>();
  const { runAction } = useDatabaseAction();

  const { data: snapshots, refetch, error } = useDatabaseSnapshots(id!);

  async function onSubmit(data: { name: string }) {
    try {
      await runAction({ action: 'snapshot', uuid: id!, name: data.name });
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
        databaseId={id}
        snapshots={snapshots}
        error={error}
        runAction={runAction}
      />
    </div>
  );
}
