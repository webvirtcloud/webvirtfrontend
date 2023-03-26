import { cx } from 'ui/lib';

interface Props {
  isActive: boolean;
  onClick: () => void;
  region: any;
}

export function RegionCard({ isActive, region, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cx([
        'flex w-full cursor-pointer justify-between gap-4 rounded-md border p-4 dark:border-neutral-700',
        isActive ? 'border-sky-500 ring-1 ring-sky-500' : '',
      ])}
    >
      <div className="font-medium">{region.name}</div>
    </div>
  );
}
