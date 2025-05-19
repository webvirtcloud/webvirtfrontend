import BoltSlashIcon from '@heroicons/react/24/outline/BoltSlashIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/components/dialog';
import { Input } from 'ui/components/input';
import { z } from 'zod';

import { useDatabase, useDatabaseAction } from '@/entities/database';

export function DatabaseSettingsResetPassword() {
  const { uuid } = useParams({ from: '/_authenticated/databases/$uuid' });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data: database } = useDatabase(uuid);
  const { runAction } = useDatabaseAction();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        password: z
          .string({ required_error: 'Password is required' })
          .min(8, 'Password must be at least 8 characters long'),
      }),
    ),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await runAction({ uuid, action: 'password_reset', password: data.password });
    setDialogOpen(false);
    reset();
  });

  function onOpenChange(value: boolean) {
    setDialogOpen(value);
    reset();
  }

  return (
    <div className="flex items-end justify-between p-6">
      <div className="flex gap-4">
        <div className="bg-muted/50 flex h-10 w-10 items-center justify-center rounded-md border">
          <BoltSlashIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="mb-1 text-lg font-medium leading-none">Reset password</h2>
          <p className="text-muted-foreground">
            This action will reset the password for the database.
          </p>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            disabled={isSubmitting || database?.status === 'inactive'}
          >
            {isSubmitting ? 'Resetting...' : 'Reset password'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset database password</DialogTitle>
            <DialogDescription>
              This action will reset the password for the database.
            </DialogDescription>
            <form onSubmit={onSubmit} className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Input
                  type="password"
                  placeholder="********"
                  {...register('password')}
                  error={!!errors.password}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Resetting password...' : 'Reset password'}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
