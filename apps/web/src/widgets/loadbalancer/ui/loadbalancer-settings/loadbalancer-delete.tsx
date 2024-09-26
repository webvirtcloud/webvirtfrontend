import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

import { deleteLoadbalancer } from '@/entities/loadbalancer';

export function LoadbalancerDelete() {
  const { id } = useParams<{ id: string }>();
  const [isDeleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  async function onDelete() {
    try {
      if (!id) return;
      setDeleting(true);
      await deleteLoadbalancer(id);
      navigate('/loadbalancers');
    } catch (error) {
      window.console.error(error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Danger zone</h2>
        <p className="text-muted-foreground">
          Think twice before touching any of below options.
        </p>
      </div>
      <div className="divide-y rounded-lg border">
        <div className="relative flex items-end justify-between overflow-hidden p-6">
          <div className="absolute inset-0 -z-10 [background-image:repeating-linear-gradient(-45deg,transparent,transparent_20px,#f9f9f9_20px,#f9f9f9_40px)] dark:[background-image:repeating-linear-gradient(-45deg,transparent,transparent_20px,#1c1c1c_20px,#1c1c1c_40px)]"></div>
          <div className="flex gap-4">
            <div className="bg-muted/50 flex h-10 w-10 items-center justify-center rounded-md border">
              <Trash2Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="mb-1 font-semibold leading-none">Delete load balancer</h2>
              <p className="text-muted-foreground">
                Note that deleting is irreversible action. You cannot restore any data.
              </p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isDeleting} variant="destructive">
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Any associated Virtances will be disconnected and will stop receiving
                  distributed traffic. Virtances will not be destroyed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Delete load balancer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
