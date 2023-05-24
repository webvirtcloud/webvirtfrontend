import { useFormContext } from 'react-hook-form';
import { DistributionCard } from '@/entities/image';

export function VirtanceCreateDistributions({ distributions }) {
  const { setValue, watch } = useFormContext();
  const currentDistribution = watch('distribution');
  const currentImage = watch('image');

  function onDistributionChange(distribution) {
    if (
      currentDistribution.slug === distribution.slug ||
      distribution.images.every((image) => image.status !== 'available')
    ) {
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
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-medium">Images</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {distributions.map((distribution) => (
          <DistributionCard
            key={distribution.slug}
            distribution={distribution}
            onDistributionChange={onDistributionChange}
            onImageChange={onImageChange}
            isActive={distribution.slug === currentDistribution.slug}
            isDisabled={distribution.images.every(
              (image) => image.status !== 'available',
            )}
          />
        ))}
      </div>
    </section>
  ) : null;
}
