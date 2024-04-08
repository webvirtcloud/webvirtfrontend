import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon';
import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/components/dialog';
import { Error } from 'ui/components/error';
import { Label } from 'ui/components/label';
import { Textarea } from 'ui/components/textarea';

interface FormState {
  userdata: string;
}

export function VirtanceCreateUserdata() {
  const { setValue, watch } = useFormContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const userdata = watch('userdata');

  function clear() {
    setValue('userdata', '');
    reset();
  }

  function onSubmit(data: FormState) {
    setValue('userdata', data.userdata);
    setDialogOpen(false);
  }

  return (
    <div>
      <h3 className="mb-2 font-medium">User data</h3>

      {userdata ? (
        <div className="mb-4 flex w-full items-center gap-2 rounded-md border p-2 md:max-w-[212px] dark:border-neutral-700">
          <CodeBracketSquareIcon className="h-8 w-8 text-green-500" />
          Code
          <Button onClick={clear} size="sm" className="ml-auto w-7 p-0" variant="outline">
            <XMarkIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full md:max-w-[212px]">
            {userdata ? 'Edit' : 'Add'} user data
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{userdata ? 'Edit' : 'Add'} user data</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              // needed to prevent the form
              // from outside the dialog to be submitted
              e.stopPropagation();

              return handleSubmit(onSubmit)(e);
            }}
          >
            <div className="space-y-1">
              <Label hidden htmlFor="userdata">
                Userdata
              </Label>
              <Textarea
                id="userdata"
                placeholder="Enter your user data"
                rows={6}
                error={!!errors.userdata}
                {...register('userdata')}
              />
              {errors.userdata && <Error>{errors.userdata.message}</Error>}
            </div>

            <Button type="submit" className="w-full">
              Save user data
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
