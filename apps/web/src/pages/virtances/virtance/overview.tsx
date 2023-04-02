import { useVirtance } from '@/entities/virtance';
import { useParams } from 'react-router-dom';
import { cx } from 'ui/lib';

export default function VirtanceOverview() {
  const { id } = useParams();
  const { virtance } = useVirtance(Number(id));

  enum VirtanceStatusStyle {
    'active' = 'text-green-400',
    'pending' = 'text-orange-300',
    'inactive' = 'text-red-400',
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-lg font-medium">Overview</h2>
        {/* <p className="mb-8 dark:text-neutral-400">Quick summary of this virtance.</p> */}
        {/* <div className="rounded-xl border p-6 dark:border-neutral-700">overview</div> */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">
              Unique identifier
            </h4>
            <p className="font-medium">{virtance?.id}</p>
          </div>
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">Name</h4>
            <p className="font-medium">{virtance?.name}</p>
          </div>
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">Image</h4>
            <p className="font-medium">
              {virtance?.image.distribution} {virtance?.image.name}
            </p>
          </div>
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">Status</h4>
            {virtance ? (
              <p className={cx(['font-medium', VirtanceStatusStyle[virtance.status]])}>
                {virtance.status}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Hardware</h2>
        {/* <p className="mb-8 dark:text-neutral-400">Quick summary of this virtance.</p> */}
        {/* <div className="rounded-xl border p-6 dark:border-neutral-700">overview</div> */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">vCPU</h4>
            <p className="font-medium">{virtance?.vcpu} core</p>
          </div>
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">Memory</h4>
            <p className="font-medium">{virtance?.memory}</p>
          </div>
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">Disk</h4>
            <p className="font-medium">{virtance?.disk} GB</p>
          </div>
          <div className="space-y-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <h4 className="font-medium text-neutral-500 dark:text-neutral-400">Size</h4>
            <p className="font-medium">{virtance?.size.slug}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Network</h2>
        {/* <p className="mb-8 dark:text-neutral-400">Quick summary of this virtance.</p> */}
        {/* <div className="rounded-xl border p-6 dark:border-neutral-700">overview</div> */}
        <div className="grid grid-cols-4 gap-4">
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
    </div>
  );
}
