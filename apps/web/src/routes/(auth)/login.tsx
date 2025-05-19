import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { SignInForm } from '@/features/auth';

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  async function onSuccess(token: string) {
    window.localStorage.setItem('token', token);

    navigate({ to: '/' });
  }

  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-medium">Sign in to your account</h1>
      <SignInForm onSuccess={onSuccess} />
    </>
  );
}
