import { useParams } from 'react-router-dom';

import { useVirtance } from '@/entities/virtance';
import { VirtanceFirewall } from '@/widgets/virtance-firewall';

export default function VirtanceNetworkPage() {
  const { id } = useParams();
  const { data: virtance } = useVirtance(Number(id));

  return (
    <div className="space-y-8">
      <div className="">
        <h2 className="mb-4 text-lg font-medium">Network</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">
              Private IP
            </h4>
            <p className="font-medium">{virtance?.networks.v4[0].address}</p>
          </div>
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">
              Public IP
            </h4>
            <p className="font-medium">{virtance?.networks.v4[1].address}</p>
          </div>
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">
              Compute IP
            </h4>
            <p className="font-medium">{virtance?.networks.v4[2].address}</p>
          </div>
        </div>
      </div>
      <VirtanceFirewall id={Number(id)} />
    </div>
  );
}
