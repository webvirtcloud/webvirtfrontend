import { useQuery } from '@tanstack/react-query';
import tw from 'twin.macro';

import { getImages, Image } from '@/api/images';
import { getRegions } from '@/api/regions';
import { getSizes } from '@/api/sizes';
import CreateForm from '@/pages/Servers/Create/CreateForm';

export default function CreateServer() {
  const { data: sizes } = useQuery({
    queryKey: ['create_server', 'sizes'],
    queryFn: () => getSizes().then((response) => response.sizes),
  });

  const { data: regions } = useQuery({
    queryKey: ['create_server', 'regions'],
    queryFn: () => getRegions().then((response) => response.regions),
  });

  const { data: distributions } = useQuery({
    queryKey: ['create_server', 'images', { type: 'distribution' }],
    queryFn: () =>
      getImages('distribution').then((response) => {
        return response.images.reduce((p, c) => {
          if (p.some((v) => v.name === c.distribution)) return p;

          p.push({
            name: c.distribution,
            slug: c.distribution.toLowerCase(),
            images: response.images.filter((i) => i.distribution === c.distribution),
          });

          return p;
        }, [] as { name: string; slug: string; images: Image[] }[]);
      }),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const defaultValues = distributions &&
    sizes &&
    regions && {
      distribution: distributions[1],
      image: distributions[1].images[1],
      size: sizes[0],
      region: regions[0],
    };

  return sizes && distributions && regions ? (
    <CreateForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      distributions={distributions}
      sizes={sizes}
      regions={regions}
    />
  ) : (
    <div css={tw`text-center py-8`}>Loading...</div>
  );
}
