import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getUser } from '@/entities/user';
import { queryClient } from '@/shared/query-client';
import { GlobalLoader } from '@/shared/ui/global-loader';
import { Sidebar } from '@/widgets/sidebar';
import { SidebarTrigger } from '@/widgets/sidebar';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      throw redirect({
        to: '/login',
      });
    }

    const user = await queryClient.ensureQueryData({
      queryKey: ['user'],
      queryFn: () => getUser().then((response) => response.profile),
      staleTime: Infinity,
      gcTime: Infinity,
    });
    if (!user?.email_verified) {
      throw redirect({ to: '/confirm-email' });
    }
  },
  pendingComponent: GlobalLoader,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar className="shrink-0" />
        <div className="bg-background m-2 flex-1 space-y-4 rounded-2xl border p-4 shadow-sm md:p-8">
          <SidebarTrigger />
          <Outlet />
        </div>
      </div>
    </main>
  );
}
