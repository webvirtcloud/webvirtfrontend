import { Table } from 'ui/components/table';
import { State } from '@/shared/ui/state';
import useSWR from 'swr';
import { Button } from 'ui/components/button';
import { useState } from 'react';
import { format } from 'date-fns';
import { type Virtance, getVirtances } from '@/entities/virtance';

import { ImagesManageBackupsSheet } from '@/features/images-manage-backups-sheet';
import { StatusDot } from 'ui/components/status-dot';

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
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center">
            <img
              className="h-8 w-8"
              src={
                new URL(
                  `/src/shared/assets/images/os/${value.image.distribution
                    .toLowerCase()
                    .replaceAll(' ', '-')}.svg`,
                  import.meta.url,
                ).href
              }
              alt={`Logo of ${value.image.distribution}`}
            />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium">{value.name}</h3>
              <StatusDot status={value.status} />
            </div>
            <p className="text-sm text-neutral-500">
              {value.size.memory}GB DDR4 / {value.size.disk}GB SSD
            </p>
          </div>
        </div>
      ),
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
