import BoltSlashIcon from '@heroicons/react/24/outline/BoltSlashIcon';
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

export function Reset({ id }: { id: number }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResetting, setResetting] = useState(false);
  const { data: virtance } = useVirtance(id);
  const { runAction } = useVirtanceAction();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setResetting(true);
      await runAction({ id, action: 'reset' });
      setDialogOpen(false);
    } catch (e) {
      setResetting(false);
    } finally {
      setResetting(false);
    }
  }

  function onOpenChange(value: boolean) {
    setDialogOpen(value);
  }

  return (
    <div className="flex items-end justify-between p-6">
      <div className="flex gap-4">
        <div className="bg-muted/50 flex h-10 w-10 items-center justify-center rounded-md border">
          <BoltSlashIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="mb-1 text-lg font-medium leading-none">Reset</h2>
          <p className="text-muted-foreground">
            Virtance will immidiatelly power off and power on.
          </p>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            disabled={isResetting || virtance?.status === 'inactive'}
          >
            {isResetting ? 'Resetting...' : 'Reset virtance'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset virtance</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will immidiatelly power off and power on
              your virtance. You may lose some data.
            </DialogDescription>
            <form onSubmit={onSubmit} className="space-y-4 pt-4">
              <Button type="submit" className="w-full">
                {isResetting ? 'Resetting virtance...' : 'Reset virtance'}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
