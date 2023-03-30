import { cx } from 'ui/lib';
import { Size } from '../types';

interface Props {
  isActive: boolean;
  onClick: () => void;
  size: Size;
}

export function SizeCard({ size, isActive, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={!size.available}
      onClick={onClick}
      className={cx([
        'flex w-full cursor-pointer justify-between gap-4 rounded-md border p-4 disabled:cursor-not-allowed disabled:text-neutral-500 dark:border-neutral-700',
        isActive ? 'border-sky-500 ring-1 ring-sky-500' : '',
      ])}
    >
      <div className="flex flex-1 justify-between gap-8">
        <div className="flex w-24 flex-col items-center justify-center border-r dark:border-neutral-700">
          <div className="text-xl font-medium">{size.price_monthly}$</div>
          <div className="text-xs text-neutral-500">{size.description}</div>
        </div>
        <ul className="space-y-2 text-end">
          <li>
            <span className="font-medium">{size.vcpu}</span>{' '}
            <span className="text-neutral-500">vCPU</span>
          </li>
          <li>
            <span className="font-medium">{size.memory}</span>{' '}
            <span className="text-neutral-500">Memory</span>
          </li>
          <li>
            <span className="font-medium">{size.disk}</span>{' '}
            <span className="text-neutral-500">Disk</span>
          </li>
        </ul>
      </div>
    </button>
  );
}
