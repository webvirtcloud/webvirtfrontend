import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'ui/components/alert-dialog';
import { Button } from 'ui/components/button';

import { deleteVirtance, virtanceQueries } from '@/entities/virtance';

export function Deletion({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const [isDeleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  async function onDelete() {
    setDeleting(true);
    await deleteVirtance(Number(id));
    navigate({ to: '/' });
    setDeleting(false);
    queryClient.removeQueries({ queryKey: virtanceQueries.one(Number(id)) });
  }

  return (
    <div className="relative flex items-end justify-between overflow-hidden p-6">
      <div className="absolute inset-0 rounded-b-lg [background-image:repeating-linear-gradient(-45deg,transparent,transparent_20px,#f9f9f9_20px,#f9f9f9_40px)] dark:[background-image:repeating-linear-gradient(-45deg,transparent,transparent_20px,#1c1c1c_20px,#1c1c1c_40px)]"></div>
      <div className="isolate flex gap-4">
        <div className="bg-muted/50 flex h-10 w-10 items-center justify-center rounded-md border">
          <TrashIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="mb-1 text-lg font-medium leading-none">Delete virtance</h2>
          <p className="text-muted-foreground">
            Note that deleting is irreversible action. You cannot restore any data.
          </p>
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isDeleting} variant="destructive" className="isolate">
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your virtance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete virtance</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
