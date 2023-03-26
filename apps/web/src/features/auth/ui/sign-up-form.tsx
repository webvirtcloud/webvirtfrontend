import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { register as authRegister } from '@/entities/auth';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';

interface IFormInputs {
  email: string;
  password: string;
}

interface Props {
  onSuccess: (token: string) => void;
}

export function SignUpForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>();

  async function onSubmit(data: IFormInputs) {
    try {
      const { token } = await authRegister(data);

      onSuccess(token);
    } catch (error) {}
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
      <p className="mt-4 text-center text-neutral-500">
        Already have an account?{' '}
        <Link className="font-medium text-sky-500" to="/sign-in">
          Sign In
        </Link>
      </p>
    </>
  );
}
