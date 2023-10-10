import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { TagInput } from 'ui/components/tag-input';

const ALL_PORTS_ADDRESS = '0.0.0.0/0';
const ALL_PORTS_LABEL = 'All Traffic';

export const FirewallAddressInput = forwardRef<
  ElementRef<typeof TagInput>,
  ComponentPropsWithoutRef<typeof TagInput>
>(({ value, onValueChange, ...props }, ref) => {
  const [addresses, setAddresses] = useState<string[]>(
    value.length === 1 && value[0] === ALL_PORTS_ADDRESS ? [ALL_PORTS_LABEL] : value,
  );

  const isDisabled = addresses.length === 1 && addresses[0] === ALL_PORTS_LABEL;

  function onAddressesValueChange(data: string[]) {
    if (data.length === 0) {
      setAddresses([]);
      onValueChange([]);
      return;
    }

    if (data.includes(ALL_PORTS_ADDRESS)) {
      setAddresses([ALL_PORTS_LABEL]);
      onValueChange([ALL_PORTS_ADDRESS]);
      return;
    }

    setAddresses(data);
    onValueChange(data);
  }

  useEffect(() => {
    if (value.length === 1 && value[0] === ALL_PORTS_ADDRESS) {
      setAddresses([ALL_PORTS_LABEL]);
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
      {!value.includes(ALL_PORTS_ADDRESS) && (
        <button
          className="mt-1 rounded bg-zinc-200 px-2 dark:bg-zinc-700"
          onClick={() => onValueChange([ALL_PORTS_ADDRESS])}
          type="button"
        >
          All Traffic
        </button>
      )}
    </div>
  );
});

FirewallAddressInput.displayName = 'FirewallAddressInput';
