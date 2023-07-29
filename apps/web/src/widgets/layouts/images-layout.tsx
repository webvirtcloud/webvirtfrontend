import { ChangeEvent } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cx } from 'ui/lib';

export function ImagesLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function onMenuValueChange(e: ChangeEvent<HTMLSelectElement>) {
    navigate(e.target.value);
  }

  const links = [
    { label: 'Snapshots', to: `/images/snapshots`, end: false },
    { label: 'Backups', to: `/images/backups`, end: false },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl">
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
