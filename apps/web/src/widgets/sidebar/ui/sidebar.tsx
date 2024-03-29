import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { HTMLAttributes, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from 'ui/components/button';
import { cn, cx } from 'ui/lib';

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
        'fixed top-0 z-10 flex h-screen w-56 transform flex-col gap-4 self-start border-r bg-white p-4 transition-transform lg:sticky lg:translate-x-0 dark:border-neutral-800 dark:bg-neutral-900',
        className,
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ])}
    >
      <Button
        onClick={() => closeSidebar()}
        size="icon"
        className={cn([
          'text-muted-foreground absolute -right-10 top-5 h-7 w-7 transition-all lg:pointer-events-none',
          isSidebarOpen
            ? 'translate-x-0 opacity-100 lg:-translate-x-12 lg:opacity-0'
            : '-translate-x-12 opacity-0',
        ])}
        variant="secondary"
      >
        <XMarkIcon className="h-4 w-4" />
      </Button>

      <Link className="inline-flex items-center space-x-4 pl-1" to="/">
        <img
          className="w-8"
          src={new URL('/src/shared/assets/images/logo.svg', import.meta.url).href}
          alt="Logotype"
        />
        <span className="text-base font-semibold">WebVirtCloud</span>
      </Link>

      <nav className="flex-1 overflow-y-auto">
        <div>
          <div className="mb-2 px-2 text-xs font-medium uppercase text-neutral-500">
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
                          ? ' bg-neutral-100  dark:bg-neutral-800 [&>svg]:text-black dark:[&>svg]:text-white'
                          : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-500 dark:hover:bg-neutral-800/50 [&>svg]:text-neutral-500',
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
