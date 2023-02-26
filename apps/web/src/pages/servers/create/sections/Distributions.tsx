import { useFormContext } from 'react-hook-form';
import tw from 'twin.macro';

import DistributionCard from '@/shared/ui/Cards/Distribution';

import { Grid } from './styles';

export default function DistributionsSection({ distributions }) {
  const { setValue, watch } = useFormContext();
  const currentDistribution = watch('distribution');
  const currentImage = watch('image');

  function onDistributionChange(distribution) {
    if (currentDistribution.slug === distribution.slug) {
      return;
    }
    setValue('distribution', distribution);
    setValue('image', distribution.images[0]);
  }

  function onImageChange(image) {
    if (currentImage.slug === image.slug) {
      return;
    }
    setValue('image', image);
  }

  return distributions ? (
    <section css={tw`mb-12`}>
      <h2 css={tw`mb-4 text-lg font-bold`}>Images</h2>
      <Grid>
        {distributions.map((distribution) => (
          <DistributionCard
            key={distribution.slug}
            distribution={distribution}
            onDistributionChange={onDistributionChange}
            onImageChange={onImageChange}
            isActive={distribution.slug === currentDistribution.slug}
          />
        ))}
      </Grid>
    </section>
  ) : null;
}
