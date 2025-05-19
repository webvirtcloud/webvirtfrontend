import { createFileRoute } from '@tanstack/react-router';
import { Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { ChangeEvent } from 'react';
import { SelectNative } from 'ui/components/select-native';
import { Skeleton } from 'ui/components/skeleton';
import { StatusDot } from 'ui/components/status-dot';

import { useDatabase } from '@/entities/database';
import { formatMemorySize } from '@/shared/lib';
import { State } from '@/shared/ui/state';

export const Route = createFileRoute('/_authenticated/databases/$uuid')({
  component: RouteComponent,
});

function RouteComponent() {
  const { uuid } = Route.useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: database, error } = useDatabase(uuid);

  const links = [
    { label: 'Overview', to: `/databases/$uuid`, exact: true },
    { label: 'Snapshots', to: `/databases/$uuid/snapshots`, exact: false },
    { label: 'Backups', to: `/databases/$uuid/backups`, exact: false },
    { label: 'Settings', to: `/databases/$uuid/settings`, exact: false },
  ] as const;

  function onMenuValueChange(e: ChangeEvent<HTMLSelectElement>) {
    navigate({ to: e.target.value });
  }

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display virtance at this time for some reason."
      />
    );
  }
  return (
    <div className="mx-auto max-w-6xl">
      <header className="">
        {database ? (
          <>
            <div className="mb-6 flex space-x-2 truncate font-medium">
              <Link
                to="/databases"
                className="text-highlight decoration-highlight/50 hover:decoration-highlight underline underline-offset-4"
              >
                All databases
              </Link>
              <span className="text-muted-foreground">/</span>
              <span>{database.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-muted/50 flex h-14 w-14 shrink-0 items-center justify-center rounded">
                  <img
                    className="h-10 w-10"
                    src={
                      new URL(
                        `/src/shared/assets/images/engines/${
                          database.engine.slug.split('-')[0]
                        }.svg`,
                        import.meta.url,
                      ).href
                    }
                    alt={`Logo of ${database.engine.name}`}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-semibold">{database.name}</h1>
                    <StatusDot status={database.event ? 'pending' : 'active'} />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {formatMemorySize(database.size.memory)} DDR4 / {database.size.disk}GB
                    SSD / {database.region.name} /{' '}
                    <span className="text-foreground font-medium">
                      {database.engine.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
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
      <div className="">
        <div className="py-6">
          <SelectNative
            name="virtance-menu"
            value={pathname}
            onChange={onMenuValueChange}
            className="border-border/70 w-full rounded-md border bg-transparent lg:hidden"
          >
            {links.map((link) => (
              <option value={link.to} key={link.label}>
                {link.label}
              </option>
            ))}
          </SelectNative>
          <ul className="hidden items-center gap-3 border-b pb-3 lg:flex">
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
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
