import { type FormEvent, useState } from 'react';
import { Button } from 'ui/components/button';
import { Label } from 'ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/components/select';

import { type Virtance } from '@/entities/virtance';

interface Props {
  virtances?: Virtance[];
  onSubmit: (virtanceId: number) => Promise<void>;
}

export function FloatingIPAssignForm({ onSubmit, virtances }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [virtanceId, setVirtanceId] = useState<string>();

  async function submit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      if (virtanceId) {
        setIsSubmitting(true);

        await onSubmit(Number(virtanceId));

        setVirtanceId(undefined);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="virtance" hidden>
          Virtance
        </Label>
        <div className="flex items-center gap-2">
          <Select value={virtanceId} onValueChange={setVirtanceId} key={virtanceId}>
            <SelectTrigger id="virtance" className="w-80">
              <SelectValue placeholder="Select virtance" />
            </SelectTrigger>
            <SelectContent>
              {virtances?.map((virtance) => (
                <SelectItem
                  key={virtance.id}
                  value={virtance.id.toString()}
                  disabled={virtance.event !== null}
                >
                  {virtance.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Assigning...' : 'Assign floating ip'}
          </Button>
        </div>
      </div>
    </form>
  );
}
