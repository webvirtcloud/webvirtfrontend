import { createFileRoute } from '@tanstack/react-router';

import { ImagesSnapshotsTable } from '@/widgets/images';

export const Route = createFileRoute('/_authenticated/images/snapshots')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Snapshots</h1>
      <ImagesSnapshotsTable />
    </div>
  );
}
