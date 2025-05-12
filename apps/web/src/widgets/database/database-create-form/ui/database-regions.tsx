import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { RegionCard, useRegions } from '@/entities/region';

import type { DatabaseCreateForm } from '../types';

export function DatabaseRegions() {
  const { data: regions } = useRegions();

  const { setValue, watch, control } = useFormContext<DatabaseCreateForm>();

  const currentRegion = watch('region');

  const isHidden = regions?.length === 1 && regions?.[0].slug === 'default';

  const filteredRegions = regions?.filter((region) => region.slug !== 'default');

  useEffect(() => {
    if (regions && !currentRegion) {
      setValue('region', regions[0].slug);
    }
  }, [regions]);

  if (isHidden) return null;

  return regions ? (
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-medium">Regions</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {filteredRegions?.map((region) => (
          <Controller
            key={region.slug}
            name="region"
            control={control}
            render={() => (
              <RegionCard
                onClick={() => setValue('region', region.slug)}
                isActive={region.slug === currentRegion}
                region={region}
              />
            )}
          />
        ))}
      </div>
    </section>
  ) : null;
}
