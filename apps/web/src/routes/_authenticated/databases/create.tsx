import { createFileRoute } from '@tanstack/react-router';

import { DatabaseCreateForm } from '@/widgets/database';

export const Route = createFileRoute('/_authenticated/databases/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DatabaseCreateForm />;
}
