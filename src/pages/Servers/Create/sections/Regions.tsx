import { Controller, useFormContext } from 'react-hook-form';
import tw from 'twin.macro';

import RegionCard from '@/components/Cards/Region';

import { Grid } from './styles';

export default function DistributionsSection({ regions }) {
  const { setValue, watch, control } = useFormContext();
  const currentRegion = watch('region');

  return regions ? (
    <section css={tw`mb-12`}>
      <h2 css={tw`mb-4 text-lg font-bold`}>Regions</h2>
      <Grid>
        {regions.map((region) => (
          <Controller
            key={region.slug}
            name="region"
            control={control}
            render={() => (
              <RegionCard
                onClick={() => setValue('region', region)}
                isActive={region.slug === currentRegion.slug}
                region={region}
              />
            )}
          />
        ))}
      </Grid>
    </section>
  ) : null;
}
