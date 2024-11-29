import { cx } from 'ui/lib';

import { type Size } from '@/entities/size';
import { IS_DISPLAY_PRICES_ENABLED } from '@/shared/constants';
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
        'disabled:text-muted-foreground disabled:bg-muted/50 bg-card flex w-full cursor-pointer justify-between gap-4 rounded-md border p-4 disabled:cursor-not-allowed',
        isActive ? 'ring-ring border-ring ring-1' : '',
      ])}
    >
      <div className="flex flex-1 justify-between gap-8">
        <div className="flex w-28 flex-col items-start justify-center border-r pl-2">
          <div className={cx(['text-lg font-medium', isActive ? 'text-ring' : ''])}>
            {size.description}
          </div>
          {IS_DISPLAY_PRICES_ENABLED && (
            <div className="text-muted-foreground text-base">${size.price_monthly}</div>
          )}
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
