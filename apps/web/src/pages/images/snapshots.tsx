import { ImagesSnapshotsTable } from '@/widgets/images/snapshots-table';

export default function ImagesSnapshotsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Snapshots</h1>
      <ImagesSnapshotsTable />
    </div>
  );
}
