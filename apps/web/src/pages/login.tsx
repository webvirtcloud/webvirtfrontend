import tw from 'twin.macro';

import { login } from '@/entities/auth';
import { LoginForm } from '@/features/auth/login-form';

export default function Login() {
  const onSubmit = async (data) => {
    const response = await login(data);

    window.localStorage.setItem('token', response.token);

    window.location.href = '/';
  };

  return (
    <>
      <h1 css={tw`mb-8 text-2xl font-bold text-center`}>Sign in to your account</h1>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
