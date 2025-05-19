import { createFileRoute } from '@tanstack/react-router';

import { DatabaseBackupsTable } from '@/widgets/database';

export const Route = createFileRoute('/_authenticated/databases/$uuid/backups')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DatabaseBackupsTable />
    </div>
  );
}
