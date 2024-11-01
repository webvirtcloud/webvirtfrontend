import { Outlet } from 'react-router-dom';
import { Spin } from 'ui/components/spin';

import { useUser } from '@/entities/user';
import { ConfirmEmail } from '@/widgets/confirm-email';
import { Sidebar, SidebarTrigger } from '@/widgets/sidebar';

export function DefaultLayout() {
  const { data: user } = useUser();

  return (
    <main className="flex min-h-screen flex-col">
      {user ? (
        user.email_verified ? (
          <div className="flex flex-1">
            <Sidebar className="shrink-0" />
            <div className="bg-background m-2 flex-1 space-y-4 rounded-2xl border p-4 shadow-sm md:p-8">
              <SidebarTrigger />
              <Outlet />
            </div>
          </div>
        ) : (
          <ConfirmEmail />
        )
      ) : (
        <div className="flex grow items-center justify-center">
          <Spin />
        </div>
      )}
    </main>
  );
}
