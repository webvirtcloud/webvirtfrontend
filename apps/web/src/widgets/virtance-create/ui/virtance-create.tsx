import { useImages, type Image } from '@/entities/image';
import VirtanceCreateForm from './virtance-create-form';
import { useRegions } from '@/entities/region';
import { useSizes } from '@/entities/size';
import { useMemo } from 'react';

export function VirtanceCreate() {
  const { sizes } = useSizes();
  const { regions } = useRegions();
  const { images } = useImages('distribution');

  const distributions = useMemo(() => {
    return images?.reduce((p, c) => {
      if (p.some((v) => v.name === c.distribution)) return p;

      p.push({
        name: c.distribution,
        slug: c.distribution.toLowerCase(),
        images: images.filter((i) => i.distribution === c.distribution),
      });

      return p;
    }, [] as { name: string; slug: string; images: Image[] }[]);
  }, [images]);

  const defaultValues = distributions &&
    sizes &&
    regions && {
      distribution: distributions[1],
      image: distributions[1].images[1],
      size: sizes.find((size) => size.available),
      region: regions.find((region) => region.available),
    };
  return sizes && distributions && regions ? (
    <VirtanceCreateForm
      defaultValues={defaultValues}
      distributions={distributions}
      sizes={sizes}
      regions={regions}
    />
  ) : (
    <div className="py-8 text-center">Loading...</div>
  );
}
