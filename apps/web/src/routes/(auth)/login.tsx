import { createFileRoute } from '@tanstack/react-router';

import { SignInForm } from '@/features/auth';

export const Route = createFileRoute('/(auth)/login')({
  //   beforeLoad: async ({ context: { queryClient }, search }) => {
  //     const session = await queryClient.ensureQueryData(sessionQueryOptions);

  //     if (session.data?.session) {
  //       throw redirect({
  //         to: '/',
  //       });
  //     }
  //   },
  component: RouteComponent,
});

function RouteComponent() {
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
