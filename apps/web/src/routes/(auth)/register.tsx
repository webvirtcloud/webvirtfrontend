import { createFileRoute } from '@tanstack/react-router';

import { SignUpForm } from '@/features/auth';

export const Route = createFileRoute('/(auth)/register')({
  component: RouteComponent,
});

function RouteComponent() {
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
