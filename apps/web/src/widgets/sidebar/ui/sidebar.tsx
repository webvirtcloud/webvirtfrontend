import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { HTMLAttributes, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button, buttonVariants } from 'ui/components/button';
import { cx } from 'ui/lib';

import { UserMenu, useUser } from '@/entities/user';
import { useSidebar } from '@/shared/hooks/use-sidebar';

import { NavbarLinks } from '../config';

export function Sidebar({ className }: HTMLAttributes<HTMLDivElement>) {
  const location = useLocation();
  const { data: user } = useUser({ refetchOnMount: false });
  const { isSidebarOpen, closeSidebar } = useSidebar();

  useEffect(() => {
    if (isSidebarOpen) {
      closeSidebar();
    }
  }, [location]);

  return (
    <div
      className={cx([
        'bg-body fixed top-0 z-10 flex h-screen w-64 transform flex-col gap-8 self-start p-4 transition-transform max-lg:border-r lg:sticky lg:translate-x-0',
        className,
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ])}
    >
      <Button
        onClick={() => closeSidebar()}
        className={cx([
          'absolute -right-10 top-5 h-7 w-7 px-0 transition-all lg:pointer-events-none',
          isSidebarOpen
            ? 'translate-x-0 opacity-100 lg:-translate-x-12 lg:opacity-0'
            : '-translate-x-12 opacity-0',
        ])}
        variant="outline"
      >
        <XMarkIcon className="h-4 w-4" />
      </Button>

      <Link className="inline-flex items-center gap-2 pl-1" to="/">
        <img
          className="w-8"
          src={new URL('/src/shared/assets/images/logo.svg', import.meta.url).href}
          alt="Logotype"
        />
        <span className="text-lg font-semibold">WebVirtCloud</span>
      </Link>

      <Link to="/virtances/create" className={cx(buttonVariants(), 'w-full')}>
        Deploy virtance
      </Link>

      <nav className="flex-1 overflow-y-auto">
        <div>
          <div className="text-muted-foreground mb-2 px-2 text-xs font-medium uppercase">
            Dashboard
          </div>
          <ul className="space-y-1">
            {NavbarLinks.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.name}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cx([
                        'inline-flex w-full items-center space-x-2 rounded-md px-2 py-2 font-medium transition-opacity',
                        isActive
                          ? 'bg-primary/5 [&>svg]:text-foreground'
                          : 'hover:bg-primary/10 [&>svg]:text-muted-foreground',
                      ])
                    }
                  >
                    <Icon width={18} height={18} />
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <UserMenu user={user} />
    </div>
  );
}
