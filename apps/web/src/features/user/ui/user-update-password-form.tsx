import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

import { type UpdatePasswordPayload, updatePassword } from '@/entities/user';

export function UserUpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<UpdatePasswordPayload>();

  async function onSubmit(data: UpdatePasswordPayload) {
    try {
      await updatePassword(data);

      window.localStorage.removeItem('token');

      window.location.href = '/sign-in';
    } catch (e) {
      const { message } = await e.response.json();
      toast.error('Bad request', { description: message });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="old_password">Current password</Label>
        <Input
          {...register('old_password', { required: 'Current password is required.' })}
          placeholder="Your current password"
          type="password"
          id="old_password"
          name="old_password"
          error={!!errors.old_password}
        />
        {errors.old_password && (
          <Error className="mt-1">{errors.old_password.message}</Error>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="new_password">New password</Label>
        <Input
          {...register('new_password', {
            required: 'New password is required.',
            minLength: { message: 'Password should be at least 6 characters.', value: 6 },
          })}
          placeholder="New secure password"
          type="password"
          id="new_password"
          name="new_password"
          error={!!errors.new_password}
        />
        {errors.new_password && (
          <Error className="mt-1">{errors.new_password.message}</Error>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="new_password_confirm">Confirm new password</Label>
        <Input
          {...register('new_password_confirm', {
            required: 'New password is required.',
            minLength: { message: 'Password should be at least 6 characters.', value: 6 },
            validate: (value) =>
              watch('new_password') === value ||
              'Confirm password do not match to new password',
          })}
          placeholder="New secure password again"
          type="password"
          id="new_password_confirm"
          name="new_password_confirm"
          error={!!errors.new_password_confirm}
        />
        {errors.new_password_confirm && (
          <Error className="mt-1">{errors.new_password_confirm.message}</Error>
        )}
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Changing password...' : 'Change password'}
      </Button>
    </form>
  );
}
