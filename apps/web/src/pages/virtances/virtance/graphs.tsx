import { VirtanceCPUGraph, getVirtanceCPUData } from '@/entities/virtance';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Skeleton } from 'ui/components/skeleton';

export default function VirtanceGraphs() {
  const { id } = useParams();

  const { data } = useSWR('virtance-cpu-metrics', () => getVirtanceCPUData(Number(id)), {
    refreshInterval: 5000,
  });
  return (
    <div>
      <h2 className="mb-2 text-lg font-medium">CPU Usage</h2>
      <div>
        {data ? (
          <VirtanceCPUGraph metrics={data.metrics} />
        ) : (
          <Skeleton className="h-[300px]" />
        )}
      </div>
    </div>
  );
}
