import EllipsisVerticalIcon from '@heroicons/react/20/solid/EllipsisVerticalIcon';
import ShieldCheckIcon from '@heroicons/react/20/solid/ShieldCheckIcon';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Outlet, useNavigate, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';
import { Skeleton } from 'ui/components/skeleton';

import {
  deleteFirewall,
  FirewallDeleteAlertDialog,
  useFirewall,
  useIsFirewallBusy,
} from '@/entities/firewall';
import { State } from '@/shared/ui/state';

export const Route = createFileRoute('/_authenticated/firewalls/$uuid')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { uuid } = useParams({ from: '/_authenticated/firewalls/$uuid' });
  const { data: firewall, error } = useFirewall(uuid);
  const isBusy = useIsFirewallBusy(firewall);
  const navigate = useNavigate();

  function openDeleteDialog() {
    setDeleteDialogOpen(true);
  }

  async function onDelete() {
    firewall && (await deleteFirewall(firewall.uuid));

    toast.success('Firewall has been deleted.');

    navigate({ to: '/firewalls' });
  }

  const links = [
    { label: 'Rules', to: `/firewalls/$uuid`, exact: true },
    { label: 'Virtances', to: `/firewalls/$uuid/virtances`, exact: false },
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
      <ul className="mb-6 hidden items-center gap-3 border-b pb-3 lg:flex">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              params={{ uuid }}
              activeOptions={{ exact: link.exact }}
              className="[&.active]:bg-primary/5 [&.active]:text-primary text-muted-foreground hover:bg-primary/5 hover:text-foreground rounded-md px-2 py-1.5 font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
