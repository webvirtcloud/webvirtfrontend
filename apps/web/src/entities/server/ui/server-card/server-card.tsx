import ClipboardIcon from '@heroicons/react/20/solid/ClipboardIcon';
import EllipsisVerticalIcon from '@heroicons/react/20/solid/EllipsisVerticalIcon';
import GlobeIcon from '@heroicons/react/20/solid/GlobeAmericasIcon';
import MapPinIcon from '@heroicons/react/20/solid/MapPinIcon';
import PauseIcon from '@heroicons/react/20/solid/PauseIcon';
import PlayIcon from '@heroicons/react/20/solid/PlayIcon';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import type { Server } from '@/api/servers';
import { Button } from '@/shared/ui/Button';

type Props = {
  to: string;
  server: Server;
};

export function ServerCard({ server, to }: Props) {
  const isActive = (server: Server) => server.status === 'active';
  const getIpAddress = () =>
    server.network.ipv4.find((ip) => ip.type === 'public')?.address;

  const toggleOptions = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const toggleStatus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Link
      to={to}
      css={tw`min-h-[160px] flex flex-col justify-between bg-base rounded-lg hover:ring-1 hover:ring-blue-700 border hover:border-blue-700 transition-all duration-300 p-4`}
    >
      <div css={tw`flex items-start justify-between`}>
        <div>
          <div css={tw`flex items-center space-x-2`}>
            <div css={tw`flex items-center justify-center w-12 h-12 rounded bg-alt`}>
              <img
                css={tw`w-8 h-8`}
                src={
                  new URL(
                    `/src/shared/assets/images/os/${server.distribution.name.toLowerCase()}.svg`,
                    import.meta.url,
                  ).href
                }
                alt={`Logo of ${server.distribution.name}`}
              />
            </div>
            <div css={tw`space-y-0.5`}>
              <h3 css={tw`font-bold`}>{server.name}</h3>
              <p css={tw`text-xs text-alt2`}>
                {server.size.memory}GB DDR4 / {server.size.storage}GB SSD
              </p>
            </div>
          </div>
        </div>

        <div css={tw`flex items-center space-x-2`}>
          <Button
            variant={isActive(server) ? 'default' : 'danger'}
            onlyIcon
            onClick={toggleStatus}
          >
            {isActive(server) ? (
              <PlayIcon css={tw`w-5 h-5 text-green-500`} />
            ) : (
              <PauseIcon css={tw`w-5 h-5 text-red-500`} />
            )}
          </Button>
          <Button onlyIcon variant="secondary" onClick={toggleOptions}>
            <EllipsisVerticalIcon css={tw`w-5 h-5`} />
          </Button>
        </div>
      </div>

      <div css={tw`flex items-center space-x-3 text-sm`}>
        <div css={tw`flex items-center space-x-1`}>
          <span css={tw`opacity-30`}>
            <MapPinIcon css={tw`w-4 h-4`} />
          </span>
          <span css={tw`text-alt`}>{server.region.name}</span>
        </div>
        <div css={tw`flex items-center space-x-1`}>
          <span css={tw`opacity-30`}>
            <GlobeIcon css={tw`w-4 h-4`} />
          </span>
          <span css={tw`text-alt`}>{getIpAddress()}</span>
          <button
            type="button"
            css={tw`h-5 w-5 flex items-center justify-center bg-alt hover:bg-alt2 rounded-md transition-colors duration-300 p-0.5`}
          >
            <ClipboardIcon css={tw`w-3 h-3`} />
          </button>
        </div>
      </div>

      <div css={tw`flex items-center justify-between`}>
        <ul>
          {server.tags.length ? (
            server.tags.map((tag) => (
              <li
                key={tag}
                css={tw`inline-block px-2 py-1 text-xs rounded-full bg-alt text-body`}
              >
                {tag}
              </li>
            ))
          ) : (
            <li css={tw`inline-block px-2 py-1 text-xs rounded-full bg-alt text-body`}>
              No tags
            </li>
          )}
        </ul>
        <span
          css={tw`text-alt2`}
          title={format(parseISO(server.created_at), "E, MMMM d 'at' h:m a")}
        >
          Created {formatDistanceToNow(parseISO(server.created_at), { addSuffix: true })}
        </span>
      </div>
    </Link>
  );
}
