import { SignInForm } from '@/features/auth';

export default function SignIn() {
  async function onSuccess(token: string) {
    window.localStorage.setItem('token', token);

    window.location.href = '/';
  }

  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-medium">Sign in to your account</h1>
      <SignInForm onSuccess={onSuccess} />
    </>
  );
}
