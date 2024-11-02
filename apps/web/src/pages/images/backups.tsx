import { ImagesBackupsTable } from '@/widgets/images';

export default function ImagesBackupsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Backups</h1>
      <ImagesBackupsTable />
    </div>
  );
}
