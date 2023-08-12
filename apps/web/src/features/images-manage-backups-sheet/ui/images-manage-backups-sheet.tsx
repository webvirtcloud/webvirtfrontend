import { Table } from 'ui/components/table';
import { State } from '@/shared/ui/state';
import { useState, type ComponentPropsWithoutRef } from 'react';
import useSWR from 'swr';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from 'ui/components/sheet';
import { useToast } from 'ui/components/toast';
import { getVirtancesBackups } from '@/entities/virtance/api/get-virtance-backups';
import {
  type Backup,
  ImageRestoreAlertDialog,
  BackupConvertAlertDialog,
} from '@/entities/image';
import { runVirtanceAction, type Virtance } from '@/entities/virtance';
import { Button } from 'ui/components/button';
import { Spin } from 'ui/components/spin';
import { format } from 'date-fns';
import { runImageAction } from '@/entities/image/api/run-image-action';

interface Props extends ComponentPropsWithoutRef<typeof Sheet> {
  virtance: Virtance | undefined;
}

export function ImagesManageBackupsSheet({ open, virtance, onOpenChange }: Props) {
  const [selectedBackup, setSelectedBackup] = useState<Backup>();
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: backups, mutate } = useSWR(
    `images-virtance-backups-${virtance?.id}`,
    () =>
      virtance && getVirtancesBackups(virtance.id).then((response) => response.backups),
    {
      isOnline: () => !!virtance,
      refreshInterval(latestData) {
        return latestData?.some((backup) => !!backup.event) ? 1000 : 0;
      },
    },
  );

  const onRestore = async (id: number) => {
    try {
      if (!virtance) return;
      await runVirtanceAction({ id: virtance.id, image: id, action: 'restore' });
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
      case 'restore':
        setIsRestoreDialogOpen(false);
        break;
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
          disabled={!!backup.event}
          variant="secondary"
          onClick={() => onDialogOpen(backup, 'restore')}
        >
          {backup.event && backup.event.name === 'restore' ? (
            <>
              <Spin size="sm" />
              <span className="ml-2">{backup.event.description}</span>
            </>
          ) : (
            'Restore'
          )}
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
  return (
    <>
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

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="md:max-w-[720px]">
          <SheetHeader className="mb-4">
            <SheetTitle>Backups list of {virtance?.name}</SheetTitle>
          </SheetHeader>
          {backups ? (
            <>
              <Table columns={columns} data={backups} />
              {backups.length === 0 ? (
                <State
                  title="No backups"
                  description="Enable backups and they will show up here."
                />
              ) : null}
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
