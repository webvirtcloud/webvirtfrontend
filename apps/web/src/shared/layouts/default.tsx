import { Outlet } from 'react-router-dom';

import { useUser } from '@/entities/user';
import { ConfirmEmail } from '@/widgets/confirm-email';
import { Sidebar } from '@/widgets/sidebar';

export function DefaultLayout() {
  const { data: user } = useUser();

  return (
    <main className="flex min-h-screen flex-col">
      {user ? (
        user.email_verified ? (
          <div className="flex flex-1">
            <Sidebar className="shrink-0" />
            <div className="mx-auto max-w-7xl flex-1 p-4 md:p-8">
              <Outlet />
            </div>
          </div>
        ) : (
          <ConfirmEmail />
        )
      ) : (
        <div className="flex grow items-center justify-center">Loading app...</div>
      )}
    </main>
  );
}
