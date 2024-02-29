import ArrowPathRoundedSquareIcon from '@heroicons/react/24/outline/ArrowPathRoundedSquareIcon';
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
import { Label } from 'ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/components/select';

import { useImages } from '@/entities/image';
import { useVirtance, useVirtanceAction } from '@/entities/virtance';

export function Rebuild({ id }: { id: number }) {
  const [isRebuilding, setRebuilding] = useState(false);
  const [image, setImage] = useState<string>();
  const { data: virtance } = useVirtance(id);
  const { runAction } = useVirtanceAction();
  const { data: images } = useImages('distribution');

  async function onDelete() {
    setRebuilding(true);
    image && (await runAction({ id, action: 'rebuild', image }));
    setImage(undefined);
    setRebuilding(false);
  }

  return virtance ? (
    <div className="flex items-end justify-between p-6">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border dark:border-neutral-700">
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Rebuild</h2>
          <p className=" text-neutral-500">
            Be careful. It&apos;s erase all of your data and install new image.
          </p>
        </div>
      </div>
      {images ? (
        <div className="flex max-w-sm items-end gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="image" hidden>
              Image
            </Label>
            <Select value={image} onValueChange={setImage} key={image}>
              <SelectTrigger id="image" className="w-56">
                <SelectValue placeholder="Select new image" />
              </SelectTrigger>
              <SelectContent>
                {images.images.map((image) => (
                  <SelectItem
                    key={image.slug}
                    value={image.slug}
                    disabled={virtance.image.slug === image.slug}
                  >
                    {image.distribution} {image.name}{' '}
                    {virtance.image.slug === image.slug && '(current)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isRebuilding || !image}>
                {isRebuilding ? 'Rebuilding...' : 'Rebuild'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently erase all of your
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="secondary">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild onClick={onDelete}>
                  <Button>Rebuild virtance</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : null}
    </div>
  ) : null;
}
