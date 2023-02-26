import tw from 'twin.macro';

import { register } from '@/entities/auth';
import { RegisterForm } from '@/features/auth/register-form';

export default function SignUp() {
  const onSubmit = async (data) => {
    const response = await register(data);

    window.localStorage.setItem('token', response.token);

    window.location.href = '/';
  };

  return (
    <>
      <h1 css={tw`mb-8 text-2xl font-bold text-center`}>Create an account</h1>
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
}
