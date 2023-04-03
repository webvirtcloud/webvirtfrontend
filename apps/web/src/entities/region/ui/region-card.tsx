import { cx } from 'ui/lib';
import type { Region } from '../types';
import { RegionCountries } from '../enums';

interface Props {
  isActive: boolean;
  onClick: () => void;
  region: Region;
}

export function RegionCard({ isActive, region, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={!region.available}
      onClick={onClick}
      className={cx([
        'flex w-full cursor-pointer items-center gap-4 rounded-md border p-4 disabled:cursor-not-allowed disabled:text-neutral-500 dark:border-neutral-700',
        isActive ? 'border-sky-500 ring-1 ring-sky-500' : '',
      ])}
    >
      <img
        src={
          new URL(
            `/src/shared/assets/images/countries/${RegionCountries[region.slug]}.svg`,
            import.meta.url,
          ).href
        }
        className={cx(!region.available && 'grayscale')}
        width={32}
        height={32}
        alt=""
      />
      <div className="font-medium">{region.name}</div>
    </button>
  );
}
