import { HTMLAttributes, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cx } from 'ui/lib';

import { UserMenu, useUser } from '@/entities/user';

import { NavbarLinks } from '../config';

export function Sidebar({ className }: HTMLAttributes<HTMLDivElement>) {
  const [isEpxanded, setIsExpanded] = useState(false);

  const { data: user } = useUser({ refetchOnMount: false });

  return (
    <div
      className={cx([
        'fixed top-0 z-10 flex h-screen w-56 -translate-x-full transform flex-col gap-4 self-start border-r bg-white p-4 transition-transform lg:sticky lg:translate-x-0 dark:border-neutral-800 dark:bg-neutral-900',
        className,
        isEpxanded ? 'static translate-x-0' : '',
      ])}
    >
      <Link className="inline-flex items-center space-x-4 pl-1" to="/">
        <img
          className="w-8"
          src={new URL('/src/shared/assets/images/logo.svg', import.meta.url).href}
          alt="Logotype"
        />
        <span className="font-medium">WebVirtCloud</span>
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
