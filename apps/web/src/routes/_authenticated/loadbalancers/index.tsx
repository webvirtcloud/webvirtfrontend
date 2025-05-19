import { createFileRoute } from '@tanstack/react-router';

import { LoadbalancersTable } from '@/widgets/loadbalancer';

export const Route = createFileRoute('/_authenticated/loadbalancers/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoadbalancersTable />;
}
