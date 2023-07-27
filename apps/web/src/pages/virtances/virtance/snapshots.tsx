import { useVirtance } from '@/entities/virtance';
import { getVirtancesSnapshots } from '@/entities/virtance/api/get-virtance-snapshots';
import { TakeSnapshotForm } from '@/features/take-snapshot-form';
import { VirtanceSnapshotsTable } from '@/widgets/virtance-snapshots-table';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { useToast } from 'ui/components/toast';

export default function VirtanceSnapshots() {
  const methods = useForm<{ name: string }>();
  const { toast } = useToast();
  const { id } = useParams();
  const { virtance, runAction } = useVirtance(Number(id));

  const {
    data: snapshots,
    error,
    mutate,
  } = useSWR(
    `virtance-snapshots-${id}`,
    () => getVirtancesSnapshots(Number(id)).then((response) => response.snapshots),
    {
      refreshInterval: (latestData) => {
        if (latestData?.some((snapshot) => snapshot.event !== null)) {
          return 1000;
        }

        return 0;
      },
    },
  );

  async function onSubmit(data: { name: string }) {
    try {
      await runAction({ action: 'snapshot', id: Number(id), name: data.name });
      await mutate();
      methods.reset();
    } catch (e) {
      methods.setError('root', { message: 'Internal server error' });
      const { errors } = await e.response.json();

      errors.forEach((error) => {
        const keys = Object.keys(error);

        keys.forEach((key) => {
          toast({ title: 'Form error', description: error[key] });
        });
      });
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
        mutate={mutate}
        runAction={runAction}
      />
    </div>
  );
}
