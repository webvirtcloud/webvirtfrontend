import ClipboardIcon from '@heroicons/react/20/solid/ClipboardIcon';
import GlobeIcon from '@heroicons/react/20/solid/GlobeAmericasIcon';
import MapPinIcon from '@heroicons/react/20/solid/MapPinIcon';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { type ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';
import { StatusDot } from 'ui/components/status-dot';

import { type Virtance } from '@/entities/virtance';
import { formatMemorySize } from '@/shared/lib';

type Props = {
  to: string;
  virtance: Virtance;
  actions?: ReactNode;
};

export function VirtanceCard({ virtance, to, actions }: Props) {
  const [_, copyToClipboard] = useCopyToClipboard();

  const getIpAddress = () =>
    virtance.networks.v4.find((ip) => ip.type === 'public')?.address;

  function copyIpAdress(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    const address = getIpAddress();

    if (address) {
      copyToClipboard(address);
      toast.success('IP address was copied to clipboard.');
    }
  }

  return (
    <div className="hover:ring-ring hover:border-ring relative flex min-h-[160px] flex-col justify-between rounded-lg border p-6 transition-all duration-300 hover:ring-1">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <div className="bg-muted flex h-12 w-12 items-center justify-center rounded">
              <img
                className="h-8 w-8"
                src={
                  new URL(
                    `/src/shared/assets/images/os/${virtance.image.distribution
                      .toLowerCase()
                      .replaceAll(' ', '-')}.svg`,
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
              <p className="text-muted-foreground text-sm">
                {formatMemorySize(virtance.size.memory)} DDR4 / {virtance.size.disk}GB SSD
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-[2] flex items-center space-x-1">{actions}</div>
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
          <Button
            onClick={copyIpAdress}
            variant="outline"
            className="relative z-[2] h-6 w-6"
            size="icon"
          >
            <ClipboardIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className="text-muted-foreground"
          title={format(parseISO(virtance.created_at), "E, MMMM d 'at' h:m a")}
        >
          Created{' '}
          {formatDistanceToNow(parseISO(virtance.created_at), { addSuffix: true })}
        </span>
      </div>

      <Link to={to} className="absolute inset-0 z-[1]" />
    </div>
  );
}
