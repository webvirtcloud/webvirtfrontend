import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/images')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/images') {
      throw redirect({
        to: '/images/snapshots',
        replace: true,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const links = [
    { label: 'Snapshots', to: `/images/snapshots`, exact: false },
    { label: 'Backups', to: `/images/backups`, exact: false },
  ] as const;

  return (
    <div className="">
      <h2 className="mb-4 text-xl font-semibold">Images</h2>
      <ul className="mb-6 hidden items-center gap-3 border-b pb-3 lg:flex">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
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
