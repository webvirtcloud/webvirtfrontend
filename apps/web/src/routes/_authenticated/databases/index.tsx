import { createFileRoute } from '@tanstack/react-router';

import { DatabasesList } from '@/widgets/database';

export const Route = createFileRoute('/_authenticated/databases/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DatabasesList />;
}
