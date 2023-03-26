import { RegionCard } from '@/entities/region';
import { Controller, useFormContext } from 'react-hook-form';

export function VirtanceCreateRegions({ regions }) {
  const { setValue, watch, control } = useFormContext();
  const currentRegion = watch('region');

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
                onClick={() => setValue('region', region)}
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
