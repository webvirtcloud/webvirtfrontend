import useSWR from 'swr';
import {
  VirtanceCPUGraph,
  getVirtanceCPUMetrics,
  getVirtanceNetMetrics,
} from '@/entities/virtance';
import { getVirtanceDiskMetrics } from '@/entities/virtance/api/get-virtance-disk-metrics';
import { VirtanceDiskGraph } from '@/entities/virtance/ui/virtance-disk-graph';
import { VirtanceNetGraph } from '@/entities/virtance/ui/virtance-net-graph';
import { useParams } from 'react-router-dom';
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

  const { data: net } = useSWR(
    'virtance-net-metrics',
    () => getVirtanceNetMetrics(Number(id)),
    {
      refreshInterval: 5000,
    },
  );

  const { data: disk } = useSWR(
    'virtance-disk-metrics',
    () => getVirtanceDiskMetrics(Number(id)),
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
      <div>
        <h2 className="mb-2 text-lg font-medium">Public Network</h2>
        <div>
          {net ? (
            <VirtanceNetGraph metrics={net.metrics[0]} />
          ) : (
            <Skeleton className="h-[300px]" />
          )}
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-medium">Private Network</h2>
        <div>
          {net ? (
            <VirtanceNetGraph metrics={net.metrics[1]} />
          ) : (
            <Skeleton className="h-[300px]" />
          )}
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-medium">Disk IO</h2>
        <div>
          {disk ? (
            <VirtanceDiskGraph metrics={disk.metrics[0]} />
          ) : (
            <Skeleton className="h-[300px]" />
          )}
        </div>
      </div>
    </div>
  );
}
