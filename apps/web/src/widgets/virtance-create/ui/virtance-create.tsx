import { useMemo } from 'react';

import { type Image, useImages } from '@/entities/image';
import { useRegions } from '@/entities/region';
import { useSizes } from '@/entities/size';

import VirtanceCreateForm from './virtance-create-form';

export function VirtanceCreate() {
  const { data: sizes } = useSizes();
  const { data: regions } = useRegions();
  const { data: images } = useImages('distribution');

  const distributions = useMemo(() => {
    return images?.reduce((p, c) => {
      if (p.some((v) => v.name === c.distribution)) return p;

      p.push({
        name: c.distribution,
        slug: c.distribution.toLowerCase().replaceAll(' ', '-'),
        images: images.filter((i) => i.distribution === c.distribution),
      });

      return p;
    }, [] as { name: string; slug: string; images: Image[] }[]);
  }, [images]);

  function generateDefaultValues(distributions, sizes, regions, images) {
    const image = images.find((image) => image.status === 'available');
    const distribution = distributions.find((dist) => dist.name === image.distribution);

    return {
      distribution,
      image,
      size: sizes.find((size) => size.available),
      region: regions.find((region) => region.available),
      keypairs: new Set(),
    };
  }

  if (!sizes || !distributions || !regions || !images) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  return (
    <VirtanceCreateForm
      defaultValues={generateDefaultValues(distributions, sizes, regions, images)}
      distributions={distributions}
      sizes={sizes}
      regions={regions}
    />
  );
}
