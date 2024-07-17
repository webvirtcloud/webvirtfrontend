import ScaleIcon from '@heroicons/react/20/solid/ScaleIcon';
import { type ChangeEvent } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from 'ui/components/skeleton';
import { cx } from 'ui/lib';

import { useLoadbalancer } from '@/entities/loadbalancer';
import { State } from '@/shared/ui/state';

export function LoadbalancerLayout() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { data: loadbalancer, error } = useLoadbalancer(id);

  const navigate = useNavigate();

  const links = [
    { label: 'Virtances', to: `/loadbalancers/${id}/virtances`, end: false },
    { label: 'Settings', to: `/loadbalancers/${id}/settings`, end: false },
  ] as const;

  function onMenuValueChange(e: ChangeEvent<HTMLSelectElement>) {
    navigate(e.target.value);
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
      <header className="mb-6 border-b pb-6">
        {loadbalancer ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-muted/50 flex h-14 w-14 shrink-0 items-center justify-center rounded">
                <ScaleIcon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-medium">{loadbalancer.name}</h1>
                </div>
                <p className="text-muted-foreground">
                  {loadbalancer.virtance_ids.length} virtances /{' '}
                  <span className="text-foreground font-medium">
                    {loadbalancer.region.name} {loadbalancer.ip}
                  </span>
                </p>
              </div>
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
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-0">
        <div className="lg:col-span-2">
          <select
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
          </select>
          <ul className="hidden flex-col items-start gap-3 lg:flex">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cx(
                      'rounded-md px-2 py-1.5 font-medium',
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
