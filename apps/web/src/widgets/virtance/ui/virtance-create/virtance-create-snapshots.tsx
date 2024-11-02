import { useFormContext } from 'react-hook-form';

import { type Snapshot, ImageCard, useImages } from '@/entities/image';

import { CreateVirtanceForm } from './types';

export function VirtanceCreateSnapshots({
  onChange,
}: {
  onChange: (snapshot: Snapshot) => void;
}) {
  const { watch } = useFormContext<CreateVirtanceForm>();
  const { data } = useImages('snapshot');

  const image = watch('image');
  const region = watch('region');

  const filtered = data?.images.filter((backup) => {
    return backup.regions.includes(region.slug);
  });

  if (filtered?.length === 0) {
    return (
      <p className="flex max-w-sm flex-col items-center gap-2 rounded-md border border-dashed p-8">
        You don&apos;t have snapshots in selected region.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {filtered?.map((snapshot) => (
        <div key={snapshot.id}>
          <ImageCard
            onClick={() => onChange(snapshot)}
            isActive={image?.type === 'snapshot' && image.id === snapshot.id}
            name={snapshot.name}
            description={snapshot.description}
          />
        </div>
      ))}
    </div>
  );
}
