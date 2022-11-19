import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import type { Server } from '@/api/servers';
import { getServers } from '@/api/servers';
import { Elipsis, Pause, Play } from '@/components/Icons';

interface Props {
  servers: Server[] | undefined;
}

const ServersList = ({ servers }: Props): JSX.Element => {
  const isActive = (server: Server) => server.status === 'active';
  const { puuid } = useParams();

  return (
    <section>
      <div css={tw`flex items-center justify-between mb-8`}>
        <h2 css={tw`text-xl font-bold`}>Servers List</h2>
        <input
          type="text"
          placeholder="Search..."
          css={tw`bg-alt rounded-full border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500  px-4`}
        />
      </div>

      {servers ? (
        <ul css={tw`grid md:grid-cols-2 xl:grid-cols-3 gap-4`}>
          {servers.map((server) => (
            <li key={server.uuid}>
              <Link
                to={`/projects/${puuid}/servers/${server.uuid}`}
                css={tw`min-h-[160px] flex flex-col justify-between bg-base rounded-lg ring-1 ring-black/5 hover:ring-cyan-500 border border-transparent hover:border-cyan-500 transition-all duration-300 p-4`}
              >
                <div css={tw`flex items-start justify-between`}>
                  <div>
                    <div css={tw`flex items-center space-x-2`}>
                      <div
                        css={tw`bg-alt h-12 w-12 flex items-center justify-center rounded`}
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
                        tw`bg-alt hover:bg-alt2 h-8 w-8 flex items-center justify-center transition-colors duration-300 rounded`,
                      ]}
                    >
                      {isActive(server) ? <Play /> : <Pause />}
                    </button>
                    <button
                      type="button"
                      css={tw`bg-alt hover:bg-alt2 h-8 w-8 flex items-center justify-center transition-colors duration-300 rounded`}
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
                          css={tw`inline-block bg-pink-200/30 text-pink-500 text-xs rounded-full px-2 py-1`}
                        >
                          {tag}
                        </li>
                      ))
                    ) : (
                      <li
                        css={tw`inline-block bg-alt text-body text-xs rounded-full px-2 py-1 mb-2`}
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
      {servers && servers.length === 0 && <div>No created servers.</div>}
    </section>
  );
};

const Servers = (): JSX.Element => {
  const [servers, setServers] = useState<Server[]>();
  const { puuid } = useParams();

  const fetchServers = async () => {
    const response = await getServers({ meta: { project_uuid: puuid } });

    setServers(response.servers);
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <main>
      <ServersList servers={servers} />
    </main>
  );
};

export default Servers;
