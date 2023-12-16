import { type ChangeEvent } from 'react';

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
    <select
      value={value}
      disabled={disabled}
      onChange={onTypeValueChange}
      className="h-8 rounded-lg border border-neutral-300 bg-neutral-100 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
