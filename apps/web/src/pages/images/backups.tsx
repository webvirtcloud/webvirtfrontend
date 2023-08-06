import { ImagesBackupsTable } from '@/widgets/images/backups-table';

export default function () {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Backups</h1>
      <ImagesBackupsTable />
    </div>
  );
}
