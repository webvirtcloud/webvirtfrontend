import AdjustmentsHorizontalIcon from '@heroicons/react/20/solid/AdjustmentsHorizontalIcon';
import ArrowLeftOnRectangleIcon from '@heroicons/react/20/solid/ArrowLeftOnRectangleIcon';
import CommandLineIcon from '@heroicons/react/20/solid/CommandLineIcon';
import CreditCardIcon from '@heroicons/react/20/solid/CreditCardIcon';
import UserIcon from '@heroicons/react/20/solid/UserIcon';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';

import type { User } from '../types';

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
        <button className="flex h-8 items-center justify-center gap-2 rounded-full border px-4 dark:border-neutral-700">
          <UserIcon className="h-4 w-4" />
          <span className="truncate font-medium">{user.email}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="top">
        <DropdownMenuItem asChild>
          <Link to="/settings">
            <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/billing">
            <CreditCardIcon className="mr-2 h-4 w-4" />
            Billing
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
    <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
  );
}
