import { forwardRef, InputHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cx } from '../../lib';

const inputVariants = cva(
  'w-full text-sm px-3 transition-all shadow-sm disabled:shadow-none border border-border rounded-md bg-muted/50 focus:bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-ring/30 focus:border-ring h-10',
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
