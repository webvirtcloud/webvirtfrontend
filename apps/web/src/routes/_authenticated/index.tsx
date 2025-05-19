import { createFileRoute } from '@tanstack/react-router';

import { VirtancesList } from '@/widgets/virtance';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <VirtancesList />;
}
