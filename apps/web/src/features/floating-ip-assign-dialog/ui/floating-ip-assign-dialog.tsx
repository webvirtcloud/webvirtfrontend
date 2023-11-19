import { type ComponentPropsWithoutRef } from 'react';
import { AlertDialog } from 'ui/components/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui/components/dialog';
import { useToast } from 'ui/components/toast';

import { FloatingIPAssignForm, runFloatingIPAction } from '@/entities/floating-ip';
import { useVirtances } from '@/entities/virtance';

interface Props
  extends Pick<ComponentPropsWithoutRef<typeof AlertDialog>, 'open' | 'onOpenChange'> {
  onCreate: () => void;
  ip: string;
}

export function FloatingIPAssignDialog({ open, onOpenChange, onCreate, ip }: Props) {
  const { virtances } = useVirtances({ has_floating_ip: false });
  const { toast } = useToast();

  async function onSubmit(virtanceId: number) {
    try {
      await runFloatingIPAction({ action: 'assign', ip, virtance_id: virtanceId });

      onCreate();
    } catch (e) {
      const { message } = await e.response.json();
      toast({ title: 'Bad request', variant: 'destructive', description: message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Floating IP</DialogTitle>
        </DialogHeader>
        <FloatingIPAssignForm onSubmit={onSubmit} virtances={virtances} />
      </DialogContent>
    </Dialog>
  );
}
