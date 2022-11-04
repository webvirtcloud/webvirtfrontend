import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import type { Server } from '@/api/servers';
import { getServers } from '@/api/servers';
import { Elipsis, Pause, Play } from '@/components/Icons';

interface Props {
  servers: Server[];
}

const ServersList = ({ servers }: Props): JSX.Element => {
  const isActive = (server: Server) => server.status === 'active';
  return (
    <section>
      <div css={tw`flex items-center justify-between mb-8`}>
        <h2 css={tw`text-xl font-bold`}>Servers List</h2>
        <input
          type="text"
          placeholder="Search..."
          css={tw`bg-white/5 rounded-full border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500  px-4`}
        />
      </div>

      {servers ? (
        <ul css={tw`grid md:grid-cols-2 xl:grid-cols-3 gap-4`}>
          {servers.map((server) => (
            <li key={server.uuid}>
              <Link
                to={`/servers/${server.uuid}`}
                css={tw`min-h-[160px] flex flex-col justify-between bg-white/5 hover:bg-transparent rounded-lg hover:ring-1 hover:ring-cyan-500 border border-transparent hover:border-cyan-500 transition-all duration-500 p-4`}
              >
                <div css={tw`flex items-start justify-between`}>
                  <div>
                    <div css={tw`flex items-center space-x-2`}>
                      <div
                        css={tw`bg-white/5 h-12 w-12 flex items-center justify-center rounded`}
                      >
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
                        <p css={tw`text-xs text-white/50`}>
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
                        tw`bg-white/5 hover:bg-white/10 h-8 w-8 flex items-center justify-center transition-colors duration-500 rounded`,
                      ]}
                    >
                      {isActive(server) ? <Play /> : <Pause />}
                    </button>
                    <button
                      type="button"
                      css={tw`bg-white/5 hover:bg-white/10 h-8 w-8 flex items-center justify-center transition-colors duration-500 rounded`}
                    >
                      <Elipsis />
                    </button>
                  </div>
                </div>

                <div css={tw`space-y-2`}>
                  <span css={tw`opacity-50`}>
                    Created {format(parseISO(server.created_at), "E, MMMM d 'at' h:m a")}
                  </span>
                  <ul>
                    {server.tags.length ? (
                      server.tags.map((tag) => (
                        <li
                          key={tag}
                          css={tw`inline-block bg-pink-900/30 text-pink-500 text-xs rounded-full px-2 py-1`}
                        >
                          {tag}
                        </li>
                      ))
                    ) : (
                      <li
                        css={tw`inline-block bg-white/5 text-white text-xs rounded-full px-2 py-1 mb-2`}
                      >
                        No tags
                      </li>
                    )}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

const Servers = (): JSX.Element => {
  const [servers, setServers] = useState<Server[]>();

  const fetchServers = async () => {
    const response = await getServers();

    setServers(response.servers);
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <main>
      <ServersList servers={servers}></ServersList>
    </main>
  );
};

export default Servers;
