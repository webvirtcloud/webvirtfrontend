import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';

import { resetPassword } from '@/entities/auth';

interface IFormInputs {
  password: string;
}

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormInputs>();

  function onSubmit(data: IFormInputs) {
    resetPassword(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="new_password"
            type="password"
            placeholder="Enter new secure password"
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Password should be at least 6 characters.',
              },
              required: 'Password is required.',
            })}
            error={!!errors.password}
          />
          {errors.password && <Error className="mt-1">{errors.password.message}</Error>}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          Change password
        </Button>
      </form>
      <p className="text-muted-foreground mt-4 text-center">
        Or try to{' '}
        <Link className="text-highlight font-medium" to="/login">
          Sign in
        </Link>{' '}
        again
      </p>
    </>
  );
}
