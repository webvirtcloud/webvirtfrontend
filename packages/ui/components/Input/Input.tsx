import { forwardRef, InputHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cx } from '../../lib';

const inputVariants = cva(
  'w-full text-sm px-2 transition-all border border-neutral-300 rounded-lg bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 focus:bg-transparent placeholder:text-neutral-500 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 h-8',
  {
    variants: {
      error: {
        true: 'border-red-600 focus:ring-1 focus:border-red-600 focus:ring-red-600 bg-red-50 placeholder:text-red-700 dark:bg-red-300/5 dark:border-red-500  dark:focus:ring-red-500 dark:placeholder:text-red-500',
      },
    },
  },
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input className={cx(inputVariants({ error, className }))} ref={ref} {...props} />
    );
  },
);

Input.displayName = 'Input';
