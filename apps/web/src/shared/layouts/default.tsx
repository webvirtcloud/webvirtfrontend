import { Outlet } from 'react-router-dom';

import { useUser } from '@/entities/user';
import { ConfirmEmail } from '@/widgets/confirm-email';
import { Navbar } from '@/widgets/nav-bar';

export function DefaultLayout() {
  const { data: user } = useUser();

  return (
    <main className="flex min-h-screen flex-col">
      {user ? (
        user.email_verified ? (
          <>
            <Navbar />
            <div className="container mx-auto flex-1 px-4 py-8">
              <Outlet />
            </div>
          </>
        ) : (
          <ConfirmEmail />
        )
      ) : (
        <div className="flex grow items-center justify-center">Loading app...</div>
      )}
    </main>
  );
}
