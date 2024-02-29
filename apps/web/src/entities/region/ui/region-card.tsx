import MapPinIcon from '@heroicons/react/20/solid/MapPinIcon';
import { cx } from 'ui/lib';

import type { Region } from '../types';

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
        'flex w-full cursor-pointer items-center gap-4 rounded-md border p-4 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500 dark:border-neutral-700 dark:disabled:bg-neutral-800',
        isActive ? 'border-sky-500 ring-1 ring-sky-500' : '',
      ])}
    >
      <MapPinIcon className="h-7 w-7 shrink-0 text-neutral-500" />
      <div className="font-medium">{region.name}</div>
    </button>
  );
}
