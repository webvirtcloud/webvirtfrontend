import { useVirtance } from '@/entities/virtance';
import { FormEvent, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/components/dialog';
import { Button } from 'ui/components/button';
import BoltSlashIcon from '@heroicons/react/24/outline/BoltSlashIcon';

export function Reset({ id }: { id: number }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResetting, setResetting] = useState(false);
  const { virtance, runAction } = useVirtance(id);

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
        <div className="flex h-10 w-10 items-center justify-center rounded-md border dark:border-neutral-700">
          <BoltSlashIcon className="h-5 w-5 text-yellow-500" />
        </div>
        <div>
          <h2 className="mb-1 text-lg font-medium leading-none">Reset</h2>
          <p className="text-neutral-500">
            Virtance will immidiatelly power off and power on.
          </p>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
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
