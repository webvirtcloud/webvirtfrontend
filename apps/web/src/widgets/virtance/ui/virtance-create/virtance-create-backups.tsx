import { useFormContext } from 'react-hook-form';

import { type Backup, ImageCard, useImages } from '@/entities/image';

import type { CreateVirtanceForm } from './types';

export function VirtanceCreateBackups({
  onChange,
}: {
  onChange: (backup: Backup) => void;
}) {
  const { watch } = useFormContext<CreateVirtanceForm>();
  const { data } = useImages('backup');

  const image = watch('image');
  const region = watch('region');

  const filtered = data?.images.filter((backup) => {
    return backup.regions.includes(region.slug);
  });

  if (filtered?.length === 0) {
    return (
      <p className="flex max-w-sm flex-col items-center gap-2 rounded-md border border-dashed p-8">
        You don&apos;t have backups in selected region.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {filtered?.map((backup) => (
        <div key={backup.id}>
          <ImageCard
            onClick={() => onChange(backup)}
            isActive={image?.type === 'backup' && image.id === backup.id}
            name={backup.name}
            description={backup.description}
          />
        </div>
      ))}
    </div>
  );
}
