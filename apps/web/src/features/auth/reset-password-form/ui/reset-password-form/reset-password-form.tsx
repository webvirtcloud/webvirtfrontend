import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import { Button } from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

interface IFormInputs {
  password: string;
}

interface Props {
  onSubmit: (data: IFormInputs) => void;
}

export function ResetPasswordForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<IFormInputs>({ mode: 'onChange' });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={tw`p-8 space-y-4 rounded-md shadow bg-base`}
      >
        <Input
          id="new_password"
          label="New Password"
          type="password"
          placeholder="Enter new secure password"
          {...register('password', {
            minLength: { value: 6, message: 'Password should be at least 6 characters.' },
            required: 'Password is required.',
          })}
          size="lg"
          required
          error={errors.password?.message}
        />
        <Button fullWidth size="lg" loading={isSubmitting} disabled={!isValid}>
          Change password
        </Button>
      </form>
      <p css={tw`mt-4 text-center`}>
        Or try to{' '}
        <Link css={tw`text-blue-700 transition-colors hover:text-blue-600`} to="/sign-in">
          Sign in
        </Link>{' '}
        again
      </p>
    </>
  );
}
