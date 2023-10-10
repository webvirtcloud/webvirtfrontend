import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { FocusEvent, forwardRef, useState } from 'react';
import { cx } from '../../lib';

export interface TagInputProps {
  readonly value: string[];
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  onValueChange: (value: string[]) => void;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onValueChange, disabled, placeholder = '', error }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    function onFocus() {
      setIsFocused(true);
    }

    function onBlur(e: FocusEvent<HTMLInputElement, Element>) {
      setIsFocused(false);
      e.currentTarget.value = '';
    }

    function onkeydown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (
        e.key === 'Enter' &&
        // prevent empty values
        e.currentTarget.value !== '' &&
        // prevent duplicates
        !value.includes(e.currentTarget.value)
      ) {
        e.preventDefault();
        onValueChange([...value, e.currentTarget.value]);
        e.currentTarget.value = '';
      }
      if (e.key === 'Backspace' && e.currentTarget.value === '') {
        onValueChange(value.slice(0, value.length - 1));
      }
    }

    function remove(item: string) {
      onValueChange(value.filter((i) => i !== item));
    }

    return (
      <div
        className={cx([
          'flex min-h-[32px] flex-wrap items-start rounded-lg border bg-neutral-100 p-1 text-sm dark:bg-neutral-800',
          isFocused
            ? error
              ? 'border-red-500 ring-2 ring-red-500/30'
              : 'border-sky-500 ring-2 ring-sky-500/30'
            : 'border-neutral-300 dark:border-neutral-700',
        ])}
      >
        <ul className="flex flex-1 flex-wrap items-center gap-1">
          {value.map((item, i) => (
            <li
              className="flex items-center gap-1 rounded bg-zinc-200 px-2 py-px dark:bg-zinc-700"
              key={item + i}
            >
              <span>{item}</span>
              <button onClick={() => remove(item)} type="button">
                <XMarkIcon className="h-3 w-3" />
              </button>
            </li>
          ))}
          <li className="flex-1">
            <input
              ref={ref}
              type="text"
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onkeydown}
              disabled={disabled}
              placeholder={disabled ? '' : placeholder}
              className="w-full min-w-[40px] appearance-none border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
            />
          </li>
        </ul>
      </div>
    );
  },
);

TagInput.displayName = 'TagInput';
