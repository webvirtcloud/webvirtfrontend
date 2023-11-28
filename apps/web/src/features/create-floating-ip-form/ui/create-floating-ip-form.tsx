import { useToast } from 'ui/components/toast';

import { createFloatingIP, FloatingIPAssignForm } from '@/entities/floating-ip';
import { type Virtance } from '@/entities/virtance';

interface FloatingIPFormProps {
  virtances?: Virtance[];
  onCreate: () => void;
}

export function CreateFloatingIPForm({ onCreate, virtances }: FloatingIPFormProps) {
  const { toast } = useToast();

  async function onSubmit(virtanceId: number) {
    try {
      virtanceId && (await createFloatingIP(Number(virtanceId)));

      onCreate();
    } catch (e) {
      const { message } = await e.response.json();
      toast({ title: 'Bad request', variant: 'destructive', description: message });
    }
  }

  return <FloatingIPAssignForm onSubmit={onSubmit} virtances={virtances} />;
}
