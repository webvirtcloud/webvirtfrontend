import { Table } from 'ui/components/table';
import { State } from '@/shared/ui/state';
import useSWR from 'swr';
import { Button } from 'ui/components/button';
import { useState } from 'react';
import { format } from 'date-fns';
import { Spin } from 'ui/components/spin';
import { useToast } from 'ui/components/toast';
import {
  type Backup,
  ImageRestoreAlertDialog,
  BackupConvertAlertDialog,
  getImages,
} from '@/entities/image';

export function ImagesBackupsTable() {
  const [selectedBackup, setSelectedBackup] = useState<Backup>();
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data, mutate, error } = useSWR('virtance-backups', () =>
    getImages('backup').then((response) => response.images),
  );

  const onRestore = async (id: number) => {
    try {
      // TODO check if backup still has working instance then we can restore backup
      await mutate();
      toast({
        title: 'The task to restore a backup has been started.',
        variant: 'default',
      });
    } catch (error) {}
  };

  const onConvert = async (id: number) => {
    try {
      // TODO: Add convert api method
      await mutate();
      toast({
        title: 'The task to convert a backup has been started.',
        variant: 'destructive',
      });
    } catch (error) {}
  };

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
          description="We cannot display any backups at this time for some reason."
        />
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}
