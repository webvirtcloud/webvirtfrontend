import { HTMLAttributes } from 'react';
import { cx } from 'ui/lib';
import { cva, VariantProps } from 'class-variance-authority';

const statusDotWrapper = cva('relative flex', {
  variants: {
    size: {
      default: 'h-2.5 w-2.5',
    },
  },
});

const statusDot = cva('relative inline-flex rounded-full', {
  variants: {
    status: {
      active: 'bg-green-500',
      pending: 'bg-yellow-500',
      inactive: 'bg-red-500',
    },
    size: {
      default: 'h-2.5 w-2.5',
    },
  },
  defaultVariants: {
    status: 'active',
    size: 'default',
  },
});

const statusDotOuter = cva(
  'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
  {
    variants: {
      status: {
        active: 'bg-green-400',
        pending: 'bg-yellow-400',
        inactive: 'bg-red-400',
      },
    },
  },
);

export interface StatusDotProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDot> {}

export function StatusDot({ status, size }: StatusDotProps) {
  return (
    <span className={statusDotWrapper({ size })}>
      {status === 'inactive' ? null : (
        <span className={cx(statusDotOuter({ status }))}></span>
      )}
      <span className={cx(statusDot({ status, size }))}></span>
    </span>
  );
}
