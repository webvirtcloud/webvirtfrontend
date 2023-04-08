import { useState } from 'react';
import { useImages } from '@/entities/image';
import { useVirtance } from '@/entities/virtance';
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

export function Rebuild({ id }: { id: number }) {
  const [isRebuilding, setRebuilding] = useState(false);
  const [image, setImage] = useState<string>();
  const { virtance, runAction } = useVirtance(id);
  const { images } = useImages('distribution');

  async function onDelete() {
    try {
      setRebuilding(true);
      await runAction({ id, action: 'rebuild', image });
      setImage(undefined);
    } catch (error) {
    } finally {
      setRebuilding(false);
    }
  }

  return virtance ? (
    <div className="flex items-end justify-between p-6">
      <div>
        <h2 className="text-lg font-medium">Rebuild</h2>
        <p className=" text-neutral-500">
          Be careful. It's erase all of your data and install new image.
        </p>
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
                {images.map((image) => (
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
