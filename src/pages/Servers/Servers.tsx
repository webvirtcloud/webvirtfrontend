import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import type { Server } from '@/api/servers';
import { getServers } from '@/api/servers';

import ServerItem from './ServerItem';

interface Props {
  servers: Server[] | undefined;
}

const ServersList = ({ servers }: Props): JSX.Element => {
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
              {
                <ServerItem
                  to={`/projects/${puuid}/servers/${server.uuid}`}
                  server={server}
                />
              }
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
