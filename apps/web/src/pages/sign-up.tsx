import { SignUpForm } from '@/features/auth';

export default function SignUp() {
  async function onSuccess(token: string) {
    window.localStorage.setItem('token', token);

    window.location.href = '/';
  }

  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-medium">Create an account</h1>
      <SignUpForm onSuccess={onSuccess} />
    </>
  );
}
