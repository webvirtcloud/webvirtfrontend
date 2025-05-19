import { type ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';
import { SelectNative } from 'ui/components/select-native';

import {
  type FirewallInboundRule,
  type FirewallOutboundRule,
  calculateType,
  FirewallAddressInput,
  FirewallTypeSelect,
  InboundTypeOptions,
  OutboundTypeOptions,
} from '@/entities/firewall';

const regex =
  /^(((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|1[0-9]|2[0-8]|3[0-2])){0,1}){0,1}((\s*,\s*)(?=[^,])){0,1})+$/;

interface FirewallRuleProps {
  rule: FirewallInboundRule | FirewallOutboundRule;
  onUpdateRule: (payload: {
    inbound_rules?: FirewallInboundRule[];
    outbound_rules?: FirewallOutboundRule[];
  }) => Promise<void>;
  alwaysEditor?: boolean;
  onDeleteRule?: (payload) => void;
}

export function FirewallRule({
  rule,
  onUpdateRule,
  alwaysEditor = false,
  onDeleteRule,
}: FirewallRuleProps) {
  const [isEditor, setIsEditor] = useState(alwaysEditor);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    resetField,
    formState: { errors },
  } = useForm<{
    protocol: string;
    addresses: string[];
    ports: string;
    type: string;
  }>({
    defaultValues: {
      type: calculateType(rule),
      protocol: rule.protocol,
      ports: rule.ports,
      addresses: 'sources' in rule ? rule.sources.addresses : rule.destinations.addresses,
    },
  });

  const type = watch('type');
  const protocol = watch('protocol');
  const ports = watch('ports');

  const handleSaveRule = handleSubmit(async (data) => {
    await onUpdateRule({
      ...('sources' in rule
        ? {
            inbound_rules: [
              {
                protocol: data.protocol,
                ports: data.ports,
                sources: { addresses: data.addresses },
              },
            ],
          }
        : {
            outbound_rules: [
              {
                protocol: data.protocol,
                ports: data.ports,
                destinations: { addresses: data.addresses },
              },
            ],
          }),
    });

    if (!alwaysEditor) {
      setIsEditor(false);
    }

    reset();
  });

  function handleDelete() {
    onDeleteRule?.({
      ...('sources' in rule ? { inbound_rules: [rule] } : { outbound_rules: [rule] }),
    });
  }

  function onTypeValueChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue('type', e.target.value);

    if (e.target.value === 'HTTP') {
      setValue('ports', '80');
      setValue('protocol', 'tcp');
    }

    if (e.target.value === 'HTTPS') {
      setValue('ports', '443');
      setValue('protocol', 'tcp');
    }

    if (e.target.value === 'SSH') {
      setValue('ports', '22');
      setValue('protocol', 'ssh');
    }

    if (e.target.value === 'All ICMP') {
      setValue('ports', '0');
      setValue('protocol', 'icmp');
    }

    if (e.target.value === 'All UDP') {
      setValue('ports', '0');
      setValue('protocol', 'udp');
    }

    if (e.target.value === 'All TCP') {
      setValue('ports', '0');
      setValue('protocol', 'tcp');
    }

    if (e.target.value === 'Custom') {
      setValue('ports', '8000');
      setValue('protocol', 'tcp');
    }
  }

  function startEdit() {
    setIsEditor(true);
  }

  function cancelEdit() {
    setIsEditor(false);
    reset();
  }

  return (
    <tr>
      <td className="px-4 py-2.5">
        {isEditor ? (
          <FirewallTypeSelect
            options={'sources' in rule ? InboundTypeOptions : OutboundTypeOptions}
            value={type}
            onTypeValueChange={onTypeValueChange}
          />
        ) : (
          calculateType(rule)
        )}
      </td>
      <td className="px-4 py-2.5">
        {isEditor && type === 'Custom' ? (
          <Controller
            control={control}
            name="protocol"
            render={({ field }) => (
              <SelectNative
                {...field}
                onChange={(e) => {
                  if (e.target.value === 'icmp') {
                    resetField('ports', { defaultValue: '' });
                  }
                  setValue('protocol', e.target.value);
                }}
                className="min-w-24"
              >
                {['tcp', 'udp', 'icmp'].map((option) => (
                  <option key={option} value={option}>
                    {option.toUpperCase()}
                  </option>
                ))}
              </SelectNative>
            )}
          />
        ) : (
          protocol?.toUpperCase()
        )}
      </td>
      <td className="px-4 py-2.5">
        {isEditor && type === 'Custom' ? (
          <>
            <Input
              {...register('ports', {
                required: {
                  value: type === 'Custom' && protocol !== 'icmp',
                  message: 'Port is required',
                },
              })}
              disabled={protocol === 'icmp'}
              error={!!errors.ports?.message}
            />
          </>
        ) : ports === '0' ? (
          'All'
        ) : (
          ports
        )}
      </td>
      <td className="w-[400px] px-4 py-2.5">
        {isEditor ? (
          <Controller
            name="addresses"
            rules={{
              required: {
                value: true,
                message: 'At least one address should be defined',
              },
              validate: (data) =>
                data.every((item) => regex.test(item)) || 'Invalid address',
            }}
            control={control}
            render={({ field }) => (
              <FirewallAddressInput
                ref={field.ref}
                value={field.value}
                onValueChange={field.onChange}
                error={!!errors.addresses}
              />
            )}
          />
        ) : (
          <ul className="flex flex-wrap items-start gap-1">
            {'sources' in rule &&
              rule.sources.addresses.map((address) => (
                <li className="rounded bg-zinc-100 px-2 dark:bg-zinc-700" key={address}>
                  {address === '0.0.0.0/0' ? 'All Traffic' : address}
                </li>
              ))}
            {'destinations' in rule &&
              rule.destinations.addresses.map((address) => (
                <li className="rounded bg-zinc-100 px-2 dark:bg-zinc-700" key={address}>
                  {address === '0.0.0.0/0' ? 'All Traffic' : address}
                </li>
              ))}
          </ul>
        )}
        {errors.addresses && <Error>{errors.addresses.message}</Error>}
      </td>
      <td className="px-4 py-2.5">
        <div className="flex justify-end gap-2">
          {isEditor ? (
            <>
              <Button size={'sm'} variant="default" onClick={handleSaveRule}>
                Save
              </Button>
              {!alwaysEditor && (
                <Button size={'sm'} variant="destructive" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </>
          ) : (
            <>
              <Button size={'sm'} variant="outline" onClick={startEdit}>
                Edit
              </Button>
              <Button size={'sm'} onClick={handleDelete} variant="destructive">
                Delete
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
