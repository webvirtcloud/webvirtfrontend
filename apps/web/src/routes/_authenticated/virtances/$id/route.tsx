import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { ChangeEvent } from 'react';
import { SelectNative } from 'ui/components/select-native';
import { Skeleton } from 'ui/components/skeleton';
import { StatusDot } from 'ui/components/status-dot';
import { z } from 'zod';

import {
  ActionType,
  useVirtance,
  useVirtanceAction,
  VirtanceOpenConsoleButton,
  VirtanceRebootButton,
  VirtanceToggleStateButton,
} from '@/entities/virtance';
import { formatMemorySize } from '@/shared/lib';
import { GlobalLoader } from '@/shared/ui/global-loader';
import { State } from '@/shared/ui/state';

export const Route = createFileRoute('/_authenticated/virtances/$id')({
  params: z.object({
    id: z.coerce.number(),
  }),
  pendingComponent: GlobalLoader,
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: '/_authenticated/virtances/$id' });
  const { pathname } = useLocation();
  const { data: virtance, error } = useVirtance(id);
  const { runAction } = useVirtanceAction();

  const navigate = useNavigate();

  const links = [
    { label: 'Overview', to: `/virtances/$id`, exact: true },
    { label: 'Graphs', to: `/virtances/$id/graphs`, exact: false },
    { label: 'Network', to: `/virtances/$id/network`, exact: false },
    { label: 'Snapshots', to: `/virtances/$id/snapshots`, exact: false },
    { label: 'Backups', to: `/virtances/$id/backups`, exact: false },
    { label: 'Resize', to: `/virtances/$id/resize`, exact: false },
    { label: 'History', to: `/virtances/$id/history`, exact: false },
    { label: 'Settings', to: `/virtances/$id/settings`, exact: false },
  ] as const;

  async function onRunAction(payload: ActionType) {
    runAction(payload);
  }

  function onMenuValueChange(e: ChangeEvent<HTMLSelectElement>) {
    navigate({ to: e.target.value, params: { id } });
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
        {virtance ? (
          <>
            <div className="mb-6 flex space-x-2 truncate font-medium">
              <Link
                to="/"
                className="text-ring decoration-ring/50 hover:decoration-ring underline underline-offset-4"
              >
                All virtances
              </Link>
              <span className="text-muted-foreground">/</span>
              <span>{virtance.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-muted/50 flex h-14 w-14 shrink-0 items-center justify-center rounded">
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
                    <h1 className="text-xl font-semibold">{virtance.name}</h1>
                    <StatusDot status={virtance.status} />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {formatMemorySize(virtance.size.memory)} DDR4 / {virtance.size.disk}GB
                    SSD / {virtance.region.name} /{' '}
                    <span className="text-foreground font-medium">
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
                  params={{ id }}
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
