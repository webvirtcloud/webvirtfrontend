import { useParams } from 'react-router-dom';

import { useVirtanceHistory, VirtanceHistoryTable } from '@/entities/virtance';
import { State } from '@/shared/ui/state';

export default function VirtanceHistoryPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, error } = useVirtanceHistory(id);

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display virtance's history at this time for some reason."
      />
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-medium">History</h2>

      <VirtanceHistoryTable data={data} />
    </div>
  );
}
