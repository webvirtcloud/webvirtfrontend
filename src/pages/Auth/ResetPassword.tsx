import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import { resetPassword } from '@/api/account';
import Button from '@/components/Button';
import Input from '@/components/Input';

const ResetPassword = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<{ password: string }>({ mode: 'onChange' });

  const onSubmit = (data) => {
    try {
      resetPassword(data);
    } catch (error) {}
  };

  return (
    <>
      <h1 css={tw`text-center font-bold text-2xl mb-4`}>Reset password</h1>
      <form onSubmit={handleSubmit(onSubmit)} css={tw`space-y-4`}>
        <Input
          label="New Password"
          type="password"
          placeholder="Enter new secure password"
          {...register('password', {
            minLength: { value: 6, message: 'Password should be at least 6 characters.' },
            required: 'Password is required.',
          })}
        />
        {errors.password && (
          <p css={tw`text-red-500`} role="alert">
            {errors.password?.message}
          </p>
        )}
        <Button css={tw`w-full`} loading={isSubmitting} disabled={!isValid}>
          Change password
        </Button>
      </form>
      <p css={tw`text-center mt-4`}>
        Or try to{' '}
        <Link css={tw`text-cyan-500 hover:text-cyan-700 transition-colors`} to="/sign-in">
          Sign in
        </Link>{' '}
        again
      </p>
    </>
  );
};

export default ResetPassword;
