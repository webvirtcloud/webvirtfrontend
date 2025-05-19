import { createFileRoute } from '@tanstack/react-router';

import { FirewallRules } from '@/widgets/firewall';

export const Route = createFileRoute('/_authenticated/firewalls/$uuid/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { uuid } = Route.useParams();

  return <FirewallRules uuid={uuid} />;
}
