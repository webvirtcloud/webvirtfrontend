import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';
import type { User } from '../types';
import ArrowLeftOnRectangleIcon from '@heroicons/react/20/solid/ArrowLeftOnRectangleIcon';
import AdjustmentsHorizontalIcon from '@heroicons/react/20/solid/AdjustmentsHorizontalIcon';
import CommandLineIcon from '@heroicons/react/20/solid/CommandLineIcon';
import UserIcon from '@heroicons/react/20/solid/UserIcon';
import { Link } from 'react-router-dom';

type Props = {
  user: User | undefined;
};

export function UserMenu({ user }: Props) {
  const handleLogout = () => {
    window.localStorage.removeItem('token');

    window.location.href = '/sign-in';
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
          <UserIcon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings">
            <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/keypairs">
            <CommandLineIcon className="mr-2 h-4 w-4" />
            Keypairs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="h-8 w-32 animate-pulse rounded bg-neutral-100 dark:bg-neutral-800"></div>
  );
}
