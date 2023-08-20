import { VirtanceHistoryTable, useVirtance } from '@/entities/virtance';
import { getVirtanceHistory } from '@/entities/virtance/api/get-virtance-history';
import { State } from '@/shared/ui/state';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

export default function VirtanceHistory() {
  const { id } = useParams();
  const { virtance } = useVirtance(Number(id));

  const { data, error } = useSWR('virtance-history', () =>
    getVirtanceHistory(Number(id)).then((data) => data.virtance),
  );

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display virtance's history at this time for some reason."
      />
    );
  }

  return (
    <div className="">
      <h2 className="mb-4 text-lg font-medium">History</h2>

      <VirtanceHistoryTable data={data} />
    </div>
  );
}
