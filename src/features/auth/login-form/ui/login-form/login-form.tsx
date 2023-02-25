import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import { Button } from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

interface IFormInputs {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: IFormInputs) => void;
}

export function LoginForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IFormInputs>({ mode: 'onChange' });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={tw`p-8 space-y-4 rounded-md shadow bg-base`}
      >
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Ex. account@gmail.com"
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          size="lg"
          required
          error={errors.email?.message}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Your password"
          {...register('password', {
            minLength: { value: 6, message: 'Password should be at least 6 characters.' },
            required: 'Password is required.',
          })}
          size="lg"
          required
          error={errors.password?.message}
        />
        <div css={tw`text-right`}>
          <Link
            css={tw`text-blue-700 transition-colors hover:text-blue-600`}
            to="/reset-password"
          >
            Reset password
          </Link>
        </div>
        <Button
          size="lg"
          type="submit"
          fullWidth
          loading={isSubmitting}
          disabled={!isValid}
        >
          Sign In
        </Button>
      </form>
      <p css={tw`mt-4 text-center`}>
        Don&apos;t have an account?{' '}
        <Link css={tw`text-blue-700 transition-colors hover:text-blue-600`} to="/sign-up">
          Sign Up
        </Link>
      </p>
    </>
  );
}
