import { useVirtance } from '@/entities/virtance';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/components/dialog';
import { Button } from 'ui/components/button';
import { useForm } from 'react-hook-form';
import { Label } from 'ui/components/label';
import { Input } from 'ui/components/input';
import { Error } from 'ui/components/error';

interface FormState {
  password: string;
}

export function ResetPassword({ id }: { id: number }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResetting, setResetting] = useState(false);
  const { virtance, runAction } = useVirtance(id);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormState>();

  async function onSubmit({ password }: FormState) {
    try {
      setResetting(true);
      await runAction({ id, action: 'password_reset', password });
      setDialogOpen(false);
    } catch (e) {
      const { errors } = await e.response.json();
      errors.forEach((error) => {
        const keys = Object.keys(error);

        keys.forEach((key: keyof FormState) => {
          setError(key, { message: error[key] });
        });
      });
    } finally {
      setResetting(false);
    }
  }

  function onOpenChange(value: boolean) {
    setDialogOpen(value);
    reset();
  }

  return (
    <div className="flex items-end justify-between p-6">
      <div>
        <h2 className="text-lg font-medium">Reset password</h2>
        <p className="text-neutral-500">
          Virtance will be shutdown and reset password to new one.
        </p>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="secondary" disabled={isResetting}>
            {isResetting ? 'Resetting...' : 'Reset password'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset to new password</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will shutdown virtance and reset password
              to new one.
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input
                  placeholder="Enter new password"
                  {...register('password', { required: 'Password is required.' })}
                  error={!!errors.password}
                />
                {errors.password && <Error>{errors.password.message}</Error>}
              </div>
              <Button type="submit" className="w-full">
                {isSubmitting ? 'Resetting password...' : 'Reset password'}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
