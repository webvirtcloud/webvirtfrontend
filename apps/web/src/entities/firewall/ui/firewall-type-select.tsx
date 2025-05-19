import { type ChangeEvent } from 'react';
import { SelectNative } from 'ui/components/select-native';

export const InboundTypeOptions = [
  'SSH',
  'HTTP',
  'HTTPS',
  'All TCP',
  'All UDP',
  'All ICMP',
  'Custom',
] as const;

export const OutboundTypeOptions = ['All TCP', 'All UDP', 'All ICMP', 'Custom'] as const;

export interface FirewallTypeSelectProps {
  value?: string;
  disabled?: boolean;
  readonly options: typeof InboundTypeOptions | typeof OutboundTypeOptions;
  onTypeValueChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function FirewallTypeSelect({
  value,
  onTypeValueChange,
  disabled,
  options,
}: FirewallTypeSelectProps) {
  return (
    <SelectNative
      value={value}
      disabled={disabled}
      onChange={onTypeValueChange}
      className="min-w-28"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </SelectNative>
  );
}
