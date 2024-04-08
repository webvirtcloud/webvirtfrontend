import PowerIcon from '@heroicons/react/24/outline/PowerIcon';
import { FormEvent, useState } from 'react';
import { Button } from 'ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/components/dialog';

import { useVirtance, useVirtanceAction } from '@/entities/virtance';

export function PowerOff({ id }: { id: number }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isPoweringOff, setIsPoweringOff] = useState(false);
  const { data: virtance } = useVirtance(id);
  const { runAction } = useVirtanceAction();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsPoweringOff(true);
      await runAction({ id, action: 'power_off' });
      setDialogOpen(false);
    } catch (e) {
      setIsPoweringOff(false);
    } finally {
      setIsPoweringOff(false);
    }
  }

  function onOpenChange(value: boolean) {
    setDialogOpen(value);
  }

  return (
    <div className="flex items-end justify-between p-6">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border dark:border-neutral-700">
          <PowerIcon className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h2 className="mb-1 text-lg font-medium leading-none">Power off</h2>
          <p className="text-neutral-500">Virtance will immidiatelly power off.</p>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            disabled={isPoweringOff || virtance?.status === 'inactive'}
          >
            {isPoweringOff ? 'Powering off...' : 'Power off virtance'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset virtance</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will immidiatelly power off your
              virtance. You may lose some data.
            </DialogDescription>
            <form onSubmit={onSubmit} className="space-y-4 pt-4">
              <Button type="submit" className="w-full">
                {isPoweringOff ? 'Powering off virtance...' : 'Power off virtance'}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
