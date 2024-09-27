import {
  ArrowDownToDotIcon,
  ArrowUpFromDotIcon,
  ChevronsRightIcon,
  Trash2Icon,
} from 'lucide-react';
import { ChangeEvent, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';

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
    <tr className="align-top">
      <td className="p-2 pl-3">
        <select
          id={`forwarding_rules.${index}.entry_protocol`}
          {...register(`forwarding_rules.${index}.entry_protocol`)}
          className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
        >
          <option value="http3">HTTP3</option>
          <option value="http2">HTTP2</option>
          <option value="https">HTTPS</option>
          <option value="http">HTTP</option>
          <option value="tcp">TCP</option>
          <option value="udp">UDP</option>
        </select>
      </td>
      <td className="p-2">
        {/* <span className="text-sm font-medium leading-none">Certificate</span> */}
        <Button type="button" disabled className="w-full">
          {entryProtocol === 'https' ||
          entryProtocol === 'http2' ||
          entryProtocol === 'http3'
            ? 'Passthrough'
            : 'No certificate'}
        </Button>
      </td>
      <td className="p-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-l-md border border-r-0">
              <ArrowUpFromDotIcon className="h-4 w-4" />
            </div>
            <Input
              id={`forwarding_rules.${index}.entry_port`}
              placeholder="Entry port"
              className="rounded-l-none"
              {...register(`forwarding_rules.${index}.entry_port`)}
            />
          </div>
          {errors.forwarding_rules?.[index]?.entry_port && (
            <p className="font-medium text-red-500">
              {errors.forwarding_rules[index].entry_port.message}
            </p>
          )}
        </div>
      </td>
      <td className="p-2">
        <ChevronsRightIcon className="text-muted-foreground mx-auto h-6 w-6" />
      </td>
      <td className="p-2">
        {/* <Label htmlFor={`forwarding_rules.${index}.target_protocol`}>Protocol</Label> */}
        <select
          {...register(`forwarding_rules.${index}.target_protocol`)}
          className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
          disabled={targetProtocolOptions.length === 1}
        >
          {targetProtocolOptions.map((option) => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2">
        <div className="flex items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-l-md border border-r-0">
            <ArrowDownToDotIcon className="h-4 w-4" />
          </div>
          <Input
            id={`forwarding_rules.${index}.target_port`}
            placeholder="Target port"
            className="rounded-l-none"
            {...register(`forwarding_rules.${index}.target_port`)}
          />
        </div>
      </td>
      <td className="p-2">
        <Button
          size="icon"
          className=""
          variant="outline"
          type="button"
          disabled={!isRemovable}
          onClick={() => onRemove(index)}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </td>
    </tr>
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
    <div className="overflow-x-auto rounded-lg border text-sm">
      <table className="w-full table-fixed border-collapse rounded-lg border-hidden">
        <thead className="">
          <tr className="bg-muted border">
            <th className="p-2 pl-3 text-start" colSpan={3}>
              Load balancer
            </th>
            <th className="p-2 text-start"></th>
            <th className="p-2 text-start">Virtance</th>
            <th className="p-2 text-start"></th>
            <th className="p-2 text-start"></th>
          </tr>
          {/* <div className="">Load balancer</div>
        <div className=""></div>
        <div className="">Virtance</div> */}
        </thead>
        <tbody className="divide-y">
          {fields.map((_, index) => (
            <LoadbalancerForwardingRule
              key={index}
              index={index}
              onRemove={remove}
              isRemovable={fields.length > 1}
            />
          ))}
          <tr>
            <td className="p-2 pl-3">
              <select
                className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
                value={createSelectValue}
                onChange={addNewField}
              >
                <option disabled value="default">
                  New rule
                </option>
                <option value="http3">HTTP3</option>
                <option value="http2">HTTP2</option>
                <option value="https">HTTPS</option>
                <option value="http">HTTP</option>
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
              </select>
            </td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
