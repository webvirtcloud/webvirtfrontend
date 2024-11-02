import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { type Distribution, DistributionCard, useImages } from '@/entities/image';

import type { CreateVirtanceForm, FormDistribution } from './types';

export function VirtanceCreateDistributions() {
  const { setValue, watch } = useFormContext<CreateVirtanceForm>();

  const currentDistribution = watch('distribution');
  const currentImage = watch('image');

  const { data } = useImages('distribution');

  function onDistributionChange(distribution: FormDistribution) {
    if (
      currentDistribution === distribution.slug ||
      distribution.images.every((image) => image.status !== 'available')
    ) {
      return;
    }
    setValue('distribution', distribution.slug);

    const nextImage = distribution.images.find((image) => image.status === 'available');

    if (!nextImage) return;

    setValue('image', {
      id: nextImage.slug,
      type: 'distribution',
      minDiskSize: nextImage.min_disk_size,
      description: nextImage.description,
      name: nextImage.name,
    });
  }

  const distributions = useMemo(() => {
    return data?.images.reduce((p, c) => {
      if (p.some((v) => v.name === c.distribution)) return p;

      p.push({
        name: c.distribution,
        slug: c.distribution.toLowerCase().replaceAll(' ', '-'),
        images: data.images.filter((i) => i.distribution === c.distribution),
      });

      return p;
    }, [] as { name: string; slug: string; images: Distribution[] }[]);
  }, [data]);

  function onImageChange(image: Distribution, distribution: FormDistribution) {
    if (currentImage.id === image.slug) {
      return;
    }

    setValue('image', {
      id: image.slug,
      type: 'distribution',
      minDiskSize: image.min_disk_size,
      description: image.description,
      name: image.name,
    });

    if (currentDistribution !== distribution.slug) {
      setValue('distribution', distribution.slug);
    }
  }

  return distributions ? (
    <div className="grid gap-4 md:grid-cols-2">
      {distributions.map((distribution) => (
        <DistributionCard
          key={distribution.slug}
          distribution={distribution}
          onDistributionChange={onDistributionChange}
          onImageChange={(image) => onImageChange(image, distribution)}
          isActive={distribution.slug === currentDistribution}
          isDisabled={distribution.images.every((image) => image.status !== 'available')}
        />
      ))}
    </div>
  ) : null;
}
