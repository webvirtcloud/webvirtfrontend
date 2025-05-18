import { format } from 'date-fns';
import { type FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Spin } from 'ui/components/spin';
import { Table } from 'ui/components/table';

import { useDatabase, useDatabaseAction, useDatabaseBackups } from '@/entities/database';
import {
  type Backup,
  BackupConvertAlertDialog,
  ImageRestoreAlertDialog,
  runImageAction,
} from '@/entities/image';
import { State } from '@/shared/ui/state';

export function DatabaseBackupsTable() {
  const params = useParams();
  const { id } = params;
  const { data: database } = useDatabase(id!);
  const { runAction } = useDatabaseAction();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isBackupsEnabled = database?.backups_enabled;
  const [selectedBackup, setSelectedBackup] = useState<Backup>();
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);

  const isBusy = database?.status === 'pending';

  const { data, refetch, error } = useDatabaseBackups(id!, {
    enabled: !!isBackupsEnabled,
  });

  const onRestore = async (id: number) => {
    if (database) {
      database && (await runAction({ action: 'restore', uuid: database.id, image: id }));
      await refetch();
      toast.success('The task to restore a backup has been started.');
    }
  };

  const onConvert = async (id: number) => {
    await runImageAction({ id, action: 'convert' });
    await refetch();
    toast.success('The task to convert a backup has been started.');
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      await runAction({
        action: isBackupsEnabled ? 'disable_backups' : 'enable_backups',
        uuid: id!,
      });
    } catch (e) {
      const { message } = await e.response.json();
      toast.error('Bad request', { description: message });
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
          variant="outline"
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
          variant="outline"
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
          <div className="font-bold">
            {database?.name}-{format(new Date(value.created_at), 'MM-dd-yyyy')}
          </div>
          <div className="text-muted-foreground text-xs">
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
      <div className="rounded-md border">
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
            <p className="text-muted-foreground">
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

        {isBackupsEnabled && data ? (
          <>
            <Table columns={columns} data={data} />
            {data.length === 0 ? (
              <State
                title="No backups"
                description="Your first backup will be created soon."
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
