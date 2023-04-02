import { type ActionType, useVirtance } from '@/entities/virtance';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { cx } from 'ui/lib';
import { StatusDot } from 'ui/components/status-dot';
import { VirtanceToggleStateButton } from '@/entities/virtance/';

export function VirtanceLayout() {
  const { id } = useParams();
  const { virtance, runAction } = useVirtance(Number(id));

  const links = [
    { label: 'Overview', to: `/virtances/${id}` },
    { label: 'Graphs', to: `/virtances/${id}/graphs` },
    { label: 'Network', to: `/virtances/${id}/network` },
    { label: 'Snapshots', to: `/virtances/${id}/snapshots` },
    { label: 'Backups', to: `/virtances/${id}/backups` },
    { label: 'Resize', to: `/virtances/${id}/resize` },
  ] as const;

  async function onToggleState(payload: {
    id: number;
    action: 'power_off' | 'power_on';
  }) {
    runAction(payload);
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
                      `/src/shared/assets/images/os/${virtance.image.distribution.toLowerCase()}.svg`,
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
                  {virtance.size.memory}GB DDR4 / {virtance.size.disk}GB SSD /{' '}
                  {virtance.region.name} /{' '}
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {virtance.image.distribution} {virtance.image.name}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <VirtanceToggleStateButton
                onToggle={onToggleState}
                id={virtance.id}
                status={virtance.status}
              />
            </div>
          </div>
        ) : null}
      </header>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <ul className="flex flex-col items-start gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
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
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
