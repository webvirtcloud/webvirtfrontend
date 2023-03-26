import * as LabelPrimitive from '@radix-ui/react-label';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';
import { cx } from '../../lib';

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cx(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;
