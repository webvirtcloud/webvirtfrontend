import { getVirtancesBackups } from '@/entities/virtance/api/get-virtance-backups';
import { useParams } from 'react-router-dom';
import { Table } from 'ui/components/table';
import { State } from '@/shared/ui/state';
import useSWR from 'swr';
import { Button } from 'ui/components/button';
import { useVirtance } from '@/entities/virtance';
import { FormEvent, useState } from 'react';

export default function VirtanceBackups() {
  const { id } = useParams();
  const { virtance, isBusy, runAction } = useVirtance(Number(id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isBackupsEnabled = virtance?.backups_enabled;

  const { data, error } = useSWR(
    'virtance-backups',
    () => getVirtancesBackups(Number(id)).then((response) => response.backups),
    {
      isOnline: () => !!isBackupsEnabled,
    },
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      await runAction({ action: 'enable_backups', id: Number(id) });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const columns = [
    {
      field: 'name',
      name: 'Name',
    },
  ];

  if (error) {
    return (
      <div className="rounded-md border dark:border-neutral-700">
        <State
          title="Oh no..."
          description="We cannot display any snapshots at this time for some reason."
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Backups</h2>
            <p className="text-neutral-500">
              Backups are created on a weekly basis and kept for a duration of four weeks.
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <Button
              disabled={isBusy}
              type="submit"
              variant={isBackupsEnabled ? 'destructive' : 'default'}
            >
              {isSubmitting ? 'Submitting...' : isBackupsEnabled ? 'Disable' : 'Enable'}
            </Button>
          </form>
        </div>

        {data ? (
          <>
            <Table columns={columns} data={data} />
            {data.length === 0 ? (
              <State
                title="No backups"
                description="Enable backups and they will show up here."
              />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
