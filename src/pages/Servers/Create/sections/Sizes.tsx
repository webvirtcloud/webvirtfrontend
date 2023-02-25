import { Controller, useFormContext } from 'react-hook-form';
import tw from 'twin.macro';

import SizeCard from '@/shared/ui/Cards/Size';

import { Grid } from './styles';

export default function DistributionsSection({ sizes }) {
  const { setValue, watch, control } = useFormContext();
  const currentSize = watch('size');

  return sizes ? (
    <section css={tw`mb-12`}>
      <h2 css={tw`mb-4 text-lg font-bold`}>Sizes</h2>
      <Grid>
        {sizes.map((size) => (
          <Controller
            key={size.slug}
            name="size"
            control={control}
            render={() => (
              <SizeCard
                onClick={() => setValue('size', size)}
                isActive={currentSize.slug === size.slug}
                key={size.slug}
                size={size}
              />
            )}
          />
        ))}
      </Grid>
    </section>
  ) : null;
}
