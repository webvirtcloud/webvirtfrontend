import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Error } from 'ui/components/error';
import { login } from '@/entities/auth';

interface IFormInputs {
  email: string;
  password: string;
}

interface Props {
  onSuccess: (token: string) => void;
}

export function SignInForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IFormInputs>();

  async function onSubmit(data) {
    const { token } = await login(data);

    onSuccess(token);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="email"
            type="email"
            placeholder="Ex. account@gmail.com"
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
            placeholder="Your password"
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
        <div className="text-right">
          <Link className="font-medium text-sky-500" to="/reset-password">
            Reset password
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={!isValid}>
          Sign In
        </Button>
      </form>
      <p className="mt-4 text-center text-neutral-500">
        Don&apos;t have an account?{' '}
        <Link className="font-medium text-sky-500" to="/sign-up">
          Sign Up
        </Link>
      </p>
    </>
  );
}
