import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronsLeftRightEllipsisIcon } from 'lucide-react';
import { StatusDot } from 'ui/components/status-dot';

import { useVirtance } from '@/entities/virtance';
import { formatMemorySize } from '@/shared/lib';

export const Route = createFileRoute('/_authenticated/virtances/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: virtance } = useVirtance(id);

  if (!virtance) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="text-muted-foreground">Loading virtance data...</div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        <div className="rounded-md border">
          <div className="p-4 pb-0">
            <h3 className="text-base font-medium">System Information</h3>
          </div>
          <div className="grid gap-2 p-4 md:grid-cols-2">
            <div className="bg-muted rounded-md p-3">
              <div className="text-muted-foreground text-xs">Image</div>
              <div className="font-medium">
                {virtance.image.distribution} {virtance.image.name}
              </div>
            </div>
            <div className="bg-muted rounded-md p-3">
              <div className="text-muted-foreground text-xs">Status</div>
              <div className="flex items-center gap-2">
                <StatusDot status={virtance.status} />
                <span className="font-medium capitalize">{virtance.status}</span>
              </div>
            </div>
            <div className="bg-muted rounded-md p-3">
              <div className="text-muted-foreground text-xs">vCPU</div>
              <div className="font-medium">{virtance.size.vcpu} cores</div>
            </div>
            <div className="bg-muted rounded-md p-3">
              <div className="text-muted-foreground text-xs">Memory</div>
              <div className="font-medium">{formatMemorySize(virtance.size.memory)}</div>
            </div>
            <div className="bg-muted rounded-md p-3">
              <div className="text-muted-foreground text-xs">Disk</div>
              <div className="font-medium">{virtance.size.disk}GB</div>
            </div>
            <div className="bg-muted rounded-md p-3">
              <div className="text-muted-foreground text-xs">Region</div>
              <div className="font-medium">{virtance.region.slug}</div>
            </div>
          </div>
          <div className="bg-muted flex items-center justify-end gap-1.5 border-t p-3">
            <Link
              className="text-highlight text-sm font-medium underline underline-offset-4"
              to="/virtances/$id/settings"
              params={{ id }}
            >
              Manage configuration
            </Link>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="p-4 pb-0">
            <h3 className="text-base font-medium">Network Interfaces</h3>
          </div>
          <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2">
            {virtance.networks.v4.map((network, index) => (
              <div
                key={index}
                className="bg-muted flex items-center gap-2 rounded-md p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-semibold text-blue-600">
                  <ChevronsLeftRightEllipsisIcon className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-muted-foreground text-xs font-medium capitalize">
                    {network.type} IP
                  </div>
                  <div className="truncate font-mono text-sm font-medium">
                    {network?.address ?? '-'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="bg-muted flex items-center justify-end gap-1.5 border-t p-3">
            <Link
              className="text-highlight text-sm font-medium underline underline-offset-4"
              to={`/virtances/${id}/network`}
            >
              Manage network
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
