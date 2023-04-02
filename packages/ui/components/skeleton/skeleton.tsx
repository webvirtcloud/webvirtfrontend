import { HTMLAttributes } from 'react';
import { cx } from '../../lib';

export function Skeleton({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'h-8 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800',
        className,
      )}
    ></div>
  );
}
