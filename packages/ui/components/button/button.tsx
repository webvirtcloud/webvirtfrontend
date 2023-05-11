import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cx } from '../../lib';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg disabled:bg-neutral-100 dark:disabled:bg-neutral-800 bg:text-neutral-300 font-semibold transition-colors focus:ring-2 focus:ring-sky-500/30 disabled:text-neutral-500 focus:border-sky-500 outline-none',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300',
        secondary:
          'border bg-white dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 hover:bg-neutral-50',
        destructive:
          'border dark:border-neutral-700 hover:bg-red-50 hover:border-red-400 dark:hover:bg-red-300/10 dark:hover:border-red-500',
      },
      size: {
        default: 'h-8 px-4',
        sm: 'h-7 px-3 text-xs rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', children, type = 'button', size, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(buttonVariants({ variant, size, className }))}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
