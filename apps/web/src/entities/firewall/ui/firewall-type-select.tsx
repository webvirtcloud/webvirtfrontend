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
      className="border-border/70 bg-muted/50 h-8 rounded-lg border py-1 text-sm"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
