import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'ui/components/skeleton';

import {
  getVirtanceCPUMetrics,
  getVirtanceNetMetrics,
  VirtanceCPUGraph,
  virtanceQueries,
} from '@/entities/virtance';
import { getVirtanceDiskMetrics } from '@/entities/virtance/api/get-virtance-disk-metrics';
import { VirtanceDiskGraph } from '@/entities/virtance/ui/virtance-disk-graph';
import { VirtanceNetGraph } from '@/entities/virtance/ui/virtance-net-graph';

export default function VirtanceGraphsPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: cpu } = useQuery({
    queryKey: virtanceQueries.metrics.cpu(id),
    queryFn: () => getVirtanceCPUMetrics(id),
    refetchInterval: 5000,
  });

  const { data: net } = useQuery({
    queryKey: virtanceQueries.metrics.net(id),
    queryFn: () => getVirtanceNetMetrics(id),
    refetchInterval: 5000,
  });

  const { data: disk } = useQuery({
    queryKey: virtanceQueries.metrics.disk(id),
    queryFn: () => getVirtanceDiskMetrics(id),
    refetchInterval: 5000,
  });

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
