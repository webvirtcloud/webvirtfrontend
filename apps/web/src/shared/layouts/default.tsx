import MenuIcon from '@heroicons/react/20/solid/Bars3BottomLeftIcon';
import { Outlet } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { Spin } from 'ui/components/spin';

import { useUser } from '@/entities/user';
import { ConfirmEmail } from '@/widgets/confirm-email';
import { Sidebar } from '@/widgets/sidebar';

import { useSidebar } from '../hooks/use-sidebar';

export function DefaultLayout() {
  const { data: user } = useUser();
  const { toggleSidebar } = useSidebar();

  return (
    <main className="flex min-h-screen flex-col">
      {user ? (
        user.email_verified ? (
          <div className="flex flex-1">
            <Sidebar className="shrink-0" />
            <div className="mx-auto max-w-7xl flex-1 space-y-4 p-4 md:p-8">
              <Button
                onClick={() => toggleSidebar()}
                variant="outline"
                size="icon"
                className="h-7 w-7 lg:hidden"
              >
                <MenuIcon className="h-4 w-4" />
              </Button>
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
