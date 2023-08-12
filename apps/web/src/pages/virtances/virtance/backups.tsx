import { getVirtancesBackups } from '@/entities/virtance/api/get-virtance-backups';
import { useParams } from 'react-router-dom';
import { Table } from 'ui/components/table';
import { State } from '@/shared/ui/state';
import useSWR from 'swr';
import { Button } from 'ui/components/button';
import { useVirtance } from '@/entities/virtance';
import { FormEvent, useState } from 'react';
import { format } from 'date-fns';
import { Spin } from 'ui/components/spin';
import { useToast } from 'ui/components/toast';
import {
  type Backup,
  ImageRestoreAlertDialog,
  BackupConvertAlertDialog,
} from '@/entities/image';
import { runImageAction } from '@/entities/image/api/run-image-action';

export default function VirtanceBackups() {
  const { id } = useParams();
  const { virtance, isBusy, runAction } = useVirtance(Number(id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isBackupsEnabled = virtance?.backups_enabled;
  const [selectedBackup, setSelectedBackup] = useState<Backup>();
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data, mutate, error } = useSWR(
    'virtance-backups',
    () => getVirtancesBackups(Number(id)).then((response) => response.backups),
    {
      isOnline: () => !!isBackupsEnabled,
      refreshInterval(latestData) {
        return latestData?.some((backup) => !!backup.event) ? 1000 : 0;
      },
    },
  );

  const onRestore = async (id: number) => {
    try {
      virtance && (await runAction({ action: 'restore', id: virtance.id, image: id }));
      await mutate();
      toast({
        title: 'The task to restore a backup has been started.',
        variant: 'default',
      });
    } catch (error) {}
  };

  const onConvert = async (id: number) => {
    try {
      await runImageAction({ id, action: 'convert' });
      await mutate();
      toast({
        title: 'The task to convert a backup has been started.',
        variant: 'destructive',
      });
    } catch (error) {}
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      await runAction({
        action: isBackupsEnabled ? 'disable_backups' : 'enable_backups',
        id: Number(id),
      });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  function onDialogOpen(backup: Backup, type: 'restore' | 'convert') {
    setSelectedBackup(backup);

    switch (type) {
      case 'restore':
        setIsRestoreDialogOpen(true);
        break;
      case 'convert':
        setIsConvertDialogOpen(true);
        break;
    }
  }

  function onDialogClose(type: 'restore' | 'convert') {
    switch (type) {
      case 'convert':
        setIsConvertDialogOpen(false);
        break;
    }
    switch (type) {
      case 'convert':
        setIsConvertDialogOpen(false);
        break;
    }
    setSelectedBackup(undefined);
  }

  const Actions = ({ value: backup }: { value: Backup }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        <Button
          size="sm"
          variant="secondary"
          disabled={!!backup.event}
          onClick={() => onDialogOpen(backup, 'convert')}
        >
          {backup.event && backup.event.name === 'convert' ? (
            <>
              <Spin size="sm" />
              <span className="ml-2">{backup.event.description}</span>
            </>
          ) : (
            'Convert'
          )}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={isBusy || !!backup.event}
          onClick={() => onDialogOpen(backup, 'restore')}
        >
          Restore
        </Button>
      </div>
    </div>
  );

  const columns = [
    {
      field: 'name',
      name: 'Name',
      component: ({ value }) => (
        <div>
          <div className="font-bold">{value.name}</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Size {value.size_gigabytes} GB
          </div>
        </div>
      ),
    },
    {
      field: 'created_at',
      name: 'Created at',
      formatter: (item) => format(new Date(item.created_at), 'MMM dd, yyyy'),
    },
    {
      field: 'actions',
      name: '',
      component: Actions,
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

        {selectedBackup ? (
          <>
            <ImageRestoreAlertDialog
              open={isRestoreDialogOpen}
              onOpenChange={() => onDialogClose('restore')}
              onRestore={() => onRestore(selectedBackup.id)}
              type="backup"
            />
            <BackupConvertAlertDialog
              open={isConvertDialogOpen}
              onOpenChange={() => onDialogClose('convert')}
              onDelete={() => onConvert(selectedBackup.id)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
