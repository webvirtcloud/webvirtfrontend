import { createFileRoute } from '@tanstack/react-router';

import { LoadbalancerSettings } from '@/widgets/loadbalancer';

export const Route = createFileRoute('/_authenticated/loadbalancers/$uuid/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoadbalancerSettings />;
}
