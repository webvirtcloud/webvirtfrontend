import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cx } from 'ui/lib';

import type { CreateVirtanceForm } from '@/widgets/virtance-create/types';

import { Distribution } from '../types';

export function DistributionCard({
  distribution,
  isActive,
  isDisabled,
  onDistributionChange,
  onImageChange,
}: {
  distribution: { slug: string; name: string; images: Distribution[] };
  isActive: boolean;
  isDisabled: boolean;
  onDistributionChange: (distribution: {
    slug: string;
    name: string;
    images: Distribution[];
  }) => void;
  onImageChange: (image: Distribution) => void;
}) {
  const { control } = useFormContext<CreateVirtanceForm>();

  function handleImageChange(e: ChangeEvent<HTMLSelectElement>) {
    const image = distribution.images.find(
      (image) => image.status === 'available' && image.slug === e.target.value,
    );

    if (!image) return;

    onImageChange(image);
  }

  return (
    <div
      onClick={() => onDistributionChange(distribution)}
      className={cx([
        'flex w-full justify-between gap-4 rounded-md border p-4',
        isActive ? 'border-sky-500 ring-1 ring-sky-500 dark:border-sky-500' : '',
        isDisabled
          ? 'cursor-not-allowed bg-neutral-100 grayscale dark:border-neutral-800 dark:bg-neutral-800/30'
          : 'cursor-pointer bg-white dark:border-neutral-700 dark:bg-neutral-900',
      ])}
    >
      <Controller
        control={control}
        name="distribution"
        render={() => (
          <div className="flex flex-1 items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <img
                className="h-8 w-8"
                src={
                  new URL(
                    `/src/shared/assets/images/os/${distribution.slug}.svg`,
                    import.meta.url,
                  ).href
                }
                alt={`Logo of ${distribution.name}`}
              />
              <div className="font-medium">{distribution.name}</div>
            </div>
            {isDisabled ? null : (
              <div>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <select
                      value={
                        distribution.images.some((i) => i.slug === field.value.id)
                          ? field.value.id
                          : ''
                      }
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.preventDefault();
                        handleImageChange(e);
                      }}
                      className="h-8 min-w-[150px] rounded-lg border border-neutral-300 bg-neutral-100 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                    >
                      <option value={''} disabled>
                        Select version
                      </option>
                      {distribution.images.map((image) => (
                        <option
                          key={image.slug}
                          value={image.slug}
                          disabled={image.status !== 'available'}
                        >
                          {image.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
