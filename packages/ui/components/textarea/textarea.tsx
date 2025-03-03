import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../lib';

const inputVariants = cva(
  'w-full text-sm px-2 transition-all shadow-sm border border-border rounded-lg bg-muted/50 focus:bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-ring/30 focus:border-ring',
  {
    variants: {
      error: {
        true: 'border-red-600 focus:ring-1 focus:border-red-600 focus:ring-red-600 bg-red-50 placeholder:text-red-700 dark:bg-red-300/5 dark:border-red-500  dark:focus:ring-red-500 dark:placeholder:text-red-500',
      },
    },
  },
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cx(inputVariants({ error, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
