import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { VirtanceSettings } from '@/widgets/virtance';

export const Route = createFileRoute('/_authenticated/virtances/$id/settings')({
  params: z.object({
    id: z.coerce.number(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return <VirtanceSettings id={id} />;
}
