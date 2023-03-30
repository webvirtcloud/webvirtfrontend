import { useVirtance } from '@/entities/virtance';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { cx } from 'ui/lib';

export function VirtanceLayout() {
  const { id } = useParams();
  const { virtance } = useVirtance(Number(id));

  const links = [
    { label: 'Overview', to: `/virtances/${id}` },
    { label: 'Graphs', to: `/virtances/${id}/graphs` },
    { label: 'Network', to: `/virtances/${id}/network` },
    { label: 'Snapshots', to: `/virtances/${id}/snapshots` },
    { label: 'Backups', to: `/virtances/${id}/backups` },
    { label: 'Resize', to: `/virtances/${id}/resize` },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 border-b pb-6 dark:border-neutral-800">
        {virtance ? (
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
              <h1 className="text-xl font-medium">{virtance.name}</h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                {virtance.size.memory}GB DDR4 / {virtance.size.disk}GB SSD /{' '}
                {virtance.region.name} /{' '}
                <span className="font-medium dark:text-white">
                  {virtance.image.distribution} {virtance.image.name}
                </span>
              </p>
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
                        : 'hover:text-neutral-300 dark:text-neutral-500',
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
