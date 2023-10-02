import ShieldCheckIcon from '@heroicons/react/20/solid/ShieldCheckIcon';
import KeypairsIcon from '@heroicons/react/20/solid/CommandLineIcon';
import ListIcon from '@heroicons/react/20/solid/QueueListIcon';
import ServerStackIcon from '@heroicons/react/20/solid/ServerStackIcon';
import { Link, NavLink } from 'react-router-dom';
import { cx } from 'ui/lib';
import { links } from './config';
import { UserMenu, useUser } from '@/entities/user';
import { Skeleton } from 'ui/components/skeleton';

export function Navbar() {
  const { data: user } = useUser();

  return (
    <nav className="sticky left-0 right-0 top-0 z-10 flex flex-col justify-between border-b bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="mb-4 flex items-center space-x-4">
            <Link className="inline-flex items-center justify-center space-x-4" to="/">
              <img
                className="w-8"
                src={new URL('/src/shared/assets/images/logo.svg', import.meta.url).href}
                alt="Logotype"
              />
            </Link>
            <div className="dark:bg-neutral-8002 h-6 w-px bg-neutral-100 dark:bg-neutral-700"></div>
            {user ? (
              <div className="font-medium">{user.email}</div>
            ) : (
              <Skeleton className="h-5 w-32" />
            )}
          </div>
          <UserMenu user={user} />
        </div>

        <ul className="flex items-center space-x-2">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cx([
                    'inline-flex w-full items-center space-x-2 rounded-md px-2 py-1.5 font-medium transition-opacity',
                    isActive
                      ? ' bg-neutral-100 dark:bg-neutral-800'
                      : 'opacity-50 hover:opacity-100',
                  ])
                }
              >
                {link.name === 'Virtances' && <ListIcon width={18} height={18} />}
                {link.name === 'Keypairs' && <KeypairsIcon width={18} height={18} />}
                {link.name === 'Images' && <ServerStackIcon width={18} height={18} />}
                {link.name === 'Firewalls' && <ShieldCheckIcon width={18} height={18} />}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
