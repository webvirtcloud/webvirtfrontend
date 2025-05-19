import { createFileRoute } from '@tanstack/react-router';

import { LoadbalancersVirtancesTable } from '@/widgets/loadbalancer';

export const Route = createFileRoute('/_authenticated/loadbalancers/$uuid/virtances')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoadbalancersVirtancesTable />;
}
