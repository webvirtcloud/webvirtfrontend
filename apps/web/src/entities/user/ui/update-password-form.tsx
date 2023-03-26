import { useForm } from 'react-hook-form';
import { type UpdatePasswordPayload, updatePassword } from '@/entities/user';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';

export function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<UpdatePasswordPayload>();

  const onSubmit = async (data: UpdatePasswordPayload) => {
    try {
      await updatePassword(data);

      window.localStorage.removeItem('token');

      window.location.href = '/sign-in';
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('old_password', { required: 'Current password is required.' })}
        placeholder="Your current password"
        type="password"
        id="current_password"
        name="current_password"
        error={!!errors.old_password}
      />
      {/* {errors.old_password && (
        <p css={tw`text-red-500`} role="alert">
          {errors.old_password?.message}
        </p>
      )} */}
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
      {/* {errors.new_password && (
        <p css={tw`text-red-500`} role="alert">
          {errors.new_password?.message}
        </p>
      )} */}
      <Input
        {...register('new_password_confirm', {
          required: 'New password is required.',
          minLength: { message: 'Password should be at least 6 characters.', value: 6 },
        })}
        placeholder="New secure password again"
        type="password"
        id="new_password_confirm"
        name="new_password_confirm"
        error={!!errors.new_password_confirm}
      />
      {errors.new_password_confirm && (
        <p className="text-red-500" role="alert">
          {errors.new_password_confirm?.message}
        </p>
      )}
      <Button className="w-full" type="submit" disabled={!isValid}>
        Change password
      </Button>
    </form>
  );
}
