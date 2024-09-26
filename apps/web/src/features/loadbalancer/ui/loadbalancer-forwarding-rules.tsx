import { ChevronsRightIcon, Trash2Icon } from 'lucide-react';
import { ChangeEvent, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

function LoadbalancerForwardingRule({
  index,
  onRemove,
  isRemovable,
}: {
  index: number;
  onRemove: (index: number) => void;
  isRemovable: boolean;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const entryProtocol = watch(`forwarding_rules.${index}.entry_protocol`);

  const targetProtocolOptions = useMemo(() => {
    switch (entryProtocol) {
      case 'http':
      case 'https':
        return ['http', 'https'];
      case 'http2':
        return ['http', 'http2'];
      case 'http3':
        return ['http', 'https', 'http2'];
      case 'tcp':
        return ['tcp'];
      case 'udp':
        return ['udp'];
      default:
        return [];
    }
  }, [entryProtocol]);

  return (
    <li className="flex items-end p-4">
      <div className="flex items-center gap-2">
        <div className="flex shrink-0 flex-col gap-2">
          <Label htmlFor={`forwarding_rules.${index}.entry_protocol`}>Protocol</Label>
          <select
            id={`forwarding_rules.${index}.entry_protocol`}
            {...register(`forwarding_rules.${index}.entry_protocol`)}
            className="border-border h-10 w-28 rounded-md border bg-transparent"
          >
            <option value="http3">HTTP3</option>
            <option value="http2">HTTP2</option>
            <option value="https">HTTPS</option>
            <option value="http">HTTP</option>
            <option value="tcp">TCP</option>
            <option value="udp">UDP</option>
          </select>
        </div>
        <div className="flex w-32 shrink-0 flex-col gap-2">
          <span className="text-sm font-medium leading-none">Certificate</span>
          <Button type="button" disabled>
            {entryProtocol === 'https' ||
            entryProtocol === 'http2' ||
            entryProtocol === 'http3'
              ? 'Passthrough'
              : 'None'}
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor={`forwarding_rules.${index}.entry_port`}
            className="flex items-center justify-between"
          >
            Port
            {errors.forwarding_rules?.[index]?.entry_port && (
              <p className="text-red-500">
                {errors.forwarding_rules[index].entry_port.message}
              </p>
            )}
          </Label>
          <Input
            id={`forwarding_rules.${index}.entry_port`}
            placeholder="Entry port"
            {...register(`forwarding_rules.${index}.entry_port`)}
          />
        </div>
      </div>
      <div className="flex w-40 shrink-0 items-center justify-center pb-2">
        <ChevronsRightIcon className="text-muted-foreground h-6 w-6" />
      </div>
      <div className="flex items-end gap-2">
        <div className="flex shrink-0 flex-col gap-2">
          <Label htmlFor={`forwarding_rules.${index}.target_protocol`}>Protocol</Label>
          <select
            {...register(`forwarding_rules.${index}.target_protocol`)}
            className="border-border h-10 w-28 rounded-md border bg-transparent"
            disabled={targetProtocolOptions.length === 1}
          >
            {targetProtocolOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor={`forwarding_rules.${index}.target_port`}
            className="flex items-center justify-between"
          >
            Port
            {errors.forwarding_rules?.[index]?.target_port && (
              <p className="text-red-500">
                {errors.forwarding_rules[index].target_port.message}
              </p>
            )}
          </Label>
          <Input
            id={`forwarding_rules.${index}.target_port`}
            placeholder="Target port"
            {...register(`forwarding_rules.${index}.target_port`)}
          />
        </div>
        <Button
          size="icon"
          className="shrink-0"
          variant="outline"
          type="button"
          disabled={!isRemovable}
          onClick={() => onRemove(index)}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}

export function LoadbalancerForwardingRules() {
  const [createSelectValue, setCreateSelectValue] = useState('default');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'forwarding_rules',
  });

  function addNewField(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    append({
      entry_protocol: value,
      entry_port: '',
      target_protocol: value,
      target_port: '',
    });

    setCreateSelectValue('default');
  }
  return (
    <div className="rounded-lg border">
      <div className="bg-muted flex items-center rounded-t-lg border-b px-4 py-2 text-base font-medium">
        <div className="flex-1">Load balancer</div>
        <div className="w-40"></div>
        <div className="flex-1">Virtance</div>
      </div>
      <ul className="divide-y">
        {fields.map((_, index) => (
          <LoadbalancerForwardingRule
            key={index}
            index={index}
            onRemove={remove}
            isRemovable={fields.length > 1}
          />
        ))}
        <li className="flex items-end p-4">
          <div>
            <select
              className="border-border h-10 w-40 rounded-md border bg-transparent"
              value={createSelectValue}
              onChange={addNewField}
            >
              <option disabled value="default">
                Add new rule
              </option>
              <option value="http3">HTTP3</option>
              <option value="http2">HTTP2</option>
              <option value="https">HTTPS</option>
              <option value="http">HTTP</option>
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
            </select>
          </div>
        </li>
      </ul>
    </div>
  );
}
