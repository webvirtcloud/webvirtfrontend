import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { TagInput } from 'ui/components/tag-input';

export const FirewallAddressInput = forwardRef<
  ElementRef<typeof TagInput>,
  ComponentPropsWithoutRef<typeof TagInput>
>(({ value, onValueChange, ...props }, ref) => {
  const [addresses, setAddresses] = useState<string[]>(
    value.length === 1 && value[0] === '0.0.0.0/0' ? ['All Traffic'] : value,
  );

  const isDisabled = addresses.length === 1 && addresses[0] === 'All Traffic';

  function onAddressesValueChange(data: string[]) {
    if (data.length === 0) {
      setAddresses([]);
      onValueChange([]);
      return;
    }
    if (data.includes('0.0.0.0/0')) {
      setAddresses(['All Traffic']);
      onValueChange(['0.0.0.0/0']);
      return;
    }
    console.log('input data', data);
    setAddresses(data);
    onValueChange(data);
  }

  useEffect(() => {
    if (value.length === 1 && value[0] === '0.0.0.0/0') {
      setAddresses(['All Traffic']);
    }
  }, [value]);

  return (
    <div>
      <TagInput
        ref={ref}
        value={addresses}
        onValueChange={onAddressesValueChange}
        disabled={isDisabled}
        {...props}
        placeholder="Enter your addresses"
      />
      {!value.includes('0.0.0.0/0') && (
        <button
          className="mt-1 rounded bg-zinc-200 px-2 dark:bg-zinc-700"
          onClick={() => onValueChange(['0.0.0.0/0'])}
          type="button"
        >
          All Traffic
        </button>
      )}
    </div>
  );
});

FirewallAddressInput.displayName = 'FirewallAddressInput';
