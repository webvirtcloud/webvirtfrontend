import { Controller, useFormContext } from 'react-hook-form';
import { SizeCard } from '@/entities/size';

export function VirtanceCreateSizes({ sizes }) {
  const { setValue, watch, control } = useFormContext();
  const currentSize = watch('size');

  return sizes ? (
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-medium">Sizes</h2>
      <div className="grid gap-4 md:grid-cols-3">
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
      </div>
    </section>
  ) : null;
}
