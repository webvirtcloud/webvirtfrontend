import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cx } from 'ui/lib';

export function DistributionCard({
  distribution,
  isActive,
  onDistributionChange,
  onImageChange,
}) {
  const { control } = useFormContext();

  function handleImageChange(e: ChangeEvent<HTMLSelectElement>) {
    onImageChange(distribution.images.find((image) => image.slug === e.target.value));
  }

  return (
    <div
      onClick={() => onDistributionChange(distribution)}
      className={cx([
        'flex w-full cursor-pointer justify-between gap-4 rounded-md border bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900',
        isActive ? 'border-sky-500 ring-1 ring-sky-500' : '',
      ])}
    >
      <Controller
        control={control}
        name="distribution"
        render={() => (
          <div className="flex flex-1 items-center justify-between gap-2">
            <div className="flex items-center gap-2">
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
            <div>
              <Controller
                render={({ field }) => (
                  <select
                    value={field.value.slug}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={handleImageChange}
                    className="h-8 rounded-lg border border-neutral-300 bg-neutral-100 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    {distribution.images.map((image) => (
                      <option key={image.slug} value={image.slug}>
                        {image.name}
                      </option>
                    ))}
                  </select>
                )}
                control={control}
                name="image"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
