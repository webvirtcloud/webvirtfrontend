import { cx } from 'ui/lib';

import { type Size } from '@/entities/size';
import { formatMemorySize } from '@/shared/lib';

interface Props {
  isActive: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  size: Size;
}

export function SizeCard({ size, isActive, isDisabled, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={cx([
        'disabled:text-muted-foreground flex w-full cursor-pointer justify-between gap-4 rounded-md border p-4 disabled:cursor-not-allowed disabled:bg-neutral-100 dark:border-neutral-700 dark:disabled:bg-neutral-800',
        isActive ? 'ring-ring border-ring ring-1' : '',
      ])}
    >
      <div className="flex flex-1 justify-between gap-8">
        <div className="flex w-28 flex-col items-start justify-center border-r pl-2 dark:border-neutral-700">
          <div className={cx(['text-lg font-medium', isActive ? 'text-sky-500' : ''])}>
            {size.description}
          </div>
          <div className="text-muted-foreground text-base">${size.price_monthly}</div>
        </div>
        <ul className="space-y-2 text-end">
          <li>
            <span className="font-medium">{size.vcpu}</span>{' '}
            <span className="text-muted-foreground">CPU</span>
          </li>
          <li>
            <span className="font-medium">{formatMemorySize(size.memory)}</span>{' '}
            <span className="text-muted-foreground">Memory</span>
          </li>
          <li>
            <span className="font-medium">{size.disk}GB</span>{' '}
            <span className="text-muted-foreground">Disk</span>
          </li>
        </ul>
      </div>
    </button>
  );
}
