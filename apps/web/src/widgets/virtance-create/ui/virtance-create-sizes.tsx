import { Controller, useFormContext } from 'react-hook-form';

import { type Size, SizeCard } from '@/entities/size';

import type { CreateVirtanceForm } from '../types';

export function VirtanceCreateSizes({ sizes }: { sizes: Size[] }) {
  const { watch, control } = useFormContext<CreateVirtanceForm>();

  const { slug } = watch('size');

  return sizes ? (
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-medium">Sizes</h2>
      {sizes.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {sizes.map((size) => (
            <Controller
              key={size.slug}
              name="size"
              control={control}
              render={({ field }) => (
                <SizeCard
                  onClick={() =>
                    field.onChange({
                      slug: size.slug,
                      price_monthly: size.price_monthly,
                      memory: size.memory,
                      disk: size.disk,
                    })
                  }
                  isActive={slug === size.slug}
                  isDisabled={!size.available}
                  key={size.slug}
                  size={size}
                />
              )}
            />
          ))}
        </div>
      ) : (
        <p className="flex max-w-sm flex-col items-center gap-2 rounded-md border border-dashed p-8 dark:border-neutral-700">
          You don&apos;t have sizes in selected region.
        </p>
      )}
    </section>
  ) : null;
}
