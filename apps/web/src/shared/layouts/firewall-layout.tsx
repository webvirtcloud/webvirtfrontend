import EllipsisVerticalIcon from '@heroicons/react/20/solid/EllipsisVerticalIcon';
import ShieldCheckIcon from '@heroicons/react/20/solid/ShieldCheckIcon';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';
import { Skeleton } from 'ui/components/skeleton';
import { cx } from 'ui/lib';

import {
  deleteFirewall,
  FirewallDeleteAlertDialog,
  useFirewall,
  useIsFirewallBusy,
} from '@/entities/firewall';
import { State } from '@/shared/ui/state';

export function FirewallLayout() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const params = useParams();
  const { data: firewall, error } = useFirewall(params.uuid!);
  const isBusy = useIsFirewallBusy(firewall);
  const navigate = useNavigate();

  function openDeleteDialog() {
    setDeleteDialogOpen(true);
  }

  async function onDelete() {
    firewall && (await deleteFirewall(firewall.uuid));

    toast.success('Firewall has been deleted.');

    navigate('/firewalls');
  }

  const links = [
    { label: 'Rules', to: ``, end: true },
    { label: 'Virtances', to: `virtances`, end: false },
  ] as const;

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display firewall at this time for some reason."
      />
    );
  }
  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-4">
        {firewall ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-medium">{firewall.name}</h1>
                </div>
                <p className="text-muted-foreground">
                  {firewall.inbound_rules.length + firewall.outbound_rules.length} rules /{' '}
                  {firewall.virtance_ids.length} virtances
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" disabled={isBusy} className="w-8 px-0">
                    <EllipsisVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={openDeleteDialog}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <FirewallDeleteAlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onDelete={onDelete}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 shrink-0" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-32 shrink-0" />
                </div>
                <Skeleton className="h-2 w-64 shrink-0" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 shrink-0" />
              <Skeleton className="h-8 w-8 shrink-0" />
              <Skeleton className="h-8 w-8 shrink-0" />
            </div>
          </div>
        )}
      </header>
      <div className="mb-6 flex items-center gap-4 border-b">
        {links.map((link) => (
          <NavLink
            to={link.to}
            end={link.end}
            key={link.label}
            className={({ isActive }) =>
              cx(
                'px-2 py-4 font-medium',
                isActive
                  ? 'text-foreground border-foreground border-b'
                  : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
