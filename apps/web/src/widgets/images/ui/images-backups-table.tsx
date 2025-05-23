import { useState } from 'react';
import { Button } from 'ui/components/button';
import { Table } from 'ui/components/table';

import type { Virtance } from '@/entities/virtance';
import { useVirtances } from '@/entities/virtance';
import { BackupsSheet } from '@/features/images';
import { formatMemorySize } from '@/shared/lib';
import { State } from '@/shared/ui/state';

export function ImagesBackupsTable() {
  const [selectedVirtance, setSelectedVirtance] = useState<Virtance>();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: virtances, error } = useVirtances({ has_backups: true });

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
            </div>
            <p className="text-muted-foreground text-sm">
              {formatMemorySize(value.size.memory)} DDR4 / {value.size.disk}GB SSD
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
          <Button size="sm" variant="outline" onClick={() => openSheet(value)}>
            Show backups
          </Button>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="rounded-md border">
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

      {selectedVirtance && (
        <BackupsSheet
          open={isSheetOpen}
          onOpenChange={onSheetOpenChange}
          virtance={selectedVirtance}
        />
      )}
    </>
  );
}
