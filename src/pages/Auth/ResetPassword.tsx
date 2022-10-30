import Button from 'components/Button';
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

const ResetPassword = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch('http://localhost:8000/account/new-password/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <h1 css={tw`text-center font-bold text-2xl mb-4`}>Reset password</h1>
      <form onSubmit={handleSubmit(onSubmit)} css={tw`space-y-4`}>
        <Input
          name="password"
          label="New Password"
          type="password"
          required={true}
          placeholder="Enter new secure password"
          {...register('password')}
        />
        <Button css={tw`w-full`}>Change password</Button>
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
