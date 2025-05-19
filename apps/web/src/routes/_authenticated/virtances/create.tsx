import { createFileRoute } from '@tanstack/react-router';

import { VirtanceCreate } from '@/widgets/virtance';

export const Route = createFileRoute('/_authenticated/virtances/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <VirtanceCreate />;
}
