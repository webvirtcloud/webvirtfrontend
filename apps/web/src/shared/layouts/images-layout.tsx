import { NavLink, Outlet } from 'react-router-dom';
import { cx } from 'ui/lib';

export function ImagesLayout() {
  const links = [
    { label: 'Snapshots', to: `/images/snapshots`, end: false },
    { label: 'Backups', to: `/images/backups`, end: false },
  ] as const;

  return (
    <div className="">
      <h2 className="mb-4 text-lg font-medium">Images</h2>
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
                  ? 'border-foreground text-foreground border-b'
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
