import { createFileRoute } from '@tanstack/react-router';

import { ResetPasswordForm } from '@/features/auth';

export const Route = createFileRoute('/(auth)/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-medium">Reset password</h1>
      <ResetPasswordForm />
    </>
  );
}
