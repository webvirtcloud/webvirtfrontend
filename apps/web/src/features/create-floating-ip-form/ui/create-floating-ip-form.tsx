import { useToast } from 'ui/components/toast';

import { createFloatingIP, FloatingIPAssignForm } from '@/entities/floating-ip';
import { useVirtances } from '@/entities/virtance';

export function CreateFloatingIPForm({ onCreate }) {
  const { virtances } = useVirtances({ has_floating_ip: false });
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
