import ChevronRightIcon from '@heroicons/react/20/solid/ChevronDoubleRightIcon';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { z } from 'zod';

import { createLoadbalancer } from '@/entities/loadbalancer/api/create-loadbalancer';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  region: z.string().min(1, 'Region is required'),
  forwarding_rules: z.array(
    z.object({
      entry_port: z.number().min(1, 'Entry port is required'),
      entry_protocol: z.string().min(1, 'Entry protocol is required'),
      target_port: z.number().min(1, 'Target port is required'),
      target_protocol: z.string().min(1, 'Target protocol is required'),
    }),
  ),
});

type Form = z.infer<typeof schema>;

export function LoadbalancerCreateForm() {
  const { register, control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      region: 'default',
      forwarding_rules: [
        {
          entry_port: 80,
          entry_protocol: 'http',
          target_port: 80,
          target_protocol: 'http',
        },
      ],
    },
  });

  const { fields, remove } = useFieldArray({
    control,
    name: 'forwarding_rules',
  });

  const submit = handleSubmit(async (data) => {
    try {
      await createLoadbalancer(data);
    } catch (error) {
      window.console.error(error);
    }
  });

  return (
    <form onSubmit={submit} className="relative mx-auto max-w-4xl space-y-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-medium">Create Load Balancer</h1>
        <p className="text-muted-foreground">
          Load balancers distribute traffic between Virtances within the same region.
        </p>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-medium">Forwarding rules</h2>
        <div className="rounded-lg border">
          <div className="bg-muted flex items-center rounded-t-lg border-b px-4 py-2 text-base font-medium">
            <div className="flex-1">Load balancer</div>
            <div className="w-40"></div>
            <div className="flex-1">Virtance</div>
          </div>
          <ul className="divide-y">
            {fields.map((field, index) => (
              <li key={field.id} className="flex items-end p-4">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0 flex-col gap-2">
                    <Label htmlFor={`forwarding_rules.${index}.entry_protocol`}>
                      Protocol
                    </Label>
                    <select
                      {...register(`forwarding_rules.${index}.entry_protocol`)}
                      className="border-border h-10 w-40 rounded-md border bg-transparent"
                    >
                      <option value="http3">HTTP3</option>
                      <option value="http2">HTTP2</option>
                      <option value="https">HTTPS</option>
                      <option value="http">HTTP</option>
                      <option value="tcp">TCP</option>
                      <option value="udp">UDP</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`forwarding_rules.${index}.entry_port`}>Port</Label>
                    <Input
                      id={`forwarding_rules.${index}.entry_port`}
                      placeholder="Entry port"
                      {...register(`forwarding_rules.${index}.entry_port`)}
                    />
                  </div>
                </div>
                <div className="flex w-40 shrink-0 items-center justify-center pb-2">
                  <ChevronRightIcon className="text-muted-foreground h-6 w-6" />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex shrink-0 flex-col gap-2">
                    <Label htmlFor={`forwarding_rules.${index}.target_protocol`}>
                      Protocol
                    </Label>
                    <select
                      {...register(`forwarding_rules.${index}.target_protocol`)}
                      className="border-border h-10 w-40 rounded-md border bg-transparent"
                    >
                      <option value="http3">HTTP3</option>
                      <option value="http2">HTTP2</option>
                      <option value="https">HTTPS</option>
                      <option value="http">HTTP</option>
                      <option value="tcp">TCP</option>
                      <option value="udp">UDP</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`forwarding_rules.${index}.target_port`}>Port</Label>
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
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </li>
            ))}
            <li className="flex items-end p-4">
              <div>
                <select
                  className="border-border h-10 w-40 rounded-md border bg-transparent"
                  defaultValue="default"
                >
                  <option disabled value="default">
                    Add new rule
                  </option>
                  <option>HTTP3</option>
                  <option>HTTP2</option>
                  <option>HTTPS</option>
                  <option>HTTP</option>
                  <option>TCP</option>
                  <option>UDP</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <div className="max-w-80">
          <Input id="name" {...register('name')} placeholder="Enter load balancer name" />
        </div>
      </div>
      <Button type="submit">Create load balancer</Button>
    </form>
  );
}
