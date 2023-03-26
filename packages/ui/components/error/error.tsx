import { ReactNode } from 'react';
import { cx } from '../../lib';

export function Error({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('text-sm text-red-700 dark:text-red-500', className)}>
      {children}
    </div>
  );
}
