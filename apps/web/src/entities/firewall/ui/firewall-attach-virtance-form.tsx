import { type Virtance } from '@/entities/virtance';
import { Button } from 'ui/components/button';
import { Label } from 'ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/components/select';
import { type FormEvent, useState } from 'react';
import { type KeyedMutator } from 'swr';

interface FirewallAttachVirtanceFormProps {
  virtances?: Virtance[];
  mutate: KeyedMutator<Virtance[]>;
  onSubmit: (payload: number[]) => Promise<void>;
}

export function FirewallAttachVirtanceForm({
  onSubmit,
  virtances,
  mutate,
}: FirewallAttachVirtanceFormProps) {
  const [virtanceId, setVirtanceId] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      if (virtanceId) {
        setIsSubmitting(true);

        await onSubmit([Number(virtanceId)]);

        setVirtanceId(undefined);

        mutate();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-2">
      <div className="space-y-2">
        <Label htmlFor="virtance" hidden>
          Virtance
        </Label>
        <Select
          disabled={!virtances?.length}
          value={virtanceId}
          onValueChange={setVirtanceId}
          key={virtanceId}
        >
          <SelectTrigger disabled={!virtances?.length} id="virtance" className="w-56">
            <SelectValue
              placeholder={
                virtances?.length === 0 ? 'No available virtances' : 'Select virtance'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {virtances?.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={!virtanceId || isSubmitting}>
        {isSubmitting ? 'Attaching...' : 'Attach'}
      </Button>
    </form>
  );
}
