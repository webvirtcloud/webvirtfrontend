import { useParams } from 'react-router-dom';
import { cx } from 'ui/lib';

import { type VirtanceStatus, useVirtance } from '@/entities/virtance';
import { formatMemorySize } from '@/shared/lib/number';

export default function VirtanceOverviewPage() {
  const { id } = useParams();
  const { data: virtance } = useVirtance(Number(id));

  const VirtanceStatusClasses: Record<VirtanceStatus, string> = {
    active: 'text-green-400',
    pending: 'text-orange-300',
    inactive: 'text-red-400',
  } as const;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-lg font-medium">Overview</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Unique identifier</h4>
            <p className="font-medium">{virtance?.id}</p>
          </div>
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Name</h4>
            <p className="font-medium">{virtance?.name}</p>
          </div>
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Image</h4>
            <p className="font-medium">
              {virtance?.image.distribution} {virtance?.image.name}
            </p>
          </div>
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Status</h4>
            {virtance ? (
              <p className={cx(['font-medium', VirtanceStatusClasses[virtance.status]])}>
                {virtance.status}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Hardware</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">CPU</h4>
            <p className="font-medium">{virtance?.vcpu} core</p>
          </div>
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Memory</h4>
            {virtance ? (
              <p className="font-medium">{formatMemorySize(virtance.memory)}</p>
            ) : null}
          </div>
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Disk</h4>
            <p className="font-medium">{virtance?.disk}GB</p>
          </div>
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Size</h4>
            <p className="font-medium">{virtance?.size.slug}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Network</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Private IP</h4>
            <p className="font-medium">{virtance?.networks.v4[0].address}</p>
          </div>
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Public IP</h4>
            <p className="font-medium">{virtance?.networks.v4[1].address}</p>
          </div>
          <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm">
            <h4 className="text-muted-foreground font-medium">Compute IP</h4>
            <p className="font-medium">{virtance?.networks.v4[2].address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
