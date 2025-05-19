import { createFileRoute } from '@tanstack/react-router';

import { ImagesBackupsTable } from '@/widgets/images';

export const Route = createFileRoute('/_authenticated/images/backups')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Backups</h1>
      <ImagesBackupsTable />
    </div>
  );
}
