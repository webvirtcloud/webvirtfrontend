import CircleStackIcon from '@heroicons/react/20/solid/CircleStackIcon';
import { useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';

import { formatMemorySize } from '@/shared/lib';

import type { CreateVirtanceForm } from '../types';

export function VirtanceCreateOverview() {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext<CreateVirtanceForm>();

  const image = watch('image');
  const distribution = watch('distribution');
  const region = watch('region');
  const size = watch('size');

  return (
    <div className="sticky left-0 right-0 top-[120px] z-10 mb-16 flex flex-col justify-between gap-4 rounded-md border bg-white p-4 shadow-lg md:flex-row md:items-center md:gap-0 dark:border-neutral-700 dark:bg-neutral-900">
      <div>
        {distribution ? (
          <div className="flex items-center space-x-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
              <img
                className="h-8 w-8"
                src={
                  new URL(
                    `/src/shared/assets/images/os/${distribution}.svg`,
                    import.meta.url,
                  ).href
                }
                alt={`Logo of ${distribution}`}
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-medium">{image.name}</h3>
              <p className="text-sm text-neutral-500">
                {formatMemorySize(size.memory)} DDR4 / {size.disk}GB SSD / {region.name}
              </p>
            </div>
          </div>
        ) : null}
        {image.type === 'snapshot' || image.type === 'backup' ? (
          <div className="flex items-center space-x-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
              <CircleStackIcon className="h-8 w-8" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-medium">{image.name}</h3>
              <p className="text-sm text-neutral-500">{image.description}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-center space-x-4">
        {size ? (
          <div>
            <span className="text-xl font-medium">${size.price_monthly}</span>
            <span className="text-neutral-500">/mo</span>
          </div>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Deploying...' : 'Deploy server'}
        </Button>
      </div>
    </div>
  );
}
