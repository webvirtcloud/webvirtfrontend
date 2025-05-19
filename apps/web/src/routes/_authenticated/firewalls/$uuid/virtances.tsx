import { createFileRoute } from '@tanstack/react-router';

import { FirewallVirtances } from '@/widgets/firewall';

export const Route = createFileRoute('/_authenticated/firewalls/$uuid/virtances')({
  component: RouteComponent,
});

function RouteComponent() {
  const { uuid } = Route.useParams();

  return <FirewallVirtances uuid={uuid} />;
}
