import type * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cx } from '../../lib';
import { forwardRef } from 'react';

const SelectNative = forwardRef<HTMLSelectElement, React.ComponentProps<'select'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative flex">
        <select
          ref={ref}
          data-slot="select-native"
          className={cx(
            'border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer inline-flex w-full cursor-pointer appearance-none items-center rounded-md border text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            props.multiple
              ? '[&_option:checked]:bg-accent py-1 *:px-3 *:py-1'
              : 'h-9 pe-8 ps-3',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {!props.multiple && (
          <span className="text-muted-foreground/80 peer-aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
            <ChevronDownIcon size={16} aria-hidden="true" />
          </span>
        )}
      </div>
    );
  },
);

SelectNative.displayName = 'SelectNative';

export { SelectNative };
