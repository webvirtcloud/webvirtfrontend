import 'twin.macro';

import { useEffect, useState } from 'react';

import { getServers, Server } from '@/api/servers';
import { ServersList } from '@/components/ServersList';

const Home = (): JSX.Element => {
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

export default Home;
