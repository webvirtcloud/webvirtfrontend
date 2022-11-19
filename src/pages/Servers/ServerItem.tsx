import 'twin.macro';

import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import type { Server } from '@/api/servers';
import { Clipboard, Elipsis, Location, Pause, Play, World } from '@/components/Icons';

type Props = {
  to: string;
  server: Server;
};

const ServerItem = ({ server, to }: Props): JSX.Element => {
  const isActive = (server: Server) => server.status === 'active';
  const getIpAddress = () =>
    server.network.ipv4.find((ip) => ip.type === 'public')?.address;

  const toggleOptions = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Link
      to={to}
      css={tw`min-h-[160px] flex flex-col justify-between bg-base rounded-lg ring-1 ring-black/5 hover:ring-cyan-500 border border-transparent hover:border-cyan-500 transition-all duration-300 p-4`}
    >
      <div css={tw`flex items-start justify-between`}>
        <div>
          <div css={tw`flex items-center space-x-2`}>
            <div css={tw`bg-alt h-12 w-12 flex items-center justify-center rounded`}>
              <img
                css={tw`w-8 h-8`}
                src={
                  new URL(
                    `/src/assets/images/os/${server.distribution.name.toLowerCase()}.svg`,
                    import.meta.url,
                  ).href
                }
                alt={`Logo of ${server.distribution.name}`}
              />
            </div>
            <div css={tw`space-y-0.5`}>
              <h3 css={tw`font-bold`}>{server.name}</h3>
              <p css={tw`text-xs text-alt`}>
                {server.size.memory}GB DDR4 / {server.size.storage}GB SSD
              </p>
            </div>
          </div>
        </div>

        <div css={tw`flex items-center space-x-2`}>
          <button
            type="button"
            css={[
              isActive(server) ? tw`text-green-500` : tw`text-red-500`,
              tw`bg-alt hover:bg-alt2 h-8 w-8 flex items-center justify-center transition-colors duration-300 rounded-md`,
            ]}
          >
            {isActive(server) ? <Play /> : <Pause />}
          </button>
          <button
            type="button"
            onClick={toggleOptions}
            css={tw`bg-alt hover:bg-alt2 h-8 w-8 flex items-center justify-center transition-colors duration-300 rounded-md`}
          >
            <Elipsis />
          </button>
        </div>
      </div>

      <div css={tw`text-sm flex items-center space-x-3`}>
        <div css={tw`flex items-center space-x-1`}>
          <span css={tw`opacity-30`}>
            <Location width={16} height={16} />
          </span>
          <span css={tw`text-alt`}>{server.region.name}</span>
        </div>
        <div css={tw`flex items-center space-x-1`}>
          <span css={tw`opacity-30`}>
            <World width={16} height={16} />
          </span>
          <span css={tw`text-alt`}>{getIpAddress()}</span>
          <button
            type="button"
            css={tw`h-5 w-5 flex items-center justify-center bg-alt hover:bg-alt2 rounded-md transition-colors duration-300 p-0.5`}
          >
            <Clipboard width={12} height={12} />
          </button>
        </div>
      </div>

      <div css={tw`flex items-center justify-between`}>
        <ul>
          {server.tags.length ? (
            server.tags.map((tag) => (
              <li
                key={tag}
                css={tw`inline-block bg-alt text-body text-xs rounded-full px-2 py-1`}
              >
                {tag}
              </li>
            ))
          ) : (
            <li css={tw`inline-block bg-alt text-body text-xs rounded-full px-2 py-1`}>
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
};

export default ServerItem;
