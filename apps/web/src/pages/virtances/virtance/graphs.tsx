import { VirtanceCPUGraph, getVirtanceCPUMetrics } from '@/entities/virtance';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Skeleton } from 'ui/components/skeleton';

export default function VirtanceGraphs() {
  const { id } = useParams();

  const { data: cpu } = useSWR(
    'virtance-cpu-metrics',
    () => getVirtanceCPUMetrics(Number(id)),
    {
      refreshInterval: 5000,
    },
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-2 text-lg font-medium">CPU Usage</h2>
        <div>
          {cpu ? (
            <VirtanceCPUGraph metrics={cpu.metrics} />
          ) : (
            <Skeleton className="h-[300px]" />
          )}
        </div>
      </div>
    </div>
  );
}
