import { type ChangeEvent } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from 'ui/components/skeleton';
import { StatusDot } from 'ui/components/status-dot';
import { cx } from 'ui/lib';

import {
  type ActionType,
  useVirtance,
  useVirtanceAction,
  VirtanceOpenConsoleButton,
  VirtanceRebootButton,
  VirtanceToggleStateButton,
} from '@/entities/virtance';
import { formatMemorySize } from '@/shared/lib';
import { State } from '@/shared/ui/state';

export function VirtanceLayout() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { data: virtance, error } = useVirtance(Number(id));
  const { runAction } = useVirtanceAction();

  const navigate = useNavigate();

  const links = [
    { label: 'Overview', to: `/virtances/${id}`, end: true },
    { label: 'Graphs', to: `/virtances/${id}/graphs`, end: false },
    { label: 'Network', to: `/virtances/${id}/network`, end: false },
    { label: 'Snapshots', to: `/virtances/${id}/snapshots`, end: false },
    { label: 'Backups', to: `/virtances/${id}/backups`, end: false },
    { label: 'Resize', to: `/virtances/${id}/resize`, end: false },
    { label: 'History', to: `/virtances/${id}/history`, end: false },
    { label: 'Settings', to: `/virtances/${id}/settings`, end: false },
  ] as const;

  async function onRunAction(payload: ActionType) {
    runAction(payload);
  }

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
      <header className="mb-6 border-b pb-6 dark:border-neutral-800">
        {virtance ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
                <img
                  className="h-10 w-10"
                  src={
                    new URL(
                      `/src/shared/assets/images/os/${virtance.image.distribution
                        .toLowerCase()
                        .replaceAll(' ', '-')}.svg`,
                      import.meta.url,
                    ).href
                  }
                  alt={`Logo of Ubuntu`}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-medium">{virtance.name}</h1>
                  <StatusDot status={virtance.status} />
                </div>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {formatMemorySize(virtance.size.memory)} DDR4 / {virtance.size.disk}GB
                  SSD / {virtance.region.name} /{' '}
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {virtance.image.distribution} {virtance.image.name}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <VirtanceOpenConsoleButton id={virtance.id} />
              <VirtanceToggleStateButton
                onToggle={onRunAction}
                id={virtance.id}
                status={virtance.status}
              />
              <VirtanceRebootButton
                onToggle={onRunAction}
                id={virtance.id}
                status={virtance.status}
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
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-0">
        <div className="lg:col-span-2">
          <select
            name="virtance-menu"
            value={pathname}
            onChange={onMenuValueChange}
            className="w-full rounded-md border-neutral-300 bg-transparent dark:border-neutral-600 lg:hidden"
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
                        ? 'dark:bg-neutral-800 dark:text-white'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300',
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
