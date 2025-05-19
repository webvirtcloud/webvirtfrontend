import { createFileRoute } from '@tanstack/react-router';

import { LoadbalancerCreateForm } from '@/widgets/loadbalancer';

export const Route = createFileRoute('/_authenticated/loadbalancers/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoadbalancerCreateForm />;
}
