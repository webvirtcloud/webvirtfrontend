import { useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';

export function VirtanceCreateOverview() {
  const { watch } = useFormContext();

  const image = watch('image');
  const distribution = watch('distribution');
  const region = watch('region');
  const size = watch('size');

  return (
    <div className="sticky top-[120px] left-0 right-0 mb-16 flex flex-col justify-between gap-4 rounded-md border bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 md:flex-row md:items-center md:gap-0">
      <div>
        <div className="flex items-center space-x-2">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
            <img
              className="h-8 w-8"
              src={
                new URL(
                  `/src/shared/assets/images/os/${distribution.slug}.svg`,
                  import.meta.url,
                ).href
              }
              alt={`Logo of Ubuntu`}
            />
          </div>
          <div className="space-y-0.5">
            <h3 className="font-medium">
              {distribution.name} {image.name}
            </h3>
            <p className="text-sm text-neutral-500">
              {size.memory}GB DDR4 / {size.disk}GB SSD / {region.name}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <span className="text-xl font-medium">${size.price_monthly}</span>
          <span className="text-neutral-500">/mo</span>
        </div>
        <Button type="submit">Deploy server</Button>
      </div>
    </div>
  );
}
