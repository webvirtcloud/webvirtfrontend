import Button from 'components/Button';
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

interface IFormInputs {
  email: string;
  password: string;
}

const SignIn = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch('http://localhost:8000/account/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        window.localStorage.setItem('token', response.token);

        navigate('/');
      });
  };

  return (
    <>
      <h1 css={tw`text-center font-bold text-2xl mb-4`}>Sign in to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)} css={tw`space-y-4`}>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Ex. account@gmail.com"
          {...register('email', { required: 'Email is required.' })}
        />
        {errors.password && (
          <p css={tw`text-red-500`} role="alert">
            {errors.email?.message}
          </p>
        )}
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Your password"
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
        <div css={tw`text-right`}>
          <Link
            css={tw`text-cyan-500 hover:text-cyan-700 transition-colors`}
            to="/reset-password"
          >
            Reset password
          </Link>
        </div>
        <Button type="submit" css={tw`w-full`}>
          Sign In
        </Button>
      </form>
      <p css={tw`text-center mt-4`}>
        Don&apos;t have an account?{' '}
        <Link css={tw`text-cyan-500 hover:text-cyan-700 transition-colors`} to="/sign-up">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default SignIn;
