import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';

import { register as authRegister } from '@/entities/auth';

interface IFormInputs {
  email: string;
  password: string;
}

interface Props {
  onSuccess: (token: string) => void;
}

export function RegisterForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>();

  async function onSubmit(data: IFormInputs) {
    try {
      const { token } = await authRegister(data);

      onSuccess(token);
    } catch (e) {
      const { message } = await e.response.json();
      setError('root', { message: 'Bad request' });
      toast.error('Bad request', { description: message });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="email"
            type="email"
            placeholder="account@gmail.com"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            error={!!errors.email}
          />
          {errors.email && <Error className="mt-1">{errors.email.message}</Error>}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            placeholder="Secure password"
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
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Create an account
        </Button>
      </form>
      <p className="text-muted-foreground mt-4 text-center">
        Already have an account?{' '}
        <Link className="text-highlight font-medium" to="/login">
          Sign In
        </Link>
      </p>
    </>
  );
}
