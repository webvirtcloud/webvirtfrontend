import { createFileRoute } from '@tanstack/react-router';

import {
  VirtanceCPUGraph,
  VirtanceDiskGraph,
  VirtanceMemoryGraph,
  VirtanceNetGraphs,
} from '@/entities/virtance';

export const Route = createFileRoute('/_authenticated/virtances/$id/graphs')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const id = Number(params.id);

  return (
    <div className="space-y-8">
      <VirtanceCPUGraph virtanceId={id} />
      <VirtanceMemoryGraph virtanceId={id} />
      <VirtanceNetGraphs virtanceId={id} />
      <VirtanceDiskGraph virtanceId={id} />
    </div>
  );
}
