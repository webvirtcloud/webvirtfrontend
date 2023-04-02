import ClipboardIcon from '@heroicons/react/20/solid/ClipboardIcon';
import GlobeIcon from '@heroicons/react/20/solid/GlobeAmericasIcon';
import MapPinIcon from '@heroicons/react/20/solid/MapPinIcon';
import type { Virtance } from '@/entities/virtance';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from 'ui/lib';
import { StatusDot } from 'ui/components/status-dot';

type Props = {
  to: string;
  virtance: Virtance;
  actions?: ReactNode;
};

export function VirtanceCard({ virtance, to, actions }: Props) {
  const isActive = () => virtance.status === 'active';
  const isPending = () => virtance.status === 'pending';

  const getIpAddress = () =>
    virtance.networks.v4.find((ip) => ip.type === 'public')?.address;

  return (
    <Link
      to={to}
      className="flex min-h-[160px] flex-col justify-between rounded-lg border p-6 transition-all duration-300 hover:border-sky-500 hover:ring-1 hover:ring-sky-500 dark:border-neutral-700"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
              <img
                className="h-8 w-8"
                src={
                  new URL(
                    `/src/shared/assets/images/os/${virtance.image.distribution.toLowerCase()}.svg`,
                    import.meta.url,
                  ).href
                }
                alt={`Logo of ${virtance.image.distribution}`}
              />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">{virtance.name}</h3>
                <StatusDot status={virtance.status} />
              </div>
              <p className="text-sm text-neutral-500">
                {virtance.size.memory}GB DDR4 / {virtance.size.disk}GB SSD
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">{actions}</div>
      </div>

      <div className="flex items-center space-x-3 text-sm">
        <div className="flex items-center space-x-1">
          <span className="opacity-30">
            <MapPinIcon className="h-4 w-4" />
          </span>
          <span className="">{virtance.region.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="opacity-30">
            <GlobeIcon className="h-4 w-4" />
          </span>
          <span className="">{getIpAddress()}</span>
          <button
            type="button"
            className="dark:bg-neutral-8002 flex h-5 w-5 items-center justify-center rounded-md bg-neutral-100 p-0.5 transition-colors duration-300 hover:bg-neutral-100 dark:bg-neutral-800"
          >
            <ClipboardIcon className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className="text-neutral-500"
          title={format(parseISO(virtance.created_at), "E, MMMM d 'at' h:m a")}
        >
          Created{' '}
          {formatDistanceToNow(parseISO(virtance.created_at), { addSuffix: true })}
        </span>
      </div>
    </Link>
  );
}
