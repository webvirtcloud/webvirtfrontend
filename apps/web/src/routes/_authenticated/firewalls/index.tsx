import { createFileRoute } from '@tanstack/react-router';

import { FirewallsTable } from '@/widgets/firewall';

export const Route = createFileRoute('/_authenticated/firewalls/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <FirewallsTable />;
}
