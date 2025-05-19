import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { SignUpForm } from '@/features/auth';

export const Route = createFileRoute('/(auth)/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  async function onSuccess(token: string) {
    window.localStorage.setItem('token', token);

    navigate({ to: '/confirm-email' });
  }

  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-medium">Create an account</h1>
      <SignUpForm onSuccess={onSuccess} />
    </>
  );
}
