import { Controller, useFormContext } from 'react-hook-form';

import { type Region, RegionCard } from '@/entities/region';

import type { CreateVirtanceForm } from '../types';

export function VirtanceCreateRegions(props: { regions: Region[] }) {
  const { setValue, watch, control } = useFormContext<CreateVirtanceForm>();

  const currentRegion = watch('region');

  const isHidden = props.regions.length === 1 && props.regions[0].slug === 'default';

  const regions = props.regions?.filter((region) => region.slug !== 'default');

  if (isHidden) return null;

  return regions ? (
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-medium">Regions</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {regions.map((region) => (
          <Controller
            key={region.slug}
            name="region"
            control={control}
            render={() => (
              <RegionCard
                onClick={() =>
                  setValue('region', {
                    slug: region.slug,
                    features: region.features,
                    name: region.name,
                  })
                }
                isActive={region.slug === currentRegion.slug}
                region={region}
              />
            )}
          />
        ))}
      </div>
    </section>
  ) : null;
}
