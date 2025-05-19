import { createFileRoute } from '@tanstack/react-router';

import { FloatingIpsTable } from '@/widgets/floating-ip';

export const Route = createFileRoute('/_authenticated/floating-ips')({
  component: RouteComponent,
});

function RouteComponent() {
  return <FloatingIpsTable />;
}
