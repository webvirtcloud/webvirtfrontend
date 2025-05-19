import { createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';

import { confirmEmail } from '@/entities/user';
import { queryClient } from '@/shared/query-client';

export const Route = createFileRoute('/(auth)/confirm-email/$token')({
  beforeLoad: async ({ params }) => {
    try {
      await confirmEmail(params.token);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Your account confirmed', { description: 'Happy hacking' });
      redirect({ to: '/' });
    } catch {
      toast.error('Something goes wrong', {
        description: 'Your link is wrong or it is expired',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Setting up your account</h1>
        <p className="text-muted-foreground">Confirming your email address...</p>
      </div>
    </div>
  );
}
