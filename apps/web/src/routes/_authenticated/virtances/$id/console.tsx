import { createFileRoute } from '@tanstack/react-router';

import { VirtanceConsole } from '@/entities/virtance';

export const Route = createFileRoute('/_authenticated/virtances/$id/console')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <VirtanceConsole id={id} />;
}
