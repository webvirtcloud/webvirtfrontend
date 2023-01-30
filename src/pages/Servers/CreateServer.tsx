import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import tw from 'twin.macro';

import { getImages, Image } from '@/api/images';
import { getRegions } from '@/api/regions';
import { getSizes } from '@/api/sizes';
import { Button } from '@/components/Button';
import DistributionCard from '@/components/Cards/Distribution';
import Input from '@/components/Input';

const Grid = tw.ul`grid md:grid-cols-2 lg:grid-cols-4 gap-4`;

const CreateServer = () => {
  const { register, handleSubmit, setValue, control } = useForm();

  const [distributions, setDistributions] = useState<
    { name: string; slug: string; images: Image[] }[]
  >([]);

  const { data: regions } = useSWR(
    '/regions/',
    () => getRegions().then((response) => response.regions),
    {
      onSuccess(data) {
        setValue('region', data[0].slug);
      },
    },
  );
  const { data: sizes } = useSWR(
    '/sizes/',
    () => getSizes().then((response) => response.sizes),
    {
      onSuccess(data) {
        setValue('size', data[0].slug);
      },
    },
  );
  useSWR(
    '/images?type=distribution',
    () => getImages('distribution').then((response) => response.images),
    {
      onSuccess(data) {
        const dstrs = data.reduce((p, c) => {
          if (p.some((v) => v.name === c.distribution)) return p;

          p.push({
            name: c.distribution,
            slug: c.distribution.toLowerCase(),
            images: data.filter((i) => i.distribution === c.distribution),
          });

          return p;
        }, [] as { name: string; slug: string; images: Image[] }[]);

        setValue('distribution', dstrs[0].slug);
        setValue('image', dstrs[0].images[0]);

        setDistributions(dstrs);
      },
    },
  );

  const onSubmit = (data) => {
    console.log(data);
  };

  const labelCardStyles = tw`block w-full p-2 space-x-2 border rounded-md bg-base`;

  const currentImageSlug: string = useWatch({
    control,
    name: 'image',
  });

  const currentDistributionSlug: string = useWatch({
    control,
    name: 'distribution',
  });

  console.log(currentDistributionSlug);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={tw`relative max-w-4xl py-8 mx-auto md:py-16`}
    >
      <div css={tw`md:col-span-5`}>
        <div css={tw`mb-8`}>
          <h1 css={tw`mb-2 text-3xl font-bold`}>Let&apos;s build a new server.</h1>
          <p css={tw`text-alt2`}>
            Feel free to create server with any of provided options.
          </p>
        </div>

        <div
          css={tw`sticky top-[136px] left-0 right-0 flex items-center justify-between p-4 mb-16 border rounded-md shadow-xl bg-base`}
        >
          <div>
            <div css={tw`flex items-center space-x-2`}>
              <div css={tw`flex items-center justify-center w-12 h-12 rounded bg-alt`}>
                <img
                  css={tw`w-8 h-8`}
                  src={new URL(`/src/assets/images/os/ubuntu.svg`, import.meta.url).href}
                  alt={`Logo of Ubuntu`}
                />
              </div>
              <div css={tw`space-y-0.5`}>
                <h3 css={tw`font-bold`}>Ubuntu 18.04</h3>
                <p css={tw`text-sm text-alt2`}>8GB DDR4 / 512GB SSD / Frankfurt</p>
              </div>
            </div>
          </div>
          <div>
            <Button size="lg" type="submit">
              Deploy server
            </Button>
          </div>
        </div>

        {regions ? (
          <section css={tw`mb-12`}>
            <h2 css={tw`mb-4 text-lg font-bold`}>Regions</h2>
            <Grid>
              {regions.map((region) => (
                <li key={region.slug}>
                  <label css={[labelCardStyles]}>
                    <input
                      {...register('region', { required: true })}
                      type="radio"
                      value={region.slug}
                      id={`region-${region.slug}`}
                    />
                    <span>{region.slug}</span>
                  </label>
                </li>
              ))}
            </Grid>
          </section>
        ) : null}

        {distributions ? (
          <section css={tw`mb-12`}>
            <h2 css={tw`mb-4 text-lg font-bold`}>Images</h2>
            <Grid>
              {distributions.map((distribution) => (
                <DistributionCard
                  key={distribution.slug}
                  distribution={distribution}
                  isActive={
                    currentDistributionSlug
                      ? currentDistributionSlug === distribution.slug
                      : false
                  }
                  {...register('distribution', { required: true })}
                />
              ))}
            </Grid>
          </section>
        ) : null}

        {sizes ? (
          <section css={tw`mb-12`}>
            <h2 css={tw`mb-4 text-lg font-bold`}>Sizes</h2>
            <Grid>
              {sizes.map((size) => (
                <li key={size.slug}>
                  <label css={labelCardStyles}>
                    <input
                      {...register('size', { required: true })}
                      type="radio"
                      value={size.slug}
                      id={`size-${size.slug}`}
                    />
                    <span>{size.slug}</span>
                  </label>
                </li>
              ))}
            </Grid>
          </section>
        ) : null}

        <section>
          <h2 css={tw`mb-4 text-lg font-bold`}>Settings</h2>
          <Input
            required
            id="name"
            label="Name"
            placeholder="Enter name for server"
            size="lg"
            {...register('name', { required: 'Server name is required.' })}
          />
        </section>
      </div>
    </form>
  );
};

export default CreateServer;
