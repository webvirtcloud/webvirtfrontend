import { ChangeEvent } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Skeleton } from 'ui/components/skeleton';
import { StatusDot } from 'ui/components/status-dot';
import { cx } from 'ui/lib/css';

import { useDatabase } from '@/entities/database';
import { State } from '@/shared/ui/state';

import { formatMemorySize } from '../lib/number';

export function DatabaseLayout() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: database, error } = useDatabase(id);

  const links = [
    { label: 'Overview', to: `/databases/${id}`, end: true },
    { label: 'Settings', to: `/databases/${id}/settings`, end: false },
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
                    <StatusDot status={database.event ? 'active' : 'pending'} />
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
          <ul className="hidden items-center gap-3 border-b pb-3 lg:flex">
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
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
