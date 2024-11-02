import { toast } from 'sonner';

import { createFloatingIP, FloatingIPAssignForm } from '@/entities/floating-ip';
import type { Virtance } from '@/entities/virtance';

interface FloatingIPFormProps {
  virtances?: Virtance[];
  onCreate: () => void;
}

export function FloatingIpCreateForm({ onCreate, virtances }: FloatingIPFormProps) {
  async function onSubmit(virtanceId: number) {
    try {
      virtanceId && (await createFloatingIP(Number(virtanceId)));

      onCreate();
    } catch (e) {
      const { message } = await e.response.json();
      toast.error('Bad request', { description: message });
    }
  }

  return <FloatingIPAssignForm onSubmit={onSubmit} virtances={virtances} />;
}
