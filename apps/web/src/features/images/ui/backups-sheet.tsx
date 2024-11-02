import { format } from 'date-fns';
import { type ComponentPropsWithoutRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from 'ui/components/sheet';
import { Spin } from 'ui/components/spin';
import { Table } from 'ui/components/table';

import {
  type Backup,
  BackupConvertAlertDialog,
  ImageRestoreAlertDialog,
  runImageAction,
} from '@/entities/image';
import {
  type Virtance,
  runVirtanceAction,
  useVirtanceBackups,
} from '@/entities/virtance';
import { State } from '@/shared/ui/state';

interface Props extends ComponentPropsWithoutRef<typeof Sheet> {
  virtance: Virtance;
}

export function BackupsSheet({ open, virtance, onOpenChange }: Props) {
  const [selectedBackup, setSelectedBackup] = useState<Backup>();
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);

  const { data: backups, refetch } = useVirtanceBackups(virtance?.id, {
    enabled: !!virtance?.id,
  });

  const onRestore = async (id: number) => {
    if (!virtance) return;
    await runVirtanceAction({ id: virtance.id, image: id, action: 'restore' });
    await refetch();
    toast.success('The task to restore a backup has been started.');
  };

  const onConvert = async (id: number) => {
    await runImageAction({ id, action: 'convert' });
    await refetch();
    toast.success('The task to convert a backup has been started.');
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
          disabled={!!backup.event}
          variant="outline"
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
          <div className="font-bold">
            {virtance?.name}-{format(new Date(value.created_at), 'MM-dd-yyyy')}
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
            <SheetTitle>{virtance?.name}&apos;s backups</SheetTitle>
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
