import { Link } from '@tanstack/react-router';
import {
  LucideChevronsUpDown,
  LucideCreditCard,
  LucideFileKey2,
  LucideLogOut,
  LucideSettings,
} from 'lucide-react';
import { Button } from 'ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';

import { UserMenuSub } from '@/entities/user/ui/user-menu-sub';

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
        <Button className="h-12 w-full gap-2 p-2" size="lg" variant="ghost">
          <UserMenuProfilePreview user={user} />
          <LucideChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserMenuProfilePreview user={user} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings">
            <LucideSettings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/billing">
            <LucideCreditCard className="mr-2 h-4 w-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/keypairs">
            <LucideFileKey2 className="mr-2 h-4 w-4" />
            Keypairs
          </Link>
        </DropdownMenuItem>
        <UserMenuSub />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LucideLogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
  );
}

function UserMenuProfilePreview({ user }: { user: User }) {
  return (
    <>
      <div className="bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
        {user.first_name?.charAt(0).toUpperCase() ??
          user.first_name.charAt(0).toUpperCase()}
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        {user.first_name && user.last_name && (
          <span className="truncate font-semibold">
            {user.first_name} {user.last_name}
          </span>
        )}
        <span className="text-muted-foreground truncate text-xs">{user.email}</span>
      </div>
    </>
  );
}
