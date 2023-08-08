import { Table } from 'ui/components/table';
import { State } from '@/shared/ui/state';
import useSWR from 'swr';
import { Button } from 'ui/components/button';
import { useState } from 'react';
import { format } from 'date-fns';
import { type Virtance, getVirtances } from '@/entities/virtance';

import { ImagesManageBackupsSheet } from '@/features/images-manage-backups-sheet';

export function ImagesBackupsTable() {
  const [selectedVirtance, setSelectedVirtance] = useState<Virtance>();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: virtances, error } = useSWR('images-virtances', () =>
    getVirtances({ has_backups: true }).then((response) => response.virtances),
  );

  function openSheet(virtance: Virtance) {
    setSelectedVirtance(virtance);
    setIsSheetOpen(true);
  }

  function onSheetOpenChange(value: boolean) {
    setIsSheetOpen(false);
    if (!value) {
      setSelectedVirtance(undefined);
    }
  }

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
      component: ({ value }) => (
        <div className="flex justify-end">
          <Button size="sm" variant="secondary" onClick={() => openSheet(value)}>
            Show backups
          </Button>
        </div>
      ),
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
      {virtances ? (
        <>
          <Table columns={columns} data={virtances} />
          {virtances.length === 0 ? (
            <State
              title="No backups"
              description="Enable backups and they will show up here."
            />
          ) : null}
        </>
      ) : null}

      <ImagesManageBackupsSheet
        open={isSheetOpen}
        onOpenChange={onSheetOpenChange}
        virtance={selectedVirtance}
      />
    </>
  );
}
