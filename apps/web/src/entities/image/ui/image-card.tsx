import CircleStackIcon from '@heroicons/react/20/solid/CircleStackIcon';
import { cx } from 'ui/lib';

export function ImageCard({
  name,
  description,
  isActive,
  isDisabled,
  onClick,
}: {
  name: string;
  description: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cx([
        'flex w-full items-center gap-2 rounded-md border p-4 text-start',
        isActive ? 'border-sky-500 ring-1 ring-sky-500' : '',
        isDisabled
          ? 'cursor-not-allowed bg-neutral-100 grayscale dark:border-neutral-800 dark:bg-neutral-800/30'
          : 'cursor-pointer bg-white dark:border-neutral-700 dark:bg-neutral-900',
      ])}
    >
      <CircleStackIcon className="text-muted-foreground h-7 w-7 shrink-0" />
      <div className="min-w-0">
        <div className="truncate font-medium">{name}</div>
        <div className="text-muted-foreground">{description}</div>
      </div>
    </button>
  );
}
