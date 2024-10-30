import { useParams } from 'react-router-dom';

import {
  VirtanceCPUGraph,
  VirtanceDiskGraph,
  VirtanceMemoryGraph,
  VirtanceNetGraphs,
} from '@/entities/virtance';

export default function VirtanceGraphsPage() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className="space-y-8">
      <VirtanceCPUGraph virtanceId={id} />
      <VirtanceMemoryGraph virtanceId={id} />
      <VirtanceNetGraphs virtanceId={id} />
      <VirtanceDiskGraph virtanceId={id} />
    </div>
  );
}
