import { useMemo } from 'react';

import { type Distribution, useImages } from '@/entities/image';
import { Region, useRegions } from '@/entities/region';
import { Size, useSizes } from '@/entities/size';

import type { CreateVirtanceForm, FormDistribution } from '../types';
import VirtanceCreateForm from './virtance-create-form';

export function VirtanceCreate() {
  const { data: sizes } = useSizes();
  const { data: regions } = useRegions();
  const { data: images } = useImages('distribution');

  const distributions = useMemo(() => {
    return images?.images.reduce((p, c) => {
      if (p.some((v) => v.name === c.distribution)) return p;

      p.push({
        name: c.distribution,
        slug: c.distribution.toLowerCase().replaceAll(' ', '-'),
        images: images.images.filter((i) => i.distribution === c.distribution),
      });

      return p;
    }, [] as { name: string; slug: string; images: Distribution[] }[]);
  }, [images]);

  function generateDefaultValues(
    distributions: FormDistribution[],
    sizes: Size[],
    regions: Region[],
    images: Distribution[],
  ): CreateVirtanceForm {
    const image = images.find((image) => image.status === 'available')!;
    const distribution = distributions.find((dist) => dist.name === image?.distribution);
    const size = sizes.find((size) => size.available)!;
    const region = regions.find((region) => region.available)!;

    return {
      distribution: distribution?.slug,
      image: {
        id: image.slug,
        type: 'distribution',
        minDiskSize: image.min_disk_size,
        description: image.description,
        name: image.name,
      },
      size: {
        slug: size.slug,
        price_monthly: size.price_monthly,
        memory: size.memory,
        disk: size.disk,
      },
      region: {
        slug: region.slug,
        features: region.features,
        name: region.name,
      },
      name: '',
      backups: false,
      authentication: {
        method: 'ssh',
        keys: new Set(),
      },
    };
  }

  if (!sizes || !distributions || !regions || !images) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  return (
    <VirtanceCreateForm
      defaultValues={generateDefaultValues(distributions, sizes, regions, images.images)}
      sizes={sizes}
      regions={regions}
    />
  );
}
