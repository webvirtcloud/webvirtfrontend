import type { ComponentProps } from 'react';
import { cx } from 'ui/lib';

export function Steps({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cx(
        'steps mb-12 ml-4 border-l border-gray-200 pl-6',
        '[counter-reset:step] dark:border-neutral-800',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
